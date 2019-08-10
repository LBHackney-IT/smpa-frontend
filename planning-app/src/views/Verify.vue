<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <h1 class="govuk-heading-xl">Verify your account</h1>

      <p v-if="this.loading">Verifying your account...</p>

      <p v-if="!this.loading">Your account is now verified and you're signed in. You will be automatically redirected to your account. If that doesn't happen in five seconds, you can <a href="/account">visit your account</a>.</p>
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
        token: '',
        loading: true
      }
    },
    mounted () {
      this.token = this.$route.params.token;
      this.verifyAccount();
    },
    methods: {
      verifyAccount () {
        this.$store.dispatch('verifyAccount', this.token).then((response) => {
          this.loading = false;
          router.push({ name: 'AccountOverview'});

        });
    
      }
    }

  }
</script>
