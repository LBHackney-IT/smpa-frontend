<template>
  <div class="govuk-checkboxes__item">
    <input 
      class="govuk-checkboxes__input" 
      :id="id" 
      :name="name" 
      type="checkbox" 
      :value="value" 
      @change="updateValue">
    <label class="govuk-label govuk-checkboxes__label" :for="value">
      {{ label }}
    </label>
  </div>
</template>

<script>
  export default {
    name: 'Checkbox',
    props: {
      name: {
        type: String,
        required: true
      },
      id: {
        type: String,
        required: true
      },
      label: {
        type: String,
        required: true
      },
      value: {
        type: Boolean,
        required: true
      }
    },
    methods: {
      updateValue (content) {
        this.$emit('input', content)
      }
    }
  }
</script>