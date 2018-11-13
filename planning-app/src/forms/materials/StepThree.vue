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
					Are new windows added?
				</h4>

        <div class="govuk-radios govuk-radios--inline">
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="trees-adjacent-1" name="trees-adjacent" type="radio" value="Yes" v-model="newWindows">
						<label class="govuk-label govuk-radios__label" for="trees-adjacent-1">
							Yes
						</label>
					</div>
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="trees-adjacent-2" name="trees-adjacent" type="radio" value="No" v-model="newWindows">
						<label class="govuk-label govuk-radios__label" for="trees-adjacent-2">
							No
						</label>
					</div>
				</div>

        <div v-if="hasNewWindows" class="govuk-inset-text">

          <div class="govuk-form-group">
            <fieldset class="govuk-fieldset" aria-describedby="materials-hint">
              <h4 class="govuk-heading-s">
                What are the windows proposed made of?
              </h4>

              <span id="proposal-hint" class="govuk-hint">
                Select all that apply.
              </span>

              <div class="govuk-checkboxes">
                <div class="govuk-checkboxes__item">
                  <input class="govuk-checkboxes__input" id="materials-1" name="materials-1" type="checkbox" value="wood" v-model="windowMaterial" >
                  <label class="govuk-label govuk-checkboxes__label" for="materials-1">
                    Wood
                  </label>
                </div>
                <div class="govuk-checkboxes__item">
                  <input class="govuk-checkboxes__input" id="materials-2" name="materials-2" type="checkbox" value="vynil" v-model="windowMaterial">
                  <label class="govuk-label govuk-checkboxes__label" for="materials-2">
                    Vynil
                  </label>
                </div>

                <div class="govuk-checkboxes__item">
                  <input class="govuk-checkboxes__input" id="materials-3" name="materials-3" type="checkbox" value="aluminium" v-model="windowMaterial">
                  <label class="govuk-label govuk-checkboxes__label" for="materials-3">
                    Aluminium
                  </label>
                </div>
                <div class="govuk-checkboxes__item">
                  <input class="govuk-checkboxes__input" id="materials-4" name="materials-4" type="checkbox" value="fiberglass" v-model="windowMaterial">
                  <label class="govuk-label govuk-checkboxes__label" for="materials-4">
                    Fiberglass
                  </label>
                </div>
                <div class="govuk-checkboxes__item">
                  <input class="govuk-checkboxes__input" id="materials-5" name="materials-5" type="checkbox" value="other" v-model="windowMaterial">
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
    
		<v-cta name="Next" :onClick="navigate"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';

export default {
	name: 'MaterialsStepThree',
	components: {
    vCta
  },
  data () {
    return {
      newWindows: '',
      windowMaterial: []
    }
  },
	methods: {
    navigate() {
      router.push({ name: 'MaterialsStep4' });
    },
    materialIsChecked(selectedMaterial) {
      const result = this.windowMaterial.find(function(material) {
        return material === selectedMaterial;
      });
      return result ? true : false;
      
    }
  },
  computed: {
		hasNewWindows () {
			return this.newWindows === 'Yes';
    },
    hasOtherWindowMaterial () {
      return this.windowMaterial === 'other';
    }
	}
}
</script>