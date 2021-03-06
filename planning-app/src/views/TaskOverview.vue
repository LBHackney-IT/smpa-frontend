<template>
  <div>
    <div class="purpose-message govuk-body" v-if="siteAddress">
      <p>Application type and site location are based entirely on the selections you have made. In order to change the address you must create a new application. <a class="govuk-link" href="/">Change site address</a>.</p>
      <span>{{siteAddress.address_line_1}}<br>
      {{siteAddress.address_line_2}}<br>
      {{siteAddress.address_line_3}}<br>
      {{siteAddress.postcode}} {{siteAddress.town_city}}</span> 
    </div>
    <h1 class="govuk-heading-xl">Application overview</h1>

    <p class="govuk-body">
      Complete the tasks below.
    </p>

    <h2 class="govuk-heading-l">1. Description of works</h2>

    <ul class="govuk-list">

      <!-- Location of the works -->
      <li class="task-overview-list__item">
        <span class="app-task-list__task-name"><router-link :to="{ name: 'SiteLocation'}" class="govuk-link">Location of the works</router-link></span>
      </li>

      <!-- Starting the works -->
      <li class="task-overview-list__item" v-if="!applicationSubmitted"><router-link :to="{ name: 'WorkStart'}" class="govuk-link">Starting the works</router-link></li>
      <li class="task-overview-list__item" v-if="applicationSubmitted">Starting the works</li>

      <!-- Create proposal -->
      <li class="task-overview-list__item" v-if="worksStartCompleted && !applicationSubmitted"><router-link :to="{ name: 'Proposal'}" class="govuk-link">Describe the proposed works</router-link></li>
      
      <li class="task-overview-list__item" v-if="!worksStartCompleted && !applicationSubmitted">
        <span>Describe the proposed works</span>
        <strong class="govuk-tag app-task-list__task-blocked">Can't start yet</strong>
      </li>

      <li class="task-overview-list__item" v-if="applicationSubmitted">Describe the proposed works</li>
      

      <!-- Trees -->
      <li class="task-overview-list__item" v-if="proposalChosen && !applicationSubmitted">
        <router-link :to="{ name: 'Trees'}" class="govuk-link">Describe the surroundings: Trees</router-link>
      </li>

      <li class="task-overview-list__item" v-if="applicationSubmitted">
        Describe the surroundings: Trees
      </li>

      <li class="task-overview-list__item" v-if="!proposalChosen && !applicationSubmitted">
        <span>Describe the surroundings: Trees</span>
        <strong class="govuk-tag app-task-list__task-blocked">Can't start yet</strong>
      </li>

      <!-- Materials -->
      <li class="task-overview-list__item" v-if="treesCompleted && !applicationSubmitted">
        <router-link :to="{ name: 'WhatMaterials'}" class="govuk-link">Define materials</router-link>
      </li>

      <li class="task-overview-list__item" v-if="!treesCompleted && !applicationSubmitted">
        <span>Define materials</span>
        <strong class="govuk-tag app-task-list__task-blocked">Can't start yet</strong>
      </li>

      <li class="task-overview-list__item" v-if="applicationSubmitted">
        Define materials
      </li>
    </ul>

    <h2 class="govuk-heading-l">2. Supporting documentation</h2>

    <ul class="govuk-list">
      <li class="task-overview-list__item" v-if="!applicationSubmitted">
        <router-link :to="{ name: 'DocumentationLocation', params: { applicationId: this.applicationId }}" class="govuk-link">Add a location plan</router-link>
      </li>

      <li class="task-overview-list__item" v-if="applicationSubmitted">
        Add a location plan
      </li>

      <li class="task-overview-list__item" v-if="siteIsInConservationArea && !applicationSubmitted">
        <router-link :to="{ name: 'DocumentationDesignAccessStatement'}" class="govuk-link">Add a Design and Access statement</router-link>
      </li>

      <li class="task-overview-list__item" v-if="applicationSubmitted">
        Add a Design and Access statement
      </li>

      <li class="task-overview-list__item" v-if="siteIsListedBuilding && !applicationSubmitted">
        <router-link :to="{ name: 'DocumentationHeritageStatement'}" class="govuk-link">Add a Heritage statement</router-link>
      </li>

      <li class="task-overview-list__item" v-if="applicationSubmitted">
        Add a Heritage statement
      </li>

      <li class="task-overview-list__item" v-if="!applicationSubmitted">
        <router-link :to="{ name: 'DocumentationAdditionalPlans'}" class="govuk-link">Add additional plans</router-link>
      </li>

      <li class="task-overview-list__item" v-if="applicationSubmitted">
        Add additional plans
      </li>
    </ul>

    <h2 class="govuk-heading-l">3. Declarations</h2>

    <ul class="govuk-list">
      <li class="task-overview-list__item" v-if="!applicationSubmitted"><router-link :to="{ name: 'DeclarationOfInterest'}" class="govuk-link">Declaration of interest</router-link></li>
      <li class="task-overview-list__item" v-if="!applicationSubmitted"><router-link :to="{ name: 'DeclarationsOwnership'}" class="govuk-link">Ownership Certificate Declaration</router-link></li>

      <li class="task-overview-list__item" v-if="applicationSubmitted">Declaration of interest</li>
      <li class="task-overview-list__item" v-if="applicationSubmitted">Ownership Certificate Declaration</li>
    </ul>


    <h2 class="govuk-heading-l">4. Contact details</h2>

    <ul class="govuk-list">
      <li class="task-overview-list__item" v-if="!applicationSubmitted"><router-link :to="{ name: 'ApplicationContact'}" class="govuk-link">Agent and/or applicant details</router-link></li>  
      <li class="task-overview-list__item" v-if="applicationSubmitted">Agent and/or applicant details</li>      
    </ul>

    <h2 class="govuk-heading-l">5. Pay and submit</h2>

    <ul class="govuk-list">
      <li class="task-overview-list__item"><router-link :to="{ name: 'FormOverview'}" class="govuk-link">Preview answers</router-link></li>

      <li class="task-overview-list__item" v-if="!applicationSubmitted"><router-link :to="{ name: 'Eligibility'}" class="govuk-link">Check eligibility and pay</router-link></li>
      <li class="task-overview-list__item" v-if="applicationSubmitted">This application has been submitted.</li>
      <!-- <li class="task-overview-list__item"><router-link :to="{ name: 'Pay'}" class="govuk-link">Payment</router-link></li> -->
    </ul>
  </div>
</template>

<script>
  import { getRouteAppId } from '../mixins/getRouteAppId';
  export default {
    mixins: [ getRouteAppId ],
    name: 'Overview',
    created () {

      // Not the ideal fix, more info on this in the project's README
      if (window.localStorage.getItem('signInRefresh')) {
        window.localStorage.removeItem('signInRefresh');
        window.location.reload();
      }
    },

    computed: {
      siteAddress () {
        return this.application.data.site_address;
      },

      application () {
        let index = this.$store.state.state.applications.findIndex( application => application.data.id === this.applicationId );
        return this.$store.state.state.applications[index];
      },

      worksStartCompleted () {
        if (
          this.application.data.works_started === null || 
          this.application.data.works_started === undefined ||
          this.application.data.works_started && this.application.data.date_works_started === null ||
          this.application.data.works_completed && this.application.data.date_works_completed === null) {
          return false;
        } else {
          return true;
        }
      },

      proposalChosen () {
        if (this.application.data.proposal_extension === null && this.application.data.proposal_equipment === null) {
          return false;
        } else {
          return true;
        }
      },
      
      treesCompleted () {
        if (this.application.data.proposal_extension) {
          if (this.application.data.proposal_extension.trees === null || this.application.data.proposal_extension.trees === undefined) {
            return false;
          } else {
            return true;
          }
        } else {
          return false;
        }

      },

      siteIsInConservationArea () {
        if (this.application && this.application.data && this.application.data.site_constraints && this.application.data.site_constraints.nb_conarea) {
          return this.application.data.site_constraints.nb_conarea > 0;
        } else {
          return false;
        }
        
      },

      siteIsListedBuilding() {
        if (this.application && this.application.data && this.application.data.site_constraints && this.application.data.site_constraints.is_listed_building) {
          return this.application.data.site_constraints.is_listed_building === "1";
        } else {
          return false;
        }
        
      },

      applicationSubmitted() {
        if (this.application.data.status.name === "Submitted") {
          return true;
        } else {
          return false;
        }
      }
    }
  }
</script>
