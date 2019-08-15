<template>
	<div>
		<h1 class="govuk-heading-xl" v-if="loadingCheck">
      We're verifying the payment.
		</h1>

    <div class="govuk-panel govuk-panel--confirmation" v-if="this.payment && this.payment.status.name === 'Submitted'">
			<h2 class="govuk-panel__title">
				Your application has been sent to Hackney Council.
			</h2>
      <p>Your reference is {{this.payment.reference}}.</p>
		</div>
	</div>
</template>

<script>
export default {
  name: 'PaymentCheck',
	components: {
	},
	data () {
    return {
      loadingCheck: true,
      payment: undefined
    }
  },
  mounted () {
    this.checkPayment();
  },
	methods: {
    checkPayment() {
      this.$store.dispatch('checkPayment', this.$route.params.paymentId).then((response) => {

        let submission = {};
        submission.id = response.data.application_id;
        submission.data = {
            "submitted": true
        };
        
        this.$store.dispatch('submitApplication', submission).then((res) => {
          this.loadingCheck = false;
          this.payment = res.data;
        })
      });
    }
  }
}
</script>

