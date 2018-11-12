<template>
	<div>
		<div class="govuk-form-group">
			<fieldset class="govuk-fieldset" aria-describedby="work-started-hint">
				<legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
				<h1 class="govuk-fieldset__heading">
					Has the work already been started?
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

		<div v-if="hasWorkStarted">
			<div class="govuk-warning-text">
				<span class="govuk-warning-text__icon" aria-hidden="true">!</span>
				<strong class="govuk-warning-text__text">
					<span class="govuk-warning-text__assistive">Warning</span>
					Message to applicant
				</strong>
			</div>
		</div>

		<v-text-area 
			label="Describe what you have already done" 
			v-model="workDetails" 
			name="more-detail" 
			v-if="hasWorkStarted" 
			isRequired="hasWorkStarted">
		</v-text-area>

		<v-cta name="Next" :onClick="consoleClick"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import vTextArea from '../../components/form/vTextArea.vue';

export default {
	name: 'WorkStart',
	components: {
		vCta,
		vTextArea
	},
	data () {
    return {
			workStarted: '',
			workDetails: ''
    }
  },
	methods: {
    consoleClick() {
      console.log('Button clicked');
    }
	},
	computed: {
		hasWorkStarted () {
			return this.workStarted === 'Yes';
		}
	}
}
</script>