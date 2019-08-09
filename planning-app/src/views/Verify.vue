<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <h1 class="govuk-heading-xl">Verify</h1>

      <p>Verifying your account</p>
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
        token: ''
      }
    },
    mounted () {
      this.token = this.$route.params.token;
      console.log('this.token', this.token);
      this.verifyAccount();
    },
    methods: {
      verifyAccount () {
        this.$store.dispatch('verifyAccount', this.token).then((response) => {
          console.log('-token response', response);
        });
    
      }
    }

  }
</script>
