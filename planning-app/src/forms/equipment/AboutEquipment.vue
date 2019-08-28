<template>
	<div>
    <h1 class="govuk-heading-xl">
			About the equipment
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
          <div class="govuk-checkboxes__item" v-bind:key="option.id" v-for="option in this.defaultGeneralOptions">
            <input class="govuk-checkboxes__input" v-bind:id="option.id" name="proposal" type="checkbox" v-bind:value="option.id" v-model="selectedGeneralProposal">
            <label class="govuk-label govuk-checkboxes__label" v-bind:for="option.id">
              <strong>{{option.name}}</strong>
            </label>
          </div>
          <div class="govuk-checkboxes__item" v-bind:key="option.id" v-for="option in this.defaultConservationAreaOptions">
            <input class="govuk-checkboxes__input" v-bind:id="option.id" name="proposal" type="checkbox" v-bind:value="option.id" v-model="selectedConservationAreaProposal">
            <label class="govuk-label govuk-checkboxes__label" v-bind:for="option.id">
              <strong>{{option.name}}</strong>
            </label>
          </div>
        </div>
      </fieldset>
    </div>
    <free-description></free-description>
    
    <error-message v-if="showErrorMessage && !loading" :message="errorMessages.EQUIPMENT.GENERIC_ERROR"></error-message>

		<v-cta name="Continue" :onClick="checkAnswers"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';
import FreeDescription from '../../components/FreeDescription.vue';
import { getRouteAppId } from '../../mixins/getRouteAppId';
import ErrorMessage from '../../components/ErrorMessage.vue';
import * as errorMessage from '../../messages/errorMessages';
import Lib from '../../common/lib';

export default {
  name: 'AboutEquipment',
  mixins: [ getRouteAppId ],
	components: {
    vCta,
    FreeDescription,
    ErrorMessage
  },
  data () {
    return {
      question: 'About the works',
      selectedGeneralProposal: [],
      selectedConservationAreaProposal: [],
      existingGeneralProposal: [],
      existingConservationAreaProposal: [],
      currentWorks: undefined,
      defaultGeneralOptions: undefined,
      defaultConservationAreaOptions: undefined,
      showErrorMessage: false,
      errorMessages: undefined
    }
  },
  created () {
    this.fetchData();
    this.errorMessages = errorMessage;
  },
  beforeMount () {
    this.loadDefaultOptions();
  },
  watch: {
    '$route': 'fetchData',
    application () {
			this.loadExistingAnswers();
		}
  },
	methods: {
    checkAnswers () {
      var sameAnswersGeneralEquipment = Lib.arrayDiff(this.selectedGeneralProposal, this.existingGeneralProposal);
      var sameAnswersConservationEquipment = Lib.arrayDiff(this.selectedConservationAreaProposal, this.existingConservationAreaProposal);

      if (sameAnswersGeneralEquipment && sameAnswersConservationEquipment) {
        this.updateNavigation();
      } else {
        this.submit();
      }
    },
    loadExistingAnswers () {
      if (this.application.data.proposal_equipment && this.application.data.proposal_equipment.equipment) {
        this.selectedGeneralProposal = this.application.data.proposal_equipment.equipment.equipment_type_ids;
        this.selectedConservationAreaProposal = this.application.data.proposal_equipment.equipment.equipment_conservation_type_ids;

        this.existingGeneralProposal = this.application.data.proposal_equipment.equipment.equipment_type_ids;
        this.existingConservationAreaProposal = this.application.data.proposal_equipment.equipment.equipment_conservation_type_ids;
      }
		},
    loadDefaultOptions() {
      if (!this.isInConservationArea) {
        this.$store.dispatch('getDefaultData', 'equipment-works-types').then((response) => {
          if (response.error) {
            return this.showErrorMessage = true;
          }
          this.defaultGeneralOptions = response.data;
        });
      } else {
        const equipmentResources = {
          'general': 'equipment-works-types',
          'conservationArea': 'equipment-works-conservation-types'
        };
        this.$store.dispatch(
          'getDefaultDataFromTwoSources', equipmentResources
        ).then((response) => {
          if (response.error) {
            return this.showErrorMessage = true;
          }
          this.defaultGeneralOptions = response.general;
          this.defaultConservationAreaOptions = response.conservationArea;
        });
      }
    },
    fetchData () {
      this.currentWorks = this.$route.params.currentLevelInfo;
    },
    updateNavigation () {

      let defaultOptions = [];

      if (this.defaultConservationAreaOptions) {
        defaultOptions = this.defaultGeneralOptions.concat(this.defaultConservationAreaOptions);
      } else {
        defaultOptions = this.defaultGeneralOptions;
      }
      

      this.$store.dispatch('generateProposalEquipment', defaultOptions);

      let selectedProposal = [];

      selectedProposal = this.selectedConservationAreaProposal.concat(this.selectedGeneralProposal);

      var navigationInfo = {
        currentLevel: 'proposal_equipment',
        selectedProposal: selectedProposal,
        action: 'updateFlow'
      }

      this.$store.dispatch('updateFlow', JSON.parse(JSON.stringify(navigationInfo))).then(() => {

        var currentLevelInMap = this.$store.state.state.proposalFlow.findIndex(function(element) {
          return element.proposalId === 'proposal_equipment';
        });

        router.push({ name: this.$store.state.state.proposalFlow[currentLevelInMap + 1].goTo[0], params: {currentLevelInfo: this.$store.state.state.proposalFlow[currentLevelInMap + 1], id: this.$store.state.state.proposalFlow[currentLevelInMap + 1].proposalId, origin: 'equipment' } });
      });
    },
    submit() {

      const extensionId = this.$store.getters.getEquipmentId(this.applicationId);

      var payload = {};
      payload.id = extensionId;
      payload.equipment = {
        equipment: {
          equipment_type_ids: this.selectedGeneralProposal,
          equipment_conservation_type_ids: this.selectedConservationAreaProposal
        }
      }
      
      this.$store.dispatch('updateEquipmentProposal', payload).then((response) => {
        console.log('done and navigating', response);
        if (response.error) {
          return this.showErrorMessage = true;
        } else {
          this.updateNavigation();
        }
      });
      
    },
    proposalIsChecked(selectedProposal) {
      const result = this.selectedProposal.find(function(proposal) {
        return proposal === selectedProposal;
      });
      return result ? true : false;
    }
  },
  computed: {
    application () {
      let index = this.$store.state.state.applications.findIndex( application => application.data.id === this.applicationId );
			return this.$store.state.state.applications[index];
    },
    
    isInConservationArea () {
      return this.application.data.site_constraints.nb_conarea > 0;
    }
	}
}
</script>