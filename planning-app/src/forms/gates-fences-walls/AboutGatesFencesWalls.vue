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
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-1" name="proposal" type="checkbox" value="Addition of a new entrance" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-1">
              <strong>Addition of a new gate</strong>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-4" name="proposal" type="checkbox" value="Removal of an entrance" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-4">
              <strong>Removal of a gate</strong>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-7" name="proposal" type="checkbox" value="Replacement and/or repair of wall" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-7">
              <strong>Replacement and/or repair of any boundary treatment</strong>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-7" name="proposal" type="checkbox" value="Replacement and/or repair of pillar caps" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-7">
              <strong>Replacement and/or repair of pillar caps </strong>
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
	name: 'AboutGatesFencesWalls',
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
      var routerParams = Navigate.calculateNavigation(this.$store.state.state.proposalFlow, this.currentWorks, 'GatesFencesWalls');
      router.push(routerParams);
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