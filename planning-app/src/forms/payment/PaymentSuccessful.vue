<template>
	<div>
		<div class="govuk-panel govuk-panel--confirmation">
			<h1 class="govuk-panel__title">
				Payment successful
			</h1>
			<div class="govuk-panel__body">
				Your reference number
				<br><strong>HDJ2123F</strong>
			</div>
		</div>

		<h2 class="govuk-heading-l">
			What happens next
		</h2>

    <p>Your application has been sent to Hackney Planning.</p>
		<p>They will contact you either to confirm your registration or to ask for more information.</p>

		<a href="">Go back to dashboard account</a>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';

export default {
	name: 'PaymentSuccessful',
	components: {
		vCta
	},
	data () {
    return {
			improveAccessibility: undefined
    }
  },
	methods: {
    navigate() {
      router.push({ name: 'Proposal' });
    }
	}
}
</script>