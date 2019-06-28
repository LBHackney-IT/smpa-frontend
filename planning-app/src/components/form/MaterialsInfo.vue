<template>
  <div class="govuk-inset-text">
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
    <v-cta name="Save" :onClick="saveAndReturn"></v-cta>
  </div>
</template>

<script>
import vCta from '../Cta.vue';
export default {
  name: 'MaterialsInfo',
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
      colourAndType: ''
    }
  },
  methods: {
    saveAndReturn (event) {
      const response = {
        colour_and_type: this.$data.colourAndType,
        material_id: this.material
      };

      this.$emit('clicked', response );
    }
  },
}
</script>