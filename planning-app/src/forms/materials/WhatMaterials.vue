<template>
	<div>
    <h1 class="govuk-heading-xl">
      About materials
    </h1>
		<div class="govuk-form-group">
      <p class="govuk-body govuk-!-font-size-27">
        You need to describe what materials are going to be used.
      </p>
      <div class="govuk-inset-text">
        <p>Materials information can be submitted now or later. If you decide to submit at a later date an Approval of Conditions is required. This means the applicant will need to submit and pay for a new application.</p>
      </div>

      <fieldset class="govuk-fieldset" aria-describedby="materials-hint">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h4 class="govuk-heading-s">
					  How would you like to describe proposed materials to be used for the works?
				  </h4>
        </legend>

        <span id="proposal-hint" class="govuk-hint">
          Select one.
        </span>

				<div class="govuk-radios govuk-radios--inline">
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="work-started-1" name="work-started" type="radio" value="Yes" v-model="materials">
						<label class="govuk-label govuk-radios__label" for="work-started-1">
							You will define materials on supporting documentation
						</label>
					</div>
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="work-started-2" name="work-started" type="radio" value="No" v-model="materials">
						<label class="govuk-label govuk-radios__label" for="work-started-2">
							You will define materials using this form
						</label>
					</div>

          <div class="govuk-radios__item">
						<input class="govuk-radios__input" id="work-started-3" name="work-started" type="radio" value="dont-know" v-model="materials">
						<label class="govuk-label govuk-radios__label" for="work-started-3">
							You don’t know yet and will submit an Approval of Conditions later
						</label>
					</div>
				</div>
      </fieldset>
    </div>

		<v-cta name="Continue" :onClick="submit"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';
import { getRouteAppId } from '../../mixins/getRouteAppId';

export default {
  name: 'WhatMaterials',
  mixins: [ getRouteAppId ],
	components: {
    vCta
  },
  data () {
    return {
      materials: ''
    }
  },
	methods: {
    navigate() {
      if (this.materials === 'Yes' || this.materials === 'dont-know') {
        router.push({ name: 'SupportingDocumentation' });
      } else {
        router.push({ name: 'MaterialsStep1' });
      }
    },
    submit() {
      let payload = {
        "materials": {
          "definitions_in_documents": this.materials === 'Yes' ? true : false,
          "definitions_in_form": this.materials === 'No' ? true : false,
          "definitions_to_follow": this.materials === 'dont-know' ? true : false
        }
      };

      const extensionId = this.$store.getters.getExtensionId(this.applicationId);

      this.$store.dispatch('updateExtensionProposal', { "application_id": this.applicationId, 'selectedProposals': payload, "extension_id": extensionId }).then(() => {
        this.navigate();
      })
    }
  }
}
</script>