<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <div class="govuk-panel govuk-panel--confirmation">
        <h1 class="govuk-panel__title">
          Signed out
        </h1>
      </div>

      <p>You are now signed out of Submit My Planning Application.</p>

      <a href="/sign-in">Sign in again.</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SignOut',
    created () {
      this.signOut();
    },
    methods: {
      signOut () {
        this.$store.dispatch('signOut').then(() => {
        });
      }
    }
  }
</script>
