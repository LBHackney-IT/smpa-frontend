<template>
	<div>
		<h1 class="govuk-heading-xl">
      Payment check...
		</h1>

    <div class="govuk-panel govuk-panel--confirmation" v-if="this.payment && this.payment.state.status === 'success'">
			<h2 class="govuk-panel__title">
				Your application has been sent to Hackney Council.
			</h2>
		</div>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';

export default {
  name: 'PaymentCheck',
	components: {
		vCta
	},
	data () {
    return {
      payment: {}
    }
  },
  mounted () {
    this.checkPayment();
  },
	methods: {
    checkPayment() {
      this.$store.dispatch('checkPayment', this.$route.params.paymentId).then((response) => {
        console.log('PAYMENT CHECK----------', response);
        this.payment = response.data;
      });
    }
  }
}
</script>