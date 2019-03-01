<template>
	<div>
    <h1 class="govuk-heading-xl">
      Description of the works
    </h1>
		<div class="govuk-form-group">
      <fieldset class="govuk-fieldset" aria-describedby="proposal-hint">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h2 class="govuk-heading-m">
            Based on your answers, you are applying for the following works:
          </h2>
        </legend>
      </fieldset>
      <div class="govuk-form-group">
        <label class="govuk-label" for="more-detail">
          Can you provide more detail?
        </label>
        <span id="more-detail-hint" class="govuk-hint">
          Do not include personal or financial information, like your National Insurance number or credit card details.
        </span>
        <textarea class="govuk-textarea" id="more-detail" name="more-detail" rows="5" aria-describedby="more-detail-hint"></textarea>
      </div>
    </div>
		<v-cta name="Continue" :onClick="navigate"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';


export default {
	name: 'FreeTextForm',
	components: {
    vCta
  },
  data () {
    return {
      selectedProposal: []
    }
  },
	methods: {}
}
</script>