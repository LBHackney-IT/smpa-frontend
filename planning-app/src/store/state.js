export const state = {
  site: {},
  workStarted: {},
  proposal: {},
  proposalFlow: [],
  proposalMap: {
    proposal: [
      {
        proposalName: "Extension, improvement or alteration",
        proposalId: "proposal_extension",
        goTo: ["AboutProposal"]
      },
      {
        proposalName: "Equipment",
        proposalId: "proposal_equipment",
        goTo: ["AboutEquipment"]
      }
    ],
    proposal_extension: [
      {
        proposalName: "To the original house",
        proposalId: "extension_original_house",
        goTo: "AboutChangesToOriginalHouse"
      },
      {
        proposalName: "To any incidental buildings",
        proposalId: "extension_incidental_buildings",
        goTo: "proposedWorks"
      },
      {
        proposalName: "To gates, fences, garden walls, etc",
        proposalId: "extension_gates_fences_etc",
        goTo: "proposedWorks"
      },
      {
        proposalName: "To means of access to the site",
        proposalId: "extension_means_of_access_to_site",
        goTo: "proposedWorks"
      },
      {
        proposalName: "Car and/or bike parking spaces",
        proposalId: "extension_car_bike_spaces",
        goTo: "proposedWorks"
      }
    ],
    extension_original_house: [
      {
        proposalName: "Single storey extension",
        proposalId: "extension_original_house_single_storey_extension",
        goTo: "WorksXLocation"
      },
      {
        proposalName: "Two storey extension",
        proposalId: "extension_original_house_two_storey_extension",
        goTo: "WorksXLocation"
      },
      {
        proposalName: "Basement",
        proposalId: "extension_original_house_basement",
        goTo: "proposedWorks"
      },
      {
        proposalName: "Roof works",
        proposalId: "extension_original_house_roof_works",
        goTo: "proposedWorks"
      },
      {
        proposalName: "Conservatory",
        proposalId: "extension_original_house_conservatory",
        goTo: "proposedWorks"
      },
      {
        proposalName: "Outbuilding",
        proposalId: "extension_original_house_outbuilding",
        goTo: "proposedWorks"
      },
      {
        proposalName: "Porch",
        proposalId: "extension_original_house_porch",
        goTo: "proposedWorks"
      },
      {
        proposalName: "Balcony or terrace",
        proposalId: "extension_original_house_balcony_terrace",
        goTo: "proposedWorks"
      },
      {
        proposalName: "Addition and/or replacement of windows and doors",
        proposalId: "extension_original_house_add_replacement_windows_doors",
        goTo: "proposedWorks"
      },
      {
        proposalName: "Changing and/or adding cladding",
        proposalId: "extension_original_house_cladding",
        goTo: "proposedWorks"
      }
    ],
    extension_car_bike_spaces: [
      {
        proposalName: "Only for pedestrian access",
        proposalId: "extension_car_bike_spaces_only_pedestrian_access",
        goTo: "proposedWorks"
      },
      {
        proposalName: "Only for vehicle access",
        proposalId: "extension_car_bike_spaces_only_vehicle_access",
        goTo: "proposedWorks"
      },
      {
        proposalName: "For vehicle and pedestrian access",
        proposalId: "extension_car_bike_spaces_for_vehicle_and_pedestrian_access",
        goTo: "proposedWorks"
      }
    ]
  },
}

