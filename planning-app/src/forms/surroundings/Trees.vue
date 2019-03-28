<template>
	<div>
    <h1 class="govuk-heading-xl">
      About the trees and hedges
    </h1>

    <div class="govuk-body">
      Notice is required for works to trees that have a trunk diameter of more than 75mm when measured at 1.5m from ground level (or more than 100mm if reducing the number of trees to benefit growth of other trees).
    </div>

    <details class="govuk-details">
      <summary class="govuk-details__summary">
        <span class="govuk-details__summary-text">
          How to measure trees
        </span>
      </summary>
      <div class="govuk-details__text">
        <img class="location" src="../../assets/img/trees_explanation.png" alt="How to measure trees" />
      </div>
    </details>

		<div class="govuk-form-group">
			<fieldset class="govuk-fieldset" aria-describedby="trees-question-1-hint">
				<legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
				<h4 class="govuk-heading-s">
					Considering the requirements mentioned above, are there any trees or hedges inside the site boundary?
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
        <!-- <warning-message :message="warningMessageOne" v-bind:typeAlert="true"></warning-message>
        <warning-message :message="warningMessageTwo" v-bind:typeAlert="true"></warning-message>
        <warning-message :message="warningMessageThree" v-bind:typeAlert="false"></warning-message> -->

        <p>
          You might need to submit a <a href="#">Tree Survey</a>
        </p>
      </div>

      <fieldset class="govuk-fieldset govuk-!-margin-top-9" aria-describedby="trees-question-2-hint">
				<legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h4 class="govuk-heading-s">
            Will any trees or hedges need to be removed or pruned in order to carry out your proposal?
          </h4>
				</legend>

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

      <fieldset class="govuk-fieldset govuk-!-margin-top-9" aria-describedby="trees-question-2-hint">
				<legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h4 class="govuk-heading-s">
            Are there any other trees or hedges within 5 metres of the site boundary to the proposed works?
          </h4>
				</legend>

        <div class="govuk-inset-text">
          There might be trees on land adjacent to your site that could be impacted by the works. A planner will need to visit and assess if you need to submit a tree assessment.
        </div>

				<div class="govuk-radios govuk-radios--inline">
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="trees-adjacent-3" name="trees-adjacent3" type="radio" value="Yes" v-model="questionThree">
						<label class="govuk-label govuk-radios__label" for="trees-adjacent-3">
							Yes
						</label>
					</div>
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="trees-adjacent-4" name="trees-adjacent4" type="radio" value="No" v-model="questionThree">
						<label class="govuk-label govuk-radios__label" for="trees-adjacent-4">
							No
						</label>
					</div>
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
	name: 'WorkStart',
	components: {
    vCta,
    WarningMessage
	},
	data () {
    return {
			treesInsideBoundary: undefined,
      treesAdjacent: undefined,
      questionThree: undefined,
      warningMessageOne: 'You must mark trees position on a scaled plan',
      warningMessageTwo: 'You might need to submit a Tree Survey',
      warningMessageThree: 'In conservation areas, notice is required for works to trees that have a trunk diameter of more than 75mm when measured at 1.5m from the ground level (or more than 100mm if reducing the number of trees to benefit the growth of other trees).',
      warningMessageFour: 'There might be trees on land adjacent to your site that could be impacted by the works. A planner will need to visit and assess if you need to submit a tree assessment.'
    }
  },
  computed: {
		isInConservationArea () {
      if (this.$store.state.site && this.$store.state.site.siteConstraints && this.$store.state.site.siteConstraints.conservationArea) {
        return this.$store.state.site.siteConstraints.conservationArea;
      } else {
        return false;
      }
		},
		hasTreesInsideBoundary () {
			return this.treesInsideBoundary === 'Yes';
    },
    hasTreesAdjacent () {
			return this.treesAdjacent === 'Yes';
    },
    hasQuestionThree () {
			return this.questionThree === 'Yes';
		}
  },
  methods: {
    navigate() {
      router.push({ name: 'WhatMaterials' });
    }
  }

}
</script>