<template>
	<div>
		<question-generator :questions="questions"></question-generator>
	</div>
</template>

<script>
import vCta from '../../components/form-elements/Cta.vue';
import vTextArea from '../../components/form-elements/vTextArea.vue';
import router from '../../router';
import WarningMessage from '../../components/WarningMessage.vue';
import Radios from '../../components/forms/Radios.vue';

import QuestionGenerator from '../../components/form/QuestionGenerator.vue';

export default {
	name: 'WorkStart',
	components: {
		vCta,
		Radios,
		vTextArea,
		WarningMessage,
		QuestionGenerator
	},
	data () {
    return {
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
			questions: [
				{
					caption: "Has the work already been started?",
					key: "hasStarted",
					id: 1,
					skip: {
						canSkip: true,
						text: "This is optional."
					},
					captionDescription: [],
					captionInsetText: [],
					captionWarningText: [],
					captionInformationMessage: [],
					captionGuide: {
						show: true,
						text: "Select all that apply"
					},
					captionDetails: [],
					form: [
						{
							question: 'Question',
							questioInsetText: [],
							questionWarningMessage: [],
							questionDescription: [],
							questionInformationMessage: [],
							type: "boolean",
							fields: [
								{
									name: 'work-started',
									id: 'work-started-1',
									label: 'Yes',
									value: true,
									required: true
								},
								{
									name: 'work-started',
									id: 'work-started-2',
									label: 'No',
									value: false
								}
							],
							subQuestions: {
								isVisible: answer => answer === true,
							}
						}
					]
				}
			]
    }
  },
	methods: {
		collectDataAndStore () {

			let question = {
				question: this.question,
				answers: {}
			};

			if (this.workStarted) {
				let workStartedAnswers = {};

				workStartedAnswers.question = this.question;
				workStartedAnswers.answerLabel = this.workStarted;
				workStartedAnswers.answerValue = this.workStarted === 'Yes' ? true : false;
				workStartedAnswers.required = true;

				question.answers = workStartedAnswers;
			}

			if (this.hasWorkStarted) {

				let answerWorkDetails = {};

				answerWorkDetails.question = 'Describe what you have already done';
				answerWorkDetails.answerValue = this.workDetails;
				answerWorkDetails.required = true;
				answerWorkDetails.dayWorkStarted = this.dayWorkStarted;
				answerWorkDetails.monthWorkStarted = this.monthWorkStarted;
				answerWorkDetails.yearWorkStarted = this.yearWorkStarted;

				if (this.workCompleted) {
					answerWorkDetails.workCompleted = this.workCompleted;
					answerWorkDetails.dayWorkFinished = this.dayWorkFinished,
					answerWorkDetails.monthWorkFinished = this.monthWorkFinished,
					answerWorkDetails.yearWorkFinished = this.yearWorkFinished
				}
				question.answers.workDetails = answerWorkDetails;
			}
			this.$store.commit('addWorksAnswers', JSON.parse(JSON.stringify(question)));
		},
    navigate() {
			this.collectDataAndStore();
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