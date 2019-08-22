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
          <div class="govuk-form-group" v-bind:class="{ 'govuk-form-group--error': missingName }" >
            <label class="govuk-label" v-bind:for="option.id + '-name'">
              Name
            </label>

            <span id="event-name-error" class="govuk-error-message" v-if="missingName">
              <span class="govuk-visually-hidden">Error:</span> Enter a name
            </span>
            <input class="govuk-input" v-bind:id="option.id + '-name'" v-bind:name="option.id + '-name'" type="text" v-model="name">
          </div>

          <div class="govuk-form-group" v-bind:class="{ 'govuk-form-group--error': missingRole }">
            <label class="govuk-label" v-bind:for="option.id + '-role'">
              Role
            </label>
            <span id="event-name-error" class="govuk-error-message" v-if="missingRole">
              <span class="govuk-visually-hidden">Error:</span> Enter a role
            </span>
            <input class="govuk-input" v-bind:id="option.id + '-role'" v-bind:name="option.id + '-role'" type="text" v-model="role">
          </div>

          <div class="govuk-form-group" v-bind:class="{ 'govuk-form-group--error': missingDetails }">
            <label class="govuk-label" v-bind:for="option.id + '-relationship'">
              Define relationship
            </label>
            <span id="event-name-error" class="govuk-error-message" v-if="missingDetails">
              <span class="govuk-visually-hidden">Error:</span> Enter details
            </span>
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
      errorMessages: undefined,
      missingName: false,
      missingRole: false,
      missingDetails: false
    }
  },
  beforeMount () {
    this.loadDefaultOptions();
  },
  created () {
    this.errorMessages = errorMessage;
  },
  watch: {
    application () {
			this.loadExistingAnswers();
		}
  },
	methods: {
    loadExistingAnswers () {
      if (this.application.data.declaration) {
        this.typeOfInterest = this.application.data.declaration.id;
      }
      if (this.application.data.declaration_detail) {
        this.name = this.application.data.declaration_detail.name;
        this.role = this.application.data.declaration_detail.role;
        this.relationshipDescription = this.application.data.declaration_detail.details;
      }
		},
    loadDefaultOptions() {
      this.$store.dispatch('getDefaultData', 'declarations').then((response) => {
        if (response.error) {
          return this.showErrorMessage = true;
        }
        this.defaultOptions = response.data;
      });
    },
    submit(payload) {
      this.$store.dispatch('updateApplication', payload).then((response) => {
        if (response.error) {
          this.showErrorMessage = true;
        } else {
          router.push({ name: 'DeclarationsOwnership' });
        }
			})
    },
    navigate() {
      var payload = {};

      payload.id = this.applicationId;
      payload.data = {};
      payload.data.declaration_id = this.typeOfInterest;

      //only generate declaration_detail if the answer is "any of the above"
      if (this.typeOfInterest !== "e0bbf434-9c28-4fe8-b4ae-892b3e359479") {
        if (!this.name || this.name.length === 0) {
          this.missingName = true;
          return;
        } else if (!this.role || this.role.length === 0) {
          this.missingName = false;
          this.missingRole = true;
          return;

        } else if (!this.relationshipDescription || this.relationshipDescription.length === 0) {
          this.missingRole = false;
          this.missingDetails = true;
          return;
        } else {

          this.missingDetails = false;

          payload.data.declaration_detail = {
            "name": this.name,
            "role": this.role,
            "details": this.relationshipDescription
          };
          this.submit(payload);
        }        
      } else {
        payload.data.declaration_detail = {};
        this.submit(payload);
      }
      
    }
  },
  computed: {
    application () {
      let index = this.$store.state.state.applications.findIndex( application => application.data.id === this.applicationId );
			return this.$store.state.state.applications[index];
    }
	}
}
</script>