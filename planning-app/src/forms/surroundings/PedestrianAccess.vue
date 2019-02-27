<template>
	<div>
    <h1 class="govuk-heading-xl">
      About the alteration of pedestrian access
    </h1>
		<div class="govuk-form-group">
			<fieldset class="govuk-fieldset" aria-describedby="trees-question-1-hint">
				<legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
				<h2 class="govuk-heading-m">
					What are the proposed works about?
				</h2>
				</legend>

        <warning-message :message="warningMessage" v-bind:typeAlert="false"></warning-message>

        <span id="proposal-hint" class="govuk-hint">
          Select one
        </span>

				<div class="govuk-radios__item">
          <input class="govuk-radios__input" id="access-only-pedestrian" name="access-only-pedestrian" type="radio" value="addition" v-model="typeOfAlteration">
          <label class="govuk-label govuk-radios__label" for="access-only-pedestrian">
            Addition of a new entrance
          </label>
        </div>
        <div class="govuk-radios__item">
          <input class="govuk-radios__input" id="access-only-vehicle" name="access-only-vehicle" type="radio" value="removal" v-model="typeOfAlteration">
          <label class="govuk-label govuk-radios__label" for="access-only-vehicle">
            Removal of an entrance
          </label>
        </div>
        <div class="govuk-radios__item">
          <input class="govuk-radios__input" id="access-both" name="access-both" type="radio" value="improve" v-model="typeOfAlteration">
          <label class="govuk-label govuk-radios__label" for="access-both">
            Improve disabled access
          </label>
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
	name: 'PedestrianAccess',
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