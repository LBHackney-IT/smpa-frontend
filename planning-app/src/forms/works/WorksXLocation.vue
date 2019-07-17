<template>
	<div>
    <h1 class="govuk-heading-xl">
      About the {{ currentWorks.proposalName }}
    </h1>
		<div class="govuk-form-group">
      <fieldset class="govuk-fieldset" aria-describedby="proposal-hint">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h2 class="govuk-heading-m">
            Where are the proposed works located in relation to the original house?
          </h2>
        </legend>

        <span id="proposal-hint" class="govuk-hint">
          Select all that apply.
        </span>

        <div class="govuk-checkboxes">
          
          <div class="govuk-checkboxes__item" v-bind:key="option.id" v-for="option in this.defaultData">
            <input class="govuk-checkboxes__input" id="proposal-1" name="proposal" type="checkbox" v-bind:value="option.id" v-model="selectedProposal">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-1">
              <strong>{{option.name}}</strong>
            </label>
          </div>
        </div>
      </fieldset>
    </div>
    <free-description></free-description>
		<v-cta name="Continue" :onClick="navigate"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';
import Navigate from '../../common/navigate';
import FreeDescription from '../../components/FreeDescription.vue';
import { getRouteAppId } from '../../mixins/getRouteAppId';

export default {
  name: 'WorksXLocation',
  mixins: [ getRouteAppId ],
	components: {
    vCta,
    FreeDescription
  },
  data () {
    return {
      selectedProposal: [],
      currentWorks: {
        proposalName: ''
      },
      defaultData: undefined
    }
  },
  beforeMount () {
    this.loadDefaultData();
    this.fetchData();
  },
  watch: {
    '$route': 'fetchData'
  },
	methods: {
    loadExistingAnswers () {
      //todo: should beforehand if it is equipment or extension

      if (this.application.data.proposal_equipment[this.$route.params.id]) {

      } else if (this.application.data.proposal_equipment[this.$route.params.id]) {

      }
    },
    fetchData () {
      this.selectedProposal = [];

      if (this.$route.params.currentLevelInfo) {
        this.currentWorks = this.$route.params.currentLevelInfo;
      } else {

        var proposalFlow = JSON.parse(this.application.data.proposalFlow);

        var id = this.$route.params.id;

        var currentLevelInMap = proposalFlow.findIndex(function(element) {
          return element.proposalId === id;
        });
        this.currentWorks = proposalFlow[currentLevelInMap + 1];
      }

    },
    navigate() {
      let payload = {};

      if (this.$route.params.origin === 'equipment') {
        const equipmentId = this.$store.getters.getEquipmentId(this.applicationId);

        payload = {
          'data': {},
          'resource': 'equipment-proposals',
          'type': 'equipment',
          'id': equipmentId
        }

        var currentWorkLocation = {
          "equipment": {
            "equipment_locations": [
              {
                "location_ids": this.selectedProposal,
                "equipment_type_id": equipmentId
              }
            ]
          }
        };

      } else {
        const extensionId = this.$store.getters.getExtensionId(this.applicationId);
      
        payload = {
          'data': {},
          'resource': 'extension-proposals',
          'type': 'extension',
          'id': extensionId
        }

        var currentWorkLocation = {};

        let proposalId;

        //todo find a more elegant fix
        if (this.currentWorks.proposalId === "incidental_buildings") {
          proposalId = 'outbuilding';
        } else {
          proposalId = this.currentWorks.proposalId;
        }

        currentWorkLocation[proposalId] = {};
        
        currentWorkLocation[proposalId] = {
          "works_location_ids": this.selectedProposal
        };
        
        payload.data[this.$route.params.id] = currentWorkLocation;
      }
 
      this.$store.dispatch('submitWorksLocation', payload).then((response) => {

      });
        var routerParams = Navigate.calculateNavigation(this.$store.state.state.proposalFlow, this.currentWorks, 'WorksXLocation');
        router.push(routerParams);
    },
    loadDefaultData() {
      this.$store.dispatch('getDefaultData', 'works-locations').then((response) => {
        this.defaultData = response.data;
      })
    }
  },
  computed: {
    application () {
			let index = this.$store.state.state.applications.findIndex( application => application.data.id === this.applicationId );

			return this.$store.state.state.applications[index];
		},
		isInConservationArea () {
      if (this.$store.state.site && this.$store.state.site.siteConstraints && this.$store.state.site.siteConstraints.conservationArea) {
        return this.$store.state.site.siteConstraints.conservationArea;
      } else {
        return false;
      }
		}
  },
  watch: {
		application (newValue, oldValue) {
			this.loadExistingAnswers();
		}
	}
}
</script>