<template>
	<div>
    <h1 class="govuk-heading-xl">
      About the extension or alteration to any other building
    </h1>
		<div class="govuk-form-group">
      <fieldset class="govuk-fieldset" aria-describedby="proposal-hint">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h2 class="govuk-heading-m">
            Does the work include the removal or demolition of any existing outbuilding?
          </h2>
        
        </legend>
        <div class="govuk-radios govuk-radios--inline">
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="work-existing-outbuilding-1" name="work-existing-outbuilding" type="radio" value="true" v-model="existingOutbuilding">
						<label class="govuk-label govuk-radios__label" for="work-existing-outbuilding-1">
							Yes
						</label>
					</div>
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="work-existing-outbuilding-2" name="work-existing-outbuilding" type="radio" value="false" v-model="existingOutbuilding">
						<label class="govuk-label govuk-radios__label" for="work-existing-outbuilding-2">
							No
						</label>
					</div>
				</div>
      </fieldset>
      <div class="govuk-form-group">
        <label class="govuk-label" for="more-detail">
          Can you provide more detail?
        </label>
        <textarea class="govuk-textarea" id="more-detail" name="more-detail" rows="10" aria-describedby="more-detail-hint" v-model="details"></textarea>
      </div>
    </div>
    <free-description></free-description>
    
    <error-message v-if="showErrorMessage && !loading" :message="errorMessages.OUTBUILDING.GENERIC_ERROR"></error-message>

		<v-cta name="Continue" :onClick="submit"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';
import Navigate from '../../common/navigate';
import FreeDescription from '../../components/FreeDescription.vue';
import { getRouteAppId } from '../../mixins/getRouteAppId';
import ErrorMessage from '../../components/ErrorMessage.vue';
import * as errorMessage from '../../messages/errorMessages';

export default {
  name: 'Outbuilding',
  mixins: [ getRouteAppId ],
	components: {
    vCta,
    FreeDescription,
    ErrorMessage
  },
  created () {
    this.fetchData();
  },
  watch: {
    '$route': 'fetchData'
  },
  data () {
    return {
      selectedProposal: [],
      existingOutbuilding: undefined,
      currentWorks: undefined,
      details: undefined,
      showErrorMessage: false,
      errorMessages: undefined
    }
  },
  created () {
    this.errorMessages = errorMessage;
  },
	methods: {
    fetchData () {
      this.selectedProposal = [];
      this.currentWorks = this.$route.params.currentLevelInfo;
    },
    navigate() {
      var routerParams = Navigate.calculateNavigation(this.$store.state.state.proposalFlow, this.currentWorks, 'Outbuilding');
      router.push(routerParams);
    },
    submit() {
      let payload = {
        "incidental_buildings": {
          "removal_or_demolition": this.existingOutbuilding === 'true' ? true : false,
          "details": this.details
        }
      };

      const extensionId = this.$store.getters.getExtensionId(this.applicationId);

      this.$store.dispatch('updateExtensionProposal', { 
        "application_id": this.applicationId, 
        'selectedProposals': payload, 
        "extension_id": extensionId }).then((response) => {
        if (response.error) {
          this.showErrorMessage = true;
          return;
        } else {
          this.navigate();
        }
      })
    }
  }
}
</script>