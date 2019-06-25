<template>
	<div>
    <h1 class="govuk-heading-xl">
      About the windows
    </h1>

    <fieldset class="govuk-fieldset govuk-!-margin-bottom-6" aria-describedby="materials-hint">
      <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
        <h2 class="govuk-heading-m">
          State what materials are to be used for the windows
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
            What are the windows proposed made of?
          </h4>

          <span id="proposal-hint" class="govuk-hint">
            Select all that apply.
          </span>

          <div class="govuk-checkboxes">
            <div class="vertical-checkboxes" v-bind:key="option.id" v-for="option in this.defaultOptions">
              <div class="govuk-checkboxes__item">
                <input class="govuk-checkboxes__input" v-bind:id="option.id" v-bind:name="option.name" type="checkbox" v-bind:value="option.id" v-model="checkedMaterials" >
                <label class="govuk-label govuk-checkboxes__label" v-bind:for="option.id">
                  {{option.name}}
                </label>
              </div>

              <other-material v-if="materialIsChecked(option.id) && option.name === 'Other'" material="other" :secondQuestion="otherMaterialsDetailsQuestion" @clicked="onClickChild"></other-material>

              <materials-info v-if="materialIsChecked(option.id) && option.name != 'Other'" v-bind:material="option.name" :secondQuestion="materialsDetailsQuestion" @clicked="onClickChild"></materials-info>
            </div>
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
	name: 'MaterialsStepThree',
	components: {
    vCta,
    MaterialsInfo,
    OtherMaterial
  },
  data () {
    return {
      material: '',
      checkedMaterials: [],
      materialsDetailsQuestion: 'Is the proposed material and finish the same as the existing?',
      otherMaterialsDetailsQuestion: 'Is the proposed material and finish the same as the existing?',
      defaultOptions: undefined
    }
  },
  beforeMount () {
    this.loadDefaultOptions();
  },
	methods: {
    navigate() {
      router.push({ name: 'MaterialsStep4' });
    },
    materialIsChecked(selectedMaterial) {
      const result = this.checkedMaterials.find(function(material) {
        return material === selectedMaterial;
      });
      return result ? true : false;
      
    },
    onClickChild () {},
    loadDefaultOptions() {
      this.$store.dispatch('getDefaultData', 'materials/options/window').then((response) => {
        this.defaultOptions = response.data;
      })
    }
  },
  computed: {
		hasNewWindows () {
			return this.newWindows === 'Yes';
    },
    hasOtherWindowMaterial () {
      return this.checkedMaterials === 'other';
    }
	}
}
</script>