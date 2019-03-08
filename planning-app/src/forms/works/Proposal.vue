<template>
	<div>
    <h1 class="govuk-heading-xl">
			{{ question }}
		</h1>
		<div class="govuk-form-group">
      <fieldset class="govuk-fieldset" aria-describedby="proposal-hint">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h2 class="govuk-heading-m">
            What type of works are you proposing?
          </h2>
        </legend>
        <span id="proposal-hint" class="govuk-hint">
          Select all that apply.
        </span>

        <div class="govuk-checkboxes">
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-1" name="proposal" type="checkbox" value="proposal_extension" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-1">
              <strong>You are doing an extension or alteration</strong>
              <p>Enlarging, changing or adding to any aspect of a house, such as an extension or an outbuilding. This also includes all general alterations like rooflights or new windows.</p>
              <div class="govuk-inset-text">
                <p class="govuk-body govuk-!-font-weight-bold">Example</p>
                A single-storey, ground floor, rear extension.
              </div>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-7" name="proposal" type="checkbox" value="proposal_equipment" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-7">
              <strong>You are installing or replacing an equipment</strong>
              <p>The installation, alteration or replacement of equipment on a house or within the curtilage of a house. This may include an satellite dish, CCTV or a solar panel.</p>
            </label>
          </div>
        </div>
      </fieldset>
    </div>
    <free-description></free-description>
		<v-cta name="Next" :onClick="navigate"></v-cta>
    <!-- <review-works></review-works> -->
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';
import reviewWorks from './reviewWorks.vue';
import FreeDescription from '../../components/FreeDescription.vue';

export default {
	name: 'Proposal',
	components: {
    vCta,
    reviewWorks,
    FreeDescription
  },
  data () {
    return {
      question: 'About the works',
      selectedProposal: [],
      selectedEquipment: []
    }
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
    updateNavigation () {
      var navigationInfo = {
        currentLevel: 'proposal',
        selectedProposal: this.selectedProposal
      }

      this.$store.dispatch('createFirstFlow', JSON.parse(JSON.stringify(navigationInfo))).then(() => {
        router.push({ name: this.$store.state.state.proposalFlow[0].goTo });
      });
    },
    navigate() {
      this.collectDataAndStore();
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