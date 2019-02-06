<template>
	<div>
    <h1 class="govuk-heading-xl">
			{{ question }}
		</h1>
		<div class="govuk-form-group">
      <fieldset class="govuk-fieldset" aria-describedby="proposal-hint">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h2 class="govuk-heading-m">
            What type of works are you proposing?
          </h2>
        </legend>
        <span id="proposal-hint" class="govuk-hint">
          Select all that apply.
        </span>

        <div class="govuk-checkboxes">
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-1" name="proposal" type="checkbox" value="Extension, improvement or alteration" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-1">
              <strong>Extension, improvement or alteration</strong>
              <p>Enlarging, changing or adding to any aspect of a house, such as an extension or an outbuilding. This also includes all general alterations like rooflights or new windows.</p>
              <div class="govuk-inset-text">
                <p class="govuk-body govuk-!-font-weight-bold">Example</p>
                A single-storey, ground floor, rear extension.
              </div>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-4" name="proposal" type="checkbox" value="Confirmation of use" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-4">
              <strong>Confirmation of use</strong>
              <p>If you want to be certain that the existing use of a building is lawful for planning purposes (according to The Town and Country Planning Act), you need to submit evidence of use over a certain time period via a Certificate of lawful use.</p>
               <div class="govuk-inset-text">
                <p class="govuk-body govuk-!-font-weight-bold">Example</p>
                This may be useful when you discover planning permission has never been granted. You may need to prove to prospective buyers that the development or land use is lawful.
              </div>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-7" name="proposal" type="checkbox" value="Equipment" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-7">
              <strong>Equipment</strong>
              <p>The installation, alteration or replacement of equipment on a house or within the curtilage of a house. This may include an antenna, CCTV or a solar panel.</p>
            </label>
          </div>

          <div v-if="proposalIsChecked('Equipment')" class="govuk-inset-text">
            <div class="govuk-checkboxes__item" v-if="isInConservationArea">
              <input class="govuk-checkboxes__input" id="equipment-1" name="equipment-1" type="checkbox" value="CCTV" v-model="selectedEquipment">
              <label class="govuk-label govuk-checkboxes__label" for="equipment-1">
                CCTV
              </label>
            </div>

            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="equipment-2" name="equipment-2" type="checkbox" value="Satellite dish or atenna" v-model="selectedEquipment">
              <label class="govuk-label govuk-checkboxes__label" for="equipment-2">
                Satellite dish or antenna
              </label>
            </div>

            <div class="govuk-checkboxes__item" v-if="isInConservationArea">
              <input class="govuk-checkboxes__input" id="equipment-3" name="equipment-3" type="checkbox" value="Solar panel" v-model="selectedEquipment">
              <label class="govuk-label govuk-checkboxes__label" for="equipment-3">
                Solar panel or other sustainable energy equipment
              </label>
            </div>

            <div class="govuk-checkboxes__item" v-if="isInConservationArea">
              <input class="govuk-checkboxes__input" id="equipment-4" name="equipment-4" type="checkbox" value="Security alarm" v-model="selectedEquipment">
              <label class="govuk-label govuk-checkboxes__label" for="equipment-4">
                Security alarm
              </label>
            </div>

            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="equipment-4" name="equipment-4" type="checkbox" value="Air conditioning unit" v-model="selectedEquipment">
              <label class="govuk-label govuk-checkboxes__label" for="equipment-4">
                Air conditioning unit
              </label>
            </div>

            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="equipment-6" name="equipment-6" type="checkbox" value="Tank or fuel containers" v-model="selectedEquipment">
              <label class="govuk-label govuk-checkboxes__label" for="equipment-6">
                Tank or fuel containers
              </label>
            </div>

            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="equipment-6" name="equipment-6" type="checkbox" value="Other" v-model="selectedEquipment">
              <label class="govuk-label govuk-checkboxes__label" for="equipment-6">
                Other
              </label>
            </div>

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
	name: 'Proposal',
	components: {
    vCta,
    reviewWorks
  },
  data () {
    return {
      question: 'About the works',
      selectedProposal: [],
      selectedEquipment: []
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
      question.answers.equipments = this.selectedEquipment;
			this.$store.commit('addProposalAnswers', JSON.parse(JSON.stringify(question)));
		},
    navigate() {
      this.collectDataAndStore();
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
      if (this.$store.state.site && this.$store.state.site.siteConstraints && this.$store.state.site.siteConstraints.conservationArea) {
        return this.$store.state.site.siteConstraints.conservationArea;
      } else {
        return false;
      }
		}
	}
}
</script>