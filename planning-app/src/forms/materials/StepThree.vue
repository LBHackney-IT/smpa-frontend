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

                <materials-info v-if="materialIsChecked('wood')" material="wood" :secondQuestion="materialsDetailsQuestion" @clicked="onClickChild"></materials-info>

                <div class="govuk-checkboxes__item">
                  <input class="govuk-checkboxes__input" id="materials-2" name="materials-2" type="checkbox" value="vynil" v-model="windowMaterial">
                  <label class="govuk-label govuk-checkboxes__label" for="materials-2">
                    Vynil
                  </label>
                </div>

                <materials-info v-if="materialIsChecked('vynil')" material="vynil" :secondQuestion="materialsDetailsQuestion" @clicked="onClickChild"></materials-info>

                <div class="govuk-checkboxes__item">
                  <input class="govuk-checkboxes__input" id="materials-3" name="materials-3" type="checkbox" value="aluminium" v-model="windowMaterial">
                  <label class="govuk-label govuk-checkboxes__label" for="materials-3">
                    Aluminium
                  </label>
                </div>

                <materials-info v-if="materialIsChecked('aluminium')" material="aluminium" :secondQuestion="materialsDetailsQuestion" @clicked="onClickChild"></materials-info>

                <div class="govuk-checkboxes__item">
                  <input class="govuk-checkboxes__input" id="materials-4" name="materials-4" type="checkbox" value="fiberglass" v-model="windowMaterial">
                  <label class="govuk-label govuk-checkboxes__label" for="materials-4">
                    Fiberglass
                  </label>
                </div>

                <materials-info v-if="materialIsChecked('fiberglass')" material="fiberglass" :secondQuestion="materialsDetailsQuestion" @clicked="onClickChild"></materials-info>

                <div class="govuk-checkboxes__item">
                  <input class="govuk-checkboxes__input" id="materials-5" name="materials-5" type="checkbox" value="other" v-model="windowMaterial">
                  <label class="govuk-label govuk-checkboxes__label" for="materials-5">
                    Other
                  </label>
                </div>

                <other-material v-if="materialIsChecked('other')" material="other" :secondQuestion="otherMaterialsDetailsQuestion" @clicked="onClickChild"></other-material>

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
import vCta from '../../components/form-elements/Cta.vue';
import router from '../../router';
import MaterialsInfo from '../../components/form/MaterialsInfo.vue';
import OtherMaterial from '../../components/form/OtherMaterial.vue';

export default {
	name: 'MaterialsStepThree',
	components: {
    vCta,
    MaterialsInfo,
    OtherMaterial
  },
  data () {
    return {
      newWindows: '',
      windowMaterial: [],
      materialsDetailsQuestion: 'Is the proposed material and finish the same as the existing?',
      otherMaterialsDetailsQuestion: 'Is the proposed material and finish the same as the existing?'
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
      
    },
    onClickChild () {}
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