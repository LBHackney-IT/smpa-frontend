<template>
	<div>
    <h1 class="govuk-heading-xl">
			About the changes to gates, fences or garden walls
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

    <error-message v-if="showErrorMessage && !loading" :message="errorMessages.DECLARATION.GENERIC_ERROR"></error-message>

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
  name: 'AboutGatesFencesWalls',
  mixins: [ getRouteAppId ],
	components: {
    vCta,
    FreeDescription,
    ErrorMessage
  },
  data () {
    return {
      selectedProposal: [],
      currentWorks: undefined,
      defaultOptions: undefined,
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

      if (this.application.data.proposal_extension && this.application.data.proposal_extension.boundaries && this.application.data.proposal_extension.boundaries.gates_fences_walls && this.application.data.proposal_extension.boundaries.gates_fences_walls.works_type_ids) {
        var sameAnswers = Lib.arrayDiff(this.selectedProposal, this.application.data.proposal_extension.boundaries.gates_fences_walls.works_type_ids);

        if (sameAnswers) {
          this.navigate();
        } else {
          this.submit();
        }
      } else {
        this.submit();
      }
    },
    loadExistingAnswers () {
      if (this.application.data.proposal_extension.boundaries && this.application.data.proposal_extension.boundaries.gates_fences_walls) {
        this.selectedProposal = this.application.data.proposal_extension.boundaries.gates_fences_walls.works_type_ids;
      }
		},
    fetchData () {
      this.selectedProposal = [];
      this.currentWorks = this.$route.params.currentLevelInfo;
    },
    navigate() {
      var routerParams = Navigate.calculateNavigation(this.$store.state.state.proposalFlow, this.currentWorks, 'GatesFencesWalls');
      router.push(routerParams);
    },
    proposalIsChecked(selectedProposal) {
      const result = this.selectedProposal.find(function(proposal) {
        return proposal === selectedProposal;
      });
      return result ? true : false;
    },
    loadDefaultOptions() {
      this.$store.dispatch('getDefaultData', 'gate-fences-walls-types').then((response) => {
        if (response.error) {
          return this.showErrorMessage = true;
        }
        this.defaultOptions = response.data;
      })
    },
    submit() {
      let payload = {
        "boundaries": {
          "gates_fences_walls": {
            "works_type_ids": this.selectedProposal
          }
        }
      };

      const extensionId = this.$store.getters.getExtensionId(this.applicationId);

      this.$store.dispatch('updateExtensionProposal', 
        { 
          "application_id": this.applicationId, 
          'selectedProposals': payload, 
          "extension_id": extensionId, 
          "id": 'boundaries' 
        }).then((response) => {

        if (response.error) {
          return this.showErrorMessage = true;
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
    },
    
    isInConservationArea () {
      return this.application.data.site_constraints.nb_conarea > 0;
    }
  }
}
</script>