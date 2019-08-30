<template>
	<div>
    <h2 class="govuk-heading-xl">Design and Access Statement</h2>
    <h4 class="govuk-heading-m">Upload a Design and Access Statement</h4>

    <p>You are required to submit a Design and Access Statement because your site is in a conservation area and the floor area to be created is more than 100 sqm.</p>

    <details class="govuk-details">
      <summary class="govuk-details__summary">
        <span class="govuk-details__summary-text">
          What should a Design and Access Statement include?
        </span>
      </summary>
      <div class="govuk-details__text">
        <ul>
          <li>The design principles and concepts that have been applied to the development</li>
          <li>Demonstrate how the proposed developments context has influenced the design</li>
          <li>Explain the applicant’s approach to access and how relevant Local Plan policies have been taken into account</li>
          <li>Explain any consultation undertaken in relation to access issues, and how the outcome of this consultation has informed the proposed development</li>
          <li>Explain how any specific issues which might affect access to the proposed development have been addressed</li>
        </ul>
      </div>
    </details>

    <div class="govuk-form-group" v-bind:class="{ 'govuk-form-group--error': showErrorMessage }">
      <label class="govuk-label" for="doc-size">
        Select document size
      </label>

      <select class="govuk-select" id="doc-size" name="doc-size" v-model="size">
        <option disabled value="">Please select one</option>
        <option v-bind:key="index" v-for="(docSize, index) in this.documentSizes" v-bind:value="docSize.id">{{docSize.name}}</option>
      </select>
      <br><br>
      <label class="govuk-label" for="file-upload-1">
        Upload a file
      </label>

      <error-message v-if="showErrorMessage && !loading" :message="errorMessages.DOCUMENT_UPLOAD.GENERIC_ERROR"></error-message>

      <input class="govuk-file-upload" id="file-upload-1" name="file-upload-1" ref="DesignAndAccessStatement" type="file" v-on:change="handleFileUpload()">

      <br><br>

      <div class="govuk-checkboxes">
        <div class="govuk-checkboxes__item">
          <input class="govuk-checkboxes__input" id="included" name="included" type="checkbox" value="true">
          <label class="govuk-label govuk-checkboxes__label" for="included">
          The Design and Access Statement is included in another document
          </label>
        </div>
      </div>
    </div>

    <p class="govuk-heading-m" v-if="this.uploading">We're uploading your file. Once that is done you will be redirected.</p>


    <v-cta name="Continue" :onClick="submitFile"></v-cta>
    <br>
    <router-link :to="{ name: 'DocumentationHeritageStatement' }">Continue without adding a file</router-link>
    <br><br><br><br>

	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';
import { getRouteAppId } from '../../mixins/getRouteAppId';
import { getDocumentTypes } from '../../mixins/getDocumentTypes';
import { getDocumentSizes } from '../../mixins/getDocumentSizes';
import ErrorMessage from '../../components/ErrorMessage.vue';
import * as errorMessage from '../../messages/errorMessages';

export default {
  name: 'DesignAndAccessStatement',
  mixins: [ getRouteAppId, getDocumentTypes, getDocumentSizes ],
	components: {
    vCta,
    ErrorMessage
	},
	data () {
    return {
      file: '',
      size: '',
      uploading: false,
      showErrorMessage: false,
      errorMessages: undefined
    }
  },
  created () {
    this.errorMessages = errorMessage;
  },
	methods: {
    handleFileUpload(){
      this.file = this.$refs.DesignAndAccessStatement.files[0];
    },
    submitFile() {
      var docType = this.documentTypes.find(function(element) {
        return element.name === 'Design statement';
      });

      let payload = {};

      payload.document = this.file;

      if (payload.document === "") {
        this.navigate();
      } else {
        payload.document_size_id = this.size;
        payload.application_id = this.applicationId;
        payload.proposed = docType.id;

        this.uploading = true;

        this.$store.dispatch('uploadDocument', payload).then((response) => {
          this.uploading = false;

          if (response.error) {
            this.showErrorMessage = true;
          } else {
            this.navigate();
          }
        })
      }

    },

    navigate() {
      if (this.hasListedbuilding) {
        router.push({ name: 'DocumentationHeritageStatement' });
      } else {
        router.push({ name: 'DocumentationAdditionalPlans' });
      }
    }
  },
  computed: {
    application () {
      let index = this.$store.state.state.applications.findIndex( application => application.data.id === this.applicationId );
			return this.$store.state.state.applications[index];
    },
    
    hasListedbuilding () {
      return this.application.data.site_constraints.is_listed_building === "1";
    }
	}
}
</script>