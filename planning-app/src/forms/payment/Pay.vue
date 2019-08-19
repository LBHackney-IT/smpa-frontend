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

		<error-message v-if="showErrorMessage && !loading" :message="errorMessages.CREATE_PAYMENT.GENERIC_ERROR"></error-message>

		<v-cta name="Proceed to payment" :onClick="createPayment"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import { getRouteAppId } from '../../mixins/getRouteAppId';
import ErrorMessage from '../../components/ErrorMessage.vue';
import * as errorMessage from '../../messages/errorMessages';

export default {
	name: 'Pay',
	mixins: [ getRouteAppId ],
	components: {
		vCta,
		ErrorMessage
	},
	data () {
    return {
      showErrorMessage: false,
      errorMessages: undefined
    }
  },
	created () {
    this.errorMessages = errorMessage;
  },
	methods: {
		createPayment () {
      this.$store.dispatch('createPayment', this.applicationId).then((response) => {
				if (response.error) {
          this.showErrorMessage = true;
          return;
        } else {
          window.location = response.data.next_url;
        }
      });
		}
	}
}
</script>