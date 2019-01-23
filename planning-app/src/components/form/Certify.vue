<template>
	<div class="govuk-!-margin-bottom-5 govuk-!-margin-top-5">
		<div class="govuk-form-group">
      <fieldset class="govuk-fieldset" aria-describedby="certify-statement">
        <div class="govuk-checkboxes">
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="certify" name="certify" type="checkbox" value="yes" v-model="accept">
            <label class="govuk-label govuk-checkboxes__label" for="certify">
              {{ statement }}
            </label>
          </div>
        </div>
      </fieldset>
    </div>

    <div class="govuk-form-group">
      <label class="govuk-label" v-bind:for="certify + '-name'">
        Full name
      </label>
      <input class="govuk-input" v-bind:id="certify + '-name'" v-bind:name="certify + '-name'" type="text" v-model="fullName">
    </div>

    <div class="govuk-form-group">
      <fieldset class="govuk-fieldset" aria-describedby="doa-hint" role="group">
        <div class="govuk-date-input" v-bind:id="certify + 'doa'">
          <div class="govuk-date-input__item">
            <div class="govuk-form-group">
              <label class="govuk-label govuk-date-input__label" v-bind:for="certify + 'doa-day'">
                Day
              </label>
              <input class="govuk-input govuk-date-input__input govuk-input--width-2" v-bind:id="certify + 'doa-day'" v-bind:name="certify + 'doa-day'" type="number" pattern="[0-9]*" v-model="day">
            </div>
          </div>
          <div class="govuk-date-input__item">
            <div class="govuk-form-group">
              <label class="govuk-label govuk-date-input__label" v-bind:for="certify + 'doa-month'">
                Month
              </label>
              <input class="govuk-input govuk-date-input__input govuk-input--width-2" v-bind:id="certify + 'doa-month'" v-bind:name="certify + 'doa-month'" type="number" pattern="[0-9]*" v-model="month">
            </div>
          </div>
          <div class="govuk-date-input__item">
            <div class="govuk-form-group">
              <label class="govuk-label govuk-date-input__label" v-bind:for="certify + 'doa-year'">
                Year
              </label>
              <input class="govuk-input govuk-date-input__input govuk-input--width-4" v-bind:id="certify + 'doa-year'" v-bind:name="certify + 'doa-year'" type="number" pattern="[0-9]*" v-model="year">
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
    certify: {
      type: String,
      required: true
    },
    statement: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      accept: '',
      fullName: '',
      day: '',
      month: '',
      year: ''
    }
  },
  methods: {
    saveAndReturn (event) {
      this.$emit('clicked', this.$data);
    }
  }
}
</script>