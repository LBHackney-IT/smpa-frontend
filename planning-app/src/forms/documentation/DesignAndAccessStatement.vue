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

    <div class="govuk-form-group">
      <label class="govuk-label" for="file-upload-1">
        Upload a file
      </label>
      <input class="govuk-file-upload" id="file-upload-1" name="file-upload-1" type="file">

      <br><br>
      <div class="govuk-checkboxes">
        <div class="govuk-checkboxes__item">
          <input class="govuk-checkboxes__input" id="waste-1" name="waste" type="checkbox" value="carcasses">
          <label class="govuk-label govuk-checkboxes__label" for="waste-1">
            The Design and Access Statement is included in another document
          </label>
        </div>
      </div>
    </div>

    <v-cta name="Continue" :onClick="navigate"></v-cta>
    <br>
    <router-link :to="{ name: 'DocumentationHeritageStatement' }">Continue without adding a file</router-link>
    <br><br><br><br>

	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
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

      if (this.$store.state.site.siteConstraints.listedBuilding) {
        router.push({ name: 'DocumentationHeritageStatement' });
      } else {
        router.push({ name: 'DocumentationAdditionalPlans' });
      }
      
    }
	}
}
</script>