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
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="equipment-1" name="equipment-1" type="checkbox" value="proposal_equipment_satellite_dish" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="equipment-1">
              <strong>Satellite dish</strong>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="equipment-2" name="equipment-2" type="checkbox" value="proposal_equipment_air_con" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="equipment-2">
              <strong>Air conditioning unit</strong>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="equipment-3" name="equipment-3" type="checkbox" value="proposal_equipment_tank" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="equipment-3">
              <strong>Tank</strong>
            </label>
          </div>


          <div v-if="isInConservationArea">
            <div class="govuk-checkboxes__item" v-if="isInConservationArea">
              <input class="govuk-checkboxes__input" id="equipment-4" name="equipment-4" type="checkbox" value="proposal_equipment_cctv" v-model="selectedEquipment">
              <label class="govuk-label govuk-checkboxes__label" for="equipment-4">
                <strong>CCTV</strong>
              </label>
            </div>

            <div class="govuk-checkboxes__item" v-if="isInConservationArea">
              <input class="govuk-checkboxes__input" id="equipment-5" name="equipment-5" type="checkbox" value="proposal_equipment_security_alarm" v-model="selectedEquipment">
              <label class="govuk-label govuk-checkboxes__label" for="equipment-5">
                <strong>Security alarm</strong>
              </label>
            </div>

            <div class="govuk-checkboxes__item" v-if="isInConservationArea">
              <input class="govuk-checkboxes__input" id="equipment-6" name="equipment-6" type="checkbox" value="proposal_equipment_sustainable_energy" v-model="selectedEquipment">
              <label class="govuk-label govuk-checkboxes__label" for="equipment-6">
                <strong>Solar panel or other sustainable energy equipment</strong>
              </label>
            </div>
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

export default {
	name: 'AboutEquipment',
	components: {
    vCta,
    FreeDescription
  },
  data () {
    return {
      question: 'About the works',
      selectedProposal: [],
      selectedEquipment: [],
      currentWorks: undefined
    }
  },
  created () {
    this.fetchData();
  },
    watch: {
    '$route': 'fetchData'
  },
	methods: {
    collectDataAndStore () {

			let question = {
				question: this.question,
				answers: {}
      };
      
      question.answers.required = true;
      question.answers.proposal = this.selectedProposal;
      question.answers.equipments = this.selectedEquipment;
			this.$store.commit('addProposalAnswers', JSON.parse(JSON.stringify(question)));
    },
    fetchData () {
      this.currentWorks = this.$route.params.currentLevelInfo;
    },
    updateNavigation () {
      var navigationInfo = {
        currentLevel: 'proposal_equipment',
        selectedProposal: this.selectedProposal
      }

      this.$store.dispatch('updateFlow', JSON.parse(JSON.stringify(navigationInfo))).then(() => {

        var currentLevelInMap = this.$store.state.state.proposalFlow.findIndex(function(element) {
          return element.proposalId === 'proposal_equipment';
        });

        router.push({ name: this.$store.state.state.proposalFlow[currentLevelInMap + 1].goTo[0], params: {currentLevelInfo: this.$store.state.state.proposalFlow[currentLevelInMap + 1], id: this.$store.state.state.proposalFlow[currentLevelInMap + 1].proposalId } });
      });
    },
    navigate() {
      this.updateNavigation();
    },
    proposalIsChecked(selectedProposal) {
      const result = this.selectedProposal.find(function(proposal) {
        return proposal === selectedProposal;
      });
      return result ? true : false;
    }
  },
  computed: {
		isInConservationArea () {
      if (this.$store.state.site && this.$store.state.site.siteConstraints && this.$store.state.site.siteConstraints.conservationArea) {
        return this.$store.state.site.siteConstraints.conservationArea;
      } else {
        return false;
      }
		}
	}
}
</script>