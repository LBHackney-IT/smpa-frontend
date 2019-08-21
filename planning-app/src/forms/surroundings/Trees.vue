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
						<input class="govuk-radios__input" id="trees-boundary-1" name="trees-boundary" type="radio" v-bind:value="true" v-model="treesInsideBoundary">
						<label class="govuk-label govuk-radios__label" for="trees-boundary-1">
							Yes
						</label>
					</div>
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="trees-boundary-2" name="trees-boundary" type="radio" v-bind:value="false" v-model="treesInsideBoundary">
						<label class="govuk-label govuk-radios__label" for="trees-boundary-2">
							No
						</label>
					</div>
				</div>
			</fieldset>

      <div class="govuk-inset-text" v-if="hasTreesInsideBoundary">
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
						<input class="govuk-radios__input" id="trees-adjacent-1" name="trees-adjacent" type="radio" v-bind:value="true" v-model="removedOrPruned">
						<label class="govuk-label govuk-radios__label" for="trees-adjacent-1">
							Yes
						</label>
					</div>
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="trees-adjacent-2" name="trees-adjacent" type="radio" v-bind:value="false" v-model="removedOrPruned">
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
						<input class="govuk-radios__input" id="trees-adjacent-3" name="trees-adjacent3" type="radio" v-bind:value="true" v-model="outsideBoundary">
						<label class="govuk-label govuk-radios__label" for="trees-adjacent-3">
							Yes
						</label>
					</div>
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="trees-adjacent-4" name="trees-adjacent4" type="radio" v-bind:value="false" v-model="outsideBoundary">
						<label class="govuk-label govuk-radios__label" for="trees-adjacent-4">
							No
						</label>
					</div>
				</div>

			</fieldset>

		</div>

		<error-message v-if="showErrorMessage && !loading" :message="errorMessages.TREES.GENERIC_ERROR"></error-message>

		<v-cta name="Continue" :onClick="submit"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';
import { getRouteAppId } from '../../mixins/getRouteAppId';
import ErrorMessage from '../../components/ErrorMessage.vue';
import * as errorMessage from '../../messages/errorMessages';

export default {
	name: 'WorkStart',
	mixins: [ getRouteAppId ],
	components: {
		vCta,
		ErrorMessage
	},
	created () {
		this.errorMessages = errorMessage;
	},
	data () {
    return {
			treesInsideBoundary: undefined,
      removedOrPruned: undefined,
			outsideBoundary: undefined,
			showErrorMessage: false,
      errorMessages: undefined
    }
	},
	watch: {
    application () {
			this.loadExistingAnswers();
		}
  },
  computed: {
    application () {
      let index = this.$store.state.state.applications.findIndex( application => application.data.id === this.applicationId );
			return this.$store.state.state.applications[index];
    },
    isInConservationArea () {
      return this.application.data.site_constraints.nb_conarea > 0;
		},
		hasTreesInsideBoundary () {
			return this.treesInsideBoundary === 'Yes';
    },
    hasTreesAdjacent () {
			return this.removedOrPruned === 'Yes';
    },
    hasQuestionThree () {
			return this.outsideBoundary === 'Yes';
		}
  },
  methods: {
		loadExistingAnswers () {
      if (this.application.data.proposal_extension.trees) {
				this.treesInsideBoundary = this.application.data.proposal_extension.trees.inside_boundry;
      	this.removedOrPruned = this.application.data.proposal_extension.trees.removed_or_pruned;
				this.outsideBoundary = this.application.data.proposal_extension.trees.outside_boundry;
      }
		},
    navigate() {
      router.push({ name: 'WhatMaterials' });
		},
		submit() {
      let payload = {
				"trees": {
					"inside_boundry": this.treesInsideBoundary,
					"removed_or_pruned": this.removedOrPruned,
					"outside_boundry": this.outsideBoundary
				}
			};
      const extensionId = this.$store.getters.getExtensionId(this.applicationId);

      this.$store.dispatch('updateExtensionProposal', { 
				"application_id": this.applicationId, 
				'selectedProposals': payload, 
				"extension_id": extensionId }).then((response) => {
        if (response.error) {
					this.showErrorMessage = true;
					return;
				} else {
					this.navigate();
				}
      })
    }
  }
}
</script>