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

          Do not show in basements
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-4" name="proposal" type="checkbox" value="Wrap-around" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-4">
              <strong>Rear / side wrap-around</strong>
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
	name: 'WorksXLocation',
	components: {
    vCta
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
      this.currentWorks = this.$route.params.currentLevelInfo;
    },
    calculateNavigation () {
      console.log('CURRENT LEVEL IN MAP ---- CONTENT', this.$store.state.state.proposalFlow);

      console.log('-----currentLevelInfo', this.currentWorks);

      if (this.currentWorks.goTo.length > 1) {
        //find WorksXLocation in the current level
        var WorksXLocationIndex = this.currentWorks.goTo.findIndex(function(element) {
          return element === 'WorksXLocation';
        });
        
        router.push({ name: this.currentWorks.goTo[WorksXLocationIndex + 1], params: {currentLevelInfo: this.currentWorks }});

      } else {
        //check if it is the last item inside current flow.

        var currentWorkIndexInFlow = this.$store.state.state.proposalFlow.findIndex(element => 
          element.proposalId === this.currentWorks.proposalId
        );

        if (this.$store.state.state.proposalFlow.length === currentWorkIndexInFlow) {
          //go to trees
          console.log('---WorksXLocation-------GO TO TREES');
        } else {
          //todo maybe fix this check WorksData.vue
          router.push({ name: this.$store.state.state.proposalFlow[currentWorkIndexInFlow + 1].goTo[0], params: {currentLevelInfo: this.currentWorks, id: this.currentWorks.proposalId }});
        }
      }
    },
    navigate() {
      this.calculateNavigation();
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