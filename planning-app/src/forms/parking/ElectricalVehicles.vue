<template>
	<div>
    <h1 class="govuk-heading-xl">
      About electrical vehicles (EV) charging points
    </h1>
		<div class="govuk-form-group">
			<fieldset class="govuk-fieldset" aria-describedby="trees-question-1-hint">

        <div class="purpose-message">
          <strong>Purpose message</strong>. Explanation on what we are collecting this data. Reminder that this is not bidding
        </div>
				<legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h2 class="govuk-heading-m">
            Does the proposal involve electrical vehicle (EV) charging points?
          </h2>
				</legend>

				<div class="govuk-radios govuk-radios--inline">
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="bike-parking-space-1" name="bike-parking-space-1" type="radio" value="Yes" v-model="electricalVehical">
						<label class="govuk-label govuk-radios__label" for="bike-parking-space-1">
							Yes
						</label>
					</div>
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="bike-parking-space-2" name="bike-parking-space-2" type="radio" value="No" v-model="electricalVehical">
						<label class="govuk-label govuk-radios__label" for="bike-parking-space-2">
							No
						</label>
					</div>
				</div>

        <div class="govuk-inset-text" v-if="electricalVehical === 'Yes'">
          <div class="govuk-form-group">
            <label class="govuk-label" for="name">
              How many new EC charhing points are being added?
            </label>
            <input class="govuk-input" id="name" name="name" type="number">
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
import Navigate from '../../common/navigate';

export default {
	name: 'EVChargingPoints',
	components: {
    vCta
	},
	data () {
    return {
      electricalVehical: '',
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
    navigate() {
      var routerParams = Navigate.calculateNavigation(this.$store.state.state.proposalFlow, this.currentWorks, 'Parking');
      router.push(routerParams);
    }
  }

}
</script>