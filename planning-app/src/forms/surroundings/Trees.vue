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
        <div class="govuk-warning-text">
          <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
          <strong class="govuk-warning-text__text">
            <span class="govuk-warning-text__assistive">Warning</span>
            You need to submit a Tree Survey where the application involves works that affect any trees on teh sute that may or may not be protected by Tree Preservation Order (TPO) or Conversation Area Legislation.
          </strong>
        </div>

        <h4 class="govuk-heading-s">Find out if you need to submit a Tree Survey</h4>

        <details class="govuk-details">
          <summary class="govuk-details__summary">
            <span class="govuk-details__summary-text">
              How to mesure a tree
            </span>
          </summary>
          <div class="govuk-details__text">
            img here
          </div>
        </details>

        <div class="govuk-form-group">
          <label class="govuk-label" for="name">
            Tree diameter at 1.5m
          </label>
          <input class="govuk-input" id="name" name="name" type="number">
        </div>

        <div class="govuk-form-group">
          <label class="govuk-label" for="name">
            Distance from tree to works
          </label>
          <input class="govuk-input" id="name" name="name" type="number">
        </div>

      </div>

      <fieldset class="govuk-fieldset" aria-describedby="trees-question-2-hint">
				<legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
				<h4 class="govuk-heading-s">
					Are there any trees on land adjacent (10 m from your site boundary) to the proposed development?
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


      <div class="govuk-inset-text" v-if="hasTreesAdjacent">
        <div class="govuk-warning-text">
          <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
          <strong class="govuk-warning-text__text">
            <span class="govuk-warning-text__assistive">Warning</span>
            You need to submit a Tree Survey where the application involves works that affect any trees on teh sute that may or may not be protected by Tree Preservation Order (TPO) or Conversation Area Legislation.
          </strong>
        </div>

        <h4 class="govuk-heading-s">Find out if you need to submit a Tree Survey</h4>

        <details class="govuk-details">
          <summary class="govuk-details__summary">
            <span class="govuk-details__summary-text">
              How to mesure a tree
            </span>
          </summary>
          <div class="govuk-details__text">
            img here
          </div>
        </details>

        <div class="govuk-form-group">
          <label class="govuk-label" for="name">
            Tree diameter at 1.5m
          </label>
          <input class="govuk-input" id="name" name="name" type="number">
        </div>

        <div class="govuk-form-group">
          <label class="govuk-label" for="name">
            Distance from tree to works
          </label>
          <input class="govuk-input" id="name" name="name" type="number">
        </div>
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
			treesInsideBoundary: '',
			treesAdjacent: ''
    }
  },
  computed: {
		hasTreesInsideBoundary () {
			return this.treesInsideBoundary === 'Yes';
    },
    hasTreesAdjacent () {
			return this.treesAdjacent === 'Yes';
		}
	}

}
</script>