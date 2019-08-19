<template>
	<div>
		<div class="govuk-form-group">
      <fieldset class="govuk-fieldset" aria-describedby="materials-hint">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h1 class="govuk-fieldset__heading">
            Declaration of interest
          </h1>
        </legend>

        <p class="govuk-body govuk-!-font-size-24">
					Do any of the following statements apply to you and/or the applicant?
				</p>

        <div class="govuk-inset-text">
          <p>It is an important principle of decision-making that the process is open and transparent.</p>

          <p>For the purposes of this question, "related to" means related, by birth or closely enough that there could be a bias on the part of the decision-maker in Hackney Council.</p>
        </div>
      </fieldset>

      <div class="govuk-radios govuk-radios--inline" v-bind:key="option.id" v-for="option in this.defaultOptions">
        <div class="govuk-radios__item govuk-!-margin-bottom-3" >
          <input class="govuk-radios__input" v-bind:id="option.id" v-bind:name="option.name" type="radio" v-bind:value="option.id" v-model="typeOfInterest">
          <label class="govuk-label govuk-radios__label" v-bind:for="option.id">
            {{option.name}}
          </label>
        </div>

        <div class="govuk-inset-text" v-if="typeOfInterest === option.id && option.id !='e0bbf434-9c28-4fe8-b4ae-892b3e359479'">
          <div class="govuk-form-group">
            <label class="govuk-label" v-bind:for="option.id + '-name'">
              Name
            </label>
            <input class="govuk-input" v-bind:id="option.id + '-name'" v-bind:name="option.id + '-name'" type="text" v-model="name">
          </div>

          <div class="govuk-form-group">
            <label class="govuk-label" v-bind:for="option.id + '-role'">
              Role
            </label>
            <input class="govuk-input" v-bind:id="option.id + '-role'" v-bind:name="option.id + '-role'" type="text" v-model="role">
          </div>

          <div class="govuk-form-group">
            <label class="govuk-label" v-bind:for="option.id + '-relationship'">
              Define relationship
            </label>
            <textarea class="govuk-textarea" v-bind:id="option.id + '-relationship'" v-bind:name="option.id + '-relationship'" rows="5" aria-describedby="more-detail-hint" v-model="relationshipDescription"></textarea>
          </div>
        </div>
      </div>
    </div>

    <error-message v-if="showErrorMessage && !loading" :message="errorMessages.DECLARATION.GENERIC_ERROR"></error-message>

		<v-cta name="Continue" :onClick="navigate"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';
import { getRouteAppId } from '../../mixins/getRouteAppId';
import ErrorMessage from '../../components/ErrorMessage.vue';
import * as errorMessage from '../../messages/errorMessages';

export default {
  name: 'DeclarationOfInterest',
  mixins: [ getRouteAppId ],
	components: {
    vCta,
    ErrorMessage
  },
  data () {
    return {
      applicantAuthorityRelation: '',
      defaultOptions: undefined,
      name: undefined,
      role: undefined,
      relationshipDescription: undefined,
      typeOfInterest: undefined,
      showErrorMessage: false,
      errorMessages: undefined
    }
  },
  beforeMount () {
    this.loadDefaultOptions();
  },
  created () {
    this.errorMessages = errorMessage;
  },
	methods: {
    loadDefaultOptions() {
      this.$store.dispatch('getDefaultData', 'declarations').then((response) => {
        if (response.error) {
          return this.showErrorMessage = true;
        }
        this.defaultOptions = response.data;
      });
    },
    navigate() {
      var payload = {};

      payload.id = this.applicationId;
      payload.data = {};
      payload.data.declaration_id = this.typeOfInterest;
      payload.data.declaration_detail = {
        "name": this.name,
        "role": this.role,
        "details": this.relationshipDescription
      };

      this.$store.dispatch('updateApplication', payload).then((response) => {
        if (response.error) {
          this.showErrorMessage = true;
        } else {
          router.push({ name: 'DeclarationsOwnership' });
        }
			})
      
    }
  }
}
</script>