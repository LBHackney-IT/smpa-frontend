<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <h1 class="govuk-heading-xl">Apply online for planning permission</h1>

      <p class="govuk-body">This service is still being improved but currently you can:</p>

      <ul class="govuk-list govuk-list--bullet">
        <li>Apply for planning applications</li>
        <li>Attach supporting documents and plans</li>
        <li>Pay the application fee online</li>
        <li>View information of the Hackney's GIS services has about your site</li>
        <li>Give someone else permission to edit and/or pay an application for you</li>
      </ul>

      <div class="govuk-inset-text">
        You can only use this service if you're applying for householder of full planning applications
      </div>

      <router-link tag="button" class="govuk-button" id="button" :to="{ name: 'SiteSearch'}">Start now</router-link>

      <h4 class="govuk-heading-m">Contact</h4>
      <div class="govuk-inset-text">
        <p><strong>Planning</strong></p>
        <p>planning@hackney.gov.uk</p>
        <p>Telephone: 000 000 000 000</p>
      </div>
    </div>

    <div class="govuk-grid-column-one-third">
      <div class="gem-c-contextual-sidebar">   
        <aside class="gem-c-taxonomy-navigation">
          <h3 class="govuk-heading-m">Related content</h3>
          <p class="govuk-body">Explore the topic</p>
          <div>
              <h3 class="gem-c-taxonomy-navigation__heading">
                  <a class="gem-c-taxonomy-navigation__link" href="#">Planning in Hackney</a>
              </h3>
              <p class="gem-c-taxonomy-navigation__taxon-description">
              </p>
          </div>
        </aside>
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
    title: "Apply", 
    name: "SubmitPlanningApplication",
    content: '<p>Apply online. You will need to create and account of you are a new applicant or sign into an existing account if you are a returning applicant.</p>',
    isActive: true
  },
  {
    title: "What's next",
    name: "WhatsNext",
    content: '<p>Whats Next</p>',
    isActive: false
  }];

  export default {
    name: 'Home',
    components: {
      Steps
    },
    data() {
      return { steps };
    }
  }
</script>
