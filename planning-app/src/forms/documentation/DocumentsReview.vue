<template>
	<div>
    <h1 class="govuk-heading-xl">
      Files Uploaded
    </h1>

    <p>You uploaded a total of {{this.documentsUploaded.length}} documents.</p>

    <div class="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabindex="-1" data-module="govuk-error-summary" v-if="error">
      <h2 class="govuk-error-summary__title" id="error-summary-title">
        There is a problem
      </h2>
      <div class="govuk-error-summary__body">
        <p>We couldn't delete the file. Try again later.</p>
      </div>
    </div>

    <dl class="govuk-summary-list">
      <div class="govuk-summary-list__row" v-for="(item, index) in this.documentsUploaded" v-bind:key="index">
        <dd class="govuk-summary-list__value">
          {{item.original_name}}
        </dd>
        <dd class="govuk-summary-list__actions">
          <button class="govuk-link" @click="deleteDocument(item.id)">
            Delete<span class="govuk-visually-hidden"> file</span>
          </button>
        </dd>
      </div>
    </dl>

    <v-cta name="Continue" :onClick="navigate"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';
import { getRouteAppId } from '../../mixins/getRouteAppId';

export default {
  name: 'DesignAndAccessStatement',
  mixins: [ getRouteAppId ],
	components: {
    vCta
	},
	data () {
    return {
      error: false,
      errorMessage: undefined,
      documentsUploaded: []

    }
  },
	methods: {
    navigate() {
      router.push({ name: 'ApplicationContact' });  
    },
    deleteDocument(id) {

      var payload = {};

      payload.id = id;

      this.$store.dispatch('deleteDocument', payload).then((response) => {
        if (response.error) {
          this.error = true;
          this.errorMessage = 'Something went wrong while deleting your file. Try again.'
        } else {
          this.error = false;
          this.errorMessage = undefined;

          this.documentsUploaded = this.documentsUploaded.filter(doc => doc.id !== payload.id);

        }
        
      })
    }
  },
  computed: {
    application () {
      let index = this.$store.state.state.applications.findIndex( application => application.data.id === this.applicationId );
			return this.$store.state.state.applications[index];
    }
  },
  watch: {
		application () {
      this.documentsUploaded = this.application.data.document_files;
		}
	}
}
</script>