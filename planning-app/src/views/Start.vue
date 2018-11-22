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
    title: "Site details",
    name: "SiteDetails",
    content: '<p>View the geographic information related to your site.</p>',
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
    name: 'Home',
    components: {
      Steps
    },
    data() {
      return { steps };
    }
  }
</script>
