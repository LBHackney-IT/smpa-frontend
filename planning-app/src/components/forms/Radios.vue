<template>
  <div class="govuk-form-group">
    <fieldset class="govuk-fieldset" aria-describedby="work-started-hint">
      <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
        <h1 class="govuk-fieldset__heading">
          {{ question.caption }}
        </h1>
      </legend>
      <div class="govuk-radios govuk-radios--inline">
        <vRadioButton></vRadioButton>
      </div>
    </fieldset>
  </div>
</template>

<script>
import vRadioButton from '../form-elements/vRadioButton.vue';
export default {
  name: 'Radios',
  components: {
    vRadioButton
  },
  props: {
    question: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  methods: {
    saveAndReturn (event) {
      this.$emit('clicked', this.$data);
    }
  }
}
</script>