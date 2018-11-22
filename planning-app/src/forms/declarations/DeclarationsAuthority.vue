<template>
	<div>
		<div class="govuk-form-group">
      <fieldset class="govuk-fieldset" aria-describedby="materials-hint">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h1 class="govuk-fieldset__heading">
            Authority member / employee
          </h1>
        </legend>

        <h4 class="govuk-heading-s">
					With respect to the authority, does any of the following statements apply to you and / or the applicant?
				</h4>

        <div class="govuk-inset-text">
          It is an important principle of decision making that the process is open and transparent.
        </div>
      </fieldset>
    </div>

    <div class="govuk-radios govuk-radios--inline govuk-!-margin-bottom-9">
      <div class="govuk-radios__item">
        <input class="govuk-radios__input" id="applicant-authority-relation" name="applicant-authority-relation-1" type="radio" value="applicant-authority-relation-1" v-model="applicantAuthorityRelation">
        <label class="govuk-label govuk-radios__label" for="applicant-authority-relation-1">
          You are a member of staff 
        </label>
      </div>

      <authority-relationship v-if="this.applicantAuthorityRelation === 'applicant-authority-relation-1'" :relationship="applicantAuthorityRelation" @clicked="onClickChild"></authority-relationship>

      <div class="govuk-radios__item">
        <input class="govuk-radios__input" id="applicant-authority-relation" name="applicant-authority-relation-2" type="radio" value="applicant-authority-relation-2" v-model="applicantAuthorityRelation">
        <label class="govuk-label govuk-radios__label" for="applicant-authority-relation-2">
          You are an elected member
        </label>
      </div>

      <authority-relationship v-if="this.applicantAuthorityRelation === 'applicant-authority-relation-2'" :relationship="applicantAuthorityRelation" @clicked="onClickChild"></authority-relationship>

      <div class="govuk-radios__item">
        <input class="govuk-radios__input" id="applicant-authority-relation" name="applicant-authority-relation-3" type="radio" value="applicant-authority-relation-3" v-model="applicantAuthorityRelation">
        <label class="govuk-label govuk-radios__label" for="applicant-authority-relation-3">
          You are related to a member of the staff
        </label>
      </div>

      <authority-relationship v-if="this.applicantAuthorityRelation === 'applicant-authority-relation-3'" :relationship="applicantAuthorityRelation" @clicked="onClickChild"></authority-relationship>

      <div class="govuk-radios__item">
        <input class="govuk-radios__input" id="applicant-authority-relation" name="applicant-authority-relation-4" type="radio" value="applicant-authority-relation-4" v-model="applicantAuthorityRelation">
        <label class="govuk-label govuk-radios__label" for="applicant-authority-relation-4">
          You are related to an elected member
        </label>
      </div>

      <authority-relationship v-if="this.applicantAuthorityRelation === 'applicant-authority-relation-4'" :relationship="applicantAuthorityRelation" @clicked="onClickChild"></authority-relationship>

      <div class="govuk-radios__item">
        <input class="govuk-radios__input" id="applicant-authority-relation" name="applicant-authority-relation-5" type="radio" value="applicant-authority-relation-5" v-model="applicantAuthorityRelation">
        <label class="govuk-label govuk-radios__label" for="applicant-authority-relation-5">
          Any of the above
        </label>
      </div>
    </div>

		<v-cta name="Next" :onClick="navigate"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';
import AuthorityRelationship from '../../components/form/AuthorityRelationship.vue';

export default {
	name: 'DeclarationsAuthority',
	components: {
    vCta,
    AuthorityRelationship
  },
  data () {
    return {
      applicantAuthorityRelation: ''
    }
  },
	methods: {
    navigate() {
      router.push({ name: 'DeclarationsOwnership' });
    },
    onClickChild () {}
  }
}
</script>