<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <h1 class="govuk-heading-xl">Create account</h1>
      <p>If you already have an account, please <a href="/sign-in">sign in</a>.</p>
      <p class="govuk-!-font-size-27">You need to enter an email address and create a password. This will allow you to make, save and submit planning applications.</p>

      <div class="govuk-!-margin-top-9">
        <h2 class="govuk-heading-l">Email address</h2>
        <div class="govuk-form-group">
          <label class="govuk-label" for="email">
            Email address
          </label>
          <input class="govuk-input govuk-!-width-two-thirds" id="email" name="email" type="email" autocomplete="email" spellcheck="false" v-model="email">
        </div>

        <div class="govuk-form-group">
          <label class="govuk-label" for="email-confirm">
            Confirm your email address
          </label>
          <input class="govuk-input govuk-!-width-two-thirds" id="email-confirm" name="email-confirm" type="email" spellcheck="false" v-model="emailConfirmation">
        </div>

        <h2 class="govuk-heading-l govuk-!-margin-top-9">Create password</h2>

        <p>Your password needs to have:</p>
        <ul class="govuk-body">
          <li>at least 8 characters</li>
          <li>at least one lower-case and one capital letter</li>
          <li>at least one number</li>
        </ul>

        <div class="govuk-form-group">
          <label class="govuk-label" for="password">
            Password
          </label>
          <input class="govuk-input govuk-!-width-two-thirds" id="password" name="password" :type="passwordFieldType" spellcheck="false" v-model="password"><br>
          <button class="govuk-link govuk-!-margin-top-5" v-on:click="togglePasswordView">
            <span v-if="passwordFieldType === 'password'">Show</span><span v-if="passwordFieldType === 'text'">Hide</span> password
          </button>
        </div>

        <div class="govuk-form-group">
          <label class="govuk-label" for="password-confirm">
            Confirm password
          </label>
          <input class="govuk-input govuk-!-width-two-thirds" id="password-confirm" name="password-confirm" type="password" spellcheck="false" v-model="passwordConfirmation">
        </div>

        <v-cta name="Create account" :onClick="createAccount"></v-cta><br>

      </div>

    </div>
  </div>
</template>

<script>
  import vCta from '../components/Cta.vue';

  export default {
    name: 'CreateAccount',
    components: {
      vCta
    },
    data() {
      return { 
        passwordFieldType: 'password',
        password: undefined,
        passwordConfirmation: undefined,
        email: undefined,
        emailConfirmation: undefined,
        showEmailError: false,
        showPasswordError: false
      };
    },
    methods: {
      createAccount() {

        //todo show errors visually.
        if (this.email !== this.emailConfirmation) {
          this.showEmailError = true;
          return;
        } 

        if (this.password !== this.passwordConfirmation) {
          this.showPasswordError = true;
          return;
        }

        var payload = {};

        payload.email = this.email;
        payload.password = this.password;
        payload.password_confirm = this.passwordConfirmation;
        this.$store.dispatch('createAccount', payload).then((response) => {
          router.push({ name: 'AccountActions' });
        });
      },
      togglePasswordView() {
        this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
      }
    }

  }
</script>
