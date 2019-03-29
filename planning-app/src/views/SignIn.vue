<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <h1 class="govuk-heading-xl">Sign in</h1>

      <p>Sign in or <a href="">create an account</a> to get started</p>

      <div class="govuk-form-group">
        <label class="govuk-label" for="email">
          Email address
        </label>
        <input class="govuk-input govuk-!-width-two-thirds" id="email" name="email" type="email" autocomplete="email" spellcheck="false">
      </div>

      <div class="govuk-form-group">
        <label class="govuk-label" for="password">
          Password
        </label>
        <input class="govuk-input govuk-!-width-two-thirds" id="password" name="password" type="password" autocomplete="password" spellcheck="false">
      </div>

      <v-cta name="Sign in" :onClick="signIn"></v-cta><br>

      <a href="">Forgot your password?</a>
    </div>
  </div>
</template>

<script>
  import vCta from '../components/Cta.vue';

  export default {
    name: 'SignIn',
    components: {
      vCta
    },
    methods: {
      signIn() {
        
      }
    }

  }
</script>
