<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <h1 class="govuk-heading-xl">Sign in</h1>

      <p>Sign in or <a href="/create-account">create an account</a> to get started</p>

      <div class="govuk-form-group">
        <label class="govuk-label" for="email">
          Email address
        </label>
        <input class="govuk-input govuk-!-width-two-thirds" id="email" name="email" type="email" autocomplete="email" spellcheck="false" v-model="email">
      </div>

      <div class="govuk-form-group">
        <label class="govuk-label" for="password">
          Password
        </label>
        <input class="govuk-input govuk-!-width-two-thirds" id="password" name="password" type="password" autocomplete="password" spellcheck="false" v-model="password">
      </div>

      <v-cta name="Sign in" :onClick="signIn"></v-cta><br>

      <a href="">Forgot your password?</a>
    </div>
  </div>
</template>

<script>
  import vCta from '../components/Cta.vue';
  import router from '../router';

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
        application: undefined
      }
    },
    created () {
      this.fetchData();
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
        if (this.source === 'constraints-finder' && this.application) {
          this.$store.dispatch('createApplication', this.application).then((response) => {
            router.push({ name: 'ApplicationOverview', params: { applicationId: response.data.id } });
          })
        } else {
          router.push({ name: 'AccountActions' });
        }
      },
      signIn() {

        this.$store.dispatch('signIn', { "email": this.email, 'password': this.password }).then(() => {
          this.navigate();
        })
        
      }
    }

  }
</script>
