<template>
	<div>
		<div class="govuk-form-group">
      <fieldset class="govuk-fieldset">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h1 class="govuk-fieldset__heading">
            About the applicant
          </h1>
        </legend>
      </fieldset>
    </div>

    <h2 class="govuk-heading-m">
      Personal details
    </h2>

    <div class="govuk-form-group">
      <label class="govuk-label" for="full-name">
        Full name
      </label>
      <input class="govuk-input" id="full-name" name="full-name" type="text">
    </div>

		<v-cta name="Continue" :onClick="navigate"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';

export default {
	name: 'AboutApplicant',
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
  }
}
</script>