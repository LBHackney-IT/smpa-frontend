<template>
	<div>
    <h1 class="govuk-heading-xl">
      About car parking spaces
    </h1>
		<div class="govuk-form-group">
			<fieldset class="govuk-fieldset" aria-describedby="trees-question-1-hint">
				<legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
				<h2 class="govuk-heading-m">
					What is the net number of parking spaces available after the works have been completed?
				</h2>
				</legend>

        <div class="govuk-inset-text">
          The minimum dimensions for a car parking space are 2.4 x 4.8 metres. These dimensions are for standing space only and do not consider access or turning space. 
        </div>

        <div class="govuk-warning-text">
          <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
          <strong class="govuk-warning-text__text">
            <span class="govuk-warning-text__assistive">Warning</span>
            Please include garage spaces.
          </strong>
        </div>

				<div class="govuk-form-group">
          <label class="govuk-label" for="name">
            Current number of car parking spaces
          </label>
          <input class="govuk-input" id="name" name="name" type="number" v-model="current">
        </div>

        <div class="govuk-form-group">
          <label class="govuk-label" for="name">
            Total number of car parking spaces after completion
          </label>
          <input class="govuk-input" id="name" name="name" type="number" v-model="total">
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
import FreeDescription from '../../components/FreeDescription.vue';
import { getRouteAppId } from '../../mixins/getRouteAppId';

export default {
  name: 'CarParkingSpaces',
  mixins: [ getRouteAppId ],
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
      type: undefined,
      currentWorks: undefined,
      current: undefined,
      total: undefined
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
      this.type = this.$route.params.type;
      this.currentWorks = this.$route.params.currentLevelInfo;
    },
    navigate() {
      if (this.type === 'car-parking-spaces') {
        
        router.push({ name: 'EVChargingPoints', params: { type: this.type, currentLevelInfo: this.currentWorks } });

      } else if (this.type === 'cycle-parking-spaces' || this.type === 'car-and-bike-parking-spaces') {

        router.push({ name: 'BikeParkingSpaces', params: { type: this.type, currentLevelInfo: this.currentWorks } });

      } else {
        return;
      }
    },
    submit() {
      let payload = {
        "parking": {
          "current_car_parking_spaces": this.current,
          "planned_car_parking_spaces": this.total
        }
      };

      const extensionId = this.$store.getters.getExtensionId(this.applicationId);

      this.$store.dispatch('updateExtensionProposal', { "application_id": this.applicationId, 'selectedProposals': payload, "extension_id": extensionId }).then(() => {
        this.navigate();
      })
    }
  }

}
</script>