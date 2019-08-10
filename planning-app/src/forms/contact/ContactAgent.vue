<template>
	<div>
		<div class="govuk-form-group">
      <fieldset class="govuk-fieldset" aria-describedby="agent-contact-hint">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h1 class="govuk-fieldset__heading">
            About the agent
          </h1>
        </legend>

        <h2 class="govuk-heading-m">
					Personal details
				</h2>

        <label class="govuk-label" for="full-name">
          Full name
        </label>
        <input class="govuk-input" id="full-name" name="full-name" type="text" v-model="full_name">

        <label class="govuk-label" for="company-name">
          Company name (optional)
        </label>
        <input class="govuk-input" id="company-name" name="company-name" type="text" v-model="company">

      </fieldset>
    </div>
    <div class="govuk-form-group">

      <fieldset class="govuk-fieldset">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h2 class="govuk-heading-m">
            What is your address?
          </h2>
        </legend>

        <div class="govuk-form-group">
          <label class="govuk-label" for="address-line-1">
            Building and street
            <span class="govuk-visually-hidden">line 1 of 2</span>
          </label>
          <input class="govuk-input" id="address-line-1" name="address-line-1" type="text" v-model="address_line_1">
        </div>

        <div class="govuk-form-group">
          <label class="govuk-label" for="address-line-2">
            <span class="govuk-visually-hidden">Building and street line 2 of 2</span>
          </label>
          <input class="govuk-input" id="address-line-2" name="address-line-2" type="text" v-model="address_line_2">
        </div>

        <div class="govuk-form-group">
          <label class="govuk-label" for="address-town">
            Town or city
          </label>
          <input class="govuk-input govuk-!-width-two-thirds" id="address-town" name="address-town" type="text" v-model="town_city">
        </div>
    
        <div class="govuk-form-group">
          <label class="govuk-label" for="address-postcode">
            Postcode
          </label>
          <input class="govuk-input govuk-input--width-10" id="address-postcode" name="address-postcode" type="text" v-model="postcode">
        </div>
      </fieldset>
    </div>
    <div class="govuk-form-group">

    <fieldset class="govuk-fieldset">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h2 class="govuk-heading-m">
            What are your contact details?
          </h2>
        </legend>

        <div class="govuk-form-group">
          <label class="govuk-label" for="address-phone">
            Phone
          </label>
          <input class="govuk-input govuk-input--width-10" id="address-phone" name="address-phone" type="tel" v-model="phone">
        </div>


        <div class="govuk-form-group">
          <label class="govuk-label" for="address-email">
            Email
          </label>
          <input class="govuk-input govuk-input--width-10" id="address-email" name="address-email" type="email" v-model="email">
        </div>

      </fieldset>
    </div>


		<v-cta name="Continue" :onClick="submit"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import { getRouteAppId } from '../../mixins/getRouteAppId';
import router from '../../router';

export default {
  name: 'ContactAgent',
  mixins: [ getRouteAppId ],
	components: {
    vCta
  },
  data () {
    return {
      full_name: '',
      company: '',
      address_line_1: '',
      address_line_2: '',
      town_city: '',
      postcode: '',
      phone: '',
      email: ''
    }
  },
	methods: {
    submit() {
      var payload = {};
      payload.id = this.applicationId;
      payload.data = {};
      payload.data.agent ={};

      payload.data.agent.full_name = this.full_name;
      payload.data.agent.company = this.company;
      payload.data.agent.address_line_1 = this.address_line_1;
      payload.data.agent.address_line_2 = this.address_line_2;
      payload.data.agent.town_city = this.town_city;
      payload.data.agent.postcode = this.postcode;
      payload.data.agent.phone = this.phone;
      payload.data.agent.email = this.email;

      this.$store.dispatch('updateApplication', payload).then(() => {

        router.push({ name: 'ApplicationContactApplicant' });

      });
    }
  }
}
</script>