<template>
	<div>
		<div class="govuk-form-group">
			<fieldset class="govuk-fieldset" aria-describedby="multiple-occupation-hint">
				<legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
				<h1 class="govuk-fieldset__heading">
					Is the _house type_ a house in multiple occupation (HMO)?
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
		<v-cta name="Next" :onClick="consoleClick"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';

export default {
	name: 'MultipleOccupation',
	components: {
		vCta
	},
	data () {
    return {
      multipleOccupation
    }
  },
	methods: {
    consoleClick() {
      console.log('Button clicked');
    }
  }
}
</script>