<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <h1 class="govuk-heading-xl">Search site</h1>

        <div class="govuk-form-group">
            <label class="govuk-label" for="name">
                Enter postcode
            </label>
            <input class="govuk-input" id="name" name="name" type="text">
        </div>

        <button type="submit" class="govuk-button">
            Find Address
        </button>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'SiteSearch'
    }
</script>
