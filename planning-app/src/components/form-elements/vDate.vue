<template>
  <div class="govuk-date-input__item">
    <div class="govuk-form-group">
      <label class="govuk-label govuk-date-input__label" :for="option.name">
        {{ option.label }}
      </label>
      <input class="govuk-input govuk-date-input__input govuk-input--width-2" :id="option.id" :name="option.name" type="number" pattern="[0-9]*">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DateInput',
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