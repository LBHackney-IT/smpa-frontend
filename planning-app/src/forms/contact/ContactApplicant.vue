<template>
	<div>
    <div v-if="!this.applicationOnBehalfOfTheApplicant">
      <div class="govuk-form-group">
        <fieldset class="govuk-fieldset" aria-describedby="agent-contact-hint">
          <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
            <h1 class="govuk-fieldset__heading">
              About the applicant
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


    </div>

    <div v-if="this.applicationOnBehalfOfTheApplicant">
      <div class="govuk-form-group">
        <fieldset class="govuk-fieldset" aria-describedby="materials-hint">
          <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
            <h1 class="govuk-fieldset__heading">
              About the applicant
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
        <input class="govuk-input" id="name" name="name" type="text" v-model="full_name">
      </div>

      <div class="govuk-form-group">
        <fieldset class="govuk-fieldset" aria-describedby="contact-applicant-hint">
          <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h3 class="govuk-heading-s">
            If the planning authority needs to make an appointment to carry out a site visit, should the applicant be contacted?
          </h3>
          </legend>
          <div class="govuk-radios govuk-radios--inline">
            <div class="govuk-radios__item">
              <input class="govuk-radios__input" id="contact-applicant-1" name="contact-applicant" type="radio" value="Yes" v-model="contactApplicant">
              <label class="govuk-label govuk-radios__label" for="contact-applicant-1">
                Yes
              </label>
            </div>
            <div class="govuk-radios__item">
              <input class="govuk-radios__input" id="contact-applicant-2" name="contact-applicant" type="radio" value="No" v-model="contactApplicant">
              <label class="govuk-label govuk-radios__label" for="contact-applicant-2">
                No
              </label>
            </div>
          </div>
        </fieldset>
      </div>

      <div v-if="canContactApplicant" class="govuk-inset-text">
        <div class="govuk-form-group">
          <label class="govuk-label" for="name">
            Enter applicant's phone number
          </label>
          <input class="govuk-input" id="name" name="name" type="tel" v-model="phone">
        </div>

        <div class="govuk-form-group">
          <label class="govuk-label" for="name">
            Enter applicant's email address
          </label>
          <input class="govuk-input" id="name" name="name" type="email" v-model="email">
        </div>

      </div>

    </div>

    <error-message v-if="showErrorMessage && !loading" :message="errorMessages.CONTACT.GENERIC_ERROR"></error-message>

		<v-cta name="Save and continue" :onClick="navigate"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';
import { getRouteAppId } from '../../mixins/getRouteAppId';
import ErrorMessage from '../../components/ErrorMessage.vue';
import * as errorMessage from '../../messages/errorMessages';

export default {
  name: 'ContactApplicant',
  mixins: [ getRouteAppId ],
	components: {
    vCta,
    ErrorMessage
  },
  data () {
    return {
      contactApplicant: '',
      full_name: '',
      company: '',
      address_line_1: '',
      address_line_2: '',
      town_city: '',
      postcode: '',
      phone: '',
      email: '',
      showErrorMessage: false,
      errorMessages: undefined
    }
  },
  created () {
    this.errorMessages = errorMessage;
  },
  watch: {
    application () {
			this.loadExistingAnswers();
		}
  },
	methods: {
    loadExistingAnswers () {
      if (this.application.data.applicant) {
        this.full_name = this.application.data.applicant.full_name;
        this.company = this.application.data.applicant.company;
        this.address_line_1 = this.application.data.applicant.address_line_1;
        this.address_line_2 = this.application.data.applicant.address_line_2;
        this.town_city = this.application.data.applicant.town_city;
        this.postcode = this.application.data.applicant.postcode;
        this.phone = this.application.data.applicant.phone;
        this.email = this.application.data.applicant.email;
        this.contactApplicant = this.application.data.contact_applicant ? 'Yes' : 'No';
      }
		},
    navigate() {
      var payload = {};
      payload.id = this.applicationId;
      payload.data = {};
      payload.data.applicant ={};

      payload.data.applicant.full_name = this.full_name;
      payload.data.applicant.company = this.company;
      payload.data.applicant.address_line_1 = this.address_line_1;
      payload.data.applicant.address_line_2 = this.address_line_2;
      payload.data.applicant.town_city = this.town_city;
      payload.data.applicant.postcode = this.postcode;
      payload.data.applicant.phone = this.phone;
      payload.data.applicant.email = this.email;

      if (this.contactApplicant === 'Yes') {
        payload.data.contact_applicant = true;
      }

      this.$store.dispatch('updateApplication', payload).then((response) => {
        if (response.error) {
          this.showErrorMessage = true;
        } else {
          router.push({ name: 'Declarations' });
        }
      });
      
    }
  },
	computed: {
    canContactApplicant () {
			return this.contactApplicant === 'Yes';
    },
		application () {
      let index = this.$store.state.state.applications.findIndex( application => application.data.id === this.applicationId );
			return this.$store.state.state.applications[index];
    },
    applicationOnBehalfOfTheApplicant () {
      return this.application.data.agent !== null && this.application.data.agent !== undefined;
    }
	},
}
</script>