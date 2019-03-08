<template>
	<div>
		<div class="govuk-form-group">
			<fieldset class="govuk-fieldset" aria-describedby="work-started-hint">
				<legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
				<h1 class="govuk-fieldset__heading">
          Files Uploaded
				</h1>
				</legend>

			</fieldset>
		</div>
    <modal v-if="showModal" @close="showModal = false"></modal>
    <v-cta name="Continue" :onClick="navigate"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';
import Modal from '../../components/form/DocumentsCheckModal.vue';

export default {
	name: 'DesignAndAccessStatement',
	components: {
    vCta,
    Modal
	},
	data () {
    return {
      uploadMore: undefined,
      showModal: false
    }
  },
	methods: {
    navigate() {
      if (this.uploadMore === 'Yes') {
        this.showModal = true;
      } else {
        router.push({ name: 'ApplicationContact' });
      }
    }
	}
}
</script>