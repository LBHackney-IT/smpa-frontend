<template>
	<div>
    <h1 class="govuk-heading-xl">
      About the site access
    </h1>
		<div class="govuk-form-group">
			<fieldset class="govuk-fieldset" aria-describedby="trees-question-1-hint">
				<legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
				<h2 class="govuk-heading-m">
					Would the proposed works affect access to the site for vehicles, cycles and/or pedestrians?
				</h2>
				</legend>

        <warning-message :message="warningMessage" v-bind:typeAlert="false"></warning-message>

        <span id="proposal-hint" class="govuk-hint">
          Select one
        </span>

				<div class="govuk-radios__item" v-bind:key="option.id" v-for="option in this.defaultOptions">
          <input class="govuk-radios__input" v-bind:id="option.id" v-bind:name="option.name" type="radio" v-bind:value="option.id" v-model="typeOfAlteration">
          <label class="govuk-label govuk-radios__label" v-bind:for="option.id">
            {{option.name}}
          </label>
        </div>
			</fieldset>
		</div>

    <error-message v-if="showErrorMessage && !loading" :message="errorMessages.ACCESS.GENERIC_ERROR"></error-message>

		<v-cta name="Continue" :onClick="submit"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';
import WarningMessage from '../../components/WarningMessage.vue';
import { getRouteAppId } from '../../mixins/getRouteAppId';
import ErrorMessage from '../../components/ErrorMessage.vue';
import * as errorMessage from '../../messages/errorMessages';

export default {
  name: 'Access',
  mixins: [ getRouteAppId ],
	components: {
    vCta,
    WarningMessage,
    ErrorMessage
	},
	data () {
    return {
      defaultOptions: undefined,
      alterationToAccess: '',
      typeOfAlteration: '',
      currentWorks: undefined,
      warningMessage: 'Any public footpath affected by the site must be shown on the plans. This includes temporary closures or diversions.',
      showErrorMessage: false,
      errorMessages: undefined
    }
  },
  beforeMount () {
    this.loadDefaultOptions();
  },
  created () {
    this.fetchData();
    this.errorMessages = errorMessage;
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.typeOfAlteration = undefined;
      this.currentWorks = this.$route.params.currentLevelInfo;
    },
    navigate() {

      let nameOfAlteration;

      //todo find a more elegant way of doing this
      if (this.typeOfAlteration === "6d7c5aa1-7c6b-42be-b791-8aed006b1482") {
        nameOfAlteration = 'vehicle';
      } else if (this.typeOfAlteration === "44c566ba-95dc-4cff-b0a9-53de934d309e") {
        nameOfAlteration = 'pedestrian';
      } else {
        nameOfAlteration = 'both';
      }

      router.push({ name: 'MoreAboutAccess', params: { type: nameOfAlteration, currentLevelInfo: this.currentWorks} });
    },
    loadDefaultOptions() {
      this.$store.dispatch('getDefaultData', 'access-works-scopes').then((response) => {
        
        if (response.error) {
          this.showErrorMessage = true;
          return;
        } else {
          this.defaultOptions = response.data;
        }
      })
    },
    submit() {
      let payload = {
        "means_of_access": {
          "access_works_scope_id": this.typeOfAlteration
        }
      };

      const extensionId = this.$store.getters.getExtensionId(this.applicationId);

      this.$store.dispatch('updateExtensionProposal', { 
        "application_id": this.applicationId, 
        'selectedProposals': payload, 
        "extension_id": extensionId 
      }).then((response) => {
        
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