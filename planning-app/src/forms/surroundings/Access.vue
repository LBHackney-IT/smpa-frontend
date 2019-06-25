<template>
	<div>
    <h1 class="govuk-heading-xl">
      About the site access
    </h1>
		<div class="govuk-form-group">
			<fieldset class="govuk-fieldset" aria-describedby="trees-question-1-hint">
				<legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
				<h2 class="govuk-heading-m">
					Would the proposed works affect access to the site for vehicles, cycles and/or pedestrians?
				</h2>
				</legend>

        <warning-message :message="warningMessage" v-bind:typeAlert="false"></warning-message>

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
		<v-cta name="Continue" :onClick="navigate"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';
import WarningMessage from '../../components/WarningMessage.vue';

export default {
	name: 'Access',
	components: {
    vCta,
    WarningMessage
	},
	data () {
    return {
      defaultOptions: undefined,
      alterationToAccess: '',
      typeOfAlteration: '',
      currentWorks: undefined,
      warningMessage: 'Any public footpath affected by the site must be shown on the plans. This includes temporary closures or diversions.'
    }
  },
  beforeMount () {
    this.loadDefaultOptions();
  },
  created () {
    this.fetchData();
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.typeOfAlteration = undefined;
      this.currentWorks = this.$route.params.currentLevelInfo;
    },
    navigate() {
      router.push({ name: 'MoreAboutAccess', params: { type: this.typeOfAlteration, currentLevelInfo: this.currentWorks} });
    },
    loadDefaultOptions() {
      this.$store.dispatch('getDefaultData', 'access-works-scopes').then((response) => {
        this.defaultOptions = response.data;
      })
    }
  }

}
</script>