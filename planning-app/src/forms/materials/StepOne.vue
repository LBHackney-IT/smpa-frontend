<template>
	<div>    
    <h1 class="govuk-heading-xl">
      Materials
    </h1>
		<div class="govuk-form-group">
      <fieldset class="govuk-fieldset" aria-describedby="materials-hint">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h2 class="govuk-heading-m">
            What is the proposed roof covering made of?
          </h2>
        </legend>

        <span id="proposal-hint" class="govuk-hint">
          Select all that apply.
        </span>

        <div class="govuk-checkboxes">
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="materials-1" name="materials-1" type="checkbox" value="tiles" v-model="checkedMaterials" >
            <label class="govuk-label govuk-checkboxes__label" for="materials-1">
              Tiles
            </label>
          </div>

          <materials-info v-if="materialIsChecked('tiles')" material="tiles" :secondQuestion="materialsDetailsQuestion" @clicked="onClickChild"></materials-info>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="materials-2" name="materials-2" type="checkbox" value="concrete" v-model="checkedMaterials">
            <label class="govuk-label govuk-checkboxes__label" for="materials-2">
              Concrete
            </label>
          </div>

          <materials-info v-if="materialIsChecked('concrete')" material="concrete" :secondQuestion="materialsDetailsQuestion" @clicked="onClickChild"></materials-info>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="materials-3" name="materials-3" type="checkbox" value="slate" v-model="checkedMaterials">
            <label class="govuk-label govuk-checkboxes__label" for="materials-3">
              Slate
            </label>
          </div>

          <materials-info v-if="materialIsChecked('slate')" material="slate" :secondQuestion="materialsDetailsQuestion" @clicked="onClickChild"></materials-info>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="materials-4" name="materials-4" type="checkbox" value="metal" v-model="checkedMaterials">
            <label class="govuk-label govuk-checkboxes__label" for="materials-4">
              Metal
            </label>
          </div>

          <materials-info v-if="materialIsChecked('metal')" material="metal" :secondQuestion="materialsDetailsQuestion" @clicked="onClickChild"></materials-info>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="materials-5" name="materials-5" type="checkbox" value="thatch" v-model="checkedMaterials">
            <label class="govuk-label govuk-checkboxes__label" for="materials-5">
              Thatch
            </label>
          </div>

          <materials-info v-if="materialIsChecked('thatch')" material="thatch" :secondQuestion="materialsDetailsQuestion" @clicked="onClickChild"></materials-info>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="materials-9" name="materials-9" type="checkbox" value="asphalt-shingles" v-model="checkedMaterials">
            <label class="govuk-label govuk-checkboxes__label" for="materials-9">
              Asphalt shingles
            </label>
          </div>

          <materials-info v-if="materialIsChecked('asphalt-shingles')" material="asphalt-shingles" :secondQuestion="materialsDetailsQuestion" @clicked="onClickChild"></materials-info>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="materials-10" name="materials-10" type="checkbox" value="unknown" v-model="checkedMaterials">
            <label class="govuk-label govuk-checkboxes__label" for="materials-10">
              Unknown
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="materials-10" name="materials-10" type="checkbox" value="other" v-model="checkedMaterials">
            <label class="govuk-label govuk-checkboxes__label" for="materials-10">
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
	name: 'MaterialsStepOne',
	components: {
    vCta,
    MaterialsInfo,
    OtherMaterial
  },
  data () {
    return {
      checkedMaterials: [],
      sameMaterialAsExistingDoors: '',
      materialsDetailsQuestion: 'Is the proposed material and finish the same as roof covering?',
      otherMaterialsDetailsQuestion: 'Is the proposed material and finish the same as the existing?'
    }
  },
	methods: {
    navigate() {
      router.push({ name: 'MaterialsStep2' });
    },
    materialIsChecked(selectedMaterial) {
      const result = this.checkedMaterials.find(function(material) {
        return material === selectedMaterial;
      });
      return result ? true : false;
      
    },
    onClickChild () {}
  }
}
</script>