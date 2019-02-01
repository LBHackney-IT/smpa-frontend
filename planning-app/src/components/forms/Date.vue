<template>
<div class="govuk-form-group">
  <fieldset class="govuk-fieldset" aria-describedby="dob-hint" role="group">
    <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
      <h1 class="govuk-fieldset__heading">
        {{question.question}}
      </h1>
    </legend>
    <span id="dob-hint" class="govuk-hint">
      For example, 31 3 1980
    </span>

    <div v-for="(field, index) in question.fields" :key="index">
      <div class="govuk-date-input" :id="field.id">
        <v-date :option="option" v-for="(option, index) in field.group" :key="index"></v-date>
      </div>
    </div>
  </fieldset>
</div>
</template>

<script>
import vDate from '../form-elements/vDate.vue';
export default {
  name: 'Date',
  components: {
    vDate
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