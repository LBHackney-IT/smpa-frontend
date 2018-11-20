<template>
	<div>
		<div class="govuk-form-group">
      <fieldset class="govuk-fieldset" aria-describedby="proposal-hint">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h1 class="govuk-fieldset__heading">
            About the extension, improvement or alteration
          </h1>
        </legend>
        <span id="proposal-hint" class="govuk-hint">
          Select all that apply.
        </span>

        <div class="govuk-checkboxes">
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-1" name="proposal" type="checkbox" value="proposal-1" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-1">
              <strong>Extension</strong>
              <p>A extension of a addition to a house a the rear, side or front including adding a new floor, basement, outbuilding or porch.</p>
            </label>
          </div>

          <div class="govuk-inset-text" v-if="proposalIsChecked('proposal-1')">
            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="proposal-5" name="proposal" type="checkbox" value="rear-extension">
              <label class="govuk-label govuk-checkboxes__label" for="proposal-5">
                Rear extension
              </label>
            </div>

            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="proposal-5" name="proposal" type="checkbox" value="side-extension">
              <label class="govuk-label govuk-checkboxes__label" for="proposal-5">
                Side extension
              </label>
            </div>

            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="proposal-5" name="proposal" type="checkbox" value="front-extension">
              <label class="govuk-label govuk-checkboxes__label" for="proposal-5">
                Front extension
              </label>
            </div>

            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="proposal-5" name="proposal" type="checkbox" value="addition-floor">
              <label class="govuk-label govuk-checkboxes__label" for="proposal-5">
                Addition of a new floor
              </label>
            </div>

            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="proposal-5" name="proposal" type="checkbox" value="basements">
              <label class="govuk-label govuk-checkboxes__label" for="proposal-5">
                Basements
              </label>
            </div>

            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="proposal-5" name="proposal" type="checkbox" value="outbuilding">
              <label class="govuk-label govuk-checkboxes__label" for="proposal-5">
                Outbuilding
              </label>
            </div>

            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="proposal-5" name="proposal" type="checkbox" value="porch">
              <label class="govuk-label govuk-checkboxes__label" for="proposal-5">
                Porch
              </label>
            </div>

            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="proposal-5" name="proposal" type="checkbox" value="balcony">
              <label class="govuk-label govuk-checkboxes__label" for="proposal-5">
                Balcony
              </label>
            </div>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-2" name="proposal" type="checkbox" value="proposal-2" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-2">
              <strong>Alteration and/or addition to the existing building</strong>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-3" name="proposal" type="checkbox" value="proposal-3" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-3">
              <strong>Alteration and/or addition to the roof</strong>
              <p>Additions and alterations made to a roof to enlarge or enhance a house (for example a loft conversion or addition of roof lights).</p>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-4" name="proposal" type="checkbox" value="proposal-4" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-4">
              <strong>Gates, fences and walls</strong>
              <p>The maintenance, improvement or alteration of a gate, fence, wall or other means of enclosure. </p>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-5" name="proposal" type="checkbox" value="proposal-5" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-5">
              <strong>Chimneys and flues</strong>
              <p>The alteration or replacement of a chimney, flue or soil/vent pipe.</p>
            </label>
          </div>
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-6" name="proposal" type="checkbox" value="proposal-6" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-6">
              <strong>Hard surfaces</strong>
              <p>The formation, laying out and construction of a ground surface (for example a driveway).</p>
            </label>
          </div>
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-7" name="proposal" type="checkbox" value="proposal-7" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-7">
              <strong>Means of access to a highway</strong>
              <p>The formation, laying out and construction of a means of access to a highway that is required in connection to the proposed development.</p>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-8" name="proposal" type="checkbox" value="proposal-8" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-8">
              <strong>Repair or replace windows or doors</strong>
              <p>Alteration or replacement to windows or doors including dormer windows and doors.</p>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-9" name="proposal" type="checkbox" value="proposal-9" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-9">
              <strong>Exterior painting</strong>
              <p>Painting an exterior facade.</p>
            </label>
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
	name: 'AboutProposal',
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
      router.push({ name: 'AboutDevelopment' });
    },
    proposalIsChecked(selectedProposal) {
      const result = this.selectedProposal.find(function(proposal) {
        return proposal === selectedProposal;
      });
      return result ? true : false;
    }
  }
}
</script>