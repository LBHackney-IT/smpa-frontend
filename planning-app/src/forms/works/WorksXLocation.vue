<template>
	<div>
    <h1 class="govuk-heading-xl">
      About the {{ currentWorks.proposalName }}
    </h1>
		<div class="govuk-form-group">
      <fieldset class="govuk-fieldset" aria-describedby="proposal-hint">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h2 class="govuk-heading-m">
            Where are the proposed works located in relation to the original house?
          </h2>
        </legend>

        <span id="proposal-hint" class="govuk-hint">
          Select all that apply.
        </span>

        <div class="govuk-checkboxes">
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-1" name="proposal" type="checkbox" value="Rear" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-1">
              <strong>Rear</strong>
            </label>
          </div>


          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-2" name="proposal" type="checkbox" value="Side" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-2">
              <strong>Side</strong>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-3" name="proposal" type="checkbox" value="Front" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-3">
              <strong>Front</strong>
            </label>
          </div>

          <div class="govuk-checkboxes__item" v-if="this.currentWorks.proposalId === 'extension_original_house_single_storey_extension' || this.currentWorks.proposalId === 'extension_original_house_two_storey_extension' || this.currentWorks.proposalId === 'extension_original_house_part_single_part_two_storey_extension'">
            <input class="govuk-checkboxes__input" id="proposal-4" name="proposal" type="checkbox" value="Wrap-around" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-4">
              <strong>Rear / side wrap-around</strong>
            </label>
          </div>
        </div>
      </fieldset>
    </div>
    <free-description></free-description>
		<v-cta name="Continue" :onClick="navigate"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';
import Navigate from '../../common/navigate';
import FreeDescription from '../../components/FreeDescription.vue';


export default {
	name: 'WorksXLocation',
	components: {
    vCta,
    FreeDescription
  },
  data () {
    return {
      selectedProposal: [],
      currentWorks: undefined
    }
  },
  created () {
    this.fetchData();
  },
  watch: {
    '$route': 'fetchData'
  },
	methods: {
    fetchData () {
      this.selectedProposal = [];
      this.currentWorks = this.$route.params.currentLevelInfo;
    },
    navigate() {
      var routerParams = Navigate.calculateNavigation(this.$store.state.state.proposalFlow, this.currentWorks, 'WorksXLocation');
      router.push(routerParams);
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