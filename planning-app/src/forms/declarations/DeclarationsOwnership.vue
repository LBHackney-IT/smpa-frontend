<template>
  <div class="govuk-form-group">
    <fieldset class="govuk-fieldset" aria-describedby="materials-hint">
      <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
        <h1 class="govuk-fieldset__heading">
          Ownership
        </h1>
      </legend>

      <h4 class="govuk-heading-m">
        Which of the following statements apply to the applicant?
        <!-- todo if agent above -->
        <!-- todo if member of the public: Which of the following statements apply to you? -->
      </h4>

      <div class="govuk-inset-text">
        An ‘owner’ is anyone with a freehold or leasehold interest for no fewer than 7 years.
      </div>

      <span class="govuk-hint">
        Select one
      </span>

      <div class="govuk-radios govuk-!-margin-bottom-9">
        <div class="govuk-radios__item" v-bind:key="option.id" v-for="option in this.defaultOptions">
          <input class="govuk-radios__input" v-bind:id="option.id" v-bind:name="option.name" type="radio" v-bind:value="option.id" v-model="typeOfOwnership">
          <label class="govuk-label govuk-radios__label" v-bind:for="option.id">
            {{option.name}}
          </label>
        </div>
      </div>
    </fieldset>

    <error-message v-if="showErrorMessage && !loading" :message="errorMessages.DECLARATION.GENERIC_ERROR"></error-message>

    <v-cta name="Continue" :onClick="navigate"></v-cta>
  </div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';
import { getRouteAppId } from '../../mixins/getRouteAppId';
import ErrorMessage from '../../components/ErrorMessage.vue';
import * as errorMessage from '../../messages/errorMessages';

export default {
  name: 'DeclarationsOwnership',
  mixins: [ getRouteAppId ],
	components: {
    vCta,
    ErrorMessage
  },
  data () {
    return {
      defaultOptions: undefined,
      typeOfOwnership: '',
      showErrorMessage: false,
      errorMessages: undefined

    }
  },
  beforeMount () {
    this.loadDefaultOptions();
  },
  created () {
    this.errorMessages = errorMessage;
  },
	methods: {
    loadDefaultOptions() {
      this.$store.dispatch('getDefaultData', 'ownership-types').then((response) => {
        this.defaultOptions = response.data;
      });
    },
    navigate() {
      var payload = {};
      payload.id = this.applicationId;
      payload.data = {};
      payload.data.ownership_type_id = this.typeOfOwnership;

      this.$store.dispatch('updateApplication', payload).then((response) => {

        if (response.error) {
          this.showErrorMessage = true;
        } else {
          router.push({ 
            name: 'OwnershipCertificateDeclaration', 
            params: { 
              doesApplicantOwnTheLand: this.typeOfOwnership 
            } 
          });
        }
      });    
    }
  }
}
</script>
