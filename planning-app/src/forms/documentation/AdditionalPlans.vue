<template>
	<div>
    <h2 class="govuk-heading-l">Additional Plans</h2>
    <h4 class="govuk-heading-s">Add any additional plans relevant to your proposal</h4>

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
          <li>
            <strong>Roof plans</strong>
            <p>Roof plans are used to show the shape of the roof when development includes changes to its appearance and shape. You should show the position of all ridges, valleys, dormer windows, roof lights and other features, such as chimneys or raised parapets.</p>
          </li>
        </ul>
      </div>
    </details>

    <div class="govuk-inset-text warning-message alert">
      <div class="govuk-warning-text">
        <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
        <div class="govuk-warning-text__text">
          <span class="govuk-warning-text__assistive">Warning</span>
          <p>All supporting documentation must:</p>
          <ul>
            <li>Be A3 or smaller</li>
            <li>Have a scale 1:50 or 1:100</li>
            <li>Show the direction of North</li>
            <li>Have a visual scale bar showing 1m and 10m</li>
            <li>Display key dimensions of the proposal</li>
            <li>Show the position of all trees on the site, and those on adjacent land that could influence or be affected by the development</li>
          </ul>
        </div>
      </div>
    </div>


    <button type="button" class="govuk-button" @click="showModal = true">Add a file</button><br>

    <modal v-if="showModal" @close="showModal = false"></modal>

    <v-cta name="Next" :onClick="navigate"></v-cta>
    <br>
    <router-link :to="{ name: 'DocumentationHeritageStatement' }">Continue without adding a file</router-link>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import WarningMessage from '../../components/WarningMessage.vue';
import Modal from '../../components/form/DocumentsCheckModal.vue';
import router from '../../router';

export default {
	name: 'AdditionalPlans',
	components: {
    vCta,
    WarningMessage,
    Modal
	},
	data () {
    return {
      showModal: false
    }
  },
	methods: {
    navigate() {
      router.push({ name: 'DocumentationDocsReview' });
    }
	}
}
</script>