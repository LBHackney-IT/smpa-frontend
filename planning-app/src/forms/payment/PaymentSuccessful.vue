<template>
	<div>
		<div class="govuk-panel govuk-panel--confirmation">
			<h1 class="govuk-panel__title">
				Your application has been sent to Hackney Council.
			</h1>
			<div class="govuk-panel__body">
				Your reference number<br>
				<p v-if="this.application.data.reference"><strong>{{this.application.data.reference}}</strong></p>
			</div>
		</div>

		<h2 class="govuk-heading-l govuk-!-margin-top-9">
			What happens next
		</h2>

    <p>We receive a large volume of applications so please bear with us while we review your application. Your application will now move through two stages of processing.</p>

		<h3 class="govuk-heading-m">1. Validation</h3>
		<p>We will first determine if your application can be validated. This means we assess to see if you have submitted all the information we need to make a decision. If there is something missing you will have an opportunity to submit additional information/documents. We will contact you if this is required. Once your application has been validated you will be notified.</p>

		<h3 class="govuk-heading-m">2. Review</h3>
		<p>At this point we have 8 weeks to review your application and reach a decision. A planning officer will be assigned to your application. They will be in touch if they have questions or require further information. During this period we will conduct a period of consultation.</p>

		<h3 class="govuk-heading-m">3. Decision making</h3>
		<p>A decision will be reached within 8 weeks. You will be notified when this decision has been made.</p>

		<a href="/account">Go back to dashboard account</a>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';
import { getRouteAppId } from '../../mixins/getRouteAppId';

export default {
	name: 'PaymentSuccessful',
	mixins: [ getRouteAppId ],
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
	},
	computed: {
		application () {
			let index = this.$store.state.state.applications.findIndex( application => application.data.id === this.applicationId );
			return this.$store.state.state.applications[index];
		}
	}
}
</script>