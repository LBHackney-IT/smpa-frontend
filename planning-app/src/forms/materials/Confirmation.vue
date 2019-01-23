<template>
	<div>
		<div class="govuk-form-group">
      <fieldset class="govuk-fieldset" aria-describedby="materials-hint">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h1 class="govuk-fieldset__heading">
            Materials
          </h1>
        </legend>

        <h4 class="govuk-heading-s">
					Are there any other materials to be considered?
				</h4>

        <div class="govuk-checkboxes">
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="materials-confirmation" name="materials-confirmation" type="checkbox" value="materials-confirmation" v-model="materialsConfirmation">
            <label class="govuk-label govuk-checkboxes__label" for="materials-confirmation">
              I confirm that all external materials (existing & proposed) are shown on the submitted plans.
            </label>
          </div>
        </div>

      </fieldset>
    </div>
    
		<v-cta name="Save and continue" :onClick="navigate"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/form-elements/Cta.vue';
import router from '../../router';

export default {
	name: 'MaterialsStepFive',
	components: {
    vCta
  },
  data () {
    return {
      materialsConfirmation: []
    }
  },
	methods: {
    navigate() {
      router.push({ name: 'Documentation' });
    }
  }
}
</script>