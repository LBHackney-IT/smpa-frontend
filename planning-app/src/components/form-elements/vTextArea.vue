<template>
  <div class="govuk-form-group">
    <label class="govuk-label" :for="name">
      {{ label }}
    </label>
    <span id="hint" class="govuk-hint">
      Do not include personal or financial information, like your National Insurance number or credit card details.
    </span>
    <textarea 
      class="govuk-textarea" 
      :id="name" 
      :name="name" 
      rows="5" 
      aria-describedby="hint" 
      :value="content" 
      :required="isRequired"
      @input="updateSelf($event.target.value)">
    </textarea>
  </div>
</template>

<script>
  export default {
    name: 'TextArea',
    props: {
      name: {
        type: String,
        required: true
      },
      content: {
        type: String,
        required: false
      },
      label: {
        type: String,
        required: true
      },
      isRequired: {
        type: Boolean,
        required: false
      }
    },
    methods: {
      updateSelf (content) {
        this.$emit('input', content)
      }
    }
  }
</script>