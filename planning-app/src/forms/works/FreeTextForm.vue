<template>
	<div>
    <h1 class="govuk-heading-xl">
      What are you doing?
    </h1>
		<div class="govuk-form-group">
      <fieldset class="govuk-fieldset" aria-describedby="proposal-hint">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h2 class="govuk-heading-m">
            Describe what your proposed works are about.
          </h2>
        </legend>
      </fieldset>
      <div class="govuk-form-group">
        <label class="govuk-label" for="more-detail">
          Can you provide more detail?
        </label>

        <textarea class="govuk-textarea" id="more-detail" name="more-detail" rows="5" aria-describedby="more-detail-hint" v-model="description"></textarea>
      </div>
    </div>

    <error-message v-if="showErrorMessage && !loading" :message="errorMessages.FREE_TEXT_FORM.GENERIC_ERROR"></error-message>

		<v-cta name="Continue" :onClick="submit"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import { getRouteAppId } from '../../mixins/getRouteAppId';
import router from '../../router';
import ErrorMessage from '../../components/ErrorMessage.vue';
import * as errorMessage from '../../messages/errorMessages';

export default {
  name: 'FreeTextForm',
  mixins: [ getRouteAppId ],
	components: {
    vCta,
    ErrorMessage
  },
  data () {
    return {
      description: undefined,
      showErrorMessage: false,
      errorMessages: undefined
    }
  },
  created () {
    this.errorMessages = errorMessage;
  },
	methods: {
    submit() {

      var payload = {};
      payload.id = this.applicationId;
      payload.data = {};

      payload.data.free_text_description = this.description;

      this.$store.dispatch('updateApplication', payload).then((response) => {
        if (response.error) {
          this.showErrorMessage = true;
          return;
        } else {
          router.push({ name: 'Trees' });
        }
      });
    }
  }
}
</script>