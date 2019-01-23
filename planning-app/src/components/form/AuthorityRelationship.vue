<template>
  <div class="govuk-inset-text">
    <div class="govuk-form-group">
      <label class="govuk-label" v-bind:for="relationship + '-name'">
        Name
      </label>
      <input class="govuk-input" v-bind:id="relationship + '-name'" v-bind:name="relationship + '-name'" type="text" v-model="name">
    </div>

    <div class="govuk-form-group">
      <label class="govuk-label" v-bind:for="relationship + '-role'">
        Role
      </label>
      <input class="govuk-input" v-bind:id="relationship + '-role'" v-bind:name="relationship + '-role'" type="text" v-model="role">
    </div>

    <div class="govuk-form-group">
      <label class="govuk-label" v-bind:for="relationship + '-relationship'">
        Relationship
      </label>
      <textarea class="govuk-textarea" v-bind:id="relationship + '-relationship'" v-bind:name="relationship + '-relationship'" rows="5" aria-describedby="more-detail-hint" v-model="relationshipDescription"></textarea>
    </div>

    <v-cta name="Save" :onClick="saveAndReturn"></v-cta>
  </div>
</template>

<script>
import vCta from '../form-elements/Cta.vue';
export default {
  name: 'AuthorityRelationship',
  components: {
    vCta
  },
  props: {
    relationship: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      name: '',
      role: '',
      relationshipDescription: ''
    }
  },
  methods: {
    saveAndReturn (event) {
      this.$emit('clicked', this.$data);
    }
  }
}
</script>