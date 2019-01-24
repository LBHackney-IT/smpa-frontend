<template>
  <div>
    <div v-for="(question, index) in questions" :key="index">
      <h1>{{question.caption}}</h1>

      <start-again></start-again>
      <question-description></question-description>
      <purpose-message></purpose-message>
      <warning-message :message="warningMessage"></warning-message>
      <details-component></details-component>
      <question-caption></question-caption>


      <div v-for="(singleQuestion, index) in question.form" :key="index">
        <div v-if="singleQuestion.type === 'boolean'">
          <Radios :question="singleQuestion"></Radios>
        </div>

        <div v-else-if="singleQuestion.type === 'textinput'">
          text input
        </div>

        <div v-else-if="singleQuestion.type === 'radio'">
          <Radios :question="singleQuestion"></Radios>
        </div>

        <div v-else-if="singleQuestion.type === 'date'">
          date
        </div>

        <div v-else-if="singleQuestion.type === 'select'">
          select
        </div>

        <div v-else-if="singleQuestion.type === 'textarea'">
          text area
        </div>

        <div v-else-if="singleQuestion.type === 'input-with-selection'">
          input with selection
        </div>

        <div v-else-if="singleQuestion.type === 'checkboxes'">
          checkboxes
        </div>

        <div v-else>No form available to render</div>
      </div>
    </div>
  </div>
</template>

<script>
import StartAgain from '../../components/StartAgain.vue';
import QuestionDescription from '../../components/QuestionDescription.vue';
import PurposeMessage from '../../components/PurposeMessage.vue';
import WarningMessage from '../../components/WarningMessage.vue';
import DetailsComponent from '../../components/Details.vue';
import QuestionCaption from '../../components/QuestionCaption.vue';
import Radios from '../../components/forms/Radios.vue';


export default {
  name: 'QuestionGenerator',
  components: {
    StartAgain,
    QuestionDescription,
    PurposeMessage,
    WarningMessage,
    DetailsComponent,
    QuestionCaption,
    Radios
  },
  props: {
    questions: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      warningMessage: {
        message: 'You can be fined up to £5,000 if you do not register.',
        typeAlert: false
      }
    }
  },
  methods: {
    saveAndReturn (event) {
      this.$emit('clicked', this.$data);
    }
  }
}
</script>