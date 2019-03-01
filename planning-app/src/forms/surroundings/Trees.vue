<template>
	<div>
    <h1 class="govuk-heading-xl">
      About the surroundings: Trees
    </h1>

    <p class="govuk-body govuk-!-font-size-36">You must consider the protection and planting of trees when applying for planning permission.</p>

    <div class="purpose-message" v-if="isInConservationArea">
      There is one protected tree in the selected location.
    </div>

    <div class="govuk-warning-text">
      <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
      <strong class="govuk-warning-text__text">
        <span class="govuk-warning-text__assistive">Warning</span>
        All development including works that involve the loss of or harm of trees covered by Tree Preservation Orders, or trees of significant amenity or biodiversity value, will be refused.
      </strong>
    </div>

    <div class="govuk-warning-text">
      <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
      <strong class="govuk-warning-text__text">
        <span class="govuk-warning-text__assistive">Warning</span>
        It is a criminal offence to prune, fell, damage or harm a protected tree, unless the works are exempt. You must get our permission before carrying out any works to a protected tree, or receive an unlimited fine or criminal conviction.
      </strong>
    </div>

    <details class="govuk-details">
      <summary class="govuk-details__summary">
        <span class="govuk-details__summary-text">
          Good practise for the retention and protection of trees
        </span>
      </summary>
      <div class="govuk-details__text">
        <p>All development and demolition must comply with established good practise, guidelines and legislation for the retention and protection of trees.</p>
        <p>Proposals must:</p>
        <ul>
          <li>Retain and protect trees of amenity and biodiversity value on the site and in adjacent sites that may be affected by the proposals;</li>
          <li>Ensure that the future long term health and amenity value of the trees is not harmed;</li>
          <li>Provide adequate separation between the built form and the trees including having regard to shading caused by trees and buildings;</li>
        </ul>

      </div>
    </details>

		<div class="govuk-form-group">
			<fieldset class="govuk-fieldset" aria-describedby="trees-question-1-hint">
				<legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
				<h4 class="govuk-heading-s">
					Are there any other (no protected) trees inside the boundary of the site?
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

        <div class="govuk-warning-text">
          <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
          <strong class="govuk-warning-text__text">
            <span class="govuk-warning-text__assistive">Warning</span>
            You must mark all trees position on a scaled plan
          </strong>
        </div>

        <div class="purpose-message" v-if="isInConservationArea">
          You might need to submit a <a href="#">Tree Survey</a>
        </div>

        <div class="govuk-inset-text" v-if="isInConservationArea">
          As your site is in a conversation area, notice is required for works to trees that have a trunk diameter of more than 75mm when measured at 1.5m from ground level (or more than 100mm if reducing the number of trees to benefit growth of other trees).
        </div>

        <details class="govuk-details">
          <summary class="govuk-details__summary">
            <span class="govuk-details__summary-text">
              When is a tree survey/arboricultural statement or landscaping scheme required?
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
            Are there any other (no protected) trees within 10 meters (10m) from the site boundary to the proposed works?
          </h4>
				</legend>

        <div class="govuk-inset-text" v-if="isInConservationArea">
          There might be trees on land adjacent to your site that could be impacted by the works. A planner will need to visit and assess if you need to submit a tree assessment.
        </div>

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

 <!-- 
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
      </div>-->

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
		}
  },
  methods: {
    navigate() {
      router.push({ name: 'Materials' });
    }
  }

}
</script>