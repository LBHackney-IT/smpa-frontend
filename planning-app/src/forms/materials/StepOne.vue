<template>
	<div>    
    <h1 class="govuk-heading-xl">
      About the roof
    </h1>

    <fieldset class="govuk-fieldset govuk-!-margin-bottom-6" aria-describedby="materials-hint">
      <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
        <h2 class="govuk-heading-m">
          State what materials are to be used for the roof
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
          <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
            <h3 class="govuk-heading-m">
              What is the proposed roof covering made of?
            </h3>
          </legend>

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

              <materials-info v-if="materialIsChecked(option.id) && option.name != 'Other'" v-bind:material="option.id" :secondQuestion="materialsDetailsQuestion" @clicked="onClickChild"></materials-info>
            </div>
          </div>
        </fieldset>
      </div>
    </div>

    <error-message v-if="showErrorMessage && !loading" :message="errorMessages.MATERIALS.GENERIC_ERROR"></error-message>

		<v-cta name="Continue" :onClick="submit"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';
import MaterialsInfo from '../../components/form/MaterialsInfo.vue';
import OtherMaterial from '../../components/form/OtherMaterial.vue';
import { getRouteAppId } from '../../mixins/getRouteAppId';
import ErrorMessage from '../../components/ErrorMessage.vue';
import * as errorMessage from '../../messages/errorMessages';

export default {
  name: 'MaterialsStepOne',
  mixins: [ getRouteAppId ],
	components: {
    vCta,
    MaterialsInfo,
    OtherMaterial,
    ErrorMessage
  },
  data () {
    return {
      material: '',
      checkedMaterials: [],
      materialsDetailsQuestion: 'Is the proposed material and finish the same as roof covering?',
      otherMaterialsDetailsQuestion: 'Is the proposed material and finish the same as the existing?',
      defaultOptions: undefined,
      dataToBeSent: [],
      showErrorMessage: false,
      errorMessages: undefined
    }
  },
  beforeMount () {
    this.loadDefaultOptions();
  },
  created () {
    this.errorMessages = errorMessage;
  },
	methods: {
    navigate() {
      router.push({ name: 'MaterialsStep2' });
    },
    submit() {
      let payload;

      let currentMaterials = this.application.data.proposal_extension.materials;

      if (!currentMaterials.roof) {
        currentMaterials.roof = {};
      }

      if (this.material === 'new-material') {
        currentMaterials.roof.proposals = this.dataToBeSent;
 
      } else {
        currentMaterials.roof.matches_existing = this.material === 'match-existing' ? true : false;
        currentMaterials.roof.not_applicable = this.material === 'not-applicable' ? true : false;
      }

      payload = {
        "materials": currentMaterials
      };

      const extensionId = this.$store.getters.getExtensionId(this.applicationId);

      this.$store.dispatch('updateExtensionProposal', 
        { 
          "application_id": this.applicationId, 
          'selectedProposals': payload, 
          "extension_id": extensionId 
        }).then((response) => {

          if (response.error) {
            this.showErrorMessage = true;
            return;
          } else {
            this.navigate();
          }
      })
    },
    materialIsChecked(selectedMaterial) {
      const result = this.checkedMaterials.find(function(material) {
        return material === selectedMaterial;
      });
      return result ? true : false;
      
    },
    onClickChild (response) {
      this.dataToBeSent.push(response);
    },
    loadDefaultOptions() {
      this.$store.dispatch('getDefaultData', 'materials/options/roof').then((response) => {
        this.defaultOptions = response.data;
      })
    }
  },
  computed: {
    application () {
      let index = this.$store.state.state.applications.findIndex( application => application.data.id === this.applicationId );
			return this.$store.state.state.applications[index];
    }
  }
}
</script>