<template>
	<div>
		<div class="govuk-form-group">
      <fieldset class="govuk-fieldset" aria-describedby="proposal-hint">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl govuk-!-margin-bottom-9">
          <h1 class="govuk-fieldset__heading">
            Now submit your application
          </h1>
        </legend>
      </fieldset>
    </div>

    <p class="">By submitting this application you are confirming that, to the best of your knowledge, the details you are providing are correct.</p>




		<v-cta name="Submit and pay" :onClick="navigate"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';

export default {
	name: 'AboutProposal',
	components: {
    vCta
  },
  data () {
    return {}
  },
	methods: {
    navigate() {
      router.push({ name: 'Success' });
    }
  }
}
</script>