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
        <!-- if agent above -->
        <!-- if member of the public: Which of the following statements apply to you? -->
      </h4>

      <div class="govuk-inset-text">
        An ‘owner’ is anyone with a freehold or leasehold interest for now fewer than 7 years.
      </div>
    </fieldset>

    <span class="govuk-hint">
      Select one
    </span>

    <div class="govuk-radios govuk-!-margin-bottom-9">
      <div class="govuk-radios__item">
        <input class="govuk-radios__input" id="ownership-01" name="ownership-01" type="radio" value="ownership-01" v-model="doesApplicantOwnTheLand">
        <label class="govuk-label govuk-radios__label" for="ownership-01">
          The applicant is the sole owner of the land
        </label>
      </div>

      <div class="govuk-radios__item">
        <input class="govuk-radios__input" id="ownership-02" name="ownership-02" type="radio" value="ownership-02" v-model="doesApplicantOwnTheLand">
        <label class="govuk-label govuk-radios__label" for="ownership-02">
          The applicant does not own all of the land and has notified all other owners
        </label>
      </div>

      <div class="govuk-radios__item">
        <input class="govuk-radios__input" id="ownership-03" name="ownership-03" type="radio" value="ownership-03" v-model="doesApplicantOwnTheLand">
        <label class="govuk-label govuk-radios__label" for="ownership-03">
          The applicant does not own all of the land and has notified some of the owners
        </label>
      </div>

      <div class="govuk-radios__item">
        <input class="govuk-radios__input" id="ownership-04" name="ownership-04" type="radio" value="ownership-04" v-model="doesApplicantOwnTheLand">
        <label class="govuk-label govuk-radios__label" for="ownership-04">
          The applicant does not own all of the land and has been unable to notify any other onwers
        </label>
      </div>
    </div>

    <v-cta name="Continue" :onClick="navigate"></v-cta>
  </div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';

export default {
	name: 'DeclarationsOwnership',
	components: {
    vCta
  },
  data () {
    return {
      doesApplicantOwnTheLand: ''
    }
  },
	methods: {
    navigate() {
      router.push({ name: 'OwnershipCertificateDeclaration', params: { doesApplicantOwnTheLand: this.doesApplicantOwnTheLand} });
    }
  }
}
</script>
