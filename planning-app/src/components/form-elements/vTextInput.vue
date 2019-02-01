<template>
  <div>
    <label class="govuk-label" :for="option.name">
      {{ option.label }}
    </label>
    <input class="govuk-input" :id="option.id" :name="option.name" type="text">
  </div>
</template>

<script>
  export default {
    name: 'TextInput',
    props: {
      option: {
        type: Object,
        required: true
      }
    },
    methods: {
      updateSelf (content) {
        this.$emit('input', content)
      }
    }
  }
</script>