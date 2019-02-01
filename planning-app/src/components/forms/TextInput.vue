<template>
  <div>
    <h2>{{question.question}}</h2>
    <div class="govuk-form-group" v-for="(option, index) in question.fields" :key="index">
      <vTextInput :option="option"></vTextInput>
    </div>
  </div>
</template>

<script>
import vTextInput from '../form-elements/vTextInput.vue';
export default {
  name: 'TextInput',
  components: {
    vTextInput
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