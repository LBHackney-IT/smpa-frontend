<template>
	<div>
    <h1 class="govuk-heading-xl">
      Parking
    </h1>
		<div class="govuk-form-group">
			<fieldset class="govuk-fieldset" aria-describedby="parking-question-1-hint">
				<legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h4 class="govuk-heading-s">
            Does the proposal involve a lost or creation of a car parking space?
          </h4>
				</legend>
        <warning-message :message="warningMessage" v-bind:typeAlert="false"></warning-message>
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
              <input class="govuk-radios__input" id="car-spaces-lost" name="car-spaces-lost" type="radio" value="car-spaces-lost" v-model="typeOfAlteration">
              <label class="govuk-label govuk-radios__label" for="car-spaces-lost">
                Overral car parking spaces will be reduced
              </label>
            </div>

            <div class="govuk-inset-text" v-if="hasTypeOfAlteration">
              <div class="govuk-form-group">
                <label class="govuk-label" for="name">
                  Enter net loss of car parking spaces
                </label>
                <input class="govuk-input" id="name" name="name" type="number">
              </div>
            </div>
            <div class="govuk-radios__item">
              <input class="govuk-radios__input" id="car-spaces-gained" name="car-spaces-gained" type="radio" value="car-spaces-gained" v-model="typeOfAlteration">
              <label class="govuk-label govuk-radios__label" for="car-spaces-gained">
                Overral car parking space will be augmented
              </label>
            </div>

            <div class="govuk-inset-text" v-if="typeOfAlteration === 'car-spaces-gained'">
              <div class="govuk-form-group">
                <label class="govuk-label" for="name">
                  Enter net gain of car parking spaces
                </label>
                <input class="govuk-input" id="name" name="name" type="number">
              </div>
            </div>

            <div class="govuk-radios__item">
              <input class="govuk-radios__input" id="car-spaces-same" name="car-spaces-same" type="radio" value="car-spaces-same" v-model="typeOfAlteration">
              <label class="govuk-label govuk-radios__label" for="car-spaces-same">
                Overral car parking spaces will remain the same
              </label>
            </div>
          </div>
        </fieldset>
      </div>
		</div>

    <div class="govuk-form-group">
			<fieldset class="govuk-fieldset" aria-describedby="parking-question-2-hint">
				<legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h4 class="govuk-heading-s">
            Does the proposal involve bike parking space?
          </h4>
				</legend>
				<div class="govuk-radios govuk-radios--inline">
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="bike-parking-space-1" name="bike-parking-space-1" type="radio" value="Yes" v-model="bikeParkingSpace">
						<label class="govuk-label govuk-radios__label" for="bike-parking-space-1">
							Yes
						</label>
					</div>
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="bike-parking-space-2" name="bike-parking-space-2" type="radio" value="No" v-model="bikeParkingSpace">
						<label class="govuk-label govuk-radios__label" for="bike-parking-space-2">
							No
						</label>
					</div>
				</div>
			</fieldset>

      <div class="govuk-inset-text" v-if="bikeParkingSpace === 'Yes'">
        <fieldset class="govuk-fieldset">
          <div class="govuk-radios govuk-radios--inline">
            <div class="govuk-radios__item">
              <input class="govuk-radios__input" id="bike-spaces-lost" name="bike-spaces-lost" type="radio" value="bike-spaces-lost" v-model="bikeParkingAlteration">
              <label class="govuk-label govuk-radios__label" for="bike-spaces-lost">
                Overral bike parking spaces will be reduced
              </label>
            </div>

            <div class="govuk-inset-text" v-if="bikeParkingAlteration === 'bike-spaces-lost'">
              <div class="govuk-form-group">
                <label class="govuk-label" for="name">
                  Enter net loss of bike parking spaces
                </label>
                <input class="govuk-input" id="name" name="name" type="number">
              </div>
            </div>
            <div class="govuk-radios__item">
              <input class="govuk-radios__input" id="bike-spaces-gained" name="bike-spaces-gained" type="radio" value="bike-spaces-gained" v-model="bikeParkingAlteration">
              <label class="govuk-label govuk-radios__label" for="bike-spaces-gained">
                Overral bike parking space will be augmented
              </label>
            </div>

            <div class="govuk-inset-text" v-if="bikeParkingAlteration === 'bike-spaces-gained'">
              <div class="govuk-form-group">
                <label class="govuk-label" for="name">
                  Enter net gain of bike parking spaces
                </label>
                <input class="govuk-input" id="name" name="name" type="number">
              </div>
            </div>

            <div class="govuk-radios__item">
              <input class="govuk-radios__input" id="bike-spaces-same" name="bike-spaces-same" type="radio" value="bike-spaces-same" v-model="bikeParkingAlteration">
              <label class="govuk-label govuk-radios__label" for="bike-spaces-same">
                Overral bike parking spaces will remain the same
              </label>
            </div>
          </div>
        </fieldset>
      </div>
    </div>

    <div class="govuk-form-group">
			<fieldset class="govuk-fieldset" aria-describedby="parking-question-2-hint">
				<legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h4 class="govuk-heading-s">
            Does the proposal involve electrical vehicle (EV) charging points?
          </h4>
				</legend>
				<div class="govuk-radios govuk-radios--inline">
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="bike-parking-space-1" name="bike-parking-space-1" type="radio" value="Yes" v-model="electricalVehical">
						<label class="govuk-label govuk-radios__label" for="bike-parking-space-1">
							Yes
						</label>
					</div>
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="bike-parking-space-2" name="bike-parking-space-2" type="radio" value="No" v-model="electricalVehical">
						<label class="govuk-label govuk-radios__label" for="bike-parking-space-2">
							No
						</label>
					</div>
				</div>

        <div class="govuk-inset-text" v-if="electricalVehical === 'Yes'">
          <div class="govuk-form-group">
            <label class="govuk-label" for="name">
              How many new EC charhing points are added?
            </label>
            <input class="govuk-input" id="name" name="name" type="number">
          </div>
        </div>
			</fieldset>
    </div>
		<v-cta name="Next" :onClick="navigate"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/form-elements/Cta.vue';
import router from '../../router';
import WarningMessage from '../../components/WarningMessage.vue';

export default {
	name: 'WorkStart',
	components: {
    vCta,
    WarningMessage
	},
	data () {
    return {
      alterationToParking: '',
      typeOfAlteration: '',
      warningMessage: 'Please include garage spaces.',
      bikeParkingSpace: '',
      bikeParkingAlteration: '',
      electricalVehical: ''
    }
  },
  computed: {
		hasAlterationToParking () {
			return this.alterationToParking === 'Yes';
    },
    hasTypeOfAlteration () {
			return this.typeOfAlteration === 'car-spaces-lost';
    }
  },
  methods: {
    navigate() {
      router.push({ name: 'WhatMaterials' });
    }
  }

}
</script>