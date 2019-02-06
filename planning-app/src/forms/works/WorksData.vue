<template>
	<div>
    <h1 class="govuk-heading-xl">
      About the size
    </h1>

    <div class="purpose-message">
      <strong>Purpose message</strong>. This data is being collected to inform and monitor London wide development. Your responses will not influence the decision making process.
    </div>
    
		<div class="govuk-form-group">
      <fieldset class="govuk-fieldset" aria-describedby="proposal-hint">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h2 class="govuk-heading-m">
            Does the proposal involve the creation of new stories?
          </h2>
        </legend>

        <div class="govuk-radios govuk-radios--inline">
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="bike-parking-space-1" name="bike-parking-space-1" type="radio" value="Yes" v-model="newStories">
						<label class="govuk-label govuk-radios__label" for="bike-parking-space-1">
							Yes
						</label>
					</div>
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="bike-parking-space-2" name="bike-parking-space-2" type="radio" value="No" v-model="newStories">
						<label class="govuk-label govuk-radios__label" for="bike-parking-space-2">
							No
						</label>
					</div>
				</div>

        <div class="govuk-inset-text" v-if="newStories === 'Yes'">
          <div class="govuk-form-group">
            <label class="govuk-label" for="name">
              How many full new stories?
            </label>
            <input class="govuk-input" id="name" name="name" type="number">
          </div>
        </div>
      </fieldset>
    </div>

		<div class="govuk-form-group">
      <fieldset class="govuk-fieldset" aria-describedby="proposal-hint">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h2 class="govuk-heading-m">
            Does the proposal involve the creation of new bedrooms?
          </h2>
        </legend>

        <div class="govuk-inset-text">
          <p class="govuk-body govuk-!-font-weight-bold">Definition</p>
          <p>According to the Policy D4 Housing quality and standards of the London Plan for the Greater London area:</p>
          
          <ul>
            <li>
              A one bedspace single bedroom must have a floor area of at least 7.5 sqm and be at least 2.15m wide.
            </li>
            <li>
              A two bedspace double (or twin) bedroom must have a floor area of at least 11.5 sqm.
            </li>
          </ul>
        </div>

        <div class="govuk-radios govuk-radios--inline">
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="bike-parking-space-1" name="bike-parking-space-1" type="radio" value="Yes" v-model="newBedroom">
						<label class="govuk-label govuk-radios__label" for="bike-parking-space-1">
							Yes
						</label>
					</div>
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="bike-parking-space-2" name="bike-parking-space-2" type="radio" value="No" v-model="newBedroom">
						<label class="govuk-label govuk-radios__label" for="bike-parking-space-2">
							No
						</label>
					</div>
				</div>

        <div class="govuk-inset-text" v-if="newBedroom === 'Yes'">
          <div class="govuk-form-group">
            <label class="govuk-label" for="name">
              How many full new single bedrooms are gained?
            </label>
            <input class="govuk-input" id="name" name="name" type="number">
          </div>
        </div>

        <div class="govuk-inset-text" v-if="newBedroom === 'Yes'">
          <div class="govuk-form-group">
            <label class="govuk-label" for="name">
              How many full new double bedrooms are gained?
            </label>
            <input class="govuk-input" id="name" name="name" type="number">
          </div>
        </div>
      </fieldset>
    </div>

		<v-cta name="Continue" :onClick="navigate"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';

export default {
	name: 'WorksData',
	components: {
    vCta
  },
  data () {
    return {
      newStories: '',
      newBedroom: ''
    }
  },
	methods: {},
  computed: {
		isInConservationArea () {
      if (this.$store.state.site && this.$store.state.site.siteConstraints && this.$store.state.site.siteConstraints.conservationArea) {
        return this.$store.state.site.siteConstraints.conservationArea;
      } else {
        return false;
      }
		}
	}
}
</script>