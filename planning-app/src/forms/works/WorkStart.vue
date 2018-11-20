<template>
	<div>
		<div class="govuk-form-group">
			<fieldset class="govuk-fieldset" aria-describedby="work-started-hint">
				<legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
				<h1 class="govuk-fieldset__heading">
					{{ question }}
				</h1>
				</legend>
				<div class="govuk-radios govuk-radios--inline">
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="work-started-1" name="work-started" type="radio" value="Yes" v-model="workStarted">
						<label class="govuk-label govuk-radios__label" for="work-started-1">
							Yes
						</label>
					</div>
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="work-started-2" name="work-started" type="radio" value="No" v-model="workStarted">
						<label class="govuk-label govuk-radios__label" for="work-started-2">
							No
						</label>
					</div>
				</div>
			</fieldset>
		</div>

		<div v-if="hasWorkStarted" class="govuk-inset-text">
			<warning-message :message="warningMessage" v-bind:typeAlert="false"></warning-message>

			<legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
				<h4 class="govuk-heading-s">
					When did the work start?
				</h4>
			</legend>

			<div class="govuk-form-group">
				<fieldset class="govuk-fieldset" aria-describedby="dob-hint" role="group">
					<div class="govuk-date-input" id="dob">
						<div class="govuk-date-input__item">
							<div class="govuk-form-group">
								<label class="govuk-label govuk-date-input__label" for="dob-day">
									Day
								</label>
								<input class="govuk-input govuk-date-input__input govuk-input--width-2" id="dob-day" name="dob-day" type="number" pattern="[0-9]*">
							</div>
						</div>
						<div class="govuk-date-input__item">
							<div class="govuk-form-group">
								<label class="govuk-label govuk-date-input__label" for="dob-month">
									Month
								</label>
								<input class="govuk-input govuk-date-input__input govuk-input--width-2" id="dob-month" name="dob-month" type="number" pattern="[0-9]*">
							</div>
						</div>
						<div class="govuk-date-input__item">
							<div class="govuk-form-group">
								<label class="govuk-label govuk-date-input__label" for="dob-year">
									Year
								</label>
								<input class="govuk-input govuk-date-input__input govuk-input--width-4" id="dob-year" name="dob-year" type="number" pattern="[0-9]*">
							</div>
						</div>
					</div>
				</fieldset>
			</div>

			<div class="govuk-form-group">
				<fieldset class="govuk-fieldset" aria-describedby="work-completed-hint">
					<legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
					<h4 class="govuk-heading-s">
						Has the work already been completed?
					</h4>
					</legend>
					<div class="govuk-radios govuk-radios--inline">
						<div class="govuk-radios__item">
							<input class="govuk-radios__input" id="work-completed-1" name="work-completed" type="radio" value="Yes" v-model="workCompleted">
							<label class="govuk-label govuk-radios__label" for="work-completed-1">
								Yes
							</label>
						</div>
						<div class="govuk-radios__item">
							<input class="govuk-radios__input" id="work-completed-2" name="work-completed" type="radio" value="No" v-model="workCompleted">
							<label class="govuk-label govuk-radios__label" for="work-completed-2">
								No
							</label>
						</div>
					</div>
				</fieldset>
			</div>

			<div v-if="isWorkComplete" class="govuk-inset-text">
				<legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
					<h4 class="govuk-heading-s">
						When did the work finish?
					</h4>
				</legend>

				<div class="govuk-form-group">
					<fieldset class="govuk-fieldset" aria-describedby="dob-hint" role="group">
						<div class="govuk-date-input" id="dob">
							<div class="govuk-date-input__item">
								<div class="govuk-form-group">
									<label class="govuk-label govuk-date-input__label" for="dob-day">
										Day
									</label>
									<input class="govuk-input govuk-date-input__input govuk-input--width-2" id="dob-day" name="dob-day" type="number" pattern="[0-9]*">
								</div>
							</div>
							<div class="govuk-date-input__item">
								<div class="govuk-form-group">
									<label class="govuk-label govuk-date-input__label" for="dob-month">
										Month
									</label>
									<input class="govuk-input govuk-date-input__input govuk-input--width-2" id="dob-month" name="dob-month" type="number" pattern="[0-9]*">
								</div>
							</div>
							<div class="govuk-date-input__item">
								<div class="govuk-form-group">
									<label class="govuk-label govuk-date-input__label" for="dob-year">
										Year
									</label>
									<input class="govuk-input govuk-date-input__input govuk-input--width-4" id="dob-year" name="dob-year" type="number" pattern="[0-9]*">
								</div>
							</div>
						</div>
					</fieldset>
				</div>
			</div>

			<v-text-area 
				label="Describe what you have already done" 
				v-model="workDetails" 
				name="more-detail" 
				:isRequired="hasWorkStarted">
			</v-text-area>
		</div>

		<v-cta name="Next" :onClick="navigate"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import vTextArea from '../../components/form/vTextArea.vue';
import router from '../../router';
import WarningMessage from '../../components/WarningMessage.vue';

export default {
	name: 'WorkStart',
	components: {
		vCta,
		vTextArea
	},
	data () {
    return {
			question: 'Has the work already been started?',
			workStarted: undefined,
			workDetails: undefined,
			warningMessage: 'Message to applicant.',
			workCompleted: undefined
    }
  },
	methods: {
		collectDataAndStore () {

			let question = {
				question: this.question,
				answers: []
			};

			if (this.workStarted) {
				let workStartedAnswers = {};

				workStartedAnswers.question = this.question;
				workStartedAnswers.answerLabel = this.workStarted;
				workStartedAnswers.answerValue = this.workStarted === 'Yes' ? true : false;
				workStartedAnswers.required = true;

				question.answers.push(workStartedAnswers);
			}

			if (this.hasWorkStarted) {

				let answerWorkDetails = {};

				answerWorkDetails.question = 'Describe what you have already done';
				answerWorkDetails.answerValue = this.workDetails;
				answerWorkDetails.required = true;
				
				question.answers.push(answerWorkDetails);
			}

			this.$store.commit('addWorksAnswers', question);

		},
    navigate() {
			//this.collectDataAndStore();
      router.push({ name: 'MultipleOccupation' });
    }
	},
	computed: {
		hasWorkStarted () {
			return this.workStarted === 'Yes';
		},
		isWorkComplete () {
			return this.workCompleted === 'Yes';
		}
	}
}
</script>