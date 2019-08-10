<template>
  <div>
    <div class="govuk-form-group">
      <fieldset class="govuk-fieldset">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--l">
          <h2 class="govuk-fieldset__heading">
            Are you an agent acting on behalf of the applicant?
          </h2>
        </legend>
        <div class="govuk-radios govuk-radios--inline">
          <div class="govuk-radios__item">
            <input class="govuk-radios__input" id="account-type-1" name="changed-name" type="radio" value="agent" v-model="accountType">
            <label class="govuk-label govuk-radios__label" for="account-type-1">
              Yes, you're acting on behalf of the applicant
            </label>
          </div>
          <div class="govuk-radios__item">
            <input class="govuk-radios__input" id="account-type-2" name="changed-name" type="radio" value="applicant" v-model="accountType">
            <label class="govuk-label govuk-radios__label" for="account-type-2">
              No, you're the applicant
            </label>
          </div>
        </div>
      </fieldset>


    </div>
    <v-cta name="Continue" :onClick="navigate"></v-cta>
  </div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';

export default {
	name: 'ContactApplicant',
	components: {
    vCta
  },
  data () {
    return {
      accountType: '',
      showErrorMessage: false
    }
  },
	methods: {
    navigate() {
      if (this.accountType && this.accountType === 'agent') {
        router.push({ name: 'ApplicationContactAgent' });
      } else if (this.accountType && this.accountType === 'applicant') {
        router.push({ name: 'ApplicationContactApplicant' });
      } else {
        this.showErrorMessage;
      }
      
    }
  },
  computed: {
		canContactApplicant () {
			return this.contactApplicant === 'Yes';
		}
	}
}
</script>        
        
        
        
