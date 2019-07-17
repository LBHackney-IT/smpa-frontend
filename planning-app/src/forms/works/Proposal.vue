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
  name: 'Proposal',
  mixins: [ getRouteAppId ],
	components: {
    vCta,
    FreeDescription
  },
  data () {
    return {
      question: 'About the works',
      selectedProposal: [],
      proposals: [
        {
          id: 'proposal_extension',
          value: 'proposal_extension',
          name: 'You are doing an extension or alteration',
          description: 'Enlarging, changing or adding to any aspect of a house, such as an extension or building an outbuilding. This also includes all general alterations like rooflights, gates or new windows.',
          example: 'A single-storey ground floor rear extension.'
        },
        {
          id: 'proposal_equipment',
          value: 'proposal_equipment',
          name: 'You are installing or replacing equipment',
          description: 'The installation, alteration or replacement of equipment on a house or within the curtilage of a house. This may include a satellite dish, CCTV or a solar panel.'      
        }
      ]
    }
  },
  computed: {
    application () {
			let index = this.$store.state.state.applications.findIndex( application => application.data.id === this.applicationId );

			return this.$store.state.state.applications[index];
		}
  },
	methods: {
    loadExistingAnswers () {
      if (this.application.data.proposal_extension) {
        this.selectedProposal.push('proposal_extension');
      }

      if (this.application.data.proposal_equipment) {
        this.selectedProposal.push('proposal_equipment');
      }
		},
    updateNavigation () {
      debugger;
      var navigationInfo = {
        currentLevel: 'proposal',
        selectedProposal: this.selectedProposal,
        action: 'createFlow',
        application_id: this.applicationId
      }

      this.$store.dispatch('submitFlow', navigationInfo).then(() => {
        router.push({ name: this.$store.state.state.proposalFlow[0].goTo, params: { applicationId: this.applicationId } });
      });
    },
    submit() {
      if (this.selectedProposal.length === 2) {
        this.$store.dispatch('createBothProposals', { "application_id": this.applicationId }).then(() => {
           this.updateNavigation();
        })

      } else if (this.selectedProposal[0] === 'proposal_extension') {
        this.$store.dispatch('createExtensionProposal', { "application_id": this.applicationId }).then(() => {
           this.updateNavigation();
        })
      } else {
        // would then be "proposal_equipment"
        this.$store.dispatch('createEquipmentProposal', { "application_id": this.applicationId }).then(() => {
           this.updateNavigation();
        })
      }
    }
  },
  watch: {
		application (newValue, oldValue) {
			this.loadExistingAnswers();
		}
	}
}
</script>