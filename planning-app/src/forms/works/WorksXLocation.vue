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
      defaultData: undefined,
      typesOfEquipments: [
        "4b2aa4a1-e01e-49ff-aedc-ddd638695839", 
        "510e6d41-168d-45e6-ad7e-329a578961d2", 
        "9f9390fa-f175-4d7a-8599-48c40644f0c3",
        "fa6f8957-a775-4dc0-adfc-4c3ddfd42698", 
        "cc70f42f-dc59-4a03-bf7e-fbb2e7ff3b5b", 
        "b36079c1-dc9f-4225-a94d-b7c54c83b86e"
      ]
    }
  },
  beforeMount () {
    this.loadDefaultData();
    this.fetchData();
  },
  watch: {
    '$route': 'fetchData',
    application () {
			this.loadExistingAnswers();
		}
  },
	methods: {
    loadExistingAnswers () {
      //check if it is equipment
      if (this.$route.params.origin === 'equipment' || this.typesOfEquipments.includes(this.$route.params.id)) {
        let equipmentId = this.$route.params.id;

        //check if it is normal equipments or conservation area equipments
        if (this.application.data.proposal_equipment.equipment.equipment_type_ids.includes(this.$route.params.id)) {

          //render correct name of the equipment

          this.application.data.proposal_equipment.equipment.equipment_types.forEach(function(equipment) {

              if (equipment.id === equipmentId) {

                this.currentWorks.proposalName = equipment.name;
              }
              
          }, this);

          //check if equipment already has some location saved
          if (this.application.data.proposal_equipment.equipment.equipment_locations && this.application.data.proposal_equipment.equipment.equipment_locations.length > 0) {

            //Go through each saved location and push it to be pre selected
            this.application.data.proposal_equipment.equipment.equipment_locations.forEach(function(element) {

              if (element.equipment_type_id === equipmentId) {

                for (var i = 0, len = element.location_ids.length; i < len; i++) {
                  this.selectedProposal.push(element.location_ids[i]);
                }
              }
              
            }, this);
          }

        } else if (this.application.data.proposal_equipment.equipment.equipment_conservation_type_ids.includes(this.$route.params.id)) {

          //render correct name of the equipment

          this.application.data.proposal_equipment.equipment.equipment_conservation_types.forEach(function(equipment) {

              if (equipment.id === equipmentId) {

                this.currentWorks.proposalName = equipment.name;
              }
              
          }, this);

          //check if equipment already has some location saved
          if (this.application.data.proposal_equipment.equipment.equipment_conservation_locations && this.application.data.proposal_equipment.equipment.equipment_conservation_locations.length > 0) {
            
            this.application.data.proposal_equipment.equipment.equipment_conservation_locations.forEach(function(element) {

              if (element.equipment_type_id === equipmentId) {

                for (var i = 0, len = element.location_ids.length; i < len; i++) {
                  this.selectedProposal.push(element.location_ids[i]);
                }
              }
              
            }, this);
          }

        } else {
          //todo show error
        }
      } else {

        //then it is an extension
        if (this.application.data.proposal_extension.original_house[this.currentWorks.proposalId].works_location_ids && this.application.data.proposal_extension.original_house[this.currentWorks.proposalId].works_location_ids.length > 0) {

          var location_ids = this.application.data.proposal_extension.original_house[this.currentWorks.proposalId].works_location_ids;

          for (var i = 0, len = location_ids.length; i < len; i++) {
            this.selectedProposal.push(location_ids[i]);
          }
        }
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

      if (this.$route.params.origin === 'equipment' || this.typesOfEquipments.includes(this.$route.params.id)) {        
        const equipmentId = this.$store.getters.getEquipmentId(this.applicationId);

        payload = {
          'data': this.application.data.proposal_equipment,
          'resource': 'equipment-proposals',
          'type': 'equipment',
          'id': equipmentId
        }

        let workLocationPayload = {};

        if (this.application.data.proposal_equipment.equipment.equipment_type_ids.includes(this.$route.params.id)) {

          if (payload.data.equipment.equipment_locations && payload.data.equipment.equipment_locations.length > 0) {
            
            workLocationPayload = {
              "location_ids": this.selectedProposal,
              "equipment_type_id": this.$route.params.id
            };

            payload.data.equipment.equipment_locations.push(workLocationPayload);
          } else {
            workLocationPayload = [
              {
                "location_ids": this.selectedProposal,
                "equipment_type_id": this.$route.params.id
              }
            ];
            payload.data.equipment.equipment_locations = workLocationPayload;
          }
        } else if (this.application.data.proposal_equipment.equipment.equipment_conservation_type_ids.includes(this.$route.params.id)) {

          if (payload.data.equipment.equipment_conservation_locations && payload.data.equipment.equipment_conservation_locations.length > 0) {
            
            workLocationPayload = {
              "location_ids": this.selectedProposal,
              "equipment_type_id": this.$route.params.id
            };
  
            payload.data.equipment.equipment_conservation_locations.push(workLocationPayload);

          } else {
            
            workLocationPayload = [
              {
                "location_ids": this.selectedProposal,
                "equipment_type_id": this.$route.params.id
              }
            ];

            payload.data.equipment.equipment_conservation_locations = workLocationPayload;
          }
        } else {
          //todo show error
        }
      } else {
        const extensionId = this.$store.getters.getExtensionId(this.applicationId);
        
        //get id from url
        var proposalId = this.$route.params.currentLevelInfo.proposalId;
      
        payload = {
          'data': this.application.data.proposal_extension,
          'resource': 'extension-proposals',
          'type': 'extension',
          'id': extensionId
        }

        var workLocationPayload = {};

        if (this.currentWorks.proposalId === "incidental_buildings") {

          payload.data.incidental_buildings.outbuilding = {
            "works_location_ids": this.selectedProposal
          };

        } else if (this.currentWorks.proposalId === "boundaries") {

          payload.data.boundaries.gates_fences_walls.works_location_ids = this.selectedProposal;

        } else {

          //else we can assume that the key is inside original_house

          workLocationPayload = {
            "works_location_ids": this.selectedProposal
          };

          payload.data.original_house[proposalId] = workLocationPayload;
        }
      }

      this.$store.dispatch('submitWorksLocation', payload).then((response) => {
        var routerParams = Navigate.calculateNavigation(this.$store.state.state.proposalFlow, this.currentWorks, 'WorksXLocation');
        router.push(routerParams);
      });
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
		}
  }
}
</script>