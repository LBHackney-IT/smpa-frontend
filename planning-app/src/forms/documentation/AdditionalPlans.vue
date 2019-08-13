<template>
	<div>
    <h2 class="govuk-heading-xl">Supporting documents</h2>
    
    <div class="purpose-message govuk-body">
      <p class="govuk-!-font-weight-bold">All supporting documentation must:</p>
      <ul>
        <li>Be A3 or smaller</li>
        <li>Have a scale 1:50 or 1:100</li>
        <li>Show the direction of north</li>
        <li>Have a visual scale bar showing 1m and 10m</li>
        <li>Display key dimensions of the proposal</li>
        <li>Show the position of all trees on the site, and those on adjacent land that could influence or be affected by the proposed works</li>
      </ul>
    </div>

    <h4 class="govuk-heading-m">Uploading aditional documents</h4>

    <p>You must submit enough documentation to understand your proposal, including information about the existing property. </p>


    <details class="govuk-details">
      <summary class="govuk-details__summary">
        <span class="govuk-details__summary-text">
          What documents do I need to submit?
        </span>
      </summary>
      <div class="govuk-details__text">
        You must submit the following drawings:
        <ul>
          <li><strong>Site layout plan</strong></li>
          <li><strong>Block plan</strong></li>
          <li>
            <strong>Existing and proposed elevations</strong>
            <p>The purpose of an elevation drawing is to show clearly the proposed works in relation to what is already there and the relationship between the buildings in close proximity, detailing the positions of the openings on each property.
You can also show the proposed building materials and the style, materials and finish of windows and doors.
You should include elevations for all sides of the proposal.</p>
          </li>
          <li>
            <strong>Floor plan</strong>
            <p>Floor plans must explain the proposal in detail, showing details of the existing building(s) as well as those for the proposed development, including (if any) all existing walls to be demolished.</p>
          </li>
           <li>
            <strong>Roof plans</strong>
            <p>Roof plans are used to show the shape of the roof when development includes changes to its appearance and shape. You should show the position of all ridges, valleys, dormer windows, roof lights and other features, such as chimneys or raised parapets.</p>
          </li>
        </ul>
      </div>
    </details>

    <div class="govuk-warning-text">
      <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
      <strong class="govuk-warning-text__text">
        <span class="govuk-warning-text__assistive">Warning</span>
        You must upload single page documents only
      </strong>
    </div> 
    
    <!-- <div class="govuk-warning-text">
      <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
      <strong class="govuk-warning-text__text">
        <span class="govuk-warning-text__assistive">Warning</span>
        You can’t upload multiples files at a time
      </strong>
    </div>

    <div class="govuk-warning-text">
      <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
      <strong class="govuk-warning-text__text">
        <span class="govuk-warning-text__assistive">Warning</span>
        You can’t upload one single document with all the files in it.
      </strong>
    </div> -->
    <p>
      Select what this document includes.
    </p>

    <span id="modal-hint" class="govuk-hint">
      Select all that apply.
    </span>

    <div class="govuk-grid-row">
      <div class="govuk-grid-column-one-half">
        <p class="govuk-body govuk-!-font-weight-bold">Existing</p>
        <div class="govuk-checkboxes">
          <div class="govuk-checkboxes__item" v-bind:key="option.id + '-existing'" v-for="option in this.documentTypes">
            <input class="govuk-checkboxes__input" v-bind:id="option.id + '-existing'" name="existing-proposal" type="checkbox" v-bind:value="option.id" v-model="existingFile">
            <label class="govuk-label govuk-checkboxes__label" v-bind:for="option.id + '-existing'">
              {{option.name}}
            </label>
          </div>
        </div>
      </div>
      <div class="govuk-grid-column-one-half">
        <p class="govuk-body govuk-!-font-weight-bold">Proposed</p>
        <!-- todo if works already started changed to "consented" if works already finished "as built" -->
        <div class="govuk-checkboxes">
          <div class="govuk-checkboxes__item" v-bind:key="option.id + '-proposed'" v-for="option in this.documentTypes">
            <input class="govuk-checkboxes__input" v-bind:id="option.id + '-proposed'" name="proposal" type="checkbox" v-bind:value="option.id" v-model="proposedFile">
            <label class="govuk-label govuk-checkboxes__label" v-bind:for="option.id + '-proposed'">
              {{option.name}}
            </label>
          </div>
        </div>
      </div>
    </div>

    <br><br><br>

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
      <input class="govuk-file-upload" id="file-upload-1" name="file-upload-1" ref="AdditionalPlans" type="file" v-on:change="handleFileUpload()">
    </div>

    <v-cta name="Upload file" :onClick="submitFile"></v-cta>

    <p class="govuk-heading-m" v-if="this.uploading">We're uploading your file. The list bellow will be updated.</p>

    <h3 class="govuk-heading-m">List of additional plans that you uploaded</h3>

    <p>You uploaded a total of {{this.additionalPlans.length}}.</p>

    <ul class="govuk-list govuk-list--bullet" v-if="this.additionalPlans.length > 0">
      <li v-for="(item, index) in this.additionalPlans" v-bind:key="index">{{item.original_name}}</li>
    </ul>

    <v-cta name="Continue" :onClick="navigate"></v-cta>
    <br>
    <router-link :to="{ name: 'DocumentationDocsReview' }">Continue without adding a file</router-link>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import Modal from '../../components/form/DocumentsCheckModal.vue';
import router from '../../router';
import { getRouteAppId } from '../../mixins/getRouteAppId';
import { getDocumentTypes } from '../../mixins/getDocumentTypes';
import { getDocumentSizes } from '../../mixins/getDocumentSizes';

export default {
  name: 'AdditionalPlans',
  mixins: [ getRouteAppId, getDocumentTypes, getDocumentSizes ],
	components: {
    vCta,
    Modal
	},
	data () {
    return {
      showModal: false,
      file: '',
      size: '',
      existingFile: [],
      proposedFile: [],
      uploading: false,
      error: false,
      errorMessage: undefined,
      additionalPlans: []
    }
  },
	methods: {
    handleFileUpload(){
      this.file = this.$refs.AdditionalPlans.files[0];
    },
    submitFile() {
      let payload = {};

      payload.document = this.file;
      payload.document_size_id = this.size;
      payload.application_id = this.applicationId;
      payload.proposed = this.proposedFile.join();
      payload.existing = this.existingFile.join();

      this.uploading = true;

      this.$store.dispatch('uploadDocument', payload).then((response) => {
        this.uploading = false;

        if (response.error) {
          this.error = true;
          this.errorMessage = 'Something went wrong while uploading your file. Try again.'
        } else {
          this.additionalPlans.push(response.data);
        }
        
      })
    },
    navigate() {
      router.push({ name: 'DocumentationDocsReview' });
    }
	}
}
</script>