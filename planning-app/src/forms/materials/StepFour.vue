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
					Are new external doors added?
				</h4>

        <div class="govuk-radios govuk-radios--inline">
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="trees-adjacent-1" name="trees-adjacent" type="radio" value="Yes" v-model="newDoors">
						<label class="govuk-label govuk-radios__label" for="trees-adjacent-1">
							Yes
						</label>
					</div>
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="trees-adjacent-2" name="trees-adjacent" type="radio" value="No" v-model="newDoors">
						<label class="govuk-label govuk-radios__label" for="trees-adjacent-2">
							No
						</label>
					</div>
				</div>

        <div v-if="hasNewDoors" class="govuk-inset-text">

          <div class="govuk-form-group">
            <fieldset class="govuk-fieldset" aria-describedby="materials-hint">
              <h4 class="govuk-heading-s">
                What are the new doors made of?
              </h4>

              <span id="proposal-hint" class="govuk-hint">
                Select all that apply.
              </span>

              <div class="govuk-checkboxes">
                <div class="govuk-checkboxes__item">
                  <input class="govuk-checkboxes__input" id="materials-1" name="materials-1" type="checkbox" value="wood" v-model="doorMaterial" >
                  <label class="govuk-label govuk-checkboxes__label" for="materials-1">
                    Wood
                  </label>
                </div>
                <div class="govuk-checkboxes__item">
                  <input class="govuk-checkboxes__input" id="materials-2" name="materials-2" type="checkbox" value="vynil" v-model="doorMaterial">
                  <label class="govuk-label govuk-checkboxes__label" for="materials-2">
                    Steel
                  </label>
                </div>

                <div class="govuk-checkboxes__item">
                  <input class="govuk-checkboxes__input" id="materials-3" name="materials-3" type="checkbox" value="aluminium" v-model="doorMaterial">
                  <label class="govuk-label govuk-checkboxes__label" for="materials-3">
                    Fiberglass
                  </label>
                </div>
                <div class="govuk-checkboxes__item">
                  <input class="govuk-checkboxes__input" id="materials-4" name="materials-4" type="checkbox" value="fiberglass" v-model="doorMaterial">
                  <label class="govuk-label govuk-checkboxes__label" for="materials-4">
                    Glass
                  </label>
                </div>
                <div class="govuk-checkboxes__item">
                  <input class="govuk-checkboxes__input" id="materials-5" name="materials-5" type="checkbox" value="other" v-model="doorMaterial">
                  <label class="govuk-label govuk-checkboxes__label" for="materials-5">
                    Other
                  </label>
                </div>

                <div v-if="materialIsChecked('other')" class="govuk-inset-text">
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
                </div>
              </div>
            </fieldset>
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
	name: 'MaterialsStepFour',
	components: {
    vCta
  },
  data () {
    return {
      newDoors: '',
      doorMaterial: []
    }
  },
	methods: {
    consoleClick() {
      console.log('Button clicked');
    },
    materialIsChecked(selectedMaterial) {
      const result = this.doorMaterial.find(function(material) {
        return material === selectedMaterial;
      });
      return result ? true : false;
      
    }
  },
  computed: {
		hasNewDoors () {
			return this.newDoors === 'Yes';
    }
	}
}
</script>