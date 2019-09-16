<template>
  <div>
    <span class="govuk-caption-xl">Account</span>
    <h1 class="govuk-heading-xl">Planning Applications</h1>

    <div class="govuk-grid-row">
      <div class="govuk-grid-column-one-third">
        <h2 class="govuk-heading-m">
          <router-link :to="{ name: 'SiteSearch' }">Apply</router-link>
        </h2>
        <p>You can submit and pay online</p>
      </div>

      <div class="govuk-grid-column-one-third">
        <h2 class="govuk-heading-m">
          <router-link :to="{ name: 'UserApplications' }">Manage</router-link>
        </h2>
        <p>You can view your planning applications history, edit a draft application or make amendments to an invalid application in order to re-submit.</p>
      </div>

      <div class="govuk-grid-column-one-third">
        <h2 class="govuk-heading-m">Get advice</h2>
        <p>All you need to know about the planning application process and what you have to prepare.</p>
      </div>
    </div>

    <h2 class="govuk-heading-l">Get help</h2>

    <p class="govuk-body">Ask the Hackney's Planning Duty Desk about help you can get if you:</p>
    <ul class="govuk-body">
      <li>Are you sure if you need planning permission.</li>
      <li>Know you need planning permission but need some help.</li>
    </ul>

    <div class="govuk-inset-text">
      <span class="govuk-!-font-weight-bold">Planning Duty Desk:</span><br>

      Hackney Service Centre, 1 Hillman Street E8 1DY<br>
      Email: planning@hackney.gov.uk<br>
      Telephone: 020 8356 8062<br>
      Monday to Friday: 10am - 12 noon, 2pm - 4pm, in person<br>
      Monday to Friday: 9am - 5pm, on the phone<br>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AccountActions',
    created () {
      // Not the ideal fix, more info on this in the project's README
      if (window.localStorage.getItem('signInRefresh')) {
        window.localStorage.removeItem('signInRefresh');
        window.location.reload();
      }
    }
  }
</script>
