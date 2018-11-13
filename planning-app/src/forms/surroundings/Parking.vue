<template>
	<div>
    <h1 class="govuk-heading-xl">
      Parking
    </h1>
		<div class="govuk-form-group">
			<fieldset class="govuk-fieldset" aria-describedby="trees-question-1-hint">
				<legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
				<h4 class="govuk-heading-s">
					Does the proposal involve a lost or creation of a car parking space?
				</h4>
				</legend>
				<div class="govuk-radios govuk-radios--inline">
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="alteration-to-parking-1" name="alteration-to-parking-1" type="radio" value="Yes" v-model="alterationToParking">
						<label class="govuk-label govuk-radios__label" for="alteration-to-parking-1">
							Yes
						</label>
					</div>
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="alteration-to-parking-2" name="alteration-to-parking-2" type="radio" value="No" v-model="alterationToParking">
						<label class="govuk-label govuk-radios__label" for="alteration-to-parking-2">
							No
						</label>
					</div>
				</div>
			</fieldset>

      <div class="govuk-inset-text" v-if="hasAlterationToParking">
        <fieldset class="govuk-fieldset">
          <div class="govuk-radios govuk-radios--inline">
            <div class="govuk-radios__item">
              <input class="govuk-radios__input" id="access-only-pedestrian" name="access-only-pedestrian" type="radio" value="car-spaces-lost" v-model="typeOfAlteration">
              <label class="govuk-label govuk-radios__label" for="access-only-pedestrian">
                Car parking spaces will be lost
              </label>
            </div>

            <div class="govuk-inset-text" v-if="hasTypeOfAlteration">
              <div class="govuk-form-group">
                <label class="govuk-label" for="name">
                  Enter number of car parking spaces that will be lost
                </label>
                <input class="govuk-input" id="name" name="name" type="number">
              </div>
            </div>
            <div class="govuk-radios__item">
              <input class="govuk-radios__input" id="access-only-vehicle" name="access-only-vehicle" type="radio" value="car-spaces-gained" v-model="typeOfAlteration">
              <label class="govuk-label govuk-radios__label" for="access-only-vehicle">
                Car parking spaces will be gained
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
      alterationToParking: '',
      typeOfAlteration: ''
    }
  },
  computed: {
		hasAlterationToParking () {
			return this.alterationToParking === 'Yes';
    },
    hasTypeOfAlteration () {
			return this.typeOfAlteration === 'car-spaces-lost';
    }
	}

}
</script>