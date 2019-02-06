<template>
	<div>
    <h1 class="govuk-heading-xl">
      About adding or removing car parking spaces
    </h1>
		<div class="govuk-form-group">
			<fieldset class="govuk-fieldset" aria-describedby="trees-question-1-hint">
				<legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
				<h2 class="govuk-heading-m">
					What is the net number of parking spaces available after the works have been completed?
				</h2>
				</legend>

        <div class="govuk-inset-text">
          The minimum dimensions for a car parking space are 2.4 x 4.8 metres. These dimensions are for standing space only and do not consider access or turning space. 
        </div>

        <div class="govuk-warning-text">
          <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
          <strong class="govuk-warning-text__text">
            <span class="govuk-warning-text__assistive">Warning</span>
            Please include garage spaces.
          </strong>
        </div>

				<div class="govuk-form-group">
          <label class="govuk-label" for="name">
            Current number of car parking spaces.
          </label>
          <input class="govuk-input" id="name" name="name" type="number">
        </div>

        <div class="govuk-form-group">
          <label class="govuk-label" for="name">
            Total number of car parking spaces after completion.
          </label>
          <input class="govuk-input" id="name" name="name" type="number">
        </div>
			</fieldset>
		</div>
		<v-cta name="Continue" :onClick="navigate"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';
import WarningMessage from '../../components/WarningMessage.vue';

export default {
	name: 'CarParkingSpaces',
	components: {
    vCta,
    WarningMessage
	},
	data () {
    return {
      alterationToAccess: '',
      typeOfAlteration: '',
      warningMessage: 'Any public footpath that crosses or adjoins the site, or is affected, must be shown clearly on the plans. This includes any proposals that may require a closure or diversion.'
    }
  },
  computed: {
		hasAlterationToAccess () {
			return this.alterationToAccess === 'Yes';
    }
  },
  methods: {
    navigate() {
      router.push({ name: 'Parking' });
    }
  }

}
</script>