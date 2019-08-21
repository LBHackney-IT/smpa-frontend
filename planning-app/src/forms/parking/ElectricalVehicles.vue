<template>
	<div>
    <h1 class="govuk-heading-xl">
      About electrical vehicles charging points
    </h1>
		<div class="govuk-form-group">
			<fieldset class="govuk-fieldset" aria-describedby="trees-question-1-hint">

        <div class="purpose-message govuk-body">
          This data is being collected to inform and monitor London wide development. Your responses will not influence the decision making process.
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
              How many new EC charging points are being added?
            </label>
            <input class="govuk-input" id="name" name="name" type="number" v-model="chargingPoints">
          </div>
        </div>

			</fieldset>
		</div>
    <free-description></free-description>

    <error-message v-if="showErrorMessage && !loading" :message="errorMessages.PARKING.GENERIC_ERROR"></error-message>

		<v-cta name="Continue" :onClick="submit"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';
import Navigate from '../../common/navigate';
import FreeDescription from '../../components/FreeDescription.vue';
import { getRouteAppId } from '../../mixins/getRouteAppId';
import ErrorMessage from '../../components/ErrorMessage.vue';
import * as errorMessage from '../../messages/errorMessages';

export default {
  name: 'EVChargingPoints',
  mixins: [ getRouteAppId ],
	components: {
    vCta,
    FreeDescription,
    ErrorMessage
	},
	data () {
    return {
      electricalVehical: '',
      currentWorks: undefined,
      chargingPoints: undefined,
      showErrorMessage: false,
      errorMessages: undefined
    }
  },
  created () {
    this.fetchData();
    this.errorMessages = errorMessage;
  },
  watch: {
    '$route': 'fetchData',
    application () {
			this.loadExistingAnswers();
		}
  },
  methods: {
    checkAnswers () {
      if (this.application.data.proposal_extension.parking) {
        if (this.chargingPoints === this.application.data.proposal_extension.parking.new_ev_charging_points) {
          this.navigate();
        } else {
          this.submit();
        }
      }
      
    },
    loadExistingAnswers () {
      if (this.application.data.proposal_extension.parking) {
        this.electricalVehical = this.application.data.proposal_extension.parking.new_ev_charging_points ? "Yes" : "No"; 
        this.chargingPoints = this.application.data.proposal_extension.parking.new_ev_charging_points;
      }
		},
    fetchData () {
      this.currentWorks = this.$route.params.currentLevelInfo;
    },
    submit() {


      let currentData = this.application.data.proposal_extension.parking;

      if (this.electricalVehical === "Yes") {
        currentData.new_ev_charging_points = parseInt(this.chargingPoints);
      } else {
        currentData.new_ev_charging_points = 0;
      }

      let payload = {
        parking: {}
      };

      payload.parking = currentData;

      const extensionId = this.$store.getters.getExtensionId(this.applicationId);

      this.$store.dispatch('updateExtensionProposal', { 
        "application_id": this.applicationId, 
        'selectedProposals': payload, 
        "extension_id": extensionId 
      }).then((response) => {
        if (response.error) {
          this.showErrorMessage = true;
          return;
        } else {
          this.navigate();
        }
      })
   
    },
    navigate() {
      var routerParams = Navigate.calculateNavigation(this.$store.state.state.proposalFlow, this.currentWorks, 'Parking');
      router.push(routerParams);
    }
  },
  computed: {
    application () {
      let index = this.$store.state.state.applications.findIndex( application => application.data.id === this.applicationId );
			return this.$store.state.state.applications[index];
    }
	}

}
</script>