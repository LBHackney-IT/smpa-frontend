<template>
    <div class="govuk-inset-text warning-message" v-bind:class="{ alert: typeAlert }">
      <div class="govuk-warning-text">
        <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
        <strong class="govuk-warning-text__text">
          <span class="govuk-warning-text__assistive">Warning</span>
          {{ message }}
        </strong>
      </div>
    </div>
</template>

<script>
	
	export default {
		name: 'WarningMessage',
		props: {
      message: {
        type: String,
        required: true
      },
      typeAlert: {
        type: Boolean,
        required: false
      }
    }
	}
</script>