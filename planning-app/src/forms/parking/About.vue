<template>
	<div>
    <h1 class="govuk-heading-xl">
      About parking spaces
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

				<div class="govuk-radios__item" v-bind:key="option.id" v-for="option in this.defaultOptions">
          <input class="govuk-radios__input" v-bind:id="option.id" v-bind:name="option.name" type="radio" v-bind:value="option.id" v-model="typeOfAlteration">
          <label class="govuk-label govuk-radios__label" v-bind:for="option.id">
            {{option.name}}
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
      defaultOptions: undefined,
      alterationToAccess: '',
      typeOfAlteration: '',
      currentWorks: undefined,
      warningMessage: 'Any public footpath that crosses or adjoins the site, or is affected, must be shown clearly on the plans. This includes any proposals that may require a closure or diversion.'
    }
  },
  beforeMount () {
    this.loadDefaultOptions();
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
    },
    loadDefaultOptions() {
      this.$store.dispatch('getDefaultData', 'parking-works-scopes').then((response) => {
        this.defaultOptions = response.data;
      })
    }
  }

}
</script>