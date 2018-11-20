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
					Are there any other external building materials that would be seen?
				</h4>

        <div class="govuk-radios govuk-radios--inline">
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="trees-adjacent-1" name="trees-adjacent" type="radio" value="Yes" v-model="otherMaterials">
						<label class="govuk-label govuk-radios__label" for="trees-adjacent-1">
							Yes
						</label>
					</div>
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="trees-adjacent-2" name="trees-adjacent" type="radio" value="No" v-model="otherMaterials">
						<label class="govuk-label govuk-radios__label" for="trees-adjacent-2">
							No
						</label>
					</div>
				</div>

        <div v-if="hasOtherMaterials" class="govuk-inset-text">
          <div class="govuk-form-group">
            <label class="govuk-label" for="element">
              Element
            </label>
            <input class="govuk-input" id="element" name="element" type="text">

            <label class="govuk-label" for="proposed-material">
              Proposed Material
            </label>
            <input class="govuk-input" id="proposed-material" name="proposed-material" type="text">
          </div>

          <div class="govuk-form-group">
            <label class="govuk-label" for="more-detail">
              Colour and type
            </label>
            <textarea class="govuk-textarea" id="more-detail" name="more-detail" rows="5" aria-describedby="more-detail-hint"></textarea>
          </div>

          <v-cta name="Save" :onClick="consoleClick"></v-cta>
        </div>
      </fieldset>
    </div>
    
		<v-cta name="Next" :onClick="navigate"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';

export default {
	name: 'MaterialsStepFive',
	components: {
    vCta
  },
  data () {
    return {
      otherMaterials: '',
      doorMaterial: []
    }
  },
	methods: {
    navigate() {
      router.push({ name: 'Documentation' });
    }
  },
  computed: {
		hasOtherMaterials () {
			return this.otherMaterials === 'Yes';
    }
	}
}
</script>