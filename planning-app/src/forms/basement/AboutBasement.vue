<template>
	<div>
    <h1 class="govuk-heading-xl">
      About basement
    </h1>
		<div class="govuk-form-group">
      <fieldset class="govuk-fieldset" aria-describedby="proposal-hint">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h2 class="govuk-heading-m">
            Where are the proposed works located in reference to the original house?
          </h2>
        </legend>

        <span id="proposal-hint" class="govuk-hint">
          Select all that apply.
        </span>

        <div class="govuk-checkboxes">
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-1" name="proposal" type="checkbox" value="Single storey extension" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-1">
              <strong>Excavation of a new basement</strong>
            </label>
          </div>


          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-2" name="proposal" type="checkbox" value="Two storey extension" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-2">
              <strong>A new separate unit of accomodation</strong>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-3" name="proposal" type="checkbox" value="Basement works" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-3">
              <strong>Alterations to the appearance of the house</strong>
              <p>For example, a light well.</p>
            </label>
          </div>
        </div>
      </fieldset>
    </div>
		<v-cta name="Continue" :onClick="navigate"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';


export default {
	name: 'AboutBasement',
	components: {
    vCta
  },
  data () {
    return {
      selectedProposal: []
    }
  },
	methods: {},
  computed: {
		isInConservationArea () {
      if (this.$store.state.site && this.$store.state.site.siteConstraints && this.$store.state.site.siteConstraints.conservationArea) {
        return this.$store.state.site.siteConstraints.conservationArea;
      } else {
        return false;
      }
		}
	}
}
</script>