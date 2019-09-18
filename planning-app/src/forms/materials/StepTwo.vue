<template>
	<div>
    <h1 class="govuk-heading-xl">
      About the walls
    </h1>

    <fieldset class="govuk-fieldset govuk-!-margin-bottom-6" aria-describedby="materials-hint">
      <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
        <h2 class="govuk-heading-m">
          State what materials are to be used for the walls
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
              What is the proposed external walls made of?
            </h3>
          </legend>

          <span id="proposal-hint" class="govuk-hint">
            Select all that apply.
          </span>

          <div class="govuk-checkboxes">
            <div class="vertical-checkboxes" v-bind:key="option.id" v-for="option in this.defaultOptions">
              <div class="govuk-checkboxes__item govuk-!-margin-bottom-3">
                <input class="govuk-checkboxes__input" v-bind:id="option.id" v-bind:name="option.name" type="checkbox" v-bind:value="option.id" v-model="checkedMaterials" >
                <label class="govuk-label govuk-checkboxes__label" v-bind:for="option.id">
                  {{option.name}}
                </label>
              </div>

              <materials-info v-if="materialIsChecked(option.id)" v-bind:material="option.id" :existingAnswer="existingProposedMaterial(option.id)" @clicked="onClickChild"></materials-info>
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
  name: 'MaterialsStepTwo',
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
      materialsDetailsQuestion: 'Is the proposed material and finish the same as the external walls?',
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
  watch: {
    application () {
			this.loadExistingAnswers();
		}
  },
	methods: {
    existingProposedMaterial (id) {
      if (this.application.data.proposal_extension.materials.walls && this.application.data.proposal_extension.materials.walls.proposals) {
        const result = this.application.data.proposal_extension.materials.walls.proposals.find(function(material) {
          return material.material_id === id;
        });

        return result ? result.colour_and_type : '';
      } else {
        return '';
      }
    },
    loadExistingAnswers () {
      if (this.application.data.proposal_extension.materials.walls) {
        if (this.application.data.proposal_extension.materials.walls.matches_existing) {
          this.material = 'match-existing';
        }

        if (this.application.data.proposal_extension.materials.walls.not_applicable) {
          this.material = 'not-applicable';
        }
        
        if (this.application.data.proposal_extension.materials.walls.proposals && this.application.data.proposal_extension.materials.walls.proposals.length > 0) {
          this.material = 'new-material';

          this.application.data.proposal_extension.materials.walls.proposals.forEach((element) => {
            this.checkedMaterials.push(element.material_id);
          });
        }
      }
		},
    submit() {
      let payload;

      let currentMaterials = this.application.data.proposal_extension.materials;

      if (!currentMaterials.walls) {
        currentMaterials.walls = {};
      }

      if (this.material === 'new-material') {
        let proposedMaterials = [];

        this.dataToBeSent.forEach((element) => {
          proposedMaterials.push(element);
        });

        if (this.application.data.proposal_extension.materials.walls.proposals && this.application.data.proposal_extension.materials.walls.proposals.length > 0) {
          this.checkedMaterials.forEach((element) => {
            var materialFound = this.application.data.proposal_extension.materials.walls.proposals.find((el) => el.material_id === element);

            if (materialFound) {
              proposedMaterials.push({"colour_and_type": materialFound.colour_and_type, "material_id": materialFound.material_id, "material": materialFound.name });
            }
            
          });
        }

        currentMaterials.walls.proposals = proposedMaterials;
        currentMaterials.walls.matches_existing = false;
        currentMaterials.walls.not_applicable = false;
 
      } else {
        currentMaterials.walls.matches_existing = this.material === 'match-existing' ? true : false;
        currentMaterials.walls.not_applicable = this.material === 'not-applicable' ? true : false;
      }

      payload = {
        "materials": currentMaterials
      };

      const extensionId = this.$store.getters.getExtensionId(this.applicationId);

      this.$store.dispatch('updateExtensionProposal', { 
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
    navigate() {
      router.push({ name: 'MaterialsStep3' });
    },
    onClickChild (response) {
      this.dataToBeSent.push(response);
    },
    loadDefaultOptions() {
      this.$store.dispatch('getDefaultData', 'materials/options/wall').then((response) => {
        if (response.error) {
          this.showErrorMessage = true;
          return;
        } else {
          this.defaultOptions = response.data;
        }
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