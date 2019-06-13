<template>
  <div>
    <div class="purpose-message govuk-body">
      <p>Application type and site location are based entirely on the selections you have made. <a class="govuk-link" href="">Change</a></p>

      <!-- <span>{{this.siteInfo.siteLocation.buildingNumber}}<br>
      {{this.siteInfo.siteLocation.street}}<br>
      {{this.siteInfo.siteLocation.postcode}}</span>  -->
    </div>
    <h1 class="govuk-heading-xl">Application overview</h1>

    <p class="govuk-body">
      Complete the tasks below.
    </p>

    <h2 class="govuk-heading-l">1. Description of works</h2>

    <ul class="govuk-list">
      <li><a class="govuk-link" href="#">Location of the works</a></li>
      <li><router-link :to="{ name: 'WorkStart'}" class="govuk-link">Starting the works</router-link></li>
      <li><a class="govuk-link" href="#">Describe the proposed works</a></li>
      <li><a class="govuk-link" href="#">Describe the surroundings: Trees</a></li>
      <li><a class="govuk-link" href="#">Define materials</a></li>
    </ul>

    <h2 class="govuk-heading-l">2. Supporting documentation</h2>

    <ul class="govuk-list">
      <li><router-link :to="{ name: 'DocumentationLocation', params: { applicationId: this.applicationId }}" class="govuk-link">Add a location plan</router-link></li>
      <li><a class="govuk-link" href="#">Add a Design and Access statement</a></li>
      <li><a class="govuk-link" href="#">Add aditional plans</a></li>
    </ul>

    <h2 class="govuk-heading-l">3. Declarations</h2>

    <ul class="govuk-list">
      <li><a class="govuk-link" href="#">Declaration of interest</a></li>
      <li><a class="govuk-link" href="#">Ownership Certificate Declaration</a></li>
    </ul>


    <h2 class="govuk-heading-l">4. Contact details</h2>

    <ul class="govuk-list">
      <li><a class="govuk-link" href="#">Applicant details</a></li>
      <li><a class="govuk-link" href="#">Agent details</a></li>
    </ul>

    <h2 class="govuk-heading-l">5. Pay and submit</h2>

    <ul class="govuk-list">
      <li><a class="govuk-link" href="#">Check eligibility</a></li>
      <li><a class="govuk-link" href="#">Payment</a></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Overview',
    components: {
    },
    data () {
      return {
        applicationId: undefined,
      }
    },
    created () {
      this.getRouteData();
    },
    watch: {
      '$route': 'getRouteData'
    },
    methods: {
      getRouteData () {
        this.applicationId = this.$route.params.applicationId;
      }
    }
  }
</script>
