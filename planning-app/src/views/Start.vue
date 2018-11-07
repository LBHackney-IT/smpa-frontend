<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <h1 class="govuk-heading-xl">Submit my plan</h1>

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

      <router-link tag="button" class="govuk-button" id="button" :to="{ name: 'WhatToDo'}">Start now</router-link>
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
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Home'
  }
</script>
