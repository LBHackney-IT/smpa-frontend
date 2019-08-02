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


    <v-map v-if="this.application" :geoJson="this.application.data.site_address.siteGeoJson"></v-map>

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
            <label class="govuk-label" for="doc-size">
              Select document size
            </label>

            <select class="govuk-select" id="doc-size" name="doc-size" v-model="size">
              <option disabled value="">Please select one</option>
              <option v-bind:key="index" v-for="(docSize, index) in this.documentSizes" v-bind:value="docSize.id">{{docSize.name}}</option>
            </select>

            <br><br>
            <label class="govuk-label" for="file-upload-1">
              Upload a location plan
            </label>
            <input class="govuk-file-upload" id="file-upload-1" name="file-upload-1" ref="locationPlan" type="file" v-on:change="handleFileUpload()">
          </div>
        </div>
			</fieldset>
		</div>

    <v-cta name="Continue" :onClick="submitFile"></v-cta>
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
import L from 'leaflet';
import vCta from '../../components/Cta.vue';
import vMap from '../../components/Map.vue';
import WarningMessage from '../../components/WarningMessage.vue';
import router from '../../router';
import { getRouteAppId } from '../../mixins/getRouteAppId';
import { getDocumentTypes } from '../../mixins/getDocumentTypes';
import { getDocumentSizes } from '../../mixins/getDocumentSizes';

export default {
  name: 'LocationPlan',
  mixins: [ getRouteAppId, getDocumentTypes, getDocumentSizes ],
	components: {
    vCta,
    WarningMessage,
    vMap
	},
	data () {
    return {
      useMapDisplayed: undefined,
      locationPlanMessage: 'You need to upload a new location map if your site affects the site boundary.',
      file: '',
      size: ''
    }
  },
	methods: {
    handleFileUpload(){
      this.file = this.$refs.locationPlan.files[0];
    },
    submitFile() {

      var docType = this.documentTypes.find(function(element) {
        return element.name === 'Location plan';
      });

      let payload = {};

      payload.document = this.file;
      payload.document_size_id = this.size;
      payload.application_id = this.applicationId;
      payload.proposed = docType.id;

      this.$store.dispatch('uploadDocument', payload).then((response) => {
        console.log('-----doc uploaded');
        this.navigate();
      })
    },
    navigate() {
      if (this.isInConservationArea) {
        router.push({ name: 'DocumentationDesignAccessStatement' });
      } else {
        router.push({ name: 'DocumentationAdditionalPlans' });
      }
    },
  },
  computed: {
    application () {
      let index = this.$store.state.state.applications.findIndex( application => application.data.id === this.applicationId );
			return this.$store.state.state.applications[index];
    },
    
    isInConservationArea () {
      return this.application.data.site_constraints.nb_conarea > 0;
    },

    siteGeoJson () {
      console.log('here', this.application.data.site_address.siteGeoJson);

      return this.application.data.site_address.siteGeoJson;
    }
	}
}
</script>