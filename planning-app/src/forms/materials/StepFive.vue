<template>
	<div>
		<div class="govuk-form-group">
      <fieldset class="govuk-fieldset" aria-describedby="materials-hint">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h1 class="govuk-fieldset__heading">
            Other materials
          </h1>
        </legend>

        <h4 class="govuk-heading-s">
					Are there any other external materials to be considered?
				</h4>

        <div class="govuk-inset-text">
          You might need to describe proposed materials for other elements such as chimneys, rainwater goods, boundary treatments (fences, railings, etc.), vehicle access and hard standing, lighting or others.
        </div>

        <div class="govuk-radios govuk-radios--inline">
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="trees-adjacent-1" name="trees-adjacent" type="radio" value="Yes" v-model="otherMaterials">
						<label class="govuk-label govuk-radios__label" for="trees-adjacent-1">
							Yes
						</label>
					</div>
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="trees-adjacent-2" name="trees-adjacent" type="radio" value="No" v-model="otherMaterials">
						<label class="govuk-label govuk-radios__label" for="trees-adjacent-2">
							No
						</label>
					</div>
				</div>

        <div v-if="hasOtherMaterials" class="govuk-inset-text">
          <div class="govuk-form-group" v-bind:key="index" v-for="(field, index) in this.fields">
            <label class="govuk-label" for="more-detail">
              Proposed material
            </label>
            <span id="more-detail-hint" class="govuk-hint">
              Include type, colour and name.
            </span>
            <textarea class="govuk-textarea" id="more-detail" name="more-detail" rows="5" aria-describedby="more-detail-hint" v-model="field.value"></textarea>
          </div>

          <button @click="addField">Add another material</button>

        </div>
      </fieldset>
    </div>

    <error-message v-if="showErrorMessage && !loading" :message="errorMessages.MATERIALS.GENERIC_ERROR"></error-message>

		<v-cta name="Continue" :onClick="submit"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';
import { getRouteAppId } from '../../mixins/getRouteAppId';
import ErrorMessage from '../../components/ErrorMessage.vue';
import * as errorMessage from '../../messages/errorMessages';

export default {
  name: 'MaterialsStepFive',
  mixins: [ getRouteAppId ],
	components: {
    vCta,
    ErrorMessage
  },
  data () {
    return {
      otherMaterials: '',
      fields: [
        {
          value: ''
        }
      ],
      materialsDescription: [],
      showErrorMessage: false,
      errorMessages: undefined
    }
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
    loadExistingAnswers () {
      if (this.application.data.proposal_extension.materials && this.application.data.proposal_extension.materials.other) {

        if (this.application.data.proposal_extension.materials.other.length > 0) {
          this.otherMaterials = 'Yes';

          this.fields = [];

          this.application.data.proposal_extension.materials.other.forEach((element) => {
            var fieldValue = {};

            fieldValue.value = element;

            this.fields.push(fieldValue);
          });
        }
    
      }
		},
    addField: function () {
      this.fields.push({ value: '' });
    },
    navigate() {
      router.push({ name: 'SupportingDocumentation' });
    },
    submit() {
      this.fields.forEach(element => {
       this.materialsDescription.push(element.value);
        
      });

      let payload;

      let currentMaterials = this.application.data.proposal_extension.materials;

      currentMaterials.other = this.materialsDescription;

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
            return this.showErrorMessage = true;
          } else {
            this.navigate();
          }
        
      })
    }
  },
  computed: {
		hasOtherMaterials () {
			return this.otherMaterials === 'Yes';
    },
    application () {
      let index = this.$store.state.state.applications.findIndex( application => application.data.id === this.applicationId );
			return this.$store.state.state.applications[index];
    }
	}
}
</script>