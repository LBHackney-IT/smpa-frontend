<template>
	<div>
		<h1 class="govuk-heading-xl">
			Check if you're eligible for a fee reduction
		</h1>
		<div class="govuk-form-group">
			<fieldset class="govuk-fieldset" aria-describedby="improve-accessibility-hint">
				<legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
					<h2 class="govuk-heading-m">Is the proposal to a disabled person's dwelling house to improve access, safety, comfort etc?</h2>
				</legend>

				<div class="govuk-radios govuk-radios--inline">
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="improve-accessibility-1" name="improve-accessibility" type="radio" value="Yes" v-model="improveAccessibility">
						<label class="govuk-label govuk-radios__label" for="improve-accessibility-1">
							Yes
						</label>
					</div>
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="improve-accessibility-2" name="improve-accessibility" type="radio" value="No" v-model="improveAccessibility">
						<label class="govuk-label govuk-radios__label" for="improve-accessibility-2">
							No
						</label>
					</div>
				</div>
			</fieldset>
		</div>

    <error-message v-if="showErrorMessage && !loading" :message="errorMessage"></error-message>

		<v-cta name="Continue" :onClick="navigate"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';
import { getRouteAppId } from '../../mixins/getRouteAppId';
import ErrorMessage from '../../components/ErrorMessage.vue';
import * as errorMessage from '../../messages/errorMessages';

export default {
	name: 'Eligibility',
	mixins: [ getRouteAppId ],
	components: {
		vCta,
		ErrorMessage
	},
	data () {
    return {
			improveAccessibility: undefined,
			showErrorMessage: false,
			errorMessages: undefined,
			errorMessage: undefined
    }
	},
	created () {
    this.errorMessages = errorMessage;
  },
	methods: {
    navigate() {
			var payload = {};
      payload.id = this.applicationId;
      payload.data = {};
      payload.data.reduction_eligible = this.improveAccessibility === 'Yes' ? true : false;

      this.$store.dispatch('updateApplication', payload).then(() => {
				if (this.improveAccessibility === 'Yes') {

					let submission = {};

					submission.id = this.applicationId;
					submission.data = {
							"submitted": true
					};
					
					this.$store.dispatch('submitApplication', submission).then((response) => {

						if (response.error) {
							this.showErrorMessage = true;
							if (response && response.response && response.response.response && response.response.response.data &&  response.response.response.data.title) {
								this.errorMessage = response.response.response.data.title;
							} else {
								this.errorMessage = this.errorMessages.APPLICATION_SUBMISSION.GENERIC_ERROR;
							}
							return;
						} else {
							router.push({ name: 'PaymentSuccessful' });
						}
						
					})
					
				} else {
					router.push({ name: 'Pay' });
				}
        
      });
      
    }
	}
}
</script>