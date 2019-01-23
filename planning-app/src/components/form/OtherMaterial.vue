<template>
  <div class="govuk-inset-text">
    <div class="govuk-form-group">
      <label class="govuk-label" v-bind:for="material + '-new-material'">
        New material
      </label>
      <input class="govuk-input" v-bind:id="material + '-new-material'" v-bind:name="material + '-new-material'" type="text" v-model="newMaterial">
    </div>

    <div class="govuk-form-group">
      <label class="govuk-label" v-bind:for="material + '-colour-and-type'">
        Colour and type
      </label>

      <textarea 
        class="govuk-textarea" 
        v-bind:id="material + '-colour-and-type'" 
        v-bind:name="material + '-colour-and-type'" 
        rows="5" 
        aria-describedby="material-colour-and-type" 
        v-model="colourAndType">
      </textarea>
    </div>

    <fieldset class="govuk-fieldset" aria-describedby="trees-question-2-hint">
      <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
      
        <h4 class="govuk-heading-s">
          {{ secondQuestion }}
        </h4>
      
      </legend>

      <div class="govuk-radios govuk-radios--inline">
        <div class="govuk-radios__item">
          <input class="govuk-radios__input" v-bind:id="material + '-same-material-yes'" v-bind:name="material + '-same-material-yes'" type="radio" value="Yes" v-model="sameMaterialAsExisting">
          <label class="govuk-label govuk-radios__label" v-bind:for="material + '-same-material-yes'">
            Yes
          </label>
        </div>
        <div class="govuk-radios__item">
          <input class="govuk-radios__input" v-bind:id="material + '-same-material-no'" v-bind:name="material + '-same-material-no'" type="radio" value="No" v-model="sameMaterialAsExisting">
          <label class="govuk-label govuk-radios__label" v-bind:for="material + '-same-material-no'">
            No
          </label>
        </div>
      </div>
    </fieldset>

    <div v-if="hasSameMaterialAsExisting" class="govuk-inset-text">
      <div class="govuk-form-group">
        <label class="govuk-label" v-bind:for="material + '-existing-material'">
          Existing material
        </label>
        <input class="govuk-input" v-bind:id="material + '-existing-material'" v-bind:name="material + '-existing-material'" type="text" v-model="existingMaterial">
      </div>

      <div class="govuk-form-group">
        <label class="govuk-label" v-bind:for="material + '-existing-material-color-type'">
          Colour and type
        </label>
        <textarea class="govuk-textarea" v-bind:id="material + '-existing-material-color-type'" v-bind:name="material + '-existing-material-color-type'" rows="5" aria-describedby="more-detail-hint" v-model="existingMaterialColourAndType"></textarea>
      </div>
    </div>

    <v-cta name="Save" :onClick="saveAndReturn"></v-cta>
  </div>
</template>

<script>
import vCta from '../form-elements/Cta.vue';
export default {
  name: 'OtherMaterial',
  components: {
    vCta
  },
  props: {
    material: {
      type: String,
      required: true
    },
    secondQuestion: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      newMaterial: '',
      sameMaterialAsExisting: '',
      colourAndType: '',
      existingMaterial: '',
      existingMaterialColourAndType: ''
    }
  },
  methods: {
    saveAndReturn (event) {
      this.$emit('clicked', this.$data);
    }
  },
  computed: {
		hasSameMaterialAsExisting () {
			return this.sameMaterialAsExisting === 'Yes';
    }
	}
}
</script>