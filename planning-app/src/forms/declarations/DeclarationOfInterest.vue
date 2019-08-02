<template>
	<div>
		<div class="govuk-form-group">
      <fieldset class="govuk-fieldset" aria-describedby="materials-hint">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h1 class="govuk-fieldset__heading">
            Declaration of interest
          </h1>
        </legend>

        <p class="govuk-body govuk-!-font-size-24">
					Do any of the following statements apply to you and/or the applicant?
				</p>

        <div class="govuk-inset-text">
          <p>It is an important principle of decision-making that the process is open and transparent.</p>

          <p>For the purposes of this question, "related to" means related, by birth or closely enough that there could be a bias on the part of the decision-maker in Hackney Council.</p>
        </div>
      </fieldset>
    </div>

    <div class="govuk-radios govuk-radios--inline govuk-!-margin-bottom-9">
      <div class="govuk-radios__item">
        <input class="govuk-radios__input" id="applicant-authority-relation" name="applicant-authority-relation-1" type="radio" value="applicant-authority-relation-1" v-model="applicantAuthorityRelation">
        <label class="govuk-label govuk-radios__label" for="applicant-authority-relation-1">
          You are a Hackney Council member of staff
        </label>
      </div>

      <authority-relationship v-if="this.applicantAuthorityRelation === 'applicant-authority-relation-1'" :relationship="applicantAuthorityRelation" @clicked="onClickChild"></authority-relationship>

      <div class="govuk-radios__item">
        <input class="govuk-radios__input" id="applicant-authority-relation" name="applicant-authority-relation-2" type="radio" value="applicant-authority-relation-2" v-model="applicantAuthorityRelation">
        <label class="govuk-label govuk-radios__label" for="applicant-authority-relation-2">
          You are an elected member in Hackney
        </label>
      </div>

      <authority-relationship v-if="this.applicantAuthorityRelation === 'applicant-authority-relation-2'" :relationship="applicantAuthorityRelation" @clicked="onClickChild"></authority-relationship>

      <div class="govuk-radios__item">
        <input class="govuk-radios__input" id="applicant-authority-relation" name="applicant-authority-relation-3" type="radio" value="applicant-authority-relation-3" v-model="applicantAuthorityRelation">
        <label class="govuk-label govuk-radios__label" for="applicant-authority-relation-3">
          You are related to a Hackney Council member of staff
        </label>
      </div>

      <authority-relationship v-if="this.applicantAuthorityRelation === 'applicant-authority-relation-3'" :relationship="applicantAuthorityRelation" @clicked="onClickChild"></authority-relationship>

      <div class="govuk-radios__item">
        <input class="govuk-radios__input" id="applicant-authority-relation" name="applicant-authority-relation-4" type="radio" value="applicant-authority-relation-4" v-model="applicantAuthorityRelation">
        <label class="govuk-label govuk-radios__label" for="applicant-authority-relation-4">
          You are related to an elected member in Hackney
        </label>
      </div>

      <authority-relationship v-if="this.applicantAuthorityRelation === 'applicant-authority-relation-4'" :relationship="applicantAuthorityRelation" @clicked="onClickChild"></authority-relationship>

      <div class="govuk-radios__item">
        <input class="govuk-radios__input" id="applicant-authority-relation" name="applicant-authority-relation-5" type="radio" value="applicant-authority-relation-5" v-model="applicantAuthorityRelation">
        <label class="govuk-label govuk-radios__label" for="applicant-authority-relation-5">
          None of the above
        </label>
      </div>
    </div>

		<v-cta name="Continue" :onClick="navigate"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';
import AuthorityRelationship from '../../components/form/AuthorityRelationship.vue';

export default {
	name: 'DeclarationOfInterest',
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