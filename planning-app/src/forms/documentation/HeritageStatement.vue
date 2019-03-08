<template>
	<div>
    <h2 class="govuk-heading-xl">Heritage Statement</h2>
    <h4 class="govuk-heading-s">Upload an heritage statement</h4>

    <p>You are required to submit a Heritage Statement because the building in the site is listed.</p>

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
            The Heritage Statement is covered in another document
          </label>
        </div>
      </div>
    </div>

    <v-cta name="Continue" :onClick="navigate"></v-cta>
    <br>
    <router-link :to="{ name: 'DocumentationAdditionalPlans' }">Continue without adding a file</router-link>

    <br><br><br><br>
    <details class="govuk-details">
      <summary class="govuk-details__summary">
        <span class="govuk-details__summary-text">
          What is in a heritage statement?
        </span>
      </summary>
      <div class="govuk-details__text">
        A heritage statement should cover:
        <ul>
          <li>a description of the heritage asset and its setting</li>
          <li>an assessment of its significance</li>
          <li>an explanation of the design concept for the proposed development</li>
          <li>a description of the impact</li>
        </ul>
      </div>
    </details>
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
      router.push({ name: 'DocumentationAdditionalPlans' });
    }
	}
}
</script>