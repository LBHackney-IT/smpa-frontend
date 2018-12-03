<template>
	<div>
		<div class="govuk-form-group">
      <fieldset class="govuk-fieldset" aria-describedby="materials-hint">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h1 class="govuk-fieldset__heading">
            Materials
          </h1>
        </legend>

        <h4 class="govuk-heading-s">
					What are the materials to be used in the proposal?
				</h4>

        <warning-message :message="warningMessage" v-bind:typeAlert="false"></warning-message>

				<div class="govuk-radios govuk-radios--inline">
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="work-started-1" name="work-started" type="radio" value="Yes" v-model="materials">
						<label class="govuk-label govuk-radios__label" for="work-started-1">
							You define existing and proposed materials in additional documentation (detailing colour and type).
						</label>
					</div>
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="work-started-2" name="work-started" type="radio" value="No" v-model="materials">
						<label class="govuk-label govuk-radios__label" for="work-started-2">
							You define existing and proposed materials using this service.
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