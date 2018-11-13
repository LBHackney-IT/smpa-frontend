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
					What is the proposed roof covering made of?
				</h4>

        <span id="proposal-hint" class="govuk-hint">
          Select all that apply.
        </span>

        <div class="govuk-checkboxes">
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="materials-1" name="materials-1" type="checkbox" value="interlocking-tiles" v-model="checkedMaterials" >
            <label class="govuk-label govuk-checkboxes__label" for="materials-1">
              Interlocking tiles
            </label>
          </div>
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="materials-2" name="materials-2" type="checkbox" value="clay-tiles" v-model="checkedMaterials">
            <label class="govuk-label govuk-checkboxes__label" for="materials-2">
              Clay tiles
            </label>
          </div>

          <div v-if="materialIsChecked('clay-tiles')" class="govuk-inset-text">
            <div class="govuk-form-group">
              <label class="govuk-label" for="new-material">
                New material
              </label>
              <input class="govuk-input" id="new-material" name="new-material" type="text">
            </div>

            <div class="govuk-form-group">
              <label class="govuk-label" for="more-detail">
                Colour and type
              </label>
              <textarea class="govuk-textarea" id="more-detail" name="more-detail" rows="5" aria-describedby="more-detail-hint"></textarea>
            </div>

            <v-cta name="Save" :onClick="consoleClick"></v-cta>

            <fieldset class="govuk-fieldset" aria-describedby="trees-question-2-hint">
              <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
              <h4 class="govuk-heading-s">
                Is the proposed material and finish the same as the existing doors?
              </h4>
              </legend>
              <div class="govuk-radios govuk-radios--inline">
                <div class="govuk-radios__item">
                  <input class="govuk-radios__input" id="trees-adjacent-1" name="trees-adjacent" type="radio" value="Yes" v-model="sameMaterialAsExistingDoors">
                  <label class="govuk-label govuk-radios__label" for="trees-adjacent-1">
                    Yes
                  </label>
                </div>
                <div class="govuk-radios__item">
                  <input class="govuk-radios__input" id="trees-adjacent-2" name="trees-adjacent" type="radio" value="No" v-model="sameMaterialAsExistingDoors">
                  <label class="govuk-label govuk-radios__label" for="trees-adjacent-2">
                    No
                  </label>
                </div>
              </div>
            </fieldset>

            <div v-if="hasSameMaterialAsExistingDoors" class="govuk-inset-text">
              <div class="govuk-form-group">
                <label class="govuk-label" for="new-material">
                  Existing material
                </label>
                <input class="govuk-input" id="new-material" name="new-material" type="text">
              </div>

              <div class="govuk-form-group">
                <label class="govuk-label" for="more-detail">
                  Colour and type
                </label>
                <textarea class="govuk-textarea" id="more-detail" name="more-detail" rows="5" aria-describedby="more-detail-hint"></textarea>
              </div>

              <v-cta name="Save" :onClick="consoleClick"></v-cta>
            </div>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="materials-3" name="materials-3" type="checkbox" value="stone" v-model="checkedMaterials">
            <label class="govuk-label govuk-checkboxes__label" for="materials-3">
              Stone
            </label>
          </div>
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="materials-4" name="materials-4" type="checkbox" value="concrete" v-model="checkedMaterials">
            <label class="govuk-label govuk-checkboxes__label" for="materials-4">
              Concrete
            </label>
          </div>
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="materials-5" name="materials-5" type="checkbox" value="slate" v-model="checkedMaterials">
            <label class="govuk-label govuk-checkboxes__label" for="materials-5">
              Slate
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="materials-6" name="materials-6" type="checkbox" value="metal" v-model="checkedMaterials">
            <label class="govuk-label govuk-checkboxes__label" for="materials-6">
              Metal
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="materials-7" name="materials-7" type="checkbox" value="thatch" v-model="checkedMaterials">
            <label class="govuk-label govuk-checkboxes__label" for="materials-7">
              Thatch
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="materials-8" name="materials-8" type="checkbox" value="asphalt-shingles" v-model="checkedMaterials">
            <label class="govuk-label govuk-checkboxes__label" for="materials-8">
              Asphalt shingles
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
	name: 'MaterialsStepOne',
	components: {
    vCta
  },
  data () {
    return {
      checkedMaterials: [],
      sameMaterialAsExistingDoors: ''
    }
  },
	methods: {
    consoleClick() {
      console.log('Button clicked');
    },
    materialIsChecked(selectedMaterial) {
      const result = this.checkedMaterials.find(function(material) {
        return material === selectedMaterial;
      });
      return result ? true : false;
      
    }
  },
  computed: {
		hasSameMaterialAsExistingDoors () {
			return this.sameMaterialAsExistingDoors === 'Yes';
    }
	}
}
</script>