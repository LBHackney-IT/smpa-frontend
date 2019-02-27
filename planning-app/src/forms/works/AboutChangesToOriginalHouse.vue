<template>
	<div>
    <h1 class="govuk-heading-xl">
      About the extension, improvement or alteration to the original house
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
            <input class="govuk-checkboxes__input" id="proposal-1" name="proposal" type="checkbox" value="extension_original_house_single_storey_extension" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-1">
              <strong>Single storey extension (including conservatory)</strong>
            </label>
          </div>


          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-2" name="proposal" type="checkbox" value="extension_original_house_two_storey_extension" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-2">
              <strong>Two storey extension</strong>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-3" name="proposal" type="checkbox" value="extension_original_house_part_single_part_two_storey_extension" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-3">
              <strong>Part single / Part two storey extension</strong>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-4" name="proposal" type="checkbox" value="extension_original_house_basement" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-4">
              <strong>Basement works (including light wells)</strong>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-5" name="proposal" type="checkbox" value="extension_original_house_roof_works" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-5">
              <strong>Roof works (including roof extensions)</strong>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-6" name="proposal" type="checkbox" value="extension_original_house_outbuilding" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-6">
              <strong>Outbuilding</strong>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-7" name="proposal" type="checkbox" value="extension_original_house_porch" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-7">
              <strong>Porch</strong>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-8" name="proposal" type="checkbox" value="extension_original_house_balcony_terrace" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-8">
              <strong>Balcony or terrace</strong>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-9" name="proposal" type="checkbox" value="extension_original_house_staircase" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-9">
              <strong>Installation of a staircase</strong>
            </label>
          </div>


          <div class="govuk-checkboxes__item" v-if="isInConservationArea">
            <input class="govuk-checkboxes__input" id="proposal-10" name="proposal" type="checkbox" value="extension_original_house_add_replacement_windows_doors" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-10">
              <strong>Addition and/or replacement of windows or doors, including bay windows</strong>
            </label>
          </div>

          <div class="govuk-checkboxes__item" v-if="isInConservationArea">
            <input class="govuk-checkboxes__input" id="proposal-11" name="proposal" type="checkbox" value="extension_original_house_cladding" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-11">
              <strong>Changing and/or adding cladding</strong>
            </label>
          </div>
  

        </div>
      </fieldset>
    </div>
		<v-cta name="Continue" :onClick="navigate"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';


export default {
	name: 'AboutChangesToOriginalHouse',
	components: {
    vCta
  },
  data () {
    return {
      selectedProposal: []
    }
  },
  methods: {
    updateNavigation () {
      var navigationInfo = {
        currentLevel: 'extension_original_house',
        selectedProposal: this.selectedProposal
      }

      this.$store.dispatch('updateFlow', JSON.parse(JSON.stringify(navigationInfo))).then(() => {

        var currentLevelInMap = this.$store.state.state.proposalFlow.findIndex(function(element) {
          return element.proposalId === 'extension_original_house';
        });

        console.log('----currentLevelInMap', currentLevelInMap);

        var currentLevelInfo = this.$store.state.state.proposalFlow[currentLevelInMap + 1];

        console.log('-----currentLevelInfo', currentLevelInfo);

        currentLevelInfo = JSON.parse(JSON.stringify(currentLevelInfo));

        router.push({ name: this.$store.state.state.proposalFlow[currentLevelInMap + 1].goTo[0], params: {currentLevelInfo }});
      });
    },

    navigate() {
      //this.collectDataAndStore();
      this.updateNavigation();
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