<template>
	<div>
    <h1 class="govuk-heading-xl">
      About the extension or alteration to the original house
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

          <div class="govuk-checkboxes__item" v-bind:key="index" v-for="(proposal, index) in proposals">
            <input class="govuk-checkboxes__input" :id="proposal.id" name="proposal" type="checkbox" :value="proposal.value" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" :for="proposal.id">
              <strong>{{ proposal.name }}</strong>
            </label>
          </div>

        </div>
      </fieldset>
    </div>
    <free-description></free-description>
    
    <error-message v-if="showErrorMessage && !loading" :message="errorMessages.CHANGES_TO_THE_ORIGINAL_HOUSE.GENERIC_ERROR"></error-message>

		<v-cta name="Continue" :onClick="submit"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';
import FreeDescription from '../../components/FreeDescription.vue';
import { getRouteAppId } from '../../mixins/getRouteAppId';
import ErrorMessage from '../../components/ErrorMessage.vue';
import * as errorMessage from '../../messages/errorMessages';


export default {
  name: 'AboutChangesToOriginalHouse',
  mixins: [ getRouteAppId ],
	components: {
    vCta,
    FreeDescription,
    ErrorMessage
  },
  data () {
    return {
      selectedProposal: [],
      proposals: [
        {
          id: 'single_storey_extension',
          value: 'single_storey_extension',
          name: 'Single storey extension (including conservatory)'
        },
        {
          id: 'two_storey_extension',
          value: 'two_storey_extension',
          name: 'Two storey extension'
        },
        {
          id: 'part_single_part_two_storey_extension',
          value: 'part_single_part_two_storey_extension',
          name: 'Part single/part two storey extension'
        },
        {
          id: 'basement',
          value: 'basement',
          name: 'Below ground level basement works (including lightwells)'
        },
        {
          id: 'porch',
          value: 'porch',
          name: 'Porch'
        },
        {
          id: 'balcony_terrace',
          value: 'balcony_terrace',
          name: 'Balcony or terrace'
        },
        {
          id: 'staircase',
          value: 'staircase',
          name: 'Alteration or installation of an external staircase'
        },
        {
          id: 'windows_doors',
          value: 'windows_doors',
          name: 'Addition and/or replacement of windows or doors, including bay windows',
          isInConservationArea: true
        },
        {
          id: 'cladding',
          value: 'cladding',
          name: 'Changing the external finish of the existing house',
          isInConservationArea: true
        }
      ],
      showErrorMessage: false,
      errorMessages: undefined
    }
  },
  created () {
    this.errorMessages = errorMessage;
  },
  methods: {
    loadExistingAnswers () {
      if (this.application.data.proposal_extension.original_house.single_storey_extension) {
        this.selectedProposal.push('single_storey_extension');
      }

      if (this.application.data.proposal_extension.original_house.two_storey_extension) {
        this.selectedProposal.push('two_storey_extension');
      }

      if (this.application.data.proposal_extension.original_house.part_single_part_two_storey_extension) {
        this.selectedProposal.push('part_single_part_two_storey_extension');
      }

      if (this.application.data.proposal_extension.original_house.basement) {
        this.selectedProposal.push('basement');
      }

      if (this.application.data.proposal_extension.original_house.roof) {
        this.selectedProposal.push('roof');
      }

      if (this.application.data.proposal_extension.original_house.balcony_terrace) {
        this.selectedProposal.push('balcony_terrace');
      }

      if (this.application.data.proposal_extension.original_house.staircase) {
        this.selectedProposal.push('staircase');
      }

      if (this.application.data.proposal_extension.original_house.windows_doors) {
        this.selectedProposal.push('windows_doors');
      }

      if (this.application.data.proposal_extension.original_house.cladding) {
        this.selectedProposal.push('cladding');
      }   
		},
    updateNavigation () {
      var navigationInfo = {
        currentLevel: 'original_house',
        selectedProposal: this.selectedProposal,
        action: 'updateFlow',
        application_id: this.applicationId
      }
      this.$store.dispatch('submitFlow', navigationInfo).then(() => {
        var currentLevelInMap = this.$store.state.state.proposalFlow.findIndex(function(element) {
          return element.proposalId === 'original_house';
        });
        var currentLevelInfo = this.$store.state.state.proposalFlow[currentLevelInMap + 1];
        router.push({ name: this.$store.state.state.proposalFlow[currentLevelInMap + 1].goTo[0], params: {currentLevelInfo }});
      });
    },
    submit() {

      let payload = {
        'original_house': {}
      };

      let selectedProposals = {};

      this.selectedProposal.forEach(function(element) {
        selectedProposals[element] = {};
      });

      payload.original_house = selectedProposals;

      const extensionId = this.$store.getters.getExtensionId(this.applicationId);

      this.$store.dispatch('updateExtensionProposal', { 
        "application_id": this.applicationId, 
        "selectedProposals": payload, 
        "extension_id": extensionId 
      }).then((response) => {

        if (response.error) {
          this.showErrorMessage = true;
          return;
        } else {
          this.updateNavigation();
        }
      })
    }
  },
  computed: {
    application () {
			let index = this.$store.state.state.applications.findIndex( application => application.data.id === this.applicationId );

			return this.$store.state.state.applications[index];
		}
  },
  watch: {
		application (newValue, oldValue) {
			this.loadExistingAnswers();
		}
	}
}
</script>