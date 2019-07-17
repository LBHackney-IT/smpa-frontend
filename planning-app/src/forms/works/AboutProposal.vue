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
          <div class="govuk-checkboxes__item" v-bind:key="index" v-for="(proposal, index) in proposals">
            <input class="govuk-checkboxes__input" :id="proposal.id" name="proposal" type="checkbox" :value="proposal.value" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" :for="proposal.id">
              <strong>{{ proposal.name }}</strong>
              <p>{{ proposal.description }}</p>
              <div class="govuk-inset-text" v-if="proposal.example">
                <p class="govuk-body govuk-!-font-weight-bold">Example</p>
                {{ proposal.example }}
              </div>
            </label>
          </div>
        </div>
      </fieldset>
    </div>
    <free-description></free-description>
		<v-cta name="Continue" :onClick="submit"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';
import FreeDescription from '../../components/FreeDescription.vue';
import { getRouteAppId } from '../../mixins/getRouteAppId';

export default {
  name: 'AboutProposal',
  mixins: [ getRouteAppId ],
	components: {
    vCta,
    FreeDescription
  },
  data () {
    return {
      selectedProposal: [],
      proposals: [
        {
          id: 'original_house',
          value: 'original_house',
          name: 'You are making changes to the original house',
          example: 'Erection of a rear roof extension, installation of a front rooflight and re-rendering of front porch.'
        },
        {
          id: 'incidental_buildings',
          value: 'incidental_buildings',
          name: 'You are building, replacing or removing an outbuilding',
          description: 'Incidental building include garages, sheds, summerhouses and similar outbuildings.',
          example: 'Erection of a garden store in the rear garden and removal of an existing shed in rear garden.'
        },
        {
          id: 'boundaries',
          value: 'boundaries',
          name: 'You are making changes to gates, fences, garden walls, boundary treatments etc.',
          example: 'Installation of a gate and railings as a side boundary wall.'
        },
        {
          id: 'means_of_access',
          value: 'means_of_access',
          name: 'You are making changes to the site access',
          description: 'Any works that involve alteration to or creation of a new access to the public road (not including temporary closures or diversions).',
          example: 'Proposed dropped kerb and formation of vehicle access.'
        },
        {
          id: 'parking',
          value: 'parking',
          name: 'You are making changes to car and/or bike parking spaces'
        }
      ]
    }
  },
  computed: {
    extensionId () {
      return this.$store.getters.getExtensionId;
    },
    application () {
			let index = this.$store.state.state.applications.findIndex( application => application.data.id === this.applicationId );

			return this.$store.state.state.applications[index];
		}
  },
	methods: {
    loadExistingAnswers () {
      if (this.application.data.proposal_extension.original_house) {
        this.selectedProposal.push('original_house');
      }

      if (this.application.data.proposal_extension.incidental_buildings) {
        this.selectedProposal.push('incidental_buildings');
      }

      if (this.application.data.proposal_extension.boundaries) {
        this.selectedProposal.push('boundaries');
      }

      if (this.application.data.proposal_extension.means_of_access) {
        this.selectedProposal.push('means_of_access');
      }

      if (this.application.data.proposal_extension.parking) {
        this.selectedProposal.push('parking');
      }
   
		},
    updateNavigation () {
      var navigationInfo = {
        currentLevel: 'proposal_extension',
        selectedProposal: this.selectedProposal,
        action: 'updateFlow',
        application_id: this.applicationId
      }

      this.$store.dispatch('submitFlow', navigationInfo).then(() => {

        var currentLevelInMap = this.$store.state.state.proposalFlow.findIndex(function(element) {
          return element.proposalId === 'proposal_extension';
        });

        router.push({ name: this.$store.state.state.proposalFlow[currentLevelInMap + 1].goTo[0], params: {currentLevelInfo: this.$store.state.state.proposalFlow[currentLevelInMap + 1], id: this.$store.state.state.proposalFlow[currentLevelInMap + 1].proposalId } });
      });
    },
    submit() {
      let selectedProposals = {};

      this.selectedProposal.forEach(function(element) {
        selectedProposals[element] = {};
      });

      const extensionId = this.$store.getters.getExtensionId(this.applicationId);

      this.$store.dispatch('updateExtensionProposal', { "application_id": this.applicationId, selectedProposals, "extension_id": extensionId }).then(() => {
        this.updateNavigation();
      })
    }
  },
  watch: {
		application (newValue, oldValue) {
			this.loadExistingAnswers();
		}
	}
}
</script>