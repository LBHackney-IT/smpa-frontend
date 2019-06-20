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
            <input class="govuk-checkboxes__input" id="proposal-1" name="proposal" type="checkbox" value="original_house" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-1">
              <strong>You are making changes to the original house</strong>
              <div class="govuk-inset-text">
                <p class="govuk-body govuk-!-font-weight-bold">Example</p>
                Erection of a rear roof extension, installation of a front rooflight and re-rendering of front porch.
              </div>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-2" name="proposal" type="checkbox" value="incidental_buildings" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-2">
              <strong>You are building, replacing or removing an outbuilding</strong>
              <p>Incidental building include garages, sheds, summerhouses and similar outbuildings.</p>
              <div class="govuk-inset-text">
                <p class="govuk-body govuk-!-font-weight-bold">Example</p>
                Erection of a garden store in the rear garden and removal of an existing shed in rear garden.
              </div>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-4" name="proposal" type="checkbox" value="boundaries" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-4">
              <strong>You are making changes to gates, fences, garden walls, boundary treatments etc.</strong>
              <div class="govuk-inset-text">
                <p class="govuk-body govuk-!-font-weight-bold">Example</p>
                  Installation of a gate and railings as a side boundary wall.
              </div>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-7" name="proposal" type="checkbox" value="means_of_access" v-model="selectedProposal">
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
            <input class="govuk-checkboxes__input" id="proposal-9" name="proposal" type="checkbox" value="parking" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-9">
              <strong>You are making changes to car and/or bike parking spaces</strong>
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
      selectedProposal: []
    }
  },
  computed: {
    extensionId () {
      return this.$store.getters.getExtensionId;
    }
  },
	methods: {
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
  }
}
</script>