<template>
	<div>
		<h1 class="govuk-heading-xl" v-if="loadingCheck">
      We're verifying the payment.
		</h1>

    <error-message v-if="showErrorMessage && !loading" :message="errorMessages.APPLICATION_SUBMISSION.GENERIC_ERROR"></error-message>

    <div class="govuk-panel govuk-panel--confirmation" v-if="this.payment && this.payment.status.name === 'Submitted'">
			<h2 class="govuk-panel__title">
				Your application has been sent to Hackney Council.
			</h2>
      <p>Your reference is {{this.payment.reference}}.</p>
		</div>
	</div>
</template>

<script>
import ErrorMessage from '../../components/ErrorMessage.vue';
import * as errorMessage from '../../messages/errorMessages';

export default {
  name: 'PaymentCheck',
	components: {
    ErrorMessage
	},
	data () {
    return {
      loadingCheck: true,
      payment: undefined,
      showErrorMessage: false,
      errorMessages: undefined
    }
  },
  mounted () {
    this.checkPayment();
  },
  created () {
    this.errorMessages = errorMessage;
  },
	methods: {
    checkPayment() {
      this.$store.dispatch('checkPayment', this.$route.params.paymentId).then((response) => {

        if (response.error) {
          this.showErrorMessage = true;
          return;
        } else {
          let submission = {};
          submission.id = response.data.application_id;
          submission.data = {
              "submitted": true
          };
          
          this.$store.dispatch('submitApplication', submission).then((res) => {
            if (res.error) {
              this.loadingCheck = false;
              this.showErrorMessage = true;
              return;
            } else {
              this.loadingCheck = false;
              this.payment = res.data;
            }
          })
        }
      });
    }
  }
}
</script>

