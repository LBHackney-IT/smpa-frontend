<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <h1 class="govuk-heading-xl">Reset your password</h1>

      <p>Enter your email address below. If there's an account associated with the email address, we'll send you a link to reset your password.</p>

      <div class="govuk-form-group">
        <label class="govuk-label" for="email">
          Email address
        </label>
        <input class="govuk-input govuk-!-width-two-thirds" id="email" name="email" type="email" autocomplete="email" spellcheck="false" v-model="email">
      </div>

      <div class="govuk-form-group" v-bind:class="{ 'govuk-form-group--error': showErrorMessage }">
        <label class="govuk-label" for="email-confirm">
          Confirm your email address
        </label>

        <span id="email-error" class="govuk-error-message" v-if="showErrorMessage">
          <span class="govuk-visually-hidden">Error:</span> {{ errorMessages.RESET_PASSWORD.SAME_EMAIL }}
        </span>
        <input 
          class="govuk-input govuk-!-width-two-thirds" 
          v-bind:class="{ 'govuk-input--error': showErrorMessage }" 
          id="email-confirm" 
          name="email-confirm" 
          type="email" 
          spellcheck="false" 
          v-model="emailConfirmation" 
          v-bind:aria-describedby="{'email-error': showErrorMessage}" 
          v-on:keyup.13="reset">
      </div>

      <v-cta name="Email me the link" :onClick="reset"></v-cta><br>

      <a href="">Forgot your password?</a>
    </div>
  </div>
</template>

<script>
  import vCta from '../components/Cta.vue';
  import router from '../router';
  import * as errorMessage from '../messages/errorMessages';

  export default {
    name: 'ResetPassword',
    components: {
      vCta
    },
    created() {
      this.errorMessages = errorMessage;
    },
    data () {
      return {
        email: undefined,
        emailConfirmation: undefined,
        showErrorMessage: false,
        errorMessages: undefined
      }
    },
    methods: {
      reset() {
        if (this.email === this.emailConfirmation) {
          this.showErrorMessage = false;

          let payload = {};

          payload.email = this.email;

          this.$store.dispatch('resetPasswordRequest', payload).then((response) => {
            router.push({ name: 'ResetPasswordRequestSuccessful' });
          });
        } else {
          this.showErrorMessage = true;
        }

        
      }
    }

  }
</script>
