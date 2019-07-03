import JwtService from '@/common/jwt.service';

// all applications inside an account should go inside "applications". Each application will have the "proposal flow" saved inside it.
export const state = {
  isAuthenticated: !!JwtService.getToken(),
  user: {},
  applications: [],
  proposalFlow: [],
  proposalMap: {
    proposal: [
      {
        proposalName: "Extension or alteration",
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
        proposalId: "original_house",
        goTo: ["AboutChangesToOriginalHouse"]
      },
      {
        proposalName: "Outbuilding",
        proposalId: "incidental_buildings",
        goTo: ["Outbuilding", "WorksXLocation"]
      },
      {
        proposalName: "To gates, fences, garden walls, etc",
        proposalId: "boundaries",
        goTo: ["GatesFencesWalls", "WorksXLocation"]
      },
      {
        proposalName: "To means of access to the site",
        proposalId: "means_of_access",
        goTo: ["Access", "MoreAboutAccess"]
      },
      {
        proposalName: "Car and/or bike parking spaces",
        proposalId: "parking",
        goTo: ["Parking"]
      }
    ],
    original_house: [
      {
        proposalName: "Single storey extension",
        proposalId: "single_storey_extension",
        goTo: ["WorksXLocation"]
      },
      {
        proposalName: "Two storey extension",
        proposalId: "two_storey_extension",
        goTo: ["WorksXLocation"]
      },
      {
        proposalName: "Part single / Part two storey extension",
        proposalId: "part_single_part_two_storey_extension",
        goTo: ["WorksXLocation"]
      },
      {
        proposalName: "Basement",
        proposalId: "basement",
        goTo: ["Basement", "WorksXLocation"]
      },
      {
        proposalName: "Roof works",
        proposalId: "roof",
        goTo: ["Roofs", "WorksXLocation"]
      },
      {
        proposalName: "Outbuilding",
        proposalId: "outbuilding",
        goTo: ["WorksXLocation"]
      },
      {
        proposalName: "Porch",
        proposalId: "porch",
        goTo: ["WorksXLocation"]
      },
      {
        proposalName: "Balcony or terrace",
        proposalId: "balcony_terrace",
        goTo: ["WorksXLocation"]
      },
      {
        proposalName: "Staircase",
        proposalId: "staircase",
        goTo: ["WorksXLocation"]
      },
      {
        proposalName: "Addition and/or replacement of windows and doors",
        proposalId: "windows_doors",
        goTo: ["WorksXLocation"]
      },
      {
        proposalName: "Changing and/or adding cladding",
        proposalId: "cladding",
        goTo: ["WorksXLocation"]
      }
    ],
    parking: [
      {
        proposalName: "Only for pedestrian access",
        proposalId: "extension_car_bike_spaces_only_pedestrian_access",
        goTo: ["proposedWorks"]
      },
      {
        proposalName: "Only for vehicle access",
        proposalId: "extension_car_bike_spaces_only_vehicle_access",
        goTo: ["proposedWorks"]
      },
      {
        proposalName: "For vehicle and pedestrian access",
        proposalId: "extension_car_bike_spaces_for_vehicle_and_pedestrian_access",
        goTo: ["proposedWorks"]
      }
    ]
  },
}

