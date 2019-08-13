<template>
	<div>
    <h2 class="govuk-heading-xl">Heritage Statement</h2>
    <h4 class="govuk-heading-s">Upload an Heritage Statement</h4>

    <p>You are required to submit a Heritage Statement because your house is a listed building.</p>

    <details class="govuk-details">
      <summary class="govuk-details__summary">
        <span class="govuk-details__summary-text">
          What is in an Heritage Statement?
        </span>
      </summary>
      <div class="govuk-details__text">
        An Heritage Statement should cover:
        <ul>
          <li>A description of the heritage asset and its setting</li>
          <li>An assessment of its significance</li>
          <li>An explanation of the design concept for the proposed development</li>
          <li>A description of the impact</li>
        </ul>
      </div>
    </details>

    <div class="govuk-form-group" v-bind:class="{ 'govuk-form-group--error': error }">
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

      <span id="file-upload-1-error" class="govuk-error-message" v-if="error">
        <span class="govuk-visually-hidden">Error:</span> {{this.errorMessage}}
      </span>
      <input class="govuk-file-upload" id="file-upload-1" name="file-upload-1" ref="HeritageStatement" type="file" v-on:change="handleFileUpload()">

      <br><br>
      <div class="govuk-checkboxes">
        <div class="govuk-checkboxes__item">
          <input class="govuk-checkboxes__input" id="included" name="included" type="checkbox" value="true">
          <label class="govuk-label govuk-checkboxes__label" for="included">
            The Heritage Statement is included in another document
          </label>
        </div>
      </div>
    </div>

    <p class="govuk-heading-m" v-if="this.uploading">We're uploading your file. Once that is done you will be redirected.</p>


    <v-cta name="Continue" :onClick="submitFile"></v-cta>
    <br>
    <router-link :to="{ name: 'DocumentationAdditionalPlans' }">Continue without adding a file</router-link>

    <br><br><br><br>

	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';
import { getRouteAppId } from '../../mixins/getRouteAppId';
import { getDocumentTypes } from '../../mixins/getDocumentTypes';
import { getDocumentSizes } from '../../mixins/getDocumentSizes';

export default {
  name: 'HeritageStatement',
  mixins: [ getRouteAppId, getDocumentTypes, getDocumentSizes ],
	components: {
    vCta
	},
	data () {
    return {
      file: '',
      size: '',
      uploading: false,
      error: false,
      errorMessage: undefined,
    }
  },
	methods: {
    handleFileUpload(){
      this.file = this.$refs.HeritageStatement.files[0];
    },
    submitFile() {
      var docType = this.documentTypes.find(function(element) {
        return element.name === 'Heritage statement';
      });

      let payload = {};

      payload.document = this.file;
      payload.document_size_id = this.size;
      payload.application_id = this.applicationId;
      payload.proposed = docType.id;

      this.uploading = true;

      this.$store.dispatch('uploadDocument', payload).then((response) => {
        this.uploading = false;

        if (response.error) {
          this.error = true;
          this.errorMessage = 'Something went wrong while uploading your file. Try again.'
        } else {
          this.navigate();
        }
      })
    },
    navigate() {
      router.push({ name: 'DocumentationAdditionalPlans' });
    }
	}
}
</script>