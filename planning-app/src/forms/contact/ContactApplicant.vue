<template>
	<div>
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
      <label class="govuk-label" for="sort">
        Title (optional)
      </label>
      <select class="govuk-select" id="sort" name="sort">
        <option value="published">Mr</option>
        <option value="updated" selected>Mrs</option>
        <option value="views">Miss</option>
      </select>
    </div>

    <div class="govuk-form-group">
      <label class="govuk-label" for="name">
        Full name
      </label>
      <input class="govuk-input" id="name" name="name" type="text">
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
        <input class="govuk-input" id="name" name="name" type="tel">
      </div>

      <div class="govuk-form-group">
        <label class="govuk-label" for="name">
          Enter applicant's email address
        </label>
        <input class="govuk-input" id="name" name="name" type="email">
      </div>

    </div>


		<v-cta name="Save and continue" :onClick="navigate"></v-cta>
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
      contactApplicant: ''
    }
  },
	methods: {
    navigate() {
      router.push({ name: 'Declarations' });
    }
  },
  computed: {
		canContactApplicant () {
			return this.contactApplicant === 'Yes';
		}
	}
}
</script>