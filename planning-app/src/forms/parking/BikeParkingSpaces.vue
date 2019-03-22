<template>
	<div>
    <h1 class="govuk-heading-xl">
      About adding or removing bike parking spaces
    </h1>
		<div class="govuk-form-group">
			<fieldset class="govuk-fieldset" aria-describedby="trees-question-1-hint">
				<legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
				<h2 class="govuk-heading-m">
					What is the net number of parking spaces available after the works have been completed?
				</h2>
				</legend>

				<div class="govuk-form-group">
          <label class="govuk-label" for="name">
            Current number of bike parking spaces.
          </label>
          <input class="govuk-input" id="name" name="name" type="number">
        </div>

        <div class="govuk-form-group">
          <label class="govuk-label" for="name">
            Total number of bike parking spaces after completion.
          </label>
          <input class="govuk-input" id="name" name="name" type="number">
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
import WarningMessage from '../../components/WarningMessage.vue';
import Navigate from '../../common/navigate';
import FreeDescription from '../../components/FreeDescription.vue';

export default {
	name: 'BikeParkingSpaces',
	components: {
    vCta,
    WarningMessage,
    FreeDescription
	},
	data () {
    return {
      alterationToAccess: '',
      typeOfAlteration: '',
      warningMessage: 'Any public footpath that crosses or adjoins the site, or is affected, must be shown clearly on the plans. This includes any proposals that may require a closure or diversion.',
      currentWorks: undefined,
      type: undefined
    }
  },
  computed: {
		hasAlterationToAccess () {
			return this.alterationToAccess === 'Yes';
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
      this.type = this.$route.params.type;
    },
    navigate() {
      if (this.type === 'car-and-bike-parking-spaces') {
        router.push({ name: 'EVChargingPoints', params: { type: this.type, currentLevelInfo: this.currentWorks } });
      } else {
        var routerParams = Navigate.calculateNavigation(this.$store.state.state.proposalFlow, this.currentWorks, 'Parking');
        router.push(routerParams);
      }
    }
  }

}
</script>