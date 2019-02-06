<template>
	<div>
    <h1 class="govuk-heading-xl">
      Materials
    </h1>
		<div class="govuk-form-group">
      <fieldset class="govuk-fieldset" aria-describedby="materials-hint">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h2 class="govuk-heading-m">
            Define the existing and proposed materials to be used for the works
          </h2>
        </legend>

        <div class="purpose-message">
          <p>Materials information (materials, decoration, lightning, colour and texture) is one of those aspects of a proposed development which an applicant can choose not to submit details of with an outline planning application, (i.e. they can be 'reserved' for later determination).</p>
          <p>You can submit an <a href="#">Approval of conditions</a> later on when you define the materials of your proposal. That will require the applicant to submit a new planning application and to pay a fee.</p>
        </div>

        <span id="proposal-hint" class="govuk-hint">
          Select one.
        </span>

				<div class="govuk-radios govuk-radios--inline">
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="work-started-1" name="work-started" type="radio" value="Yes" v-model="materials">
						<label class="govuk-label govuk-radios__label" for="work-started-1">
							You define existing and proposed materials on supporting documentation
						</label>
					</div>
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="work-started-2" name="work-started" type="radio" value="No" v-model="materials">
						<label class="govuk-label govuk-radios__label" for="work-started-2">
							You define existing and proposed materials here.
						</label>
					</div>
				</div>
      </fieldset>
    </div>

		<v-cta name="Next" :onClick="navigate"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';
import WarningMessage from '../../components/WarningMessage.vue';

export default {
	name: 'WhatMaterials',
	components: {
    vCta,
    WarningMessage
  },
  data () {
    return {
      materials: '',
      warningMessage: 'Materials are not mandatory in an application. You can submit a Approval of conditions later on when you know the materials of your proposal.'
    }
  },
	methods: {
    navigate() {
      if (this.materials === 'Yes') {
        router.push({ name: 'SupportingDocumentation' });
      } else {
        router.push({ name: 'MaterialsStep1' });
      }
    }
  }
}
</script>