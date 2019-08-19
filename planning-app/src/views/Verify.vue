<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <h1 class="govuk-heading-xl">Verify your account</h1>

      <div class="govuk-error-summary" v-if="this.showErrorMessage" aria-labelledby="error-summary-title" role="alert" tabindex="-1" data-module="govuk-error-summary">
        <h2 class="govuk-error-summary__title" id="error-summary-title">
          
          {{ this.errorMessages.VERIFY_ACCOUNT.ERROR }}
        </h2>
      </div>

      <p v-if="this.loading && !this.showErrorMessage">Verifying your account...</p>

      <p v-if="!this.loading && !this.showErrorMessage">Your account is now verified and you're signed in. You will be automatically redirected to your account. If that doesn't happen in five seconds, you can <a href="/account">visit your account</a>.</p>
    </div>
  </div>
</template>

<script>
  import router from '../router';
  import * as errorMessage from '../messages/errorMessages';

  export default {
    name: 'VerifyAccount',
    data () {
      return {
        token: '',
        loading: true,
        showErrorMessage: false,
        errorMessages: undefined
      }
    },
    created () {
      this.errorMessages = errorMessage;
    },
    mounted () {
      this.token = this.$route.params.token;
      this.verifyAccount();
    },
    methods: {
      verifyAccount () {
        this.$store.dispatch('verifyAccount', this.token).then((response) => {
          if (response.error) {
            this.showErrorMessage = true;
            this.loading = false;
            return;
          } else {
            this.loading = false;
            router.push({ name: 'AccountActions'});
          }
        });
    
      }
    }

  }
</script>
