<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <h1 class="govuk-heading-xl">Create account</h1>

      <p v-if="stepTwo" class="govuk-!-font-size-27">You need to enter an email address and create a password. This will allow you to make, save and submit planning applications.</p>

      <p>If you already have an account, please <a href="/sign-in">sign in</a>.</p>

      <div v-if="stepOne" class="govuk-!-margin-top-9">
        <div class="govuk-form-group">
          <fieldset class="govuk-fieldset">
            <legend class="govuk-fieldset__legend govuk-fieldset__legend--l">
              <h2 class="govuk-fieldset__heading">
                Are you an agent acting on behalf of the applicant?
              </h2>
            </legend>
            <div class="govuk-radios govuk-radios--inline">
              <div class="govuk-radios__item">
                <input class="govuk-radios__input" id="account-type-1" name="changed-name" type="radio" value="yes">
                <label class="govuk-label govuk-radios__label" for="account-type-1">
                  Yes, you're acting on behalf of the applicant
                </label>
              </div>
              <div class="govuk-radios__item">
                <input class="govuk-radios__input" id="account-type-2" name="changed-name" type="radio" value="no">
                <label class="govuk-label govuk-radios__label" for="account-type-2">
                  No, you're the applicant
                </label>
              </div>
            </div>
          </fieldset>
        </div>

        <v-cta name="Continue" :onClick="setTypeOfAccount"></v-cta><br>
      </div>


      <div v-if="stepTwo" class="govuk-!-margin-top-9">
        <h2 class="govuk-heading-l">Email address</h2>
        <div class="govuk-form-group">
          <label class="govuk-label" for="email">
            Email address
          </label>
          <input class="govuk-input govuk-!-width-two-thirds" id="email" name="email" type="email" autocomplete="email" spellcheck="false">
        </div>

        <div class="govuk-form-group">
          <label class="govuk-label" for="email-confirm">
            Confirm your email address
          </label>
          <input class="govuk-input govuk-!-width-two-thirds" id="email-confirm" name="email-confirm" type="email" spellcheck="false">
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
          <input class="govuk-input govuk-!-width-two-thirds" id="password" name="password" :type="passwordFieldType" spellcheck="false"><br>
          <button class="govuk-link govuk-!-margin-top-5" v-on:click="togglePasswordView">
            <span v-if="passwordFieldType === 'password'">Show</span><span v-if="passwordFieldType === 'text'">Hide</span> password
          </button>
        </div>

        <div class="govuk-form-group">
          <label class="govuk-label" for="password-confirm">
            Confirm password
          </label>
          <input class="govuk-input govuk-!-width-two-thirds" id="password-confirm" name="password-confirm" type="password" spellcheck="false">
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
        stepOne: true,
        stepTwo: false,
        passwordFieldType: 'password'
      };
    },
    methods: {
      setTypeOfAccount() {
        this.stepOne = false;
        this.stepTwo = true;
      },
      createAccount() {},
      togglePasswordView() {
        this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
      }
    }

  }
</script>
