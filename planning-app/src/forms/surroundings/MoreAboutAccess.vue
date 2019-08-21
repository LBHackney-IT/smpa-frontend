<template>
	<div>
    <h1 class="govuk-heading-xl" v-if="this.type === 'vehicle' || this.type === 'pedestrian'">
      About the {{ type }} access
    </h1>

    <h1 class="govuk-heading-xl" v-if="this.type === 'both'">
      About the vehicle and pedestrian access
    </h1>
		<div class="govuk-form-group">
      <fieldset class="govuk-fieldset" aria-describedby="proposal-hint">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h2 class="govuk-heading-m">
            What changes are you proposing?
          </h2>
        </legend>

        <span id="proposal-hint" class="govuk-hint">
          Select all that apply.
        </span>

        <div class="govuk-checkboxes">
          <div class="govuk-checkboxes__item" v-bind:key="option.id" v-for="option in this.defaultOptions">
            <input class="govuk-checkboxes__input" v-bind:id="option.id" name="proposal" type="checkbox" v-bind:value="option.id" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" v-bind:for="option.id">
              <strong>{{option.name}}</strong>
            </label>
          </div>

        </div>
      </fieldset>
    </div>
    <free-description></free-description>

    <error-message v-if="showErrorMessage && !loading" :message="errorMessages.ACCESS.GENERIC_ERROR"></error-message>

		<v-cta name="Continue" :onClick="checkAnswers"></v-cta>
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
import Lib from '../../common/lib';

export default {
  name: 'MoreAboutAccess',
  mixins: [ getRouteAppId ],
	components: {
    vCta,
    FreeDescription,
    ErrorMessage
  },
  data () {
    return {
      selectedProposal: [],
      existingProposal: [],
      type: undefined,
      typeOfAlteration: undefined,
      currentWorks: undefined,
      defaultOptions: [],
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
    '$route': 'fetchData',
    application () {
			this.loadExistingAnswers();
		}
  },
	methods: {
    checkAnswers () {
      var sameAnswers = Lib.arrayDiff(this.selectedProposal, this.existingProposal);

      if (sameAnswers) {
        this.navigate();
      } else {
        this.submit();
      }
    },
    loadExistingAnswers () {
      if (this.application.data.proposal_extension.means_of_access.access_works_sub_type_ids) {
        this.selectedProposal = this.application.data.proposal_extension.means_of_access.access_works_sub_type_ids;
        this.existingProposal = this.application.data.proposal_extension.means_of_access.access_works_sub_type_ids;
      }
    },
    fetchData () {
      this.selectedProposal = [];
      this.type = this.$route.params.type;
      this.currentWorks = this.$route.params.currentLevelInfo;
    },
    navigate() {
      var routerParams = Navigate.calculateNavigation(this.$store.state.state.proposalFlow, this.currentWorks, 'MoreAboutAccess');
      router.push(routerParams);
    },
    loadDefaultOptions() {
      this.$store.dispatch('getDefaultData', 'access-works-types').then((response) => {
        
        if (response.error) {
          this.showErrorMessage = true;
          return;
        } else {
          this.defaultOptions = response.data;
        }
      })
    },
    submit() {
      let currentData = this.application.data.proposal_extension.means_of_access;

      let payload = {
        "means_of_access": {}
      };

      payload.means_of_access = currentData;

      payload.means_of_access.access_works_sub_type_ids = this.selectedProposal;

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
  },
  computed: {
    application () {
      let index = this.$store.state.state.applications.findIndex( application => application.data.id === this.applicationId );
			return this.$store.state.state.applications[index];
    }
	}
}
</script>