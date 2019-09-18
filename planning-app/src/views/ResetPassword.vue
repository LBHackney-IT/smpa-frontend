<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <h1 class="govuk-heading-xl">Reset your password</h1>

      <p>Enter your new password below.</p>

      <div class="govuk-form-group">
        <label class="govuk-label" for="password">
          New password
        </label>
        <input class="govuk-input govuk-!-width-two-thirds" id="password" name="password" type="password" spellcheck="false" v-model="password" v-on:keyup.13="resetPassword">
      </div>

      <div class="govuk-form-group">
        <label class="govuk-label" for="password-confirm">
          Confirm your new password
        </label>

        <span id="email-error" class="govuk-error-message" v-if="showErrorMessage">
          <span class="govuk-visually-hidden">Error:</span> {{ errorMessage }}
        </span>

        <input 
          class="govuk-input govuk-!-width-two-thirds" 
          v-bind:class="{ 'govuk-input--error': showErrorMessage }" 
          id="password-confirm" 
          name="password-confirm" 
          type="password" 
          spellcheck="false" 
          v-model="passwordConfirmation" 
          v-bind:aria-describedby="{'email-error': showErrorMessage}" 
          v-on:keyup.13="resetPassword">
      </div>

      <v-cta name="Reset password" :onClick="resetPassword"></v-cta><br>

      <a href="">Forgot your password?</a>
    </div>
  </div>
</template>
<script>
  import vCta from '../components/Cta.vue';
  import router from '../router';
  import * as errorMessage from '../messages/errorMessages';

  export default {
    name: 'VerifyAccount',
    components: {
      vCta
    },
    created() {
      this.errorMessages = errorMessage;
    },
    data () {
      return {
        password: undefined,
        passwordConfirmation: undefined,
        showErrorMessage: false,
        errorMessages: undefined,
        errorMessage: undefined
      }
    },
    methods: {
      resetPassword () {
        if (this.password === this.passwordConfirmation) {
          this.errorMessage = this.errorMessages.RESET_PASSWORD.SAME_PASSWORDS;

          if (this.password.length < 8) {
            this.showErrorMessage = true;
            this.errorMessage = this.errorMessages.RESET_PASSWORD.WRONG_LENGTH;
            return;
          } else {
            this.showErrorMessage = false;
          }

          this.errorMessage = '';
          this.showErrorMessage = false;

          let payload = {
              "token": this.$route.params.token,
              "password": this.password,
              "password_confirm": this.password
          }
          this.$store.dispatch('resetPassword', payload).then((response) => {
            router.push({ name: 'ResetPasswordSuccessful' });
          });
        } else {
          this.showErrorMessage = true;
          this.errorMessage = this.errorMessages.RESET_PASSWORD.SAME_PASSWORDS;
        }
      }
    }
  }
</script>
