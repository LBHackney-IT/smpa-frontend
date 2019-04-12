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
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="existing-1" name="existing-1" type="checkbox" value="existing-1" v-model="fileIncludes" >
            <label class="govuk-label govuk-checkboxes__label" for="existing-1">
              Site layout plan
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="existing-2" name="existing-2" type="checkbox" value="existing-2" v-model="fileIncludes" >
            <label class="govuk-label govuk-checkboxes__label" for="existing-2">
              Elevations
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="existing-3" name="existing-3" type="checkbox" value="existing-3" v-model="fileIncludes" >
            <label class="govuk-label govuk-checkboxes__label" for="existing-3">
              Roof plans
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="existing-4" name="existing-4" type="checkbox" value="existing-4" v-model="fileIncludes" >
            <label class="govuk-label govuk-checkboxes__label" for="existing-4">
              Floor plans
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="existing-5" name="existing-5" type="checkbox" value="existing-5" v-model="fileIncludes" >
            <label class="govuk-label govuk-checkboxes__label" for="existing-5">
              Sections
            </label>
          </div>
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="existing-6" name="existing-6" type="checkbox" value="existing-6" v-model="fileIncludes" >
            <label class="govuk-label govuk-checkboxes__label" for="existing-6">
              Other
            </label>
          </div>
        </div>
      </div>
      <div class="govuk-grid-column-one-half">
        <p class="govuk-body govuk-!-font-weight-bold">Proposed</p>
        <!-- if works already started changed to "consented" if works already finished "as built" -->
        <div class="govuk-checkboxes">
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposed-1" name="proposed-1" type="checkbox" value="proposed-1" v-model="fileIncludes" >
            <label class="govuk-label govuk-checkboxes__label" for="proposed-1">
              Site layout plan
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposed-2" name="proposed-2" type="checkbox" value="proposed-2" v-model="fileIncludes" >
            <label class="govuk-label govuk-checkboxes__label" for="proposed-2">
              Elevations
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposed-3" name="proposed-3" type="checkbox" value="proposed-3" v-model="fileIncludes" >
            <label class="govuk-label govuk-checkboxes__label" for="proposed-3">
              Roof plans
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposed-4" name="proposed-4" type="checkbox" value="proposed-4" v-model="fileIncludes" >
            <label class="govuk-label govuk-checkboxes__label" for="proposed-4">
              Floor plans
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposed-5" name="proposed-5" type="checkbox" value="proposed-5" v-model="fileIncludes" >
            <label class="govuk-label govuk-checkboxes__label" for="proposed-5">
              Sections
            </label>
          </div>
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposed-6" name="proposed-6" type="checkbox" value="proposed-6" v-model="fileIncludes" >
            <label class="govuk-label govuk-checkboxes__label" for="proposed-6">
              Other
            </label>
          </div>
        </div>
      </div>
    </div>

    <br><br><br>

    <div class="govuk-form-group">
      <label class="govuk-label" for="file-upload-1">
        Upload a file
      </label>
      <input class="govuk-file-upload" id="file-upload-1" name="file-upload-1" type="file">
    </div>

    <!-- <button type="button" class="govuk-button" @click="showModal = true">Add a file</button><br>

    <modal v-if="showModal" @close="showModal = false"></modal> -->

    <v-cta name="Continue" :onClick="navigate"></v-cta>
    <br>
    <router-link :to="{ name: 'DocumentationDocsReview' }">Continue without adding a file</router-link>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import Modal from '../../components/form/DocumentsCheckModal.vue';
import router from '../../router';

export default {
	name: 'AdditionalPlans',
	components: {
    vCta,
    Modal
	},
	data () {
    return {
      showModal: false,
      fileIncludes: []
    }
  },
	methods: {
    navigate() {
      router.push({ name: 'DocumentationDocsReview' });
    }
	}
}
</script>