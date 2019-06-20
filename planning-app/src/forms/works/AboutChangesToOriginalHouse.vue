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
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-1" name="proposal" type="checkbox" value="single_storey_extension" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-1">
              <strong>Single storey extension (including conservatory)</strong>
            </label>
          </div>


          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-2" name="proposal" type="checkbox" value="two_storey_extension" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-2">
              <strong>Two storey extension</strong>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-3" name="proposal" type="checkbox" value="part_single_part_two_storey_extension" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-3">
              <strong>Part single/part two storey extension</strong>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-4" name="proposal" type="checkbox" value="basement" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-4">
              <strong>Below ground level basement works (including lightwells)</strong>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-5" name="proposal" type="checkbox" value="roof" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-5">
              <strong>Works to roof pitch (including roof extensions)</strong>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-7" name="proposal" type="checkbox" value="porch" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-7">
              <strong>Porch</strong>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-8" name="proposal" type="checkbox" value="balcony_terrace" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-8">
              <strong>Balcony or terrace</strong>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-9" name="proposal" type="checkbox" value="staircase" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-9">
              <strong>Alteration or installation of an external staircase</strong>
            </label>
          </div>


          <div class="govuk-checkboxes__item" v-if="isInConservationArea">
            <input class="govuk-checkboxes__input" id="proposal-10" name="proposal" type="checkbox" value="windows_doors" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-10">
              <strong>Addition and/or replacement of windows or doors, including bay windows</strong>
            </label>
          </div>

          <div class="govuk-checkboxes__item" v-if="isInConservationArea">
            <input class="govuk-checkboxes__input" id="proposal-11" name="proposal" type="checkbox" value="cladding" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-11">
              <strong>Changing the external finish of the existing house</strong>
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
  name: 'AboutChangesToOriginalHouse',
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
  methods: {
    updateNavigation () {
      var navigationInfo = {
        currentLevel: 'original_house',
        selectedProposal: this.selectedProposal
      }
      this.$store.dispatch('updateFlow', JSON.parse(JSON.stringify(navigationInfo))).then(() => {
        var currentLevelInMap = this.$store.state.state.proposalFlow.findIndex(function(element) {
          return element.proposalId === 'original_house';
        });
        var currentLevelInfo = this.$store.state.state.proposalFlow[currentLevelInMap + 1];
        currentLevelInfo = JSON.parse(JSON.stringify(currentLevelInfo));
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
      }).then(() => {
        this.updateNavigation();
      })
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