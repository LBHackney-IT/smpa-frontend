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

      <div class="govuk-form-group">
        <label class="govuk-label" for="email-confirm">
          Confirm your email address
        </label>
        <input class="govuk-input govuk-!-width-two-thirds" id="email-confirm" name="email-confirm" type="email" spellcheck="false" v-model="emailConfirmation">
      </div>

      <v-cta name="Email me the link" :onClick="reset"></v-cta><br>

      <a href="">Forgot your password?</a>
    </div>
  </div>
</template>

<script>
  import vCta from '../components/Cta.vue';

  export default {
    name: 'ResetPassword',
    components: {
      vCta
    },
    data () {
      return {
        email: undefined,
        emailConfirmation: undefined
      }
    },
    methods: {
      reset() {
        if (this.email === this.emailConfirmation) {

          let payload = {};

          payload.email = this.email;

          this.$store.dispatch('resetPasswordRequest', payload).then((response) => {
            console.log('-reset password request response', response);
          });
        }

        
      }
    }

  }
</script>
