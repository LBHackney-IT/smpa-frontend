<template>
	<div>
    <h1 class="govuk-heading-xl">
      Trees
    </h1>
		<div class="govuk-form-group">
			<fieldset class="govuk-fieldset" aria-describedby="trees-question-1-hint">
				<legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
				<h4 class="govuk-heading-s">
					Are there any trees inside the boundary of the site?
				</h4>
				</legend>
				<div class="govuk-radios govuk-radios--inline">
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="trees-boundary-1" name="trees-boundary" type="radio" value="Yes" v-model="treesInsideBoundary">
						<label class="govuk-label govuk-radios__label" for="trees-boundary-1">
							Yes
						</label>
					</div>
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="trees-boundary-2" name="trees-boundary" type="radio" value="No" v-model="treesInsideBoundary">
						<label class="govuk-label govuk-radios__label" for="trees-boundary-2">
							No
						</label>
					</div>
				</div>
			</fieldset>

      <div class="govuk-inset-text" v-if="hasTreesInsideBoundary">
        <warning-message :message="warningMessageOne" v-bind:typeAlert="true"></warning-message>
        <warning-message :message="warningMessageTwo" v-bind:typeAlert="true"></warning-message>
        <warning-message :message="warningMessageThree" v-bind:typeAlert="false"></warning-message>

        <details class="govuk-details">
          <summary class="govuk-details__summary">
            <span class="govuk-details__summary-text">
              How to mesure a tree
            </span>
          </summary>
          <div class="govuk-details__text">
            <img class="location" src="../../assets/img/trees_explanation.png" alt="How to measure trees" />
          </div>
        </details>
      </div>

      <fieldset class="govuk-fieldset govuk-!-margin-top-9" aria-describedby="trees-question-2-hint">
				<legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h4 class="govuk-heading-s">
            Are there any trees on land adjacent (10 m from your site boundary) to the proposed development?
          </h4>
				</legend>

         <warning-message :message="warningMessageFour" v-bind:typeAlert="false"></warning-message>

				<div class="govuk-radios govuk-radios--inline">
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="trees-adjacent-1" name="trees-adjacent" type="radio" value="Yes" v-model="treesAdjacent">
						<label class="govuk-label govuk-radios__label" for="trees-adjacent-1">
							Yes
						</label>
					</div>
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="trees-adjacent-2" name="trees-adjacent" type="radio" value="No" v-model="treesAdjacent">
						<label class="govuk-label govuk-radios__label" for="trees-adjacent-2">
							No
						</label>
					</div>
				</div>
			</fieldset>


      <div class="govuk-inset-text" v-if="hasTreesAdjacent">
        <warning-message :message="warningMessageTwo" v-bind:typeAlert="true"></warning-message>
        <warning-message :message="warningMessageThree" v-bind:typeAlert="false"></warning-message>

        <details class="govuk-details">
          <summary class="govuk-details__summary">
            <span class="govuk-details__summary-text">
              How to measure a tree
            </span>
          </summary>
          <div class="govuk-details__text">
            <img class="location" src="../../assets/img/trees_explanation.png" alt="How to measure trees" />
          </div>
        </details>
      </div>

		</div>
		<v-cta name="Next" :onClick="navigate"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
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
			treesInsideBoundary: '',
      treesAdjacent: '',
      warningMessageOne: 'You must mark trees position on a scaled plan',
      warningMessageTwo: 'You might need to submit a Tree Survey',
      warningMessageThree: 'In conservation areas, notice is required for works to trees that have a trunk diameter of more than 75mm when measured at 1.5m from the ground level (or more than 100mm if reducing the number of trees to benefit the growth of other trees).',
      warningMessageFour: 'There might be trees on land adjacent to your site that could be impacted by the works. A planner will need to visit and assess if you need to submit a tree assessment.'
    }
  },
  computed: {
		hasTreesInsideBoundary () {
			return this.treesInsideBoundary === 'Yes';
    },
    hasTreesAdjacent () {
			return this.treesAdjacent === 'Yes';
		}
  },
  methods: {
    navigate() {
      router.push({ name: 'Access' });
    }
  }

}
</script>