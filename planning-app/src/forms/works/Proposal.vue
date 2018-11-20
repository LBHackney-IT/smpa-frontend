<template>
	<div>
		<div class="govuk-form-group">
      <fieldset class="govuk-fieldset" aria-describedby="proposal-hint">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h1 class="govuk-fieldset__heading">
            What is your proposal?
          </h1>
        </legend>
        <span id="proposal-hint" class="govuk-hint">
          Select all that apply.
        </span>

        <div class="govuk-checkboxes">
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-1" name="proposal" type="checkbox" value="proposal-1" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-1">
              <strong>Enlargement, improvement or alteration</strong>
              <p>Enlargement, improvement or alteration to any aspect of a dwelling house, such as extensions or outbuildings as well as all general alterations like rooflights or the replacement of windows and doors. </p>
            </label>
          </div>
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-2" name="proposal" type="checkbox" value="proposal-2" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-2">
              <strong>New build</strong>
            </label>
          </div>
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-3" name="proposal" type="checkbox" value="proposal-3" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-3">
              <strong>Change of use</strong>
              <p>The Town and Country Planning (Use Classes) Order 1987 (as amended) puts uses of land and buildings into various categories known as 'Use Classes'. It is generally the case that you will need planning permission to change from one use class to another, although there are exceptions where the legislation does allow some changes between uses.</p>
            </label>
          </div>
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-4" name="proposal" type="checkbox" value="proposal-4" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-4">
              <strong>Confirmation of use</strong>
              <p>If you want to be certain that the existing use of a building is lawful for planning purposes or that your proposal does not require planning permission, you can apply for a 'Lawful Development Certificate' (LDC).</p>
            </label>
          </div>
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-5" name="proposal" type="checkbox" value="proposal-5" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-5">
              <strong>Demolition</strong>
              <p>Any building operation consisting of the demolition of a building or part of it.</p>
            </label>
          </div>
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-6" name="proposal" type="checkbox" value="proposal-6" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-6">
              <strong>Tree works</strong>
              <p>Common tree work operations include crown thinning, crown lifting, crown reduction.</p>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-7" name="proposal" type="checkbox" value="proposal-7" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-7">
              <strong>Equipment</strong>
              <p>The installation, alteration or replacement of an equipment on a dwellinghouse or within the curtilage of a dwellinghouse.</p>
            </label>
          </div>

          <div v-if="proposalIsChecked('proposal-7')" class="govuk-inset-text">
            <div class="govuk-checkboxes__item" v-if="isInConservationArea">
              <input class="govuk-checkboxes__input" id="equipment-1" name="equipment-1" type="checkbox" value="CCTV">
              <label class="govuk-label govuk-checkboxes__label" for="equipment-1">
                CCTV
              </label>
            </div>

            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="equipment-2" name="equipment-2" type="checkbox" value="satellite-dish">
              <label class="govuk-label govuk-checkboxes__label" for="equipment-2">
                Satellite dish
              </label>
            </div>

            <div class="govuk-checkboxes__item" v-if="isInConservationArea">
              <input class="govuk-checkboxes__input" id="equipment-3" name="equipment-3" type="checkbox" value="solar-panel">
              <label class="govuk-label govuk-checkboxes__label" for="equipment-3">
                Solar panel
              </label>
            </div>

            <div class="govuk-checkboxes__item" v-if="isInConservationArea">
              <input class="govuk-checkboxes__input" id="equipment-4" name="equipment-4" type="checkbox" value="security-alarm">
              <label class="govuk-label govuk-checkboxes__label" for="equipment-4">
                Security alarm
              </label>
            </div>

            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="equipment-4" name="equipment-4" type="checkbox" value="security-alarm">
              <label class="govuk-label govuk-checkboxes__label" for="equipment-4">
                Air conditioning unit
              </label>
            </div>

            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="equipment-6" name="equipment-6" type="checkbox" value="tank">
              <label class="govuk-label govuk-checkboxes__label" for="equipment-6">
                Tank
              </label>
            </div>

            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="equipment-6" name="equipment-6" type="checkbox" value="tank">
              <label class="govuk-label govuk-checkboxes__label" for="equipment-6">
                Other
              </label>
            </div>

          </div>
        </div>
      </fieldset>
    </div>
		<v-cta name="Next" :onClick="navigate"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';

export default {
	name: 'Proposal',
	components: {
    vCta
  },
  data () {
    return {
      selectedProposal: []
    }
  },
	methods: {
    navigate() {
      router.push({ name: 'AboutProposal' });
    },
    proposalIsChecked(selectedProposal) {
      const result = this.selectedProposal.find(function(proposal) {
        return proposal === selectedProposal;
      });
      return result ? true : false;
    }
  },
  computed: {
		isInConservationArea () {
			return this.$store.getters.isInConservationArea;
		}
	}
}
</script>