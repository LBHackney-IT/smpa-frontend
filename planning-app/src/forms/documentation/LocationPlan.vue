<template>
	<div>
    <h2 class="govuk-heading-l">Location plan</h2>
    <h4 class="govuk-heading-s">Add location plan</h4>
    <warning-message :message="locationPlanMessage" v-bind:typeAlert="false"></warning-message>

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

    <div class="govuk-form-group">
			<fieldset class="govuk-fieldset" aria-describedby="location-map-hint">
				<div class="govuk-radios govuk-radios--inline">
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="location-map-1" name="location-map" type="radio" value="Yes" v-model="useMapDisplayed">
						<label class="govuk-label govuk-radios__label" for="location-map-1">
							Use map displayed as location map
						</label>
					</div>
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="location-map-2" name="location-map" type="radio" value="No" v-model="useMapDisplayed">
						<label class="govuk-label govuk-radios__label" for="location-map-2">
							Upload location map
						</label>
					</div>
				</div>
        <div class="govuk-inset-text" v-if="useMapDisplayed === 'No'">
          <div class="govuk-form-group">
            <label class="govuk-label" for="file-upload-1">
              Add a location plan
            </label>
            <input class="govuk-file-upload" id="file-upload-1" name="file-upload-1" type="file">
          </div>
        </div>
			</fieldset>
		</div>

    <v-cta name="Next" :onClick="navigate"></v-cta>
    <br>
    <router-link :to="{ name: 'DocumentationDesignAccessStatement' }">Continue without adding a file</router-link>
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
      router.push({ name: 'DocumentationDesignAccessStatement' });
    }
	}
}
</script>