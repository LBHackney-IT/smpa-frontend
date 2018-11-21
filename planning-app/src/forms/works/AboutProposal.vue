<template>
	<div>
		<div class="govuk-form-group">
      <fieldset class="govuk-fieldset" aria-describedby="proposal-hint">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h1 class="govuk-fieldset__heading">
            {{question}}
          </h1>
        </legend>
        <span id="proposal-hint" class="govuk-hint">
          Select all that apply.
        </span>

        <div class="govuk-checkboxes">
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-1" name="proposal" type="checkbox" value="Extension" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-1">
              <strong>Extension</strong>
              <p>A extension of a addition to a house a the rear, side or front including adding a new floor, basement, outbuilding or porch.</p>
            </label>
          </div>

          <div class="govuk-inset-text" v-if="proposalIsChecked('Extension')">
            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="proposal-5" name="proposal" type="checkbox" value="Single storey" v-model="typeOfExtension">
              <label class="govuk-label govuk-checkboxes__label" for="proposal-5">
                Single storey
              </label>
            </div>

            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="proposal-5" name="proposal" type="checkbox" value="Two storey" v-model="typeOfExtension">
              <label class="govuk-label govuk-checkboxes__label" for="proposal-5">
                Two storey
              </label>
            </div>

            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="proposal-5" name="proposal" type="checkbox" value="Conservatory" v-model="typeOfExtension">
              <label class="govuk-label govuk-checkboxes__label" for="proposal-5">
                Conservatory
              </label>
            </div>

            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="proposal-5" name="proposal" type="checkbox" value="Basement and/or lightwell" v-model="typeOfExtension">
              <label class="govuk-label govuk-checkboxes__label" for="proposal-5">
                Basement and/or lightwell
              </label>
            </div>

            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="proposal-5" name="proposal" type="checkbox" value="outbuilding" v-model="typeOfExtension">
              <label class="govuk-label govuk-checkboxes__label" for="proposal-5">
                Outbuilding
              </label>
            </div>

            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="proposal-5" name="proposal" type="checkbox" value="porch" v-model="typeOfExtension">
              <label class="govuk-label govuk-checkboxes__label" for="proposal-5">
                Porch
              </label>
            </div>

            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="proposal-5" name="proposal" type="checkbox" value="Balcony, decking and platforms" v-model="typeOfExtension">
              <label class="govuk-label govuk-checkboxes__label" for="proposal-5">
                Balcony, decking and platforms
              </label>
            </div>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-2" name="proposal" type="checkbox" value="Alteration and/or addition to the existing building" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-2">
              <strong>Alteration and/or addition to the existing building</strong>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-3" name="proposal" type="checkbox" value="Alteration and/or addition to the roof" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-3">
              <strong>Alteration and/or addition to the roof</strong>
              <p>Additions and alterations made to a roof to enlarge or enhance a house (for example a loft conversion or addition of roof lights).</p>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-4" name="proposal" type="checkbox" value="Gates, fences and walls" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-4">
              <strong>Gates, fences and walls</strong>
              <p>The maintenance, improvement or alteration of a gate, fence, wall or other means of enclosure. </p>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-5" name="proposal" type="checkbox" value="Chimneys, flues and soil vent pipe" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-5">
              <strong>Chimneys, flues and soil vent pipe</strong> only conversation areas
              <p>The instalation, alteration or replacement of a chimney, flue or soil/vent pipe.</p>
            </label>
          </div>
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-6" name="proposal" type="checkbox" value="Patios, driveways and hardstanding" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-6">
              <strong>Patios, driveways and hardstanding</strong>
              <p>The formation, laying out and construction of a ground surface when not permeable materials are being used.</p>
            </label>
          </div>
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-7" name="proposal" type="checkbox" value="Means of access to a highway" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-7">
              <strong>Means of access to a highway</strong>
              <p>The formation, laying out and construction of a means of access to a highway that is required in connection to the proposed development.</p>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-8" name="proposal" type="checkbox" value="Repair or replace windows or doors" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-8">
              <strong>Repair or replace of existing windows or doors</strong> only conservation area
              <p>Alteration or replacement to windows or doors including dormer windows and doors.</p>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-9" name="proposal" type="checkbox" value="Exterior painting" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-9">
              <strong>Exterior painting</strong>
              <p>Painting an exterior facade.</p>
            </label>
          </div>
        </div>
      </fieldset>
    </div>
		<v-cta name="Next" :onClick="navigate"></v-cta>
    <!-- <review-works></review-works> -->
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';
import reviewWorks from './reviewWorks.vue';

export default {
	name: 'AboutProposal',
	components: {
    vCta,
    reviewWorks
  },
  data () {
    return {
      selectedProposal: [],
      typeOfExtension: [],
      question: 'About the extension, improvement or alteration'
    }
  },
	methods: {
    collectDataAndStore () {

			let question = {
				question: this.question,
				answers: {}
      };
      
      question.answers.required = true;
      question.answers.proposal = this.selectedProposal;
      question.answers.typeOfExtension = this.typeOfExtension;
			this.$store.commit('addAboutProposalAnswers', JSON.parse(JSON.stringify(question)));
		},
    navigate() {
      this.collectDataAndStore();
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