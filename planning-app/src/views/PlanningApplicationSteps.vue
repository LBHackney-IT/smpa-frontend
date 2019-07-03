<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <h1 class="govuk-heading-xl">Submit my Planning Application</h1>

      <p class="govuk-body">
        This service is still in development.
      </p>

      <h2 class="govuk-heading-l">Check planning considerations for your site</h2>

      <p>You can use this service to find out about the planning considerations that affect your site. For example, is your site in a conservation area.</p>

      <a class="govuk-body govuk-link" href="/sites/search">Find out about your site</a>

      <h2 class="govuk-heading-l govuk-!-margin-top-9">Apply for planning permission</h2>

      <p>You can only use this service if you are proposing works to a house, such as:</p>

      <ul class="govuk-body">
        <li>Extensions</li>
        <li>Conservatories</li>
        <li>Loft conversions</li>
        <li>Dormer windows</li>
        <li>Garages and outbuildings</li>
      </ul>

      <div class="govuk-inset-text">
        <p>Please note that planning permission is not needed for all household building works. Under permitted development rules you can carry out a number of household building work projects, provided they meet certain limits and conditions.</p>
        <p><a href="https://hackney.gov.uk/stage1-pre-application">Find out if you need planning permission</a></p>
      </div>

      <router-link v-if="this.isSignedIn" class="govuk-button govuk-button--start" :to="{ path: '/sites/search' }">Start now</router-link>
      <router-link v-if="!this.isSignedIn" class="govuk-button govuk-button--start" :to="{ name: 'SignIn', params: { 'origin': 'start' }}">Start now</router-link>
      
      <h3 class="govuk-heading-m govuk-!-margin-top-5">Get help</h3>

      <div class="govuk-body">
        <p>Contact us if you need to speak to someone about you planning application.<br>

        <span class="govuk-!-margin-top-2 display-block"> Planning duty desk:</span>
        <span class="govuk-!-font-weight-bold govuk-!-margin-bottom-5">Hackney Service Centre, 1 Hillman Street E8 1DY</span><br>

        <span class="govuk-!-margin-top-2 display-block">Email:</span>
        <a class="govuk-!-margin-bottom-5" href="planning@hackney.gov.uk">planning@hackney.gov.uk</a><br>

        <span class="govuk-!-margin-top-2 display-block">Telephone:</span>
        <span class="govuk-!-margin-bottom-5 govuk-!-font-weight-bold ">020 8356 8062</span><br>

        <span class="govuk-!-margin-top-2 display-block">Opening times planning duty desk:</span>
        <span class="govuk-!-font-weight-bold">Monday to Friday: 10am - 12 noon, 2pm - 4pm, in person</span> <br>
        <span class="govuk-!-font-weight-bold">Monday to Friday: 9am - 5pm, on the phone</span></p>

      </div>



    </div>
  </div>
</template>

<script>
  import JwtService from '@/common/jwt.service';

  export default {
    name: 'PlanningApplicationsSteps',
    computed: {
      isSignedIn () {
        return !!JwtService.getToken();
      }
    }

  }
</script>
