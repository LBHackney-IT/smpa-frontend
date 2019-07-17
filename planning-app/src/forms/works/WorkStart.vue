<template>
	<div>
		<h1 class="govuk-heading-xl">
			{{ question }}
		</h1>
		<div class="govuk-form-group">
			<fieldset class="govuk-fieldset" aria-describedby="work-started-hint">
				<legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
					<h2 class="govuk-heading-m">Have the works already started?</h2>
				</legend>

				<div class="govuk-inset-text">
					If you have made a change to your property that requires planning permission and you have not had approval, Hackney Council can request that you submit a retrospective application. This does not mean that planning permission will automatically be granted and the application will be treated in the usual way.
				</div>
				<div class="govuk-radios govuk-radios--inline">
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="work-started-1" name="work-started" type="radio" value="true" v-model="workStarted">
						<label class="govuk-label govuk-radios__label" for="work-started-1">
							Yes
						</label>
					</div>
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="work-started-2" name="work-started" type="radio" value="false" v-model="workStarted">
						<label class="govuk-label govuk-radios__label" for="work-started-2">
							No
						</label>
					</div>
				</div>
			</fieldset>
		</div>

		<div v-if="hasWorkStarted" class="govuk-inset-text">
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
								<input class="govuk-input govuk-date-input__input govuk-input--width-2" id="dob-day" name="dob-day" type="number" pattern="[0-9]*" v-model="dayWorkStarted">
							</div>
						</div>
						<div class="govuk-date-input__item">
							<div class="govuk-form-group">
								<label class="govuk-label govuk-date-input__label" for="dob-month">
									Month
								</label>
								<input class="govuk-input govuk-date-input__input govuk-input--width-2" id="dob-month" name="dob-month" type="number" pattern="[0-9]*" v-model="monthWorkStarted">
							</div>
						</div>
						<div class="govuk-date-input__item">
							<div class="govuk-form-group">
								<label class="govuk-label govuk-date-input__label" for="dob-year">
									Year
								</label>
								<input class="govuk-input govuk-date-input__input govuk-input--width-4" id="dob-year" name="dob-year" type="number" pattern="[0-9]*" v-model="yearWorkStarted">
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
							<input class="govuk-radios__input" id="work-completed-1" name="work-completed" type="radio" value="true" v-model="workCompleted">
							<label class="govuk-label govuk-radios__label" for="work-completed-1">
								Yes
							</label>
						</div>
						<div class="govuk-radios__item">
							<input class="govuk-radios__input" id="work-completed-2" name="work-completed" type="radio" value="false" v-model="workCompleted">
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
									<input class="govuk-input govuk-date-input__input govuk-input--width-2" id="dob-day" name="dob-day" type="number" pattern="[0-9]*" v-model="dayWorkFinished">
								</div>
							</div>
							<div class="govuk-date-input__item">
								<div class="govuk-form-group">
									<label class="govuk-label govuk-date-input__label" for="dob-month">
										Month
									</label>
									<input class="govuk-input govuk-date-input__input govuk-input--width-2" id="dob-month" name="dob-month" type="number" pattern="[0-9]*" v-model="monthWorkFinished">
								</div>
							</div>
							<div class="govuk-date-input__item">
								<div class="govuk-form-group">
									<label class="govuk-label govuk-date-input__label" for="dob-year">
										Year
									</label>
									<input class="govuk-input govuk-date-input__input govuk-input--width-4" id="dob-year" name="dob-year" type="number" pattern="[0-9]*" v-model="yearWorkFinished">
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
		<v-cta name="Continue" :onClick="submit"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import vTextArea from '../../components/form/vTextArea.vue';
import router from '../../router';
import WarningMessage from '../../components/WarningMessage.vue';
import { getRouteAppId } from '../../mixins/getRouteAppId';

export default {
	name: 'WorkStart',
	mixins: [ getRouteAppId ],
	components: {
		vCta,
		vTextArea,
		WarningMessage
	},
	data () {
    return {
			question: 'Starting the works',
			workStarted: undefined,
			dayWorkStarted: undefined,
			monthWorkStarted: undefined,
			yearWorkStarted: undefined,
			workDetails: undefined,
			warningMessage: 'Message to applicant.',
			workCompleted: undefined,
			dayWorkFinished: undefined,
			monthWorkFinished: undefined,
			yearWorkFinished: undefined,
			apiResponse: undefined
    }
	},
	methods: {
		loadExistingAnswers () {
			this.workStarted = this.application.data.works_started;
			this.workCompleted = this.application.data.works_completed;
			this.workDetails = this.application.data.works_description;

			if (this.application.data.date_works_completed) {
				var dateWorksCompleted = new Date(this.application.data.date_works_completed);

				this.dayWorkFinished = dateWorksCompleted.getDay();
				this.monthWorkFinished = dateWorksCompleted.getMonth();
				this.yearWorkFinished = dateWorksCompleted.getYear();
			}

			if (this.application.data.date_works_started) {
				var dateWorksStarted = new Date(this.application.data.date_works_started);

				this.dayWorkStarted = dateWorksStarted.getDay();
				this.monthWorkStarted = dateWorksStarted.getMonth();
				this.yearWorkStarted = dateWorksStarted.getYear();
			}
		},
		submit() {
			let objectToBeSent = {};

			objectToBeSent.works_started = this.workStarted === 'true' ||  this.workStarted === true ? true : false;

			if (objectToBeSent.works_started) {
				objectToBeSent.date_works_started = this.yearWorkStarted + '-' + this.monthWorkStarted + '-' + this.dayWorkStarted;

				objectToBeSent.works_completed = this.workCompleted === 'true' ? true : undefined;

				if (objectToBeSent.works_completed) {
					objectToBeSent.date_works_completed = this.yearWorkFinished + '-' + this.monthWorkFinished + '-' + this.dayWorkFinished;
				} else {
					objectToBeSent.date_works_completed = undefined;
				}

				if (this.workDetails) {
					objectToBeSent.works_description = this.workDetails;
				}
			} else {
				objectToBeSent.date_works_started = undefined;
				objectToBeSent.works_completed = undefined;
				objectToBeSent.date_works_completed = undefined;
				objectToBeSent.works_description = undefined;
			}

			let payload = {};
			payload.data = objectToBeSent;
			payload.id = this.applicationId;

			this.$store.dispatch('updateApplication', payload).then(() => {
				router.push({ name: 'Proposal', params: { applicationId: this.applicationId } });
			})
		}
	},
	computed: {
		hasWorkStarted () {
			return this.workStarted === 'true' || this.workStarted === true;
		},
		isWorkComplete () {
			return this.workCompleted === 'true' || this.workCompleted === true;
		},
		application () {
			let index = this.$store.state.state.applications.findIndex( application => application.data.id === this.applicationId );

			return this.$store.state.state.applications[index];
		}
	},
	watch: {
		application (newValue, oldValue) {
			this.loadExistingAnswers();
		}
	}
}
</script>