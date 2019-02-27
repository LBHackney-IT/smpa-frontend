<template>
	<div>
    <h1 class="govuk-heading-xl">
      About the extension, improvement or alteration
    </h1>
		<div class="govuk-form-group">
      <fieldset class="govuk-fieldset" aria-describedby="proposal-hint">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h2 class="govuk-heading-m">
            What are you making changes to?
          </h2>
        </legend>

        <div class="govuk-warning-text">
          <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
          <strong class="govuk-warning-text__text">
            <span class="govuk-warning-text__assistive">Warning</span>
            You must describe all permitted developments that require planning permission.
          </strong>
        </div>

        <span id="proposal-hint" class="govuk-hint">
          Select all that apply.
        </span>

        <div class="govuk-checkboxes">
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-1" name="proposal" type="checkbox" value="extension_original_house" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-1">
              <strong>To the original house</strong>
              <div class="govuk-inset-text">
                <p class="govuk-body govuk-!-font-weight-bold">Example</p>
                Erection of a rear roof extension, installation of 2 front rooflights and re-rendering of front porch.
              </div>
            </label>
          </div>

          <!-- <div class="govuk-inset-text" v-if="proposalIsChecked('Extension')">
            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="proposal-5" name="proposal" type="checkbox" value="Single storey" v-model="typeOfExtension">
              <label class="govuk-label govuk-checkboxes__label" for="proposal-5">
                Single storey
              </label>
            </div>

            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="proposal-5" name="proposal" type="checkbox" value="Two storey" v-model="typeOfExtension">
              <label class="govuk-label govuk-checkboxes__label" for="proposal-5">
                Two storey
              </label>
            </div>

            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="proposal-5" name="proposal" type="checkbox" value="Conservatory" v-model="typeOfExtension">
              <label class="govuk-label govuk-checkboxes__label" for="proposal-5">
                Conservatory
              </label>
            </div>

            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="proposal-5" name="proposal" type="checkbox" value="Basement and/or lightwell" v-model="typeOfExtension">
              <label class="govuk-label govuk-checkboxes__label" for="proposal-5">
                Basement and/or lightwell
              </label>
            </div>

            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="proposal-5" name="proposal" type="checkbox" value="outbuilding" v-model="typeOfExtension">
              <label class="govuk-label govuk-checkboxes__label" for="proposal-5">
                Outbuilding
              </label>
            </div>

            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="proposal-5" name="proposal" type="checkbox" value="porch" v-model="typeOfExtension">
              <label class="govuk-label govuk-checkboxes__label" for="proposal-5">
                Porch
              </label>
            </div>

            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="proposal-5" name="proposal" type="checkbox" value="Balcony, decking and platforms" v-model="typeOfExtension">
              <label class="govuk-label govuk-checkboxes__label" for="proposal-5">
                Balcony, decking and platforms
              </label>
            </div>
          </div> -->

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-2" name="proposal" type="checkbox" value="extension_incidental_buildings" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-2">
              <strong>To any incidental buildings</strong>
              <p>Incidental building include garages, sheds, summerhouses and similar outbuildings, which are more than 5m away from the existing building.</p>
              <div class="govuk-inset-text">
                <p class="govuk-body govuk-!-font-weight-bold">Example</p>
                Erection of garden store in the rear garden and removal of an existing shed in rear garden.
              </div>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-4" name="proposal" type="checkbox" value="extension_gates_fences_etc" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-4">
              <strong>To gates, fences or garden walls</strong>
              <div class="govuk-inset-text">
                <p class="govuk-body govuk-!-font-weight-bold">Example</p>
                Installation of gate and railings atop a brick, front and side boundary wall.
              </div>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-7" name="proposal" type="checkbox" value="extension_means_of_access_to_site" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-7">
              <strong>To means of access to the site</strong>
              <p>Any works that involve alteration to or creation of a new access to the public road.</p>
              <p>
                That applies to any proposal that may require a closure or diversion as well.
              </p>
              <div class="govuk-inset-text">
                <p class="govuk-body govuk-!-font-weight-bold">Example</p>
                Proposed dropped kerb & formation of vehicule access (the installation of hardstanding to provide car-parking spaces).
              </div>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-9" name="proposal" type="checkbox" value="extension_car_bike_spaces" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-9">
              <strong>Car and/or bike parking spaces</strong>
            </label>
          </div>
        </div>
      </fieldset>
    </div>
		<v-cta name="Continue" :onClick="navigate"></v-cta>
    <!-- <review-works></review-works> -->
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';
import reviewWorks from './reviewWorks.vue';

export default {
	name: 'AboutProposal',
	components: {
    vCta,
    reviewWorks
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

        router.push({ name: this.$store.state.state.proposalFlow[currentLevelInMap + 1].goTo });
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