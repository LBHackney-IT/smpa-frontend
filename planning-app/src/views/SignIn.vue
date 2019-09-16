<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <h1 class="govuk-heading-xl">Sign in</h1>

      <p>Sign in or <a href="/create-account">create an account</a> to get started</p>

      <div class="govuk-form-group" v-bind:class="{ 'govuk-form-group--error': error }">

        <span id="email-error" class="govuk-error-message" v-if="error">
          <span class="govuk-visually-hidden">Error:</span> {{ errorMessage}}
        </span>

        <label class="govuk-label" for="email">
          Email address
        </label>
        <input class="govuk-input govuk-!-width-two-thirds" id="email" name="email" type="email" autocomplete="email" spellcheck="false" v-model="email">
        <label class="govuk-label" for="password">
          Password
        </label>
        <input class="govuk-input govuk-!-width-two-thirds" id="password" name="password" type="password" autocomplete="password" spellcheck="false" v-model="password">
      </div>

      <v-cta name="Sign in" :onClick="signIn"></v-cta><br>

      <a href="reset-password">Forgot your password?</a>
    </div>
  </div>
</template>

<script>
  import vCta from '../components/Cta.vue';
  import router from '../router';
  import * as errorMessage from '../messages/errorMessages';

  export default {
    name: 'SignIn',
    components: {
      vCta
    },
    data () {
      return {
        email: '',
        password: '',
        source: '',
        application: undefined,
        error: false,
        errorMessages: undefined,
        errorMessage: undefined
      }
    },
    created () {
      this.fetchData();
      this.errorMessages = errorMessage;
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        this.source = this.$route.params.origin

        if (this.$route.params.application) {
          this.application = this.$route.params.application
        }
      },
      navigate () {
        
        if (!window.localStorage.getItem('signInRefresh')) {
          window.localStorage.setItem('signInRefresh', true);
        }

        if (this.source === 'constraints-finder' && this.application) {
          this.$store.dispatch('createApplication', this.application).then((response) => {
            router.push({ name: 'ApplicationTaskOverview', params: { applicationId: response.data.id } });
          })
        } else if (this.$route.query.redirect) {
          router.push({ path: this.$route.query.redirect });
        } else {
          router.push({ name: 'AccountActions' });
        }
      },
      signIn() {

        this.$store.dispatch('signIn', { "email": this.email, 'password': this.password }).then((response) => {
          if (response && response.response && response.response.response && response.response.response.data.title) {
            this.error = true;
            this.errorMessage = response.response.response.data.title;
            return;

          } else if (response.error) {
            this.error = true;
            this.errorMessage = this.errorMessages.SIGN_IN.ERROR;
            return;

          } else {
            this.navigate();
          }
          
        })
        
      }
    }

  }
</script>
