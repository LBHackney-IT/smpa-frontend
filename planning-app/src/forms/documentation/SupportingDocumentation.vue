<template>
	<div>
    <h1>Supporting Documentation</h1>

    <div>
      <h2>All supporting documentation must:</h2>
      <ul>
        <li>Be clearly named</li>
        <li>Be A3 or smaller</li>
        <li>All files should be attached as PDF files</li>
        <li>JPG, DOC and XLS files will also be accepted</li>
        <li>CAD or TIF files are not accepted</li>
      </ul>

      <button type="button">Continue</button>
    </div>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';

export default {
	name: 'SupportingDocumentation',
	components: {
		vCta
	},
	data () {
    return {}
  },
	methods: {
    consoleClick() {
      console.log('Button clicked');
    }
	}
}
</script>