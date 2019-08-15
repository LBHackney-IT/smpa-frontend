<template>
	<div>
    <h1 class="govuk-heading-xl">
      About bike parking spaces
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
            Current number of bike parking spaces
          </label>
          <input class="govuk-input" id="name" name="name" type="number" v-model="current">
        </div>

        <div class="govuk-form-group">
          <label class="govuk-label" for="name">
            Total number of bike parking spaces after completion
          </label>
          <input class="govuk-input" id="name" name="name" type="number" v-model="total">
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
import Navigate from '../../common/navigate';
import FreeDescription from '../../components/FreeDescription.vue';
import { getRouteAppId } from '../../mixins/getRouteAppId';

export default {
  name: 'BikeParkingSpaces',
  mixins: [ getRouteAppId ],
	components: {
    vCta,
    FreeDescription
	},
	data () {
    return {
      alterationToAccess: '',
      typeOfAlteration: '',
      currentWorks: undefined,
      type: undefined,
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
      this.currentWorks = this.$route.params.currentLevelInfo;
      this.type = this.$route.params.type;
    },
    navigate() {
      if (this.type === '8033164a-49e1-47db-810e-b0cac4ecd84b') {
        router.push({ name: 'EVChargingPoints', params: { type: this.type, currentLevelInfo: this.currentWorks } });
      } else {
        var routerParams = Navigate.calculateNavigation(this.$store.state.state.proposalFlow, this.currentWorks, 'Parking');
        router.push(routerParams);
      }
    },
    submit() {
      let currentData = this.application.data.proposal_extension.parking;

      if (this.current) {
        currentData.current_bike_parking_spaces = parseInt(this.current);
      } else {
        currentData.current_bike_parking_spaces = 0;
      }

      if (this.total) {
        currentData.planned_bike_parking_spaces = parseInt(this.total);
      } else {
        currentData.planned_bike_parking_spaces = 0;
      }

      let payload = {
        parking: {}
      };

      payload.parking = currentData;

      const extensionId = this.$store.getters.getExtensionId(this.applicationId);

      this.$store.dispatch('updateExtensionProposal', { "application_id": this.applicationId, 'selectedProposals': payload, "extension_id": extensionId }).then(() => {
        this.navigate();
      })
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