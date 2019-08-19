<template>
    <div class="govuk-inset-text govuk-inset-text--error ">
      {{ message }}
    </div>
</template>

<script>
	
	export default {
		name: 'ErrorMessage',
		props: {
      message: {
        type: String,
        required: true
      }
    }
	}
</script>