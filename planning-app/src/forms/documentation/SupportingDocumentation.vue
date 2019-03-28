<template>
  <div class="govuk-panel planning-panel--information">
    <h1 class="govuk-panel__title govuk-!-font-size-36">
      Supporting documents must:
    </h1>
    <div class="govuk-panel__body govuk-!-font-size-19">

      <strong class="govuk-!-font-size-24">Name</strong>
      <ul>
        <li>Be clearly named</li>
      </ul>

      <strong class="govuk-!-font-size-24">Dimensions, materials, trees</strong>
      <ul>
        <li>Display key dimensions of the proposal</li>
        <li>Show the position of all trees on the site, and those on adjacent land that could influence or be affected by the proposed works</li>
        <li>Include details about materials (if not submitted through this form)</li>
      </ul>

      <strong class="govuk-!-font-size-24">North and scale</strong>
      <ul>
        <li>Show the direction of north</li>
        <li>Have a visual scale bar showing 1m and 10m</li>
        <li>Be on an appropiate scale when printing in A3, normally 1:50 or 1:100</li>
      </ul>

      <strong class="govuk-!-font-size-24">File format and size</strong>
      <ul>
        <li>All files should be attached as PDF, JPG, DOC and XLS</li>
        <li>CAD or TIF files are not accepted</li>
        <li>Be less than 10MB</li>
      </ul>

      <v-cta name="Continue" :onClick="navigate"></v-cta>
    </div>
  </div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';

export default {
	name: 'SupportingDocumentation',
	components: {
		vCta
	},
	data () {
    return {}
  },
	methods: {
    navigate() {
      router.push({ name: 'DocumentationLocation' });
    }
	}
}
</script>