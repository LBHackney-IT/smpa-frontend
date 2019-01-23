<template>
  <div class="govuk-radios__item">
    <input 
      class="govuk-radios__input" 
      :id="id" 
      :name="name"  
      type="radio" 
      :value="value">
    <label 
      class="govuk-label govuk-radios__label" 
      :for="value">
        {{ label }}
    </label>
  </div>
</template>

<script>
  export default {
    name: 'RadioButton',
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