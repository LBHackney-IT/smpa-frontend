<template>
	<div>
    <h2 class="govuk-heading-xl">Supporting documentation</h2>
    <h4 class="govuk-heading-m">Uploading aditional documents</h4>

    <p>You must submit enough documentation to understand your proposal, including information about the existing property. </p>
    
    <div class="govuk-warning-text">
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
    </div>

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
          <li>
            <strong>Roof plans</strong>
            <p>Roof plans are used to show the shape of the roof when development includes changes to its appearance and shape. You should show the position of all ridges, valleys, dormer windows, roof lights and other features, such as chimneys or raised parapets.</p>
          </li>
        </ul>
      </div>
    </details>

    <div class="purpose-message govuk-body">
      <p class="govuk-!-font-weight-bold">All supporting documentation must:</p>
      <ul>
        <li>Be A3 or smaller</li>
        <li>Have a scale 1:50 or 1:100</li>
        <li>Show the direction of North</li>
        <li>Have a visual scale bar showing 1m and 10m</li>
        <li>Display key dimensions of the proposal</li>
        <li>Show the position of all trees on the site, and those on adjacent land that could influence or be affected by the development</li>
      </ul>
    </div>

    <p class="govuk-!-font-size-36 govuk-!-font-weight-bold">This file include:</p>

    <span id="modal-hint" class="govuk-hint">
      Select all that apply
    </span>

    <div class="govuk-grid-row">
      <div class="govuk-grid-column-one-half">
        <p>Existing</p>
        <div class="govuk-checkboxes">
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="file-includes-1" name="file-includes-1" type="checkbox" value="site-layout-plan" v-model="fileIncludes" >
            <label class="govuk-label govuk-checkboxes__label" for="file-includes-1">
              Site layout plan
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="file-includes-2" name="file-includes-2" type="checkbox" value="existing-elevations" v-model="fileIncludes" >
            <label class="govuk-label govuk-checkboxes__label" for="file-includes-2">
              Elevations
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="file-includes-3" name="file-includes-3" type="checkbox" value="existing-floor-plans" v-model="fileIncludes" >
            <label class="govuk-label govuk-checkboxes__label" for="file-includes-3">
              Roof plans
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="file-includes-4" name="file-includes-4" type="checkbox" value="existing-sections" v-model="fileIncludes" >
            <label class="govuk-label govuk-checkboxes__label" for="file-includes-4">
              Floor plans
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="file-includes-5" name="file-includes-5" type="checkbox" value="other" v-model="fileIncludes" >
            <label class="govuk-label govuk-checkboxes__label" for="file-includes-5">
              Sections
            </label>
          </div>
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="file-includes-5" name="file-includes-5" type="checkbox" value="other" v-model="fileIncludes" >
            <label class="govuk-label govuk-checkboxes__label" for="file-includes-5">
              Other
            </label>
          </div>
        </div>
      </div>
      <div class="govuk-grid-column-one-half">
        <p>Proposed</p>
        <!-- if works already started changed to "consented" if works already finished "as built" -->
        <div class="govuk-checkboxes">
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="file-includes-1" name="file-includes-1" type="checkbox" value="site-layout-plan" v-model="fileIncludes" >
            <label class="govuk-label govuk-checkboxes__label" for="file-includes-1">
              Site layout plan
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="file-includes-2" name="file-includes-2" type="checkbox" value="existing-elevations" v-model="fileIncludes" >
            <label class="govuk-label govuk-checkboxes__label" for="file-includes-2">
              Elevations
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="file-includes-3" name="file-includes-3" type="checkbox" value="existing-floor-plans" v-model="fileIncludes" >
            <label class="govuk-label govuk-checkboxes__label" for="file-includes-3">
              Roof plans
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="file-includes-4" name="file-includes-4" type="checkbox" value="existing-sections" v-model="fileIncludes" >
            <label class="govuk-label govuk-checkboxes__label" for="file-includes-4">
              Floor plans
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="file-includes-5" name="file-includes-5" type="checkbox" value="other" v-model="fileIncludes" >
            <label class="govuk-label govuk-checkboxes__label" for="file-includes-5">
              Sections
            </label>
          </div>
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="file-includes-5" name="file-includes-5" type="checkbox" value="other" v-model="fileIncludes" >
            <label class="govuk-label govuk-checkboxes__label" for="file-includes-5">
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
      fileIncludes: undefined
    }
  },
	methods: {
    navigate() {
      router.push({ name: 'DocumentationDocsReview' });
    }
	}
}
</script>