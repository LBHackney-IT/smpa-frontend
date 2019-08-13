<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <h1 class="govuk-heading-xl">Create account</h1>
      <p>If you already have an account, please <a href="/sign-in">sign in</a>.</p>
      <p class="govuk-!-font-size-27">You need to enter an email address and create a password. This will allow you to make, save and submit planning applications.</p>

      <div class="govuk-!-margin-top-9">
        <h2 class="govuk-heading-l">Email address</h2>
        <div class="govuk-form-group" v-bind:class="{ 'govuk-form-group--error': error || showEmailError}">
          <label class="govuk-label" for="email">
            Email address
          </label>

          <span id="email-error" class="govuk-error-message" v-if="error">
            <span class="govuk-visually-hidden">Error:</span> {{ responseError }}
          </span>

          <input class="govuk-input govuk-!-width-two-thirds" id="email" name="email" type="email" autocomplete="email" spellcheck="false" v-model="email">
 
          <label class="govuk-label" for="email-confirm">
            Confirm your email address
          </label>

          <span id="email-error" class="govuk-error-message" v-if="showEmailError">
            <span class="govuk-visually-hidden">Error:</span> {{ errorEmailMessage }}
          </span>
          <input class="govuk-input govuk-!-width-two-thirds" v-bind:class="{ 'govuk-input--error': showEmailError }" id="email-confirm" name="email-confirm" type="email" spellcheck="false" v-model="emailConfirmation" v-bind:aria-describedby="{'email-error': showEmailError}">
        </div>

        <h2 class="govuk-heading-l govuk-!-margin-top-9">Create password</h2>

        <p>Your password needs to have:</p>
        <ul class="govuk-body">
          <li>at least 8 characters</li>
          <li>at least one lower-case and one capital letter</li>
          <li>at least one number</li>
        </ul>

        <div class="govuk-form-group" v-bind:class="{ 'govuk-form-group--error': error || showPasswordError}">
          <label class="govuk-label" for="password">
            Password
          </label>
          <input class="govuk-input govuk-!-width-two-thirds" id="password" name="password" :type="passwordFieldType" spellcheck="false" v-model="password"><br>
          <button class="govuk-link govuk-!-margin-top-5" v-on:click="togglePasswordView">
            <span v-if="passwordFieldType === 'password'">Show</span><span v-if="passwordFieldType === 'text'">Hide</span> password
          </button>

          <label class="govuk-label" for="password-confirm">
            Confirm password
          </label>

          <span id="email-error" class="govuk-error-message" v-if="showPasswordError">
            <span class="govuk-visually-hidden">Error:</span> {{ errorPasswordMessage }}
          </span>

          <input class="govuk-input govuk-!-width-two-thirds" v-bind:class="{ 'govuk-input--error': showPasswordError }" id="password-confirm" name="password-confirm" type="password" spellcheck="false" v-model="passwordConfirmation" v-bind:aria-describedby="{'email-error': showPasswordError}">
        </div>

        <v-cta name="Create account" :onClick="createAccount"></v-cta><br>

      </div>

    </div>
  </div>
</template>

<script>
  import vCta from '../components/Cta.vue';
  import * as errorMessage from '../messages/errorMessages';

  export default {
    name: 'CreateAccount',
    components: {
      vCta
    },
    created() {
      this.errorMessages = errorMessage;
    },
    data() {
      return { 
        passwordFieldType: 'password',
        password: undefined,
        passwordConfirmation: undefined,
        email: undefined,
        emailConfirmation: undefined,
        errorMessages: undefined,
        showEmailError: false,
        errorEmailMessage: undefined,
        showPasswordError: false,
        errorPasswordMessage: undefined,
        error: false,
        responseError: undefined
      };
    },
    methods: {
      createAccount() {

        //todo show errors visually.
        if (this.email !== this.emailConfirmation) {
          this.showEmailError = true;
          this.errorEmailMessage = this.errorMessages.CREATE_ACCOUNT.SAME_EMAIL;
          return;
        } 
        this.showEmailError = false;
        this.errorEmailMessage = undefined;

        if (this.password !== this.passwordConfirmation) {
          this.showPasswordError = true;
          this.errorPasswordMessage = this.errorMessages.CREATE_ACCOUNT.SAME_PASSWORDS;
          return;
        }

        if (this.password.length < 8) {
          this.showPasswordError = true;
          this.errorPasswordMessage = this.errorMessages.CREATE_ACCOUNT.WRONG_LENGTH;
            return;
        }
        
        this.showPasswordError = false;
        this.errorPasswordMessage = undefined;

        var payload = {};

        payload.email = this.email;
        payload.password = this.password;
        payload.password_confirm = this.passwordConfirmation;
        this.$store.dispatch('createAccount', payload).then((response) => {
          if (response.response.response.data.message) {
            this.error = true;
            this.responseError = response.response.response.data.message;
          } else if (response.error) {
            this.error = true;
            this.responseError = this.errorMessages.CREATE_ACCOUNT.GENERIC_ERROR;
          } else {
            router.push({ name: 'AccountActions' });
          }
        
        });
      },
      togglePasswordView() {
        this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
      }
    }

  }
</script>
