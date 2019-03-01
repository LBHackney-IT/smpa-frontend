<template>
	<div>
    <h1 class="govuk-heading-xl">
			About the equipment
		</h1>
		<div class="govuk-form-group">
      <fieldset class="govuk-fieldset" aria-describedby="proposal-hint">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <p class="govuk-body govuk-!-font-size-27">
            You need to specify what equipment you are installing.
          </p>
        </legend>
        <span id="proposal-hint" class="govuk-hint">
          Select all that apply.
        </span>

        <div class="govuk-checkboxes">
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-1" name="proposal" type="checkbox" value="Satellite dish or antenna" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-1">
              <strong>Satellite dish or antenna</strong>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-4" name="proposal" type="checkbox" value="Confirmation of use" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-4">
              <strong>Air conditioning unit</strong>
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-7" name="proposal" type="checkbox" value="Tank" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-7">
              <strong>Tank</strong>
            </label>
          </div>


          <div v-if="isInConservationArea">
            <div class="govuk-warning-text">
              <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
              <strong class="govuk-warning-text__text">
                <span class="govuk-warning-text__assistive">Warning</span>
                Because your site is in a conservation area, the following equipment installation, replacement or alteration also requires planning permission.
              </strong>
            </div>

            <div class="govuk-checkboxes__item" v-if="isInConservationArea">
              <input class="govuk-checkboxes__input" id="equipment-1" name="equipment-1" type="checkbox" value="CCTV" v-model="selectedEquipment">
              <label class="govuk-label govuk-checkboxes__label" for="equipment-1">
                CCTV
              </label>
            </div>

            <div class="govuk-checkboxes__item" v-if="isInConservationArea">
              <input class="govuk-checkboxes__input" id="equipment-4" name="equipment-4" type="checkbox" value="Security alarm" v-model="selectedEquipment">
              <label class="govuk-label govuk-checkboxes__label" for="equipment-4">
                Security alarm
              </label>
            </div>

            <div class="govuk-checkboxes__item" v-if="isInConservationArea">
              <input class="govuk-checkboxes__input" id="equipment-3" name="equipment-3" type="checkbox" value="Solar panel" v-model="selectedEquipment">
              <label class="govuk-label govuk-checkboxes__label" for="equipment-3">
                Solar panel or other sustainable energy equipment
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
import Navigate from '../../common/navigate';

export default {
	name: 'AboutEquipment',
	components: {
    vCta
  },
  data () {
    return {
      question: 'About the works',
      selectedProposal: [],
      selectedEquipment: [],
      currentWorks: undefined
    }
  },
  created () {
    this.fetchData();
  },
    watch: {
    '$route': 'fetchData'
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
    fetchData () {
      this.currentWorks = this.$route.params.currentLevelInfo;
    },
    navigate() {
      // this.collectDataAndStore();
      var routerParams = Navigate.calculateNavigation(this.$store.state.state.proposalFlow, this.currentWorks, 'AboutEquipment');
      router.push(routerParams);
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