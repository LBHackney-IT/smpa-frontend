<template>
  <div>
    <BackLink />
    <div class="govuk-grid-row">
      <div class="govuk-grid-column-two-thirds">
        <div class="govuk-form-group">
          <fieldset class="govuk-fieldset" aria-describedby="what-do-you-want-to-do">
            <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
              <h1 class="govuk-fieldset__heading">
                What do you want to do?
              </h1>
            </legend>
            <div class="govuk-radios">
              <div class="govuk-radios__item">
                <input class="govuk-radios__input" id="to-do-pre-application" name="to-do-pre-application" type="radio" value="pre-app">
                <label class="govuk-label govuk-radios__label" for="to-do-pre-application">
                  <h2 class="govuk-heading-l">Pre-application</h2>
                </label>

                <p class="govuk-body">Pre-application advice is encouraged before submitting a planning application. This can:</p>

                <ul class="govuk-list govuk-list--bullet">
                  <li>Help you understand how planning policies and other requirements may affect your proposal</li>
                  <li>Identify at an early stage any need of a specialist advice or surveys on trees, landscapes, noise, transports, contamined land, ecology or archaelogy</li>
                  <li>Pay the application fee online</li>
                  <li>Help identify if proposals are acceptable, saving the cost of plans and application fees</li>
                </ul>
              </div>
                <div class="govuk-radios__item">
                  <input class="govuk-radios__input" id="to-do-application" name="to-do-application" type="radio" value="application">
                  <label class="govuk-label govuk-radios__label govuk-heading-l" for="to-do-application">
                    <h2 class="govuk-heading-l">Application</h2>
                  </label>
                </div>

                <div class="govuk-radios__item">
                  <input class="govuk-radios__input" id="to-do-find-site" name="to-do-find-site" type="radio" value="find-site">
                  <label class="govuk-label govuk-radios__label govuk-heading-l" for="to-do-find-site">
                    <h2 class="govuk-heading-l">Find out about your site</h2>
                  </label>
                </div>
            </div>
          </fieldset>
        </div>

        <button type="submit" class="govuk-button">
          Continue
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import BackLink from '../components/BackLink.vue'
  export default {
    name: 'WhatToDo',
    components: {
      BackLink
    }
  }
</script>
