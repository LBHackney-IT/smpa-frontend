<template>
	<div>
		<h1 class="govuk-heading-xl">
			Pay for your planning application
		</h1>

    <p>The fee for this application has been calculated as:</p>

  	<h2 class="govuk-heading-l">
			Payment amount
		</h2>

    <div class="govuk-inset-text">
      <p class="govuk-body govuk-!-font-size-36">£ 206.00</p>
      <span class="govuk-hint">
        * Statutory fee for Householder Planning Applications in Hackney Council
      </span>
    </div>

		<v-cta name="Proceed to payment" :onClick="navigate"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';

export default {
	name: 'Pay',
	components: {
		vCta
	},
	methods: {
    navigate() {
      router.push({ name: 'PaymentSuccessful' });
    }
	}
}
</script>