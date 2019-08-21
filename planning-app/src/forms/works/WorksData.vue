<template>
	<div>
    <h1 class="govuk-heading-xl">
      About the bedrooms
    </h1>

    <div class="purpose-message govuk-body">This data is being collected to inform and monitor London wide development. Your responses will not influence the decision making process.</div>

		<div class="govuk-form-group">
      <fieldset class="govuk-fieldset" aria-describedby="proposal-hint">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h2 class="govuk-heading-m">
            Does the proposal involve the creation of new bedrooms?
          </h2>
        </legend>

        <div class="govuk-inset-text">
          <p class="govuk-body govuk-!-font-weight-bold">Definition*</p>
          <ul>
            <li>
              A single bedroom must have a floor area of at least 7.5 sqm and be at least 2.15m wide.
            </li>
            <br>
            <li>
              A double (or twin) bedroom must have a floor area of at least 11.5 sqm.
            </li>
          </ul>
          <p>*According to the <a href="https://www.london.gov.uk/what-we-do/planning/london-plan/new-london-plan/draft-new-london-plan/chapter-3-design/policy-d4-housing-quality-and-standards">Policy D4 Housing quality and standards</a> of the London Plan.</p>
          
        </div>

        <div class="govuk-radios govuk-radios--inline">
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="bike-parking-space-1" name="bike-parking-space-1" type="radio" v-bind:value="true" v-model="newBedroom">
						<label class="govuk-label govuk-radios__label" for="bike-parking-space-1">
							Yes
						</label>
					</div>
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="bike-parking-space-2" name="bike-parking-space-2" type="radio" v-bind:value="false" v-model="newBedroom">
						<label class="govuk-label govuk-radios__label" for="bike-parking-space-2">
							No
						</label>
					</div>
				</div>

        <div class="govuk-inset-text" v-if="newBedroom === true">
          <div class="govuk-form-group">
            <label class="govuk-label" for="name">
              How many new single bedrooms are gained?
            </label>
            <input class="govuk-input govuk-!-width-one-quarter" id="name" name="name" type="number" v-model="newSingleBedrooms">
          </div>
          <div class="govuk-form-group">
            <label class="govuk-label" for="name">
              How many new double bedrooms are gained?
            </label>
            <input class="govuk-input govuk-!-width-one-quarter" id="name" name="name" type="number" v-model="newDoubleBedrooms">
          </div>
        </div>
      </fieldset>
    </div>

    <error-message v-if="showErrorMessage && !loading" :message="errorMessages.BEDROOMS.GENERIC_ERROR"></error-message>

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
  name: 'WorksData',
  mixins: [ getRouteAppId ],
	components: {
    vCta,
    FreeDescription,
    ErrorMessage
  },
  data () {
    return {
      newBedroom: undefined,
      newSingleBedrooms: 0,
      newDoubleBedrooms: 0,
      showErrorMessage: false,
      errorMessages: undefined
    }
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
    checkAnswers () {
      if (this.newSingleBedrooms === this.application.data.proposal_extension.new_single_bedrooms && this.newDoubleBedrooms === this.application.data.proposal_extension.new_double_bedrooms && this.newBedroom) {
        this.navigate();
      } else {
        this.submit();
      }
    },
    loadExistingAnswers () {
      if (this.application.data.proposal_extension.new_single_bedrooms) {
        this.newBedroom = true;
        this.newSingleBedrooms = this.application.data.proposal_extension.new_single_bedrooms;
      }

      if (this.application.data.proposal_extension.new_double_bedrooms) {
        this.newBedroom = true;
        this.newDoubleBedrooms = this.application.data.proposal_extension.new_double_bedrooms;
      }

      if (!this.application.data.proposal_extension.new_single_bedrooms && !this.application.data.proposal_extension.new_double_bedrooms) {
        this.newBedroom = false;
      }
		},
    submit() {
      let payload = {};

      if (this.newBedroom) {
        payload = {
          "new_single_bedrooms": this.newSingleBedrooms ?  this.newSingleBedrooms : 0,
          "new_double_bedrooms": this.newDoubleBedrooms ? this.newDoubleBedrooms : 0
        }
      } else {
        payload = {
          "new_single_bedrooms": 0,
          "new_double_bedrooms": 0
        }
      }
      const extensionId = this.$store.getters.getExtensionId(this.applicationId);

      this.$store.dispatch('updateExtensionProposal', { 
        "application_id": this.applicationId, 
        'selectedProposals': payload, 
        "extension_id": extensionId }).then((response) => {
        if (response.error) {
          this.showErrorMessage = true;
          return;
        } else {
          this.navigate();
        }
      })
    },
    navigate() {
      router.push({ name: 'Trees' });
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