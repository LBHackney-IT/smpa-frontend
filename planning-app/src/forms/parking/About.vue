<template>
	<div>
    <h1 class="govuk-heading-xl">
      About adding or removing car and/or bike parking spaces
    </h1>
		<div class="govuk-form-group">
			<fieldset class="govuk-fieldset" aria-describedby="trees-question-1-hint">
				<legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
				<h2 class="govuk-heading-m">
					Would the proposed works affect car or cycle parking spaces, or both?
				</h2>
				</legend>

        <span id="proposal-hint" class="govuk-hint">
          Select one
        </span>

				<div class="govuk-radios__item">
          <input class="govuk-radios__input" id="access-only-pedestrian" name="access-only-pedestrian" type="radio" value="car-parking-spaces" v-model="typeOfAlteration">
          <label class="govuk-label govuk-radios__label" for="access-only-pedestrian">
            Only car parking spaces
          </label>
        </div>
        <div class="govuk-radios__item">
          <input class="govuk-radios__input" id="access-only-vehicle" name="access-only-vehicle" type="radio" value="cycle-parking-spaces" v-model="typeOfAlteration">
          <label class="govuk-label govuk-radios__label" for="access-only-vehicle">
            Only cycle parking spaces
          </label>
        </div>
        <div class="govuk-radios__item">
          <input class="govuk-radios__input" id="access-both" name="access-both" type="radio" value="car-and-bike-parking-spaces" v-model="typeOfAlteration">
          <label class="govuk-label govuk-radios__label" for="access-both">
            Both, car and bike parking spaces
          </label>
        </div>
			</fieldset>
		</div>
    <free-description></free-description>
		<v-cta name="Continue" :onClick="navigate"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';
import WarningMessage from '../../components/WarningMessage.vue';
import FreeDescription from '../../components/FreeDescription.vue';

export default {
	name: 'WorkStart',
	components: {
    vCta,
    WarningMessage,
    FreeDescription
	},
	data () {
    return {
      alterationToAccess: '',
      typeOfAlteration: '',
      currentWorks: undefined,
      warningMessage: 'Any public footpath that crosses or adjoins the site, or is affected, must be shown clearly on the plans. This includes any proposals that may require a closure or diversion.'
    }
  },
  computed: {
		hasAlterationToAccess () {
			return this.alterationToAccess === 'Yes';
    }
  },
  created () {
    this.fetchData();
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.currentWorks = this.$route.params.currentLevelInfo;
    },
    navigate() {
      if (this.typeOfAlteration === 'car-parking-spaces' || this.typeOfAlteration === 'car-and-bike-parking-spaces') {
        
        router.push({ name: 'CarParkingSpaces', params: { type: this.typeOfAlteration, currentLevelInfo: this.currentWorks } });

      } else if (this.typeOfAlteration === 'cycle-parking-spaces') {

        router.push({ name: 'BikeParkingSpaces', params: { type: this.typeOfAlteration, currentLevelInfo: this.currentWorks } });

      } else {
        return;
      }
    }
  }

}
</script>