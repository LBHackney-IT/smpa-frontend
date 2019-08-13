<template>
	<div>
    <h1 class="govuk-heading-xl" v-if="this.type === 'vehicle' || this.type === 'pedestrian'">
      About the {{ type }} access
    </h1>

    <h1 class="govuk-heading-xl" v-if="this.type === 'both'">
      About the vehicle and pedestrian access
    </h1>
		<div class="govuk-form-group">
      <fieldset class="govuk-fieldset" aria-describedby="proposal-hint">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h2 class="govuk-heading-m">
            What changes are you proposing?
          </h2>
        </legend>

        <span id="proposal-hint" class="govuk-hint">
          Select all that apply.
        </span>

        <div class="govuk-checkboxes">
          <div class="govuk-checkboxes__item" v-bind:key="option.id" v-for="option in this.defaultOptions">
            <input class="govuk-checkboxes__input" v-bind:id="option.id" name="proposal" type="checkbox" v-bind:value="option.id" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" v-bind:for="option.id">
              <strong>{{option.name}}</strong>
            </label>
          </div>

          <!-- todo fix this if  -->
   <!--        <div class="govuk-checkboxes__item" v-if="this.type === 'vehicle' || this.type === 'both'">
            <input class="govuk-checkboxes__input" id="proposal-4" name="proposal" type="checkbox" value="Vehicle access" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-4">
              <strong>Dropped kerb and formation of vehicle access</strong>
            </label>
          </div> -->
        </div>
      </fieldset>
    </div>
    <free-description></free-description>
		<v-cta name="Continue" :onClick="submit"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';
import Navigate from '../../common/navigate';
import FreeDescription from '../../components/FreeDescription.vue';
import { getRouteAppId } from '../../mixins/getRouteAppId';

export default {
  name: 'MoreAboutAccess',
  mixins: [ getRouteAppId ],
	components: {
    vCta,
    FreeDescription
  },
  data () {
    return {
      selectedProposal: [],
      type: undefined,
      typeOfAlteration: undefined,
      currentWorks: undefined,
      defaultOptions: []
    }
  },
  beforeMount () {
    this.loadDefaultOptions();
  },
  created () {
    this.fetchData();
  },
  watch: {
    '$route': 'fetchData'
  },
	methods: {
    fetchData () {
      this.selectedProposal = [];
      this.type = this.$route.params.type;
      this.currentWorks = this.$route.params.currentLevelInfo;
    },
    navigate() {
      var routerParams = Navigate.calculateNavigation(this.$store.state.state.proposalFlow, this.currentWorks, 'MoreAboutAccess');
      router.push(routerParams);
    },
    loadDefaultOptions() {
      this.$store.dispatch('getDefaultData', 'access-works-types').then((response) => {
        this.defaultOptions = response.data;
      })
    },
    submit() {
      let currentData = this.application.data.proposal_extension.means_of_access;

      let payload = {
        "means_of_access": {}
      };

      payload.means_of_access = currentData;

      payload.means_of_access.access_works_sub_type_ids = this.selectedProposal;

      const extensionId = this.$store.getters.getExtensionId(this.applicationId);

      this.$store.dispatch('updateExtensionProposal', { "application_id": this.applicationId, 'selectedProposals': payload, "extension_id": extensionId }).then(() => {
        this.navigate();
      })
    }
  },
  computed: {
    application () {
      let index = this.$store.state.state.applications.findIndex( application => application.data.id === this.applicationId );
			return this.$store.state.state.applications[index];
    },
    
    isInConservationArea () {
      return this.application.data.site_constraints.nb_conarea > 0;
    }
	}
}
</script>