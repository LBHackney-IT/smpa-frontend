<template>
	<div class="govuk-!-margin-bottom-5 govuk-!-margin-top-5">
    <div class="govuk-form-group">
      <label class="govuk-label" v-bind:for="notice + '-steps'">
        {{ tenantsNotifyQuestionOne }}
      </label>
      
      <textarea 
        class="govuk-textarea" 
        v-bind:id="notice + '-steps'" 
        v-bind:name="notice + '-steps'" 
        rows="5" 
        aria-describedby="detailed-steps" 
        v-model="steps">
      </textarea>
    </div>

    <div class="govuk-form-group">
      <label class="govuk-label" v-bind:for="notice + '-newspaper'">
        {{ tenantsNotifyQuestionTwo }}
      </label>

      <div class="govuk-inset-text">
        {{ tenantsNotifyQuestionTwoWarning }}
      </div>
      
      <textarea 
        class="govuk-textarea" 
        v-bind:id="notice + '-newspaper'" 
        v-bind:name="notice + '-newspaper'" 
        rows="5" 
        aria-describedby="detailed-newspaper" 
        v-model="newspaper">
      </textarea>
    </div>

    <div class="govuk-form-group">

      <p class="govuk-label">
        {{ tenantsNotifyQuestionThree }}
      </p>

      <div class="govuk-inset-text">
        {{ tenantsNotifyQuestionThreeWarning }}
      </div>

      <fieldset class="govuk-fieldset" aria-describedby="dop-hint" role="group">
        <div class="govuk-date-input" v-bind:id="notice + 'dop'">
          <div class="govuk-date-input__item">
            <div class="govuk-form-group">
              <label class="govuk-label govuk-date-input__label" v-bind:for="notice + 'dop-day'">
                Day
              </label>
              <input class="govuk-input govuk-date-input__input govuk-input--width-2" v-bind:id="notice + 'dop-day'" v-bind:name="notice + 'dop-day'" type="number" pattern="[0-9]*" v-model="day">
            </div>
          </div>
          <div class="govuk-date-input__item">
            <div class="govuk-form-group">
              <label class="govuk-label govuk-date-input__label" v-bind:for="notice + 'dop-month'">
                Month
              </label>
              <input class="govuk-input govuk-date-input__input govuk-input--width-2" v-bind:id="notice + 'dop-month'" v-bind:name="notice + 'dop-month'" type="number" pattern="[0-9]*" v-model="month">
            </div>
          </div>
        </div>
      </fieldset>
    </div>
		<v-cta class="govuk-!-margin-top-5" name="Save" :onClick="saveAndReturn"></v-cta>
	</div>
</template>

<script>
import vCta from '../form-elements/Cta.vue';
export default {
  name: 'Certify',
  components: {
    vCta
  },
  props: {
    notice: {
      type: String,
      required: true
    },
    tenantsNotifyQuestionOne: {
      type: String,
      required: true
    },
    tenantsNotifyQuestionTwo: {
      type: String,
      required: true
    },
    tenantsNotifyQuestionTwoWarning: {
      type: String,
      required: true
    },
    tenantsNotifyQuestionThree: {
      type: String,
      required: true
    },
    tenantsNotifyQuestionThreeWarning: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      steps: '',
      newspaper: '',
      day: '',
      month: '',
    }
  },
  methods: {
    saveAndReturn (event) {
      this.$emit('clicked', this.$data);
    }
  }
}
</script>