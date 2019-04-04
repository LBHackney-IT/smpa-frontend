<template>
	<div>
    <h1 class="govuk-heading-xl">
      About the doors
    </h1>

    <fieldset class="govuk-fieldset govuk-!-margin-bottom-6" aria-describedby="materials-hint">
      <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
        <h2 class="govuk-heading-m">
          State what materials are to be used for the doors
        </h2>
      </legend>

      <span id="proposal-hint" class="govuk-hint">
        Select one.
      </span>

      <div class="govuk-radios govuk-radios--inline">
        <div class="govuk-radios__item">
          <input class="govuk-radios__input" id="work-started-1" name="work-started" type="radio" value="not-applicable" v-model="material">
          <label class="govuk-label govuk-radios__label" for="work-started-1">
            This is not applicable
          </label>
        </div>
        <div class="govuk-radios__item">
          <input class="govuk-radios__input" id="work-started-2" name="work-started" type="radio" value="match-existing" v-model="material">
          <label class="govuk-label govuk-radios__label" for="work-started-2">
            Material and finish match the existing
          </label>
        </div>

        <div class="govuk-radios__item">
          <input class="govuk-radios__input" id="work-started-3" name="work-started" type="radio" value="new-material" v-model="material">
          <label class="govuk-label govuk-radios__label" for="work-started-3">
            You're proposing a new material to be used
          </label>
        </div>
      </div>
    </fieldset>

    <div class="govuk-inset-text" v-if="material === 'new-material'">
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
              <input class="govuk-checkboxes__input" id="materials-1" name="materials-1" type="checkbox" value="timber-framed" v-model="doorMaterial" >
              <label class="govuk-label govuk-checkboxes__label" for="materials-1">
                Timber framed
              </label>
            </div>

            <materials-info v-if="materialIsChecked('timber-framed')" material="timber-framed" :secondQuestion="materialsDetailsQuestion" @clicked="onClickChild"></materials-info>

            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="materials-2" name="materials-2" type="checkbox" value="steel" v-model="doorMaterial">
              <label class="govuk-label govuk-checkboxes__label" for="materials-2">
                Steel
              </label>
            </div>

            <materials-info v-if="materialIsChecked('steel')" material="steel" :secondQuestion="materialsDetailsQuestion" @clicked="onClickChild"></materials-info>

            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="materials-3" name="materials-3" type="checkbox" value="pvc" v-model="doorMaterial">
              <label class="govuk-label govuk-checkboxes__label" for="materials-3">
                PVC
              </label>
            </div>

            <materials-info v-if="materialIsChecked('pvc')" material="pvc" :secondQuestion="materialsDetailsQuestion" @clicked="onClickChild"></materials-info>

            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="materials-4" name="materials-4" type="checkbox" value="glass" v-model="doorMaterial">
              <label class="govuk-label govuk-checkboxes__label" for="materials-4">
                Glass
              </label>
            </div>

            <materials-info v-if="materialIsChecked('glass')" material="glass" :secondQuestion="materialsDetailsQuestion" @clicked="onClickChild"></materials-info>

            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="materials-4" name="materials-4" type="checkbox" value="aluminium" v-model="doorMaterial">
              <label class="govuk-label govuk-checkboxes__label" for="materials-4">
                Aluminium
              </label>
            </div>

            <materials-info v-if="materialIsChecked('aluminium')" material="aluminium" :secondQuestion="materialsDetailsQuestion" @clicked="onClickChild"></materials-info>

            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="materials-5" name="materials-5" type="checkbox" value="other" v-model="doorMaterial">
              <label class="govuk-label govuk-checkboxes__label" for="materials-5">
                Other
              </label>
            </div>

            <other-material v-if="materialIsChecked('other')" material="other" :secondQuestion="otherMaterialsDetailsQuestion" @clicked="onClickChild"></other-material>
          </div>
        </fieldset>
      </div>
    </div>
    
		<v-cta name="Continue" :onClick="navigate"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';
import MaterialsInfo from '../../components/form/MaterialsInfo.vue';
import OtherMaterial from '../../components/form/OtherMaterial.vue';

export default {
	name: 'MaterialsStepFour',
	components: {
    vCta,
    MaterialsInfo,
    OtherMaterial
  },
  data () {
    return {
      material: '',
      doorMaterial: [],
      materialsDetailsQuestion: 'Is the proposed material and finish the same as the existing?',
      otherMaterialsDetailsQuestion: 'Is the proposed material and finish the same as the existing?'
    }
  },
	methods: {
    navigate() {
      router.push({ name: 'MaterialsStep5' });
    },
    materialIsChecked(selectedMaterial) {
      const result = this.doorMaterial.find(function(material) {
        return material === selectedMaterial;
      });
      return result ? true : false;
      
    },
    onClickChild () {}
  },
  computed: {
		hasNewDoors () {
			return this.newDoors === 'Yes';
    }
	}
}
</script>