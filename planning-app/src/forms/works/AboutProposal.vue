<template>
	<div>
    <h1 class="govuk-heading-xl">
      About the extension or alteration
    </h1>
		<div class="govuk-form-group">
      <fieldset class="govuk-fieldset" aria-describedby="proposal-hint">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h2 class="govuk-heading-m">
            What are you making changes to?
          </h2>
        </legend>

        <span id="proposal-hint" class="govuk-hint">
          Select all that apply.
        </span>

        <div class="govuk-checkboxes">
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-1" name="proposal" type="checkbox" value="extension_original_house" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-1">
              <strong>You are making changes to the original house</strong>
              <div class="govuk-inset-text">
                <p class="govuk-body govuk-!-font-weight-bold">Example</p>
                Erection of a rear roof extension, installation of a front rooflights and re-rendering of front porch.
              </div>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-2" name="proposal" type="checkbox" value="extension_incidental_buildings" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-2">
              <strong>You are building, replacing or removing an outbuilding</strong>
              <p>Incidental building include garages, sheds, summerhouses and similar outbuildings.</p>
              <div class="govuk-inset-text">
                <p class="govuk-body govuk-!-font-weight-bold">Example</p>
                Erection of garden store in the rear garden and removal of an existing shed in rear garden.
              </div>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-4" name="proposal" type="checkbox" value="extension_gates_fences_etc" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-4">
              <strong>You are making changes to gates, fences, garden walls, boundary treatments etc.</strong>
              <div class="govuk-inset-text">
                <p class="govuk-body govuk-!-font-weight-bold">Example</p>
                  Installation of a gate and railings as a side boundary wall.
              </div>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-7" name="proposal" type="checkbox" value="extension_means_of_access_to_site" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-7">
              <strong>You are making changes to the site access</strong>
              <p>Any works that involve alteration to or creation of a new access to the public road (not including temporary closures or diversions).</p>
              <div class="govuk-inset-text">
                <p class="govuk-body govuk-!-font-weight-bold">Example</p>
                Proposed dropped kerb and formation of vehicle access.
              </div>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-9" name="proposal" type="checkbox" value="extension_car_bike_spaces" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-9">
              <strong>You are making changes to car and/or bike parking spaces</strong>
            </label>
          </div>
        </div>
      </fieldset>
    </div>
    <free-description></free-description>
		<v-cta name="Continue" :onClick="navigate"></v-cta>
    <!-- <review-works></review-works> -->
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';
import reviewWorks from './reviewWorks.vue';
import FreeDescription from '../../components/FreeDescription.vue';

export default {
	name: 'AboutProposal',
	components: {
    vCta,
    reviewWorks,
    FreeDescription
  },
  data () {
    return {
      selectedProposal: [],
      typeOfExtension: [],
      question: 'About the extension, improvement or alteration'
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
      question.answers.typeOfExtension = this.typeOfExtension;
			this.$store.commit('addAboutProposalAnswers', JSON.parse(JSON.stringify(question)));
    },
    
    updateNavigation () {
      var navigationInfo = {
        currentLevel: 'proposal_extension',
        selectedProposal: this.selectedProposal
      }

      this.$store.dispatch('updateFlow', JSON.parse(JSON.stringify(navigationInfo))).then(() => {

        var currentLevelInMap = this.$store.state.state.proposalFlow.findIndex(function(element) {
          return element.proposalId === 'proposal_extension';
        });

        router.push({ name: this.$store.state.state.proposalFlow[currentLevelInMap + 1].goTo[0], params: {currentLevelInfo: this.$store.state.state.proposalFlow[currentLevelInMap + 1], id: this.$store.state.state.proposalFlow[currentLevelInMap + 1].proposalId } });
      });
    },
    navigate() {
      //this.collectDataAndStore();
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