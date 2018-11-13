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
					What is the proposed external walls made of?
				</h4>

        <span id="proposal-hint" class="govuk-hint">
          Select all that apply.
        </span>

        <div class="govuk-checkboxes">
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="materials-1" name="materials-1" type="checkbox" value="interlocking-tiles" v-model="checkedMaterials" >
            <label class="govuk-label govuk-checkboxes__label" for="materials-1">
              Concrete
            </label>
          </div>
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="materials-2" name="materials-2" type="checkbox" value="clay-tiles" v-model="checkedMaterials">
            <label class="govuk-label govuk-checkboxes__label" for="materials-2">
              Mortar plaster
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="materials-3" name="materials-3" type="checkbox" value="stone" v-model="checkedMaterials">
            <label class="govuk-label govuk-checkboxes__label" for="materials-3">
              Natural stode cladding
            </label>
          </div>
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="materials-4" name="materials-4" type="checkbox" value="concrete" v-model="checkedMaterials">
            <label class="govuk-label govuk-checkboxes__label" for="materials-4">
              Brick
            </label>
          </div>
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="materials-5" name="materials-5" type="checkbox" value="slate" v-model="checkedMaterials">
            <label class="govuk-label govuk-checkboxes__label" for="materials-5">
              Ceramic facade
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="materials-6" name="materials-6" type="checkbox" value="metal" v-model="checkedMaterials">
            <label class="govuk-label govuk-checkboxes__label" for="materials-6">
              Wooden coating
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="materials-7" name="materials-7" type="checkbox" value="thatch" v-model="checkedMaterials">
            <label class="govuk-label govuk-checkboxes__label" for="materials-7">
              Plastic cladding
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="materials-8" name="materials-8" type="checkbox" value="asphalt-shingles" v-model="checkedMaterials">
            <label class="govuk-label govuk-checkboxes__label" for="materials-8">
              Glass enclosures
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="materials-9" name="materials-9" type="checkbox" value="other" v-model="checkedMaterials">
            <label class="govuk-label govuk-checkboxes__label" for="materials-9">
              Other
            </label>
          </div>
        </div>
      </fieldset>
    </div>

		<v-cta name="Next" :onClick="consoleClick"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';

export default {
	name: 'MaterialsStepTwo',
	components: {
    vCta
  },
  data () {
    return {
      checkedMaterials: []
    }
  },
	methods: {
    consoleClick() {
      console.log('Button clicked');
    }
  }
}
</script>