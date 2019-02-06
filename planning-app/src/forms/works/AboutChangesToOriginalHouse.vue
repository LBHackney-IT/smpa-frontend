<template>
	<div>
    <h1 class="govuk-heading-xl">
      About the extension, improvement or alteration to the original house
    </h1>
		<div class="govuk-form-group">
      <fieldset class="govuk-fieldset" aria-describedby="proposal-hint">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h2 class="govuk-heading-m">
            What changes are you proposing?
          </h2>
        </legend>

        <span id="proposal-hint" class="govuk-hint">
          Select all that apply.
        </span>

        <div class="govuk-checkboxes">
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-1" name="proposal" type="checkbox" value="Single storey extension" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-1">
              <strong>Single storey extension</strong>
            </label>
          </div>


          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-2" name="proposal" type="checkbox" value="Two storey extension" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-2">
              <strong>Two storey extension</strong>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-3" name="proposal" type="checkbox" value="Basement works" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-3">
              <strong>Basement works</strong>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-4" name="proposal" type="checkbox" value="Lightwell works" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-4">
              <strong>Lightwell works</strong>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-5" name="proposal" type="checkbox" value="Roof works" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-5">
              <strong>Roof works</strong>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-6" name="proposal" type="checkbox" value="Conservatory" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-6">
              <strong>Conservatory</strong>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-7" name="proposal" type="checkbox" value="Outbuilding" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-7">
              <strong>Outbuilding</strong>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-8" name="proposal" type="checkbox" value="Porch" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-8">
              <strong>Porch</strong>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-9" name="proposal" type="checkbox" value="Balcony or terrace" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-9">
              <strong>Balcony or terrace</strong>
            </label>
          </div>

          <div v-if="isInConservationArea">
            <div class="govuk-warning-text">
              <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
              <strong class="govuk-warning-text__text">
                <span class="govuk-warning-text__assistive">Warning</span>
                Because you are in a conservation area, the following works also require planning permission:
              </strong>
            </div>

            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="proposal-10" name="proposal" type="checkbox" value="Windows" v-model="selectedProposal">
              <label class="govuk-label govuk-checkboxes__label" for="proposal-10">
                <strong>Addition and/or replacement of windows or doors, including bay windows</strong>
              </label>
            </div>

            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="proposal-10" name="proposal" type="checkbox" value="Cladding" v-model="selectedProposal">
              <label class="govuk-label govuk-checkboxes__label" for="proposal-10">
                <strong>Changing and/or adding cladding</strong>
              </label>
            </div>
  
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
	name: 'AboutChangesToOriginalHouse',
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