<template>
	<div>
    <h1 class="govuk-heading-xl">
      About parking spaces
    </h1>
		<div class="govuk-form-group">
			<fieldset class="govuk-fieldset" aria-describedby="trees-question-1-hint">
				<legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
				<h2 class="govuk-heading-m">
					Would the proposed works affect car or cycle parking spaces, or both?
				</h2>
				</legend>

        <span id="proposal-hint" class="govuk-hint">
          Select one
        </span>

				<div class="govuk-radios__item" v-bind:key="option.id" v-for="option in this.defaultOptions">
          <input class="govuk-radios__input" v-bind:id="option.id" v-bind:name="option.name" type="radio" v-bind:value="option.id" v-model="typeOfAlteration">
          <label class="govuk-label govuk-radios__label" v-bind:for="option.id">
            {{option.name}}
          </label>
        </div>
			</fieldset>
		</div>
    <free-description></free-description>
    
    <error-message v-if="showErrorMessage && !loading" :message="errorMessages.PARKING.GENERIC_ERROR"></error-message>

		<v-cta name="Continue" :onClick="checkAnswers"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';
import FreeDescription from '../../components/FreeDescription.vue';
import { getRouteAppId } from '../../mixins/getRouteAppId';
import ErrorMessage from '../../components/ErrorMessage.vue';
import * as errorMessage from '../../messages/errorMessages';

export default {
  name: 'WorkStart',
  mixins: [ getRouteAppId ],
	components: {
    vCta,
    FreeDescription,
    ErrorMessage
	},
	data () {
    return {
      defaultOptions: undefined,
      alterationToAccess: '',
      typeOfAlteration: '',
      currentWorks: undefined,
      showErrorMessage: false,
      errorMessages: undefined
    }
  },
  beforeMount () {
    this.loadDefaultOptions();
  },
  created () {
    this.fetchData();
    this.errorMessages = errorMessage;
  },
  watch: {
    '$route': 'fetchData',
    application () {
			this.loadExistingAnswers();
		}
  },
  methods: {
    checkAnswers () {
      if (this.application.data.proposal_extension.parking && this.application.data.proposal_extension.parking.parking_works_scope_id) {
        if (this.typeOfAlteration === this.application.data.proposal_extension.parking.parking_works_scope_id) {
          this.navigate();
        } else {
          this.submit();
        }
      } else {
        this.submit();
      }
      
    },
    loadExistingAnswers () {
      if (this.application.data.proposal_extension.parking && this.application.data.proposal_extension.parking.parking_works_scope_id) {
        this.typeOfAlteration = this.application.data.proposal_extension.parking.parking_works_scope_id;
      }
		},
    fetchData () {
      this.currentWorks = this.$route.params.currentLevelInfo;
    },
    navigate() {

      //if car spaces or car and bike spaces are selected
      // todo find a more elegant way of doing this (without using the id)
      if (this.typeOfAlteration === "c4358d0e-c649-4b48-9a05-405d6ee90c0c" || this.typeOfAlteration === "8033164a-49e1-47db-810e-b0cac4ecd84b") {
        
        router.push({ name: 'CarParkingSpaces', params: { type: this.typeOfAlteration, currentLevelInfo: this.currentWorks } });

      } else if (this.typeOfAlteration === "0e5f59ac-fb07-4419-8578-41e011a83d1f") {

        router.push({ name: 'BikeParkingSpaces', params: { type: this.typeOfAlteration, currentLevelInfo: this.currentWorks } });

      } else {
        return;
      }
    },
    submit() {
      let payload = {
        "parking": {
          "parking_works_scope_id": this.typeOfAlteration
        }
      };

      const extensionId = this.$store.getters.getExtensionId(this.applicationId);

      this.$store.dispatch('updateExtensionProposal', { 
        "application_id": this.applicationId, 
        'selectedProposals': payload, 
        "extension_id": extensionId 
      }).then((response) => {
        if (response.error) {
          this.showErrorMessage = true;
          return;
        } else {
          this.navigate();
        }
      })
    },
    loadDefaultOptions() {
      this.$store.dispatch('getDefaultData', 'parking-works-scopes').then((response) => {
        
        if (response.error) {
          this.showErrorMessage = true;
          return;
        } else {
          this.defaultOptions = response.data;
        }
      
      })
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