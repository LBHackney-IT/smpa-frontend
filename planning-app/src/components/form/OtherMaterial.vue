<template>
  <div class="govuk-inset-text">
    <div class="govuk-form-group">
      <label class="govuk-label" v-bind:for="material + '-new-material'">
        New material
      </label>
      <input class="govuk-input" v-bind:id="material + '-new-material'" v-bind:name="material + '-new-material'" type="text" v-model="newMaterial">
    </div>

    <div class="govuk-form-group govuk-!-margin-bottom-6">
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

    <div v-if="hasSameMaterialAsExisting" class="govuk-inset-text">
      <div class="govuk-form-group govuk-!-margin-bottom-6">
        <label class="govuk-label" v-bind:for="material + '-existing-material'">
          Existing material
        </label>
        <input class="govuk-input" v-bind:id="material + '-existing-material'" v-bind:name="material + '-existing-material'" type="text" v-model="existingMaterial">
      </div>

      <div class="govuk-form-group">
        <label class="govuk-label" v-bind:for="material + '-existing-material-color-type'">
          Please specify colour and type
        </label>
        <textarea class="govuk-textarea" v-bind:id="material + '-existing-material-color-type'" v-bind:name="material + '-existing-material-color-type'" rows="5" aria-describedby="more-detail-hint" v-model="existingMaterialColourAndType"></textarea>
      </div>
    </div>

    <v-cta name="Save" :onClick="saveAndReturn"></v-cta>
  </div>
</template>

<script>
import vCta from '../Cta.vue';
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