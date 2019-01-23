<template>
  <button @click="onClick" type="button" class="govuk-button">
    {{ name }}
  </button>
</template>

<script>
  export default {
    name: 'Cta',
    props: {
      onClick: {
        type: Function,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    }
  }
</script>