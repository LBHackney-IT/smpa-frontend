<template>
	<div>
    <h1 class="govuk-heading-xl">
      Location plan
    </h1>
    <h2 class="govuk-heading-l govuk-!-font-size-24">Upload a location plan</h2>

    <div class="govuk-warning-text">
      <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
      <strong class="govuk-warning-text__text">
      <span class="govuk-warning-text__assistive">Warning</span>
        You are required to upload a new location plan if your proposal affects the site boundary or there are significant changes to the layout of the site.
      </strong>
    </div>
    <!-- <warning-message :message="locationPlanMessage" v-bind:typeAlert="false"></warning-message> -->


    <p class=" govuk-!-font-size-19">This is the location plan we currently hold about the selected address:</p>

    <div v-if="hasPostcode" class="govuk-!-margin-bottom-9">
      <img class="location" v-if="hasPostcode === 'N16 8ED'" src="../../assets/img/not_conservation_area.png" alt="Map view of the site" />
      <img class="location" v-if="hasPostcode === 'E8 3HW'" src="../../assets/img/conservation_area.png" alt="Map view of the site" />
    </div>

    <div class="govuk-form-group">
      <span id="proposal-hint" class="govuk-hint">
          Select one
      </span>
			<fieldset class="govuk-fieldset" aria-describedby="location-map-hint">
				<div class="govuk-radios govuk-radios--inline">
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="location-map-1" name="location-map" type="radio" value="Yes" v-model="useMapDisplayed">
						<label class="govuk-label govuk-radios__label" for="location-map-1">
							The location plan above reflects your proposed works
						</label>
					</div>
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="location-map-2" name="location-map" type="radio" value="No" v-model="useMapDisplayed">
						<label class="govuk-label govuk-radios__label" for="location-map-2">
							Upload your new location plan
						</label>
					</div>
				</div>
        <div class="govuk-inset-text" v-if="useMapDisplayed === 'No'">
          <div class="govuk-form-group">
            <label class="govuk-label" for="file-upload-1">
              Upload a location plan
            </label>
            <input class="govuk-file-upload" id="file-upload-1" name="file-upload-1" type="file">
          </div>
        </div>
			</fieldset>
		</div>

    <v-cta name="Continue" :onClick="navigate"></v-cta>
    <br>

    <router-link v-if="isInConservationArea" :to="{ name: 'DocumentationDesignAccessStatement' }">Continue without adding a file</router-link>
    <router-link v-if="!isInConservationArea" :to="{ name: 'DocumentationAdditionalPlans' }">Continue without adding a file</router-link>
    
    <br><br><br><br><br><br>
    
    <details class="govuk-details">
      <summary class="govuk-details__summary">
        <span class="govuk-details__summary-text">
          What is on a location plan?
        </span>
      </summary>
      <div class="govuk-details__text">
        A location plan should be based on an up-to-date OS map. A location plan should show roads and/or buildings on adjoining land to ensure that the exact location of the application site is clear. The application site should be edged clearly with a red line including all land necessary to carry out the proposed development.
      </div>
    </details>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import WarningMessage from '../../components/WarningMessage.vue';
import router from '../../router';
export default {
	name: 'LocationPlan',
	components: {
    vCta,
    WarningMessage
	},
	data () {
    return {
      useMapDisplayed: undefined,
      locationPlanMessage: 'You need to upload a new location map if your site affects the site boundary.'
    }
  },
	methods: {
    navigate() {
      if (this.isInConservationArea) {
        router.push({ name: 'DocumentationDesignAccessStatement' });
      } else {
        router.push({ name: 'DocumentationAdditionalPlans' });
      }
    }
  },
  computed: {
		hasPostcode () {
      if (this.$store.state.site && this.$store.state.site.address && this.$store.state.site.address.result && this.$store.state.site.address.result.postcode) {
        return this.$store.state.site.address.result.postcode;
      } else {
        return false;
      }
    },
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