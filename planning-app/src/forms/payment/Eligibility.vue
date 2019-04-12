<template>
	<div>
		<h1 class="govuk-heading-xl">
			Check if you're eligible for a fee reduction
		</h1>
		<div class="govuk-form-group">
			<fieldset class="govuk-fieldset" aria-describedby="improve-accessibility-hint">
				<legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
					<h2 class="govuk-heading-m">Is the proposal to a disabled person's dwelling house to improve access, safety, comfort etc?</h2>
				</legend>

				<div class="govuk-radios govuk-radios--inline">
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="improve-accessibility-1" name="improve-accessibility" type="radio" value="Yes" v-model="improveAccessibility">
						<label class="govuk-label govuk-radios__label" for="improve-accessibility-1">
							Yes
						</label>
					</div>
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="improve-accessibility-2" name="improve-accessibility" type="radio" value="No" v-model="improveAccessibility">
						<label class="govuk-label govuk-radios__label" for="improve-accessibility-2">
							No
						</label>
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

export default {
	name: 'Eligibility',
	components: {
		vCta
	},
	data () {
    return {
			improveAccessibility: undefined
    }
  },
	methods: {
    navigate() {
      router.push({ name: 'Pay' });
    }
	}
}
</script>