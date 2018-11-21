<template>
	<div>
    <h2>All supporting documentation must:</h2>
    <ul>
      <li>Be clearly named</li>
      <li>Be A3 or smaller</li>
      <li>All files should be attached as PDF files</li>
      <li>JPG, DOC and XLS files will also be accepted</li>
      <li>CAD or TIF files are not accepted</li>
    </ul>

    <v-cta name="Next" :onClick="navigate"></v-cta>
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