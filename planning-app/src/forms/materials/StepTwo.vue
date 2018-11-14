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
            <input class="govuk-checkboxes__input" id="materials-1" name="materials-1" type="checkbox" value="concrete" v-model="checkedMaterials" >
            <label class="govuk-label govuk-checkboxes__label" for="materials-1">
              Concrete
            </label>
          </div>

          <materials-info v-if="materialIsChecked('concrete')" material="concrete" :secondQuestion="materialsDetailsQuestion" @clicked="onClickChild"></materials-info>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="materials-2" name="materials-2" type="checkbox" value="mortar-plaster" v-model="checkedMaterials">
            <label class="govuk-label govuk-checkboxes__label" for="materials-2">
              Mortar plaster
            </label>
          </div>

          <materials-info v-if="materialIsChecked('mortar-plaster')" material="mortar-plaster" :secondQuestion="materialsDetailsQuestion" @clicked="onClickChild"></materials-info>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="materials-3" name="materials-3" type="checkbox" value="natural-stode-cladding" v-model="checkedMaterials">
            <label class="govuk-label govuk-checkboxes__label" for="materials-3">
              Natural stode cladding
            </label>
          </div>

          <materials-info v-if="materialIsChecked('natural-stode-cladding')" material="natural-stode-cladding" :secondQuestion="materialsDetailsQuestion" @clicked="onClickChild"></materials-info>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="materials-4" name="materials-4" type="checkbox" value="brick" v-model="checkedMaterials">
            <label class="govuk-label govuk-checkboxes__label" for="materials-4">
              Brick
            </label>
          </div>

          <materials-info v-if="materialIsChecked('brick')" material="brick" :secondQuestion="materialsDetailsQuestion" @clicked="onClickChild"></materials-info>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="materials-5" name="materials-5" type="checkbox" value="ceramic-facade" v-model="checkedMaterials">
            <label class="govuk-label govuk-checkboxes__label" for="materials-5">
              Ceramic facade
            </label>
          </div>

          <materials-info v-if="materialIsChecked('ceramic-facade')" material="ceramic-facade" :secondQuestion="materialsDetailsQuestion" @clicked="onClickChild"></materials-info>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="materials-6" name="materials-6" type="checkbox" value="wooden-coating" v-model="checkedMaterials">
            <label class="govuk-label govuk-checkboxes__label" for="materials-6">
              Wooden coating
            </label>
          </div>

          <materials-info v-if="materialIsChecked('wooden-coating')" material="wooden-coating" :secondQuestion="materialsDetailsQuestion" @clicked="onClickChild"></materials-info>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="materials-7" name="materials-7" type="checkbox" value="plastic-cladding" v-model="checkedMaterials">
            <label class="govuk-label govuk-checkboxes__label" for="materials-7">
              Plastic cladding
            </label>
          </div>

          <materials-info v-if="materialIsChecked('plastic-cladding')" material="plastic-cladding" :secondQuestion="materialsDetailsQuestion" @clicked="onClickChild"></materials-info>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="materials-8" name="materials-8" type="checkbox" value="glass-enclosures" v-model="checkedMaterials">
            <label class="govuk-label govuk-checkboxes__label" for="materials-8">
              Glass enclosures
            </label>
          </div>

          <materials-info v-if="materialIsChecked('glass-enclosures')" material="glass-enclosures" :secondQuestion="materialsDetailsQuestion" @clicked="onClickChild"></materials-info>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="materials-9" name="materials-9" type="checkbox" value="other" v-model="checkedMaterials">
            <label class="govuk-label govuk-checkboxes__label" for="materials-9">
              Other
            </label>
          </div>

          <other-material v-if="materialIsChecked('other')" material="other" :secondQuestion="otherMaterialsDetailsQuestion" @clicked="onClickChild"></other-material>

        </div>
      </fieldset>
    </div>

		<v-cta name="Next" :onClick="navigate"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';
import MaterialsInfo from '../../components/form/MaterialsInfo.vue';
import OtherMaterial from '../../components/form/OtherMaterial.vue';

export default {
	name: 'MaterialsStepTwo',
	components: {
    vCta,
    MaterialsInfo,
    OtherMaterial
  },
  data () {
    return {
      checkedMaterials: [],
      materialsDetailsQuestion: 'Is the proposed material and finish the same as the external walls?',
      otherMaterialsDetailsQuestion: 'Is the proposed material and finish the same as the existing?'
    }
  },
	methods: {
    materialIsChecked(selectedMaterial) {
      const result = this.checkedMaterials.find(function(material) {
        return material === selectedMaterial;
      });
      return result ? true : false;
      
    },
    navigate() {
      router.push({ name: 'MaterialsStep3' });
    },
    onClickChild (value) {
      console.log('-----VALUE', value) // someValue
    }
  }
}
</script>