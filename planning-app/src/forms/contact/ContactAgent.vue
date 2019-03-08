<template>
	<div>
		<div class="govuk-form-group">
      <fieldset class="govuk-fieldset" aria-describedby="agent-contact-hint">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h1 class="govuk-fieldset__heading">
            About the agent
          </h1>
        </legend>

        <h4 class="govuk-heading-s">
					Personal details
				</h4>
      </fieldset>
    </div>

    <div class="govuk-form-group">
      <label class="govuk-label" for="name">
        Full name
      </label>
      <input class="govuk-input" id="name" name="name" type="text">
    </div>

    <div class="govuk-form-group">
      <label class="govuk-label" for="name">
        Company name (optional)
      </label>
      <input class="govuk-input" id="name" name="name" type="text">
    </div>

    <fieldset class="govuk-fieldset">
      <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
        <h3 class="govuk-heading-m">
          What is your address?
        </h3>
      </legend>

      <div class="govuk-form-group">
        <label class="govuk-label" for="address-line-1">
          Building and street
          <span class="govuk-visually-hidden">line 1 of 2</span>
        </label>
        <input class="govuk-input" id="address-line-1" name="address-line-1" type="text">
      </div>

      <div class="govuk-form-group">
        <label class="govuk-label" for="address-line-2">
          <span class="govuk-visually-hidden">Building and street line 2 of 2</span>
        </label>
        <input class="govuk-input" id="address-line-2" name="address-line-2" type="text">
      </div>

      <div class="govuk-form-group">
        <label class="govuk-label" for="address-town">
          Town or city
        </label>
        <input class="govuk-input govuk-!-width-two-thirds" id="address-town" name="address-town" type="text">
      </div>

      <div class="govuk-form-group">
        <label class="govuk-label" for="address-county">
          County
        </label>
        <input class="govuk-input govuk-!-width-two-thirds" id="address-county" name="address-county" type="text">
      </div>

      <div class="govuk-form-group">
        <label class="govuk-label" for="address-postcode">
          Postcode
        </label>
        <input class="govuk-input govuk-input--width-10" id="address-postcode" name="address-postcode" type="text">
      </div>

    </fieldset>

		<v-cta name="Next" :onClick="navigate"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';

export default {
	name: 'ContactAgent',
	components: {
    vCta
  },
  data () {
    return {}
  },
	methods: {
    navigate() {
      router.push({ name: 'ApplicationContactApplicant' });
    },
    onClickChild (value) {
      return value;
    }
  }
}
</script>