<template>
  <div class="">
    <input 
      class="" 
      :id="option.id" 
      :name="option.name"  
      type="radio" 
      :value="option.value">
    <label 
      class="" 
      :for="option.value">
        {{ option.label }}
    </label>
  </div>
</template>

<script>
  export default {
    name: 'BoolRadioButton',
    props: {
      option: {
        type: Object,
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