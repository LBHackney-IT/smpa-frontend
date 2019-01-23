<template>
	<div>
		<div class="govuk-form-group">
      <fieldset class="govuk-fieldset" aria-describedby="materials-hint">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h1 class="govuk-fieldset__heading">
            Ownership
          </h1>
        </legend>

        <h4 class="govuk-heading-s">
					Does the applicant own the land?
				</h4>

        <div class="govuk-inset-text">
          Owner is a person with a freehold interest or leasehold interest with at least 7 years left to run.
        </div>
      </fieldset>
    </div>

    <div class="govuk-radios govuk-radios--inline">
      <div class="govuk-radios__item">
        <input class="govuk-radios__input" id="owner-yes" name="owner-yes" type="radio" value="Yes" v-model="doesApplicantOwnTheLand">
        <label class="govuk-label govuk-radios__label" for="owner-yes">
          Yes
        </label>
      </div>

      <div class="govuk-radios__item">
        <input class="govuk-radios__input" id="owner-no" name="owner-no" type="radio" value="No" v-model="doesApplicantOwnTheLand">
        <label class="govuk-label govuk-radios__label" for="owner-no">
          No
        </label>
      </div>
    </div>

    <div class="govuk-inset-text govuk-!-margin-bottom-9" v-if="this.doesApplicantOwnTheLand === 'Yes' || this.doesApplicantOwnTheLand === 'No'">
      <div class="govuk-form-group">
        <fieldset class="govuk-fieldset govuk-!-margin-bottom-5" aria-describedby="owner-statements">
          <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
            <h4 class="govuk-heading-s">
              Wich of the following statements applies to you?
            </h4>
          </legend>
        </fieldset>

        <div class="govuk-radios__item" v-if="this.doesApplicantOwnTheLand === 'Yes'">
          <input class="govuk-radios__input" id="applicant-ownership-1" name="applicant-ownership-1" type="radio" value="applicant-ownership-1" v-model="applicantOwnership">
          <label class="govuk-label govuk-radios__label" for="applicant-ownership-1">
            You have no agricultural tenants
          </label>
        </div>

        <certify v-if="this.applicantOwnership === 'applicant-ownership-1'" :certify="applicantOwnership" :statement="statementOne" @clicked="onClickChild"></certify>

        <div class="govuk-radios__item">
          <input class="govuk-radios__input" id="applicant-ownership-2" name="applicant-ownership-2" type="radio" value="applicant-ownership-2" v-model="applicantOwnership">
          <label class="govuk-label govuk-radios__label" for="applicant-ownership-2">
            You have agricultural tenants and have notified them all
          </label>
        </div>

        <div v-if="this.applicantOwnership === 'applicant-ownership-2'">
          <certify :certify="applicantOwnership" :statement="statementTwo" @clicked="onClickChild"></certify>
          <steps-to-notify 
            :notice="applicantOwnership" 
            :tenantsNotifyQuestionOne="tenantsNotifyQuestionOne" 
            :tenantsNotifyQuestionTwo="tenantsNotifyQuestionTwo" 
            :tenantsNotifyQuestionTwoWarning="tenantsNotifyQuestionTwoWarning" 
            :tenantsNotifyQuestionThree="tenantsNotifyQuestionThree" 
            :tenantsNotifyQuestionThreeWarning="tenantsNotifyQuestionThreeWarning"
            @clicked="onClickChild">
          </steps-to-notify>

        </div>

        


        <div class="govuk-radios__item">
          <input class="govuk-radios__input" id="applicant-ownership-3" name="applicant-ownership-3" type="radio" value="applicant-ownership-3" v-model="applicantOwnership">
          <label class="govuk-label govuk-radios__label" for="applicant-ownership-3">
            You have agricultural tenants and have notified some of them
          </label>
        </div>

        <div v-if="this.applicantOwnership === 'applicant-ownership-3'">
          <certify :certify="applicantOwnership" :statement="statementThree" @clicked="onClickChild"></certify>
          
          <steps-to-notify 
            :notice="applicantOwnership" 
            :tenantsNotifyQuestionOne="tenantsNotifyQuestionOne" 
            :tenantsNotifyQuestionTwo="tenantsNotifyQuestionTwo" 
            :tenantsNotifyQuestionTwoWarning="tenantsNotifyQuestionTwoWarning" 
            :tenantsNotifyQuestionThree="tenantsNotifyQuestionThree" 
            :tenantsNotifyQuestionThreeWarning="tenantsNotifyQuestionThreeWarning"
            @clicked="onClickChild">
          </steps-to-notify>
        </div>

        <div class="govuk-radios__item">
          <input class="govuk-radios__input" id="applicant-ownership-4" name="applicant-ownership-4" type="radio" value="applicant-ownership-4" v-model="applicantOwnership">
          <label class="govuk-label govuk-radios__label" for="applicant-ownership-4">
            You have agricultural tenants and cannot notify any of them
          </label>
        </div>

        <div v-if="this.applicantOwnership === 'applicant-ownership-4'">
          <certify  :certify="applicantOwnership" :statement="statementFour" @clicked="onClickChild"></certify>
          <steps-to-notify 
            :notice="applicantOwnership" 
            :tenantsNotifyQuestionOne="tenantsNotifyQuestionOne" 
            :tenantsNotifyQuestionTwo="tenantsNotifyQuestionTwo" 
            :tenantsNotifyQuestionTwoWarning="tenantsNotifyQuestionTwoWarning" 
            :tenantsNotifyQuestionThree="tenantsNotifyQuestionThree" 
            :tenantsNotifyQuestionThreeWarning="tenantsNotifyQuestionThreeWarning"
            @clicked="onClickChild">
          </steps-to-notify>
        </div>
      </div>
    </div>

		<v-cta name="Next" :onClick="navigate"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/form-elements/Cta.vue';
import router from '../../router';
import Certify from '../../components/form/Certify.vue';
import StepsToNotify from '../../components/form/StepsToNotify.vue';

export default {
	name: 'DeclarationsOwnership',
	components: {
    vCta,
    Certify,
    StepsToNotify
  },
  data () {
    return {
      doesApplicantOwnTheLand: '',
      applicantOwnership: '',
      statementOne: 'I certify/The applicant certifies that 21 days before the date of this application nobody except myself/the applicant was the owner* of any part of the land or building to which the application relates, and that none of the land to which the application relates is, or is part of, an agricultural holding.',
      statementTwo: 'I certify/The applicant certifies that I have/the applicant has given the notice to everyone else who, 21 days before the date of this application, was the owner and/or agricultural tenant of any part of the land or building to which this application relates.',
      statementThree: 'I certify/The applicant certifies that all reasonable steps have been taken to find out the names and addresses of the other owners and/or agricultural tenants of the land or building, or of a part of it, but I have/the applicant has been unable to do so.',
      statementFour: 'I certify/The applicant certifies that all reasonable steps have been taken to find out the names and addresses of the other owners and/or agricultural tenants of the land or building, or of a part of it, but I have/the applicant has been unable to do so. ',
      tenantsNotifyQuestionOne: 'What steps have you taken to notify agricultural tenants?',
      tenantsNotifyQuestionTwo: 'Which newspaper did you public a notice in?',
      tenantsNotifyQuestionTwoWarning: 'The newspaper chosen must have a circulation in the area which the land is situated.',
      tenantsNotifyQuestionThree: 'On what date did you publish the notice?',
      tenantsNotifyQuestionThreeWarning: 'You must publish the notice at least 21 days before making the application.'

    }
  },
	methods: {
    navigate() {
      router.push({ name: 'DeclarationsOverview' });
    },
    onClickChild () {}
  }
}
</script>
