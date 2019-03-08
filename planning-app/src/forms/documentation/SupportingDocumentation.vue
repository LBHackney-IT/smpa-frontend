<template>
  <div class="govuk-panel planning-panel--information">
    <h1 class="govuk-panel__title govuk-!-font-size-36">
      All supporting documentation must:
    </h1>
    <div class="govuk-panel__body govuk-!-font-size-24">
      <ul>
        <li>Be clearly named</li>
        <li>Be A3 or smaller</li>
        <li>All files should be attached as PDF files</li>
        <li>JPG, DOC and XLS files will also be accepted</li>
        <li>CAD or TIF files are not accepted</li>
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