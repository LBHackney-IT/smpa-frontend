<template>
	<div>
    <h1 class="govuk-heading-xl">
      About the {{ type }}
    </h1>
		<div class="govuk-form-group">
      <fieldset class="govuk-fieldset" aria-describedby="proposal-hint">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h2 class="govuk-heading-m">
            Would the proposed works affect access to the site for vehicles, cycles, and/or pedestrians?
          </h2>
        </legend>

        <span id="proposal-hint" class="govuk-hint">
          Select all that apply.
        </span>

        <div class="govuk-checkboxes">
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-1" name="proposal" type="checkbox" value="Addition of a new entrance" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-1">
              <strong>Addition of a new entrance</strong>
            </label>
          </div>


          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-2" name="proposal" type="checkbox" value="Removal of an entrance" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-2">
              <strong>Removal of an entrance</strong>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-3" name="proposal" type="checkbox" value="Improve disabled access" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-3">
              <strong>Improve disabled access</strong>
            </label>
          </div>

          <div class="govuk-checkboxes__item" v-if="this.type === 'vehicle' || this.type === 'both'">
            <input class="govuk-checkboxes__input" id="proposal-4" name="proposal" type="checkbox" value="Improve disabled access" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-4">
              <strong>Dropped kerb and formation of vehicular access</strong>
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
	name: 'MoreAboutAccess',
	components: {
    vCta,
    FreeDescription
  },
  data () {
    return {
      selectedProposal: [],
      type: undefined,
      typeOfAlteration: undefined,
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
      this.type = this.$route.params.type;
      this.currentWorks = this.$route.params.currentLevelInfo;
    },
    navigate() {
      var routerParams = Navigate.calculateNavigation(this.$store.state.state.proposalFlow, this.currentWorks, 'MoreAboutAccess');
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