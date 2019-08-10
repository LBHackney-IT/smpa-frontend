<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <div class="govuk-panel govuk-panel--confirmation">
        <h1 class="govuk-panel__title">
          Your request to reset your password was successful. You should have received an email with a link to reset your password.
        </h1>
      </div>

      <a href="/sign-in">Sign in again.</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ResetPasswordRequestSuccessful'
  }
</script>
