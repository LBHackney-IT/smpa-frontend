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
		<v-cta name="Continue" :onClick="navigate"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';
import FreeDescription from '../../components/FreeDescription.vue';
import { getRouteAppId } from '../../mixins/getRouteAppId';

export default {
  name: 'AboutEquipment',
  mixins: [ getRouteAppId ],
	components: {
    vCta,
    FreeDescription
  },
  data () {
    return {
      question: 'About the works',
      selectedGeneralProposal: [],
      selectedConservationAreaProposal: [],
      currentWorks: undefined,
      defaultGeneralOptions: undefined,
      defaultConservationAreaOptions: undefined
    }
  },
  created () {
    this.fetchData();
  },
  beforeMount () {
    this.loadDefaultOptions();
  },
    watch: {
    '$route': 'fetchData'
  },
	methods: {
    loadDefaultOptions() {
      if (!this.isInConservationArea) {
        this.$store.dispatch('getDefaultData', 'equipment-works-types').then((response) => {
          this.defaultOptions = response.data;
        });
      } else {
        const equipmentResources = {
          'general': 'equipment-works-types',
          'conservationArea': 'equipment-works-conservation-types'
        };
        this.$store.dispatch(
          'getDefaultDataFromTwoSources', equipmentResources
        ).then((response) => {
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
      defaultOptions = this.defaultGeneralOptions.concat(this.defaultConservationAreaOptions);

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
    navigate() {

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
        this.updateNavigation();
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
      var isIt = this.application.data.site_constraints.nb_conarea > 0;
      return this.application.data.site_constraints.nb_conarea > 0;
    }
	}
}
</script>