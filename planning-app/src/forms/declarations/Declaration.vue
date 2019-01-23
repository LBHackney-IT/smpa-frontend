<template>
	<div>
		<div class="govuk-form-group">
      <fieldset class="govuk-fieldset" aria-describedby="proposal-hint">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl govuk-!-margin-bottom-9">
          <h1 class="govuk-fieldset__heading">
            Declaration
          </h1>
        </legend>

        <div class="govuk-checkboxes">
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-1" name="proposal" type="checkbox" value="carcasses">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-1">
              I/we hereby apply for planinng permission as described in this form and the accompanying plans/drawings and additional information.
            </label>
          </div>


          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-2" name="proposal" type="checkbox" value="mines">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-2">
              I/we confirm that, to the best of my/our knowledge, any facts stated are true and accurate and any opinions given are the genuine opinions of the person(s) giving them.
            </label>
          </div>
        </div>
      </fieldset>
    </div>

    <div class="govuk-form-group">
      <label class="govuk-label" for="name">
        Full name
      </label>
      <input class="govuk-input" id="name" name="name" type="text">
    </div>

    <div class="govuk-form-group">
      <fieldset class="govuk-fieldset" aria-describedby="dob-hint" role="group">
        <div class="govuk-date-input" id="dob">
          <div class="govuk-date-input__item">
            <div class="govuk-form-group">
              <label class="govuk-label govuk-date-input__label" for="dob-day">
                Day
              </label>
              <input class="govuk-input govuk-date-input__input govuk-input--width-2" id="dob-day" name="dob-day" type="number" pattern="[0-9]*">
            </div>
          </div>
          <div class="govuk-date-input__item">
            <div class="govuk-form-group">
              <label class="govuk-label govuk-date-input__label" for="dob-month">
                Month
              </label>
              <input class="govuk-input govuk-date-input__input govuk-input--width-2" id="dob-month" name="dob-month" type="number" pattern="[0-9]*">
            </div>
          </div>
          <div class="govuk-date-input__item">
            <div class="govuk-form-group">
              <label class="govuk-label govuk-date-input__label" for="dob-year">
                Year
              </label>
              <input class="govuk-input govuk-date-input__input govuk-input--width-4" id="dob-year" name="dob-year" type="number" pattern="[0-9]*">
            </div>
          </div>
        </div>
      </fieldset>
    </div>
		<v-cta name="Next" :onClick="navigate"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/form-elements/Cta.vue';
import router from '../../router';

export default {
	name: 'AboutProposal',
	components: {
    vCta
  },
  data () {
    return {}
  },
	methods: {
    navigate() {
      router.push({ name: 'Success' });
    }
  }
}
</script>