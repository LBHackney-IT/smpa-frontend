<template>
	<div>
		<h1 class="govuk-heading-xl">
			{{ question }}
		</h1>
		<div class="govuk-form-group">
			<fieldset class="govuk-fieldset">
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

			<div class="govuk-form-group" v-bind:class="{ 'govuk-form-group--error': dateStartedFormatError }">
				<fieldset class="govuk-fieldset" role="group">
					<legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
						<h4 class="govuk-heading-s">
							When did the work start?
						</h4>
					</legend>

					<span id="date-started-error" class="govuk-error-message" v-if="dateStartedFormatError">
						<span class="govuk-visually-hidden">Error:</span> Date format should be DD MM YYYY.
					</span>

					<div class="govuk-date-input" id="dob">
						<div class="govuk-date-input__item">
							<div class="govuk-form-group">
								<label class="govuk-label govuk-date-input__label" for="work-started-day">
									Day
								</label>
								<input class="govuk-input govuk-date-input__input govuk-input--width-2" v-bind:class="{ 'govuk-input--error': dateStartedFormatError }" id="work-started-day" name="work-started-day" type="number" pattern="[0-9]*" v-model="dayWorkStarted">
							</div>
						</div>
						<div class="govuk-date-input__item">
							<div class="govuk-form-group">
								<label class="govuk-label govuk-date-input__label" for="work-started-month">
									Month
								</label>
								<input class="govuk-input govuk-date-input__input govuk-input--width-2" v-bind:class="{ 'govuk-input--error': dateStartedFormatError }" id="work-started-month" name="work-started-month" type="number" pattern="[0-9]*" v-model="monthWorkStarted">
							</div>
						</div>
						<div class="govuk-date-input__item">
							<div class="govuk-form-group">
								<label class="govuk-label govuk-date-input__label" for="work-started-year">
									Year
								</label>
								<input class="govuk-input govuk-date-input__input govuk-input--width-4" v-bind:class="{ 'govuk-input--error': dateStartedFormatError }" id="work-started-year" name="work-started-year" type="number" pattern="[0-9]*" v-model="yearWorkStarted">
							</div>
						</div>
					</div>
				</fieldset>
			</div>

			<div class="govuk-form-group">
				<fieldset class="govuk-fieldset">
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
				<div class="govuk-form-group" v-bind:class="{ 'govuk-form-group--error': dateFinishedFormatError }">
					<fieldset class="govuk-fieldset" role="group">

						<legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
							<h4 class="govuk-heading-s">
								When did the work finish?
							</h4>
						</legend>

						<span id="date-finished-error" class="govuk-error-message" v-if="dateFinishedFormatError">
							<span class="govuk-visually-hidden">Error:</span> Date format should be DD MM YYYY.
						</span>

						<div class="govuk-date-input" id="dob">
							<div class="govuk-date-input__item">
								<div class="govuk-form-group">
									<label class="govuk-label govuk-date-input__label" for="work-finished-day">
										Day
									</label>
									<input class="govuk-input govuk-date-input__input govuk-input--width-2" v-bind:class="{ 'govuk-input--error': dateFinishedFormatError }" id="work-finished-day" name="work-finished-day" type="number" pattern="[0-9]*" v-model="dayWorkFinished">
								</div>
							</div>
							<div class="govuk-date-input__item">
								<div class="govuk-form-group">
									<label class="govuk-label govuk-date-input__label" for="work-finished-month">
										Month
									</label>
									<input class="govuk-input govuk-date-input__input govuk-input--width-2" v-bind:class="{ 'govuk-input--error': dateFinishedFormatError }" id="work-finished-month" name="work-finished-month" type="number" pattern="[0-9]*" v-model="monthWorkFinished">
								</div>
							</div>
							<div class="govuk-date-input__item">
								<div class="govuk-form-group">
									<label class="govuk-label govuk-date-input__label" for="work-finished-year">
										Year
									</label>
									<input class="govuk-input govuk-date-input__input govuk-input--width-4" v-bind:class="{ 'govuk-input--error': dateFinishedFormatError }" id="work-finished-year" name="work-finished-year" type="number" pattern="[0-9]*" v-model="yearWorkFinished">
								</div>
							</div>
						</div>
					</fieldset>
				</div>
			</div>

			<div class="govuk-form-group">
				<label class="govuk-label" for="more-detail">
					Please describe the works.
				</label>
				<textarea 
					class="govuk-textarea" 
					id="more-detail" 
					name="more-detail" 
					rows="5" 
					value="content" 
					:required="hasWorkStarted"
					v-model="workDetails">
				</textarea>
			</div>

		</div>

		<div v-if="error" class="govuk-inset-text govuk-inset-text--error ">
			{{ responseError }}
		</div>
		
		<v-cta name="Continue" :onClick="submit"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import vTextArea from '../../components/form/vTextArea.vue';
import router from '../../router';
import { getRouteAppId } from '../../mixins/getRouteAppId';
import * as errorMessage from '../../messages/errorMessages';

