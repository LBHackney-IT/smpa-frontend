<template>
	<div>
		<div class="govuk-form-group">
			<fieldset class="govuk-fieldset" aria-describedby="multiple-occupation-hint">
				<legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
				<h1 class="govuk-fieldset__heading">
					Has the <span class="lowercase">{{houseType}}</span> been split into flats?
				</h1>
				</legend>
				<div class="govuk-radios govuk-radios--inline">
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="multiple-occupation-1" name="multiple-occupation" type="radio" value="Yes" v-model="multipleOccupation">
						<label class="govuk-label govuk-radios__label" for="multiple-occupation-1">
							Yes
						</label>
					</div>
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="multiple-occupation-2" name="multiple-occupation" type="radio" value="No" v-model="multipleOccupation">
						<label class="govuk-label govuk-radios__label" for="multiple-occupation-2">
							No
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
	name: 'MultipleOccupation',
	components: {
		vCta,
		reviewWorks
	},
	data () {
    return {
      multipleOccupation: ''
    }
  },
	methods: {
		collectDataAndStore () {

			let question = {
				question: 'Has the ' + this.houseType + 'been split into flats?',
				answers: {}
			};

			let multipleOccupationAnswers = {};

			multipleOccupationAnswers.question = question.question;
			multipleOccupationAnswers.answerLabel = this.multipleOccupation;
			multipleOccupationAnswers.answerValue = this.multipleOccupation === 'Yes' ? true : false;
			multipleOccupationAnswers.required = true;

			question.answers = multipleOccupationAnswers;
			this.$store.commit('addMultipleOccupationAnswers', JSON.parse(JSON.stringify(question)));
		},
    navigate() {
			this.collectDataAndStore();
      router.push({ name: 'Proposal' });
    }
	},
	computed: {
		houseType () {
			let houseType;

			if (this.$store.state.site && this.$store.state.site.siteInfo && this.$store.state.site.siteInfo.propertyType) {
				houseType = this.$store.state.site.siteInfo.propertyType;
			} else {
				houseType = 'house';
			}
		
			return houseType
		}
	}
}
</script>