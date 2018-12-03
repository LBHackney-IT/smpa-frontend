<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <h1 class="govuk-heading-xl">Submit a Planning Application</h1>
      <Steps v-bind:steps="steps" />
    </div>
  </div>
</template>

<script>
  import Steps from '../components/Steps.vue';

  const steps = [{
    title: "Site details",
    name: "SiteDetails",
    content: '<p>View the geographic information related to your site.</p><a class="govuk-button" href="/sites/search">Find about your site</a>',
    isActive: false
  },
  {
    title: "Description of the works",
    name: "FormWorkDescription",
    content: '<p>Supply relevant information to describe your proposal.</p>',
    isActive: false
  },
  {
    title: "Supporting documentation",
    name: "FormDocumentation",
    content: '<p>Supply documentation to describe your proposal.</p>',
    isActive: false
  },
  {
    title: "Declarations", 
    name: "FormDeclarations",
    content: '<p>Make the necessary legal declarations.</p>',
    isActive: false
  },
  {
    title: "Contact details",
    name: "FormContact",
    content: '<p>Supply your details/details of the applicant so the local authority can contact you. </p>',
    isActive: false
  },
  {
    title: "Pay and submit",
    name: "FormPaySubmit",
    content: '<p>Payment of the correct fee is required at the point of submission. If you don’t supply the correct fee you risk your application being invalid. You can pay for your application as part of this service using credit or debit card. <a target="_blank" href="https://hackney.gov.uk/planning-guidance#Back%20to%20top">Read more information</a> on current planning fees.</p>',
    isActive: false
  }];

  export default {
    name: 'PlanningApplicationsSteps',
    components: {
      Steps
    },
    data() {
      return { steps };
    }
  }
</script>
