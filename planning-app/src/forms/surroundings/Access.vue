<template>
	<div>
    <h1 class="govuk-heading-xl">
      Pedestrian and vehicle access
    </h1>
		<div class="govuk-form-group">
			<fieldset class="govuk-fieldset" aria-describedby="trees-question-1-hint">
				<legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
				<h4 class="govuk-heading-s">
					Does the proposal involve alteration to or creation of a new access?
				</h4>
				</legend>
				<div class="govuk-radios govuk-radios--inline">
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="trees-boundary-1" name="trees-boundary" type="radio" value="Yes" v-model="alterationToAccess">
						<label class="govuk-label govuk-radios__label" for="trees-boundary-1">
							Yes
						</label>
					</div>
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="trees-boundary-2" name="trees-boundary" type="radio" value="No" v-model="alterationToAccess">
						<label class="govuk-label govuk-radios__label" for="trees-boundary-2">
							No
						</label>
					</div>
				</div>
			</fieldset>

      <div class="govuk-inset-text" v-if="hasAlterationToAccess">
        <div class="govuk-warning-text">
          <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
          <strong class="govuk-warning-text__text">
            <span class="govuk-warning-text__assistive">Warning</span>
              Any public footpath that crosses or adjoins the site or is affected must be shown clearly on the plans, including any proposals that may require a closure or diversion.
          </strong>
        </div>

        <fieldset class="govuk-fieldset">
          <div class="govuk-radios govuk-radios--inline">
            <div class="govuk-radios__item">
              <input class="govuk-radios__input" id="access-only-pedestrian" name="access-only-pedestrian" type="radio" value="pedestrian" v-model="typeOfAlteration">
              <label class="govuk-label govuk-radios__label" for="access-only-pedestrian">
                Only for pedestrian access
              </label>
            </div>
            <div class="govuk-radios__item">
              <input class="govuk-radios__input" id="access-only-vehicle" name="access-only-vehicle" type="radio" value="vehicle" v-model="typeOfAlteration">
              <label class="govuk-label govuk-radios__label" for="access-only-vehicle">
                Only for vehicle access
              </label>
            </div>
            <div class="govuk-radios__item">
              <input class="govuk-radios__input" id="access-both" name="access-both" type="radio" value="both" v-model="typeOfAlteration">
              <label class="govuk-label govuk-radios__label" for="access-both">
                For vehicle and pedestrian access
              </label>
            </div>
          </div>
        </fieldset>
      </div>
		</div>
		<v-cta name="Next"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';

export default {
	name: 'WorkStart',
	components: {
		vCta
	},
	data () {
    return {
      alterationToAccess: '',
      typeOfAlteration: ''
    }
  },
  computed: {
		hasAlterationToAccess () {
			return this.alterationToAccess === 'Yes';
    }
	}

}
</script>