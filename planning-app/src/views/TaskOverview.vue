<template>
  <div>
    <div class="purpose-message govuk-body" v-if="applicationAddress">
      <p>Application type and site location are based entirely on the selections you have made. <a class="govuk-link" href="">Change</a></p>
      <span>{{applicationAddress.buildingNumber}}<br>
      {{applicationAddress.street}}<br>
      {{applicationAddress.postcode}}</span> 
    </div>
    <h1 class="govuk-heading-xl">Application overview</h1>

    <p class="govuk-body">
      Complete the tasks below.
    </p>

    <h2 class="govuk-heading-l">1. Description of works</h2>

    <ul class="govuk-list">
      <li><a class="govuk-link" href="#">Location of the works</a></li>
      <li><router-link :to="{ name: 'WorkStart'}" class="govuk-link">Starting the works</router-link></li>
      <li><router-link :to="{ name: 'Proposal'}" class="govuk-link">Describe the proposed works</router-link></li>
      <li><router-link :to="{ name: 'Trees'}" class="govuk-link">Describe the surroundings: Trees</router-link></li>
      <li><router-link :to="{ name: 'Materials'}" class="govuk-link">Define materials</router-link></li>
    </ul>

    <h2 class="govuk-heading-l">2. Supporting documentation</h2>

    <ul class="govuk-list">
      <li><router-link :to="{ name: 'DocumentationLocation', params: { applicationId: this.applicationId }}" class="govuk-link">Add a location plan</router-link></li>
      <li><router-link :to="{ name: 'DocumentationDesignAccessStatement'}" class="govuk-link">Add a Design and Access statement</router-link></li>
      <li><router-link :to="{ name: 'DocumentationHeritageStatement'}" class="govuk-link">Add a Heritage statement</router-link></li>
      <li><router-link :to="{ name: 'DocumentationAdditionalPlans'}" class="govuk-link">Add aditional plans</router-link></li>
    </ul>

    <h2 class="govuk-heading-l">3. Declarations</h2>

    <ul class="govuk-list">
      <li><router-link :to="{ name: 'DeclarationOfInterest'}" class="govuk-link">Declaration of interest</router-link></li>
      <li><router-link :to="{ name: 'DeclarationsOwnership'}" class="govuk-link">Ownership Certificate Declaration</router-link></li>
    </ul>


    <h2 class="govuk-heading-l">4. Contact details</h2>

    <ul class="govuk-list">
      <li><router-link :to="{ name: 'ApplicationContact'}" class="govuk-link">Agent details</router-link></li>
      <li><router-link :to="{ name: 'ApplicationContactApplicant'}" class="govuk-link">Applicant details</router-link></li>
      
    </ul>

    <h2 class="govuk-heading-l">5. Pay and submit</h2>

    <ul class="govuk-list">
      <li><router-link :to="{ name: 'Eligibility'}" class="govuk-link">Check eligibility</router-link></li>
      <li><router-link :to="{ name: 'Pay'}" class="govuk-link">Payment</router-link></li>
    </ul>
  </div>
</template>

<script>
  import { getRouteAppId } from '../mixins/getRouteAppId';
  export default {
    mixins: [ getRouteAppId ],
    name: 'Overview',
    components: {
    },
    computed: {
      //todo
      applicationAddress () {
        const applications = this.$store.state.state.applications;
        const result = applications.find( application => application.data.id === this.applicationId );
        return result.selectedAddress;
      }
    }
  }
</script>
