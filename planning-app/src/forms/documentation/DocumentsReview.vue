<template>
	<div>
		<div class="govuk-form-group">
			<fieldset class="govuk-fieldset" aria-describedby="work-started-hint">
				<legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
				<h1 class="govuk-fieldset__heading">
          Do you want to add more files?
				</h1>
				</legend>
				<div class="govuk-radios govuk-radios--inline">
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="work-started-1" name="work-started" type="radio" value="Yes" v-model="uploadMore">
						<label class="govuk-label govuk-radios__label" for="work-started-1">
							Yes
						</label>
					</div>
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="work-started-2" name="work-started" type="radio" value="No" v-model="uploadMore">
						<label class="govuk-label govuk-radios__label" for="work-started-2">
							No
						</label>
					</div>
				</div>
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