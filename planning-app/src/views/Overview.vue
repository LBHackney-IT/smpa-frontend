<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <h1 class="govuk-heading-xl">Submit a planning application</h1>

      <p class="govuk-body">
        Check if you need planning permission, find out how to apply, submit pre-applications and applications and view information the Hackney's GIS services has about your site.
      </p>

      <div class="govuk-inset-text">
        You can only use this service if you're applying for householder of full planning applications.
      </div>

      <Steps v-bind:steps="steps" />
    </div>
  </div>
</template>

<script>
  import Steps from '../components/Steps.vue';

  const steps = [{
    title: "Check if you need planning permission",
    name: "CheckIfPlanningPermissionIsNeeded",
    content: '<p>Check if you need planning permission</p>',
    isActive: false
  },
  {
    title: "Find out about your site constraints",
    name: "FindSiteContrainsts",
    content: '<p>Find out about your site constraints <a href="/sites/search">usera</a></p>',
    isActive: false
  },
  {
    title: "Prepare your documentation",
    name: "PrepareYourDocumentation",
    content: '<p>Prepare your documentation</p>',
    isActive: false
  },
  {
    title: "Submit your planning application", 
    name: "SubmitPlanningApplication",
    content: '<p>Submit Planning Application</p>',
    isActive: false
  },
  {
    title: "What's next",
    name: "WhatsNext",
    content: '<p>Whats Next</p>',
    isActive: false
  }];

  export default {
    name: 'Overview',
    components: {
      Steps
    },
    data() {
      return { steps };
    }
  }
</script>