export default {
	name: 'WorkStart',
	mixins: [ getRouteAppId ],
	components: {
		vCta,
		vTextArea
	},
	data () {
    return {
			question: 'Starting the works',
			workStarted: undefined,
			dayWorkStarted: undefined,
			monthWorkStarted: undefined,
			yearWorkStarted: undefined,
			workDetails: undefined,
			workCompleted: undefined,
			dayWorkFinished: undefined,
			monthWorkFinished: undefined,
			yearWorkFinished: undefined,
			dateStartedFormatError: false,
			dateFinishedFormatError: false,
			errorMessages: undefined,
			error: undefined,
			responseError: undefined
    }
	},
	created() {
		this.errorMessages = errorMessage;
	},
	methods: {
		loadExistingAnswers () {
			if (this.application.data.works_started === true) {
				this.workStarted = true;
			} else if (this.application.data.works_started === false) {
				this.workStarted = false;
			} else {
				this.workStarted = this.application.data.works_started;
			}

			if (this.application.data.works_completed === true) {
				this.workCompleted = true;
			} else if (this.application.data.works_completed === false) {
				this.workCompleted = false;
			} else {
				this.workCompleted = this.application.data.works_completed;
			}

			this.workDetails = this.application.data.works_description;

			if (this.application.data.date_works_completed) {
				var dateWorksCompleted = new Date(this.application.data.date_works_completed);

				this.dayWorkFinished = dateWorksCompleted.getDate();
				this.monthWorkFinished = dateWorksCompleted.getMonth() + 1;
				this.yearWorkFinished = dateWorksCompleted.getFullYear();
			}

			if (this.application.data.date_works_started) {
				var dateWorksStarted = new Date(this.application.data.date_works_started);

				this.dayWorkStarted = dateWorksStarted.getDate();
				this.monthWorkStarted = dateWorksStarted.getMonth() + 1;
				this.yearWorkStarted = dateWorksStarted.getFullYear();
			}
		},

		sameAsExistingAnswers (payload) {
			if (
				payload.works_started === this.application.data.works_started &&
				payload.works_completed === this.application.data.works_completed &&
				payload.works_description === this.application.data.works_description &&
				payload.date_works_completed === this.application.data.date_works_completed &&
				payload.date_works_started === this.application.data.date_works_started
			) {
				return true;
			} else {
				return false;
			}
		},
		submit() {

			if (this.yearWorkStarted && (this.yearWorkStarted.length < 4 || this.yearWorkStarted.length > 4)) {
				this.dateStartedFormatError = true;
				return;
			}

			if (this.monthWorkStarted && (this.monthWorkStarted.length < 2 || this.monthWorkStarted.length > 2)) {
				this.dateStartedFormatError = true;
				return;
			}

			if (this.dayWorkStarted && (this.dayWorkStarted.length < 2 || this.dayWorkStarted.length > 2)) {
				this.dateStartedFormatError = true;
				return;
			}

			if (this.yearWorkFinished && (this.yearWorkFinished.length < 4 || this.yearWorkFinished.length > 4)) {
				this.dateFinishedFormatError = true;
				return;
			}

			if (this.monthWorkFinished && (this.monthWorkFinished.length < 2 || this.monthWorkFinished.length > 2)) {
				this.dateFinishedFormatError = true;
				return;
			}

			if (this.dayWorkFinished && (this.dayWorkFinished.length < 2 || this.dayWorkFinished.length > 2)) {
				this.dateFinishedFormatError = true;
				return;
			}

			this.dateStartedFormatError = false;
			this.dateFinishedFormatError = false;

			let objectToBeSent = {};

			objectToBeSent.works_started = this.workStarted === 'true' ||  this.workStarted === true ? true : false;

			if (objectToBeSent.works_started) {

				if (!this.yearWorkStarted || !this.monthWorkStarted || !this.dayWorkStarted) {
					this.dateStartedFormatError = true;
					return;
				}

				objectToBeSent.date_works_started = this.yearWorkStarted + '-' + this.monthWorkStarted + '-' + this.dayWorkStarted;

				objectToBeSent.works_completed = this.workCompleted === 'true' ||  this.workCompleted === true ? true : false;

				if (objectToBeSent.works_completed) {

					if (!this.yearWorkFinished || !this.monthWorkFinished || !this.dayWorkFinished) {
						this.dateFinishedFormatError = true;
						return;
					}

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

			if (this.sameAsExistingAnswers(payload.data)) {
				router.push({ name: 'Proposal', params: { applicationId: this.applicationId } });
			} else {
				this.$store.dispatch('updateApplication', payload).then((response) => {

					if (response.error) {
						this.error = true;
						this.responseError = this.errorMessages.UPDATE_APPLICATION.GENERIC_ERROR;
					} else {
						this.error = false;
						router.push({ name: 'Proposal', params: { applicationId: this.applicationId } });
					}
				})
			}
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