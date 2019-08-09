<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <h1 class="govuk-heading-xl">Reset your password</h1>

      <p>Enter your new password below.</p>

      <div class="govuk-form-group">
        <label class="govuk-label" for="password">
          New password
        </label>
        <input class="govuk-input govuk-!-width-two-thirds" id="password" name="password" type="password" spellcheck="false" v-model="password">
      </div>

      <div class="govuk-form-group">
        <label class="govuk-label" for="password-confirm">
          Confirm your new password
        </label>
        <input class="govuk-input govuk-!-width-two-thirds" id="password-confirm" name="password-confirm" type="password" spellcheck="false" v-model="passwordConfirmation">
      </div>

      <v-cta name="Reset password" :onClick="resetPassword"></v-cta><br>

      <a href="">Forgot your password?</a>
    </div>
  </div>
</template>
<script>
  import vCta from '../components/Cta.vue';
  import router from '../router';

  export default {
    name: 'VerifyAccount',
    components: {
      vCta
    },
    data () {
      return {
        password: undefined,
        passwordConfirmation: undefined
      }
    },
    methods: {
      resetPassword () {

        if (this.password === this.passwordConfirmation) {
          let payload = {
              "token": this.$route.params.token,
              "password": this.password,
              "password_confirm": this.password
          }
          this.$store.dispatch('resetPassword', payload).then((response) => {
            console.log('-reset password response', response);
          });
        }

    
      }
    }

  }
</script>
