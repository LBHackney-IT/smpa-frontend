<template>
	<div>
    <h2 class="govuk-heading-l">Design and Access Statement</h2>
    <h4 class="govuk-heading-s">Add design and access statement</h4>

    <p>You are required to submit a Design in Access statement because your site is in a conservation area and is over 100sq.m.</p>

    <details class="govuk-details">
      <summary class="govuk-details__summary">
        <span class="govuk-details__summary-text">
          What is in a Design and Access statement?
        </span>
      </summary>
      <div class="govuk-details__text">
        A DAS must explain:
        <ul>
          <li>The design principles and concepts that have been applied to the development</li>
          <li>Demonstrate how the proposed developments context has influenced the design</li>
          <li>Explain the applicant’s approach to access and how relevant Local Plan policies have been taken into account</li>
          <li>Explain any consultation undertaken in relation to access issues, and how the outcome of this consultation has informed the proposed development</li>
          <li>Explain how any specific issues which might affect access to the proposed development have been addressed</li>
        </ul>
      </div>
    </details>

    <div class="govuk-form-group">
      <label class="govuk-label" for="file-upload-1">
        Upload a file
      </label>
      <input class="govuk-file-upload" id="file-upload-1" name="file-upload-1" type="file">
    </div>

    <v-cta name="Next" :onClick="navigate"></v-cta>
    <br>
    <router-link :to="{ name: 'DocumentationHeritageStatement' }">Continue without adding a file</router-link>
	</div>
</template>

<script>
import vCta from '../../components/form-elements/Cta.vue';
import router from '../../router';

export default {
	name: 'DesignAndAccessStatement',
	components: {
    vCta
	},
	data () {
    return {}
  },
	methods: {
    navigate() {
      router.push({ name: 'DocumentationHeritageStatement' });
    }
	}
}
</script>