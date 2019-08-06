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

		{{this.applicationId}}

		<v-cta name="Proceed to payment" :onClick="createPayment"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';
import { getRouteAppId } from '../../mixins/getRouteAppId';

export default {
	name: 'Pay',
	mixins: [ getRouteAppId ],
	components: {
		vCta
	},
	methods: {
		createPayment () {
      this.$store.dispatch('createPayment', this.applicationId).then((response) => {
				window.location = response.data.next_url;
      });
		}
	}
}
</script>