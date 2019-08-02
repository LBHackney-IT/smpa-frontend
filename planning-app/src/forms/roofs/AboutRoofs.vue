<template>
	<div>
    <h1 class="govuk-heading-xl">
      About the roof works
    </h1>
		<div class="govuk-form-group">
      <fieldset class="govuk-fieldset" aria-describedby="proposal-hint">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h2 class="govuk-heading-m">
            What are you doing?
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
  name: 'AboutRoofs',
  mixins: [ getRouteAppId ],
	components: {
    vCta,
    FreeDescription
  },
  data () {
    return {
      selectedProposal: [],
      defaultOptions: undefined
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
      this.currentWorks = this.$route.params.currentLevelInfo;
    },
    navigate() {
      var routerParams = Navigate.calculateNavigation(this.$store.state.state.proposalFlow, this.currentWorks, 'Roofs');
      router.push(routerParams);
    },
    submit() {
      let payload = {
        "original_house": {
          "roof": {
            "works_type_ids": this.selectedProposal
          }
        }
      };

      const extensionId = this.$store.getters.getExtensionId(this.applicationId);

      this.$store.dispatch('updateExtensionProposal', { "application_id": this.applicationId, 'selectedProposals': payload, "extension_id": extensionId }).then(() => {
        this.navigate();
      })
    },
    loadDefaultOptions() {
      this.$store.dispatch('getDefaultData', 'roof-works-types').then((response) => {
        this.defaultOptions = response.data;
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