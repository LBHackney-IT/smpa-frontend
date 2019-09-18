import store from '@/store';

function generateWorkDescription (application) {
  let worksDescription = [];

  if (application.proposal_extension) {

    if (
      !application.proposal_extension.boundaries && 
      !application.proposal_extension.incidental_buildings && 
      !application.proposal_extension.means_of_access && 
      !application.proposal_extension.parking &&
      !application.proposal_extension.new_double_bedrooms &&
      !application.proposal_extension.new_single_bedrooms &&
      !application.proposal_extension.original_house) {
        worksDescription.push('You did not specifiy any extension works.');
      }

    if (application.proposal_extension.boundaries) {
      if (application.proposal_extension.boundaries.gates_fences_walls) {
        
        let gates_fences_walls_work_types = '';

        if (application.proposal_extension.boundaries.gates_fences_walls.works_types.length > 0) {

          application.proposal_extension.boundaries.gates_fences_walls.works_types.forEach((location) => {
            gates_fences_walls_work_types += location.name + ' ';
          });

          worksDescription.push(gates_fences_walls_work_types + 'works.');

        } else {
          worksDescription.push('You did not provide the type of works for the boundaries.');
        }

        if (application.proposal_extension.boundaries.gates_fences_walls.works_locations.length > 0) {

          let gates_fences_walls_locations = '';
          application.proposal_extension.boundaries.gates_fences_walls.works_locations.forEach((location) => {
            gates_fences_walls_locations += location.name + ' ';
          });

          worksDescription.push(gates_fences_walls_locations + 'gates, fences, garden walls.');

        } else {
          worksDescription.push(gates_fences_walls_work_types + 'You did not provide the location of the works for the boundaries.');
        }
      }
    }

    if (application.proposal_extension.incidental_buildings) {

      if (application.proposal_extension.incidental_buildings.outbuilding && application.proposal_extension.incidental_buildings.outbuilding.works_locations.length > 0) {

        let outbuilding_locations = '';
        application.proposal_extension.incidental_buildings.outbuilding.works_locations.forEach((location) => {
          outbuilding_locations += location.name + ' ';
        });

        worksDescription.push(outbuilding_locations + 'extension or alteration to any other building.');

      } else {
        worksDescription.push('Extension or alteration to any other building. You did not provide the location of the works for the extension or alteration to any other building.');
      }

      var removal_or_demolition = application.proposal_extension.incidental_buildings.removal_or_demolition ? 'The work includes the removal or demolition of any existing outbuilding. ' : 'The work does not include the removal or demolition of any existing outbuilding. ';

      worksDescription.push(removal_or_demolition);

      if (application.proposal_extension.incidental_buildings.details) {

        worksDescription.push('You provided the following details: ' + application.proposal_extension.incidental_buildings.details);
      }
    }

    if (application.proposal_extension.means_of_access) {
      let accessWorksScopes;
      let selectedWorkScope;

      store.dispatch('getDefaultData', 'access-works-scopes').then((response) => {
        accessWorksScopes = response.data;
        if (application.proposal_extension.means_of_access.access_works_scope_id) {
          var index = accessWorksScopes.findIndex((el) => el.id === application.proposal_extension.means_of_access.access_works_scope_id);
          selectedWorkScope = accessWorksScopes[index];
          worksDescription.push('The proposed works affect access to the site: ' + selectedWorkScope.name);
        }
      })

      if (application.proposal_extension.means_of_access.access_works_sub_types.length > 0) {
        
        let accessWorksSubTypes = '';

        application.proposal_extension.means_of_access.access_works_sub_types.forEach((subTypes) => {
          accessWorksSubTypes += subTypes.name + ' ';
        });

        worksDescription.push('The proposed works for access to the site include: ' + accessWorksSubTypes);
      }
    }

    if (application.proposal_extension.parking) {
      if (application.proposal_extension.parking.current_bike_parking_spaces) {
        worksDescription.push('The current number of bike parking spaces is ' + application.proposal_extension.parking.current_bike_parking_spaces + '.');
      }
      if (application.proposal_extension.parking.planned_bike_parking_spaces) {
        worksDescription.push('The planned number of bike parking spaces will be ' + application.proposal_extension.parking.planned_bike_parking_spaces + '.');
      }

      if (application.proposal_extension.parking.current_bike_parking_spaces && !application.proposal_extension.parking.planned_bike_parking_spaces) {
        worksDescription.push('You added the current number of bike parking spaces but did not add the planned bike parking spaces after the works are done.');
      }

      if (!application.proposal_extension.parking.current_bike_parking_spaces && application.proposal_extension.parking.planned_bike_parking_spaces) {
        worksDescription.push('You added the planned number of bike parking spaces but did not add the current bike parking spaces.');
      }

      if (application.proposal_extension.parking.current_car_parking_spaces) {
        worksDescription.push('The current number of car parking spaces is ' + application.proposal_extension.parking.current_car_parking_spaces + '.');
      }
      if (application.proposal_extension.parking.planned_car_parking_spaces) {
        worksDescription.push('The planned number of car parking spaces will be ' + application.proposal_extension.parking.planned_car_parking_spaces + '.');
      }

      if (application.proposal_extension.parking.current_car_parking_spaces && !application.proposal_extension.parking.planned_car_parking_spaces) {
        worksDescription.push('You added the current number of car parking spaces but did not add the planned car parking spaces after the works are done.');
      }

      if (!application.proposal_extension.parking.current_car_parking_spaces && application.proposal_extension.parking.planned_car_parking_spaces) {
        worksDescription.push('You added the planned number of car parking spaces but did not add the current car parking spaces.');
      }

      if (application.proposal_extension.parking.new_ev_charging_points) {
        worksDescription.push('The proposal involves ' + application.proposal_extension.parking.new_ev_charging_points + ' electrical vehicle (EV) charging points');
      }
    }

    if (application.proposal_extension.new_double_bedrooms) {
      worksDescription.push('Number of new double bedrooms: ' + application.proposal_extension.new_double_bedrooms + '.');
    }

    if (application.proposal_extension.new_single_bedrooms) {
      worksDescription.push('Number of new single bedrooms: ' + application.proposal_extension.new_single_bedrooms + '.');
    }

    if (application.proposal_extension.original_house) {
      if (application.proposal_extension.original_house.balcony_terrace) {

        if (application.proposal_extension.original_house.balcony_terrace.works_locations.length > 0) {

          let balcony_terrace_locations = '';
          application.proposal_extension.original_house.balcony_terrace.works_locations.forEach((location) => {
            balcony_terrace_locations += location.name + ' ';
          });

          worksDescription.push(balcony_terrace_locations + 'balcony or terrace.');

        } else {
          worksDescription.push('Balcony or terrace. You did not provide the location of the works for the balcony/terrace.');
        }

      }

      if (application.proposal_extension.original_house.basement) {
        if (application.proposal_extension.original_house.basement.works_locations.length > 0) {

          let basement_locations = '';
          application.proposal_extension.original_house.basement.works_locations.forEach((location) => {
            basement_locations += location.name + ' ';
          });

          worksDescription.push(basement_locations + 'below ground level basement works.');

        } else {
          worksDescription.push('Below ground level basement works. You did not provide the location of the works for the basement.');
        }
      }

      if (application.proposal_extension.original_house.cladding) {
        if (application.proposal_extension.original_house.cladding.works_locations.length > 0) {

          let cladding_locations = '';
          application.proposal_extension.original_house.cladding.works_locations.forEach((location) => {
            cladding_locations += location.name + ' ';
          });

          worksDescription.push(cladding_locations + 'changes of the external finish of the existing house.');

        } else {
          worksDescription.push('Changing the external finish of the existing house. You did not provide the location of the works for the external finish of the existing house.');
        }
      }

      if (application.proposal_extension.original_house.part_single_part_two_storey_extension) {
        if (application.proposal_extension.original_house.part_single_part_two_storey_extension.works_locations.length > 0) {

          let part_single_part_two_storey_extension_locations = '';
          application.proposal_extension.original_house.part_single_part_two_storey_extension.works_locations.forEach((location) => {
            part_single_part_two_storey_extension_locations += location.name + ' ';
          });

          worksDescription.push(part_single_part_two_storey_extension_locations + 'part single/part two storey extension.');

        } else {
          worksDescription.push('Part single/part two storey extension. You did not provide the location of the works for the part single/part two storey extension.');
        }

      }

      if (application.proposal_extension.original_house.porch) {
        if (application.proposal_extension.original_house.porch.works_locations.length > 0) {

          let porch_locations = '';
          application.proposal_extension.original_house.porch.works_locations.forEach((location) => {
            porch_locations += location.name + ' ';
          });

          worksDescription.push(porch_locations + 'porch.');

        } else {
          worksDescription.push('Porch. You did not provide the location of the works for the porch.');
        }
      }

      if (application.proposal_extension.original_house.roof) {
        if (application.proposal_extension.original_house.roof.works_locations.length > 0) {

          let roof_locations = '';
          application.proposal_extension.original_house.roof.works_locations.forEach((location) => {
            roof_locations += location.name + ' ';
          });

          worksDescription.push(roof_locations + 'roof.');

        } else {
          worksDescription.push('Roof. You did not provide the location of the works for the roof.');
        }
      }

      if (application.proposal_extension.original_house.single_storey_extension) {

        if (application.proposal_extension.original_house.single_storey_extension.works_locations.length > 0) {

          let single_storey_extension_locations = '';
          application.proposal_extension.original_house.single_storey_extension.works_locations.forEach((location) => {
            single_storey_extension_locations += location.name + ' ';
          });

          worksDescription.push(single_storey_extension_locations + 'single storey extension.');

        } else {
          worksDescription.push('Single storey extension. You did not provide the location of the works for single storey extension.');
        }
      }

      if (application.proposal_extension.original_house.staircase) {
        if (application.proposal_extension.original_house.staircase.works_locations.length > 0) {

          let staircase_locations = '';
          application.proposal_extension.original_house.staircase.works_locations.forEach((location) => {
            staircase_locations += location.name + ' ';
          });

          worksDescription.push(staircase_locations + 'alteration or installation of an external staircase.');

        } else {
          worksDescription.push('Alteration or installation of an external staircase. You did not provide the location of the works for the alteration or installation of an external staircase.');
        }

      }

      if (application.proposal_extension.original_house.two_storey_extension) {
        if (application.proposal_extension.original_house.two_storey_extension.works_locations.length > 0) {

          let two_storey_extension_locations = '';
          application.proposal_extension.original_house.two_storey_extension.works_locations.forEach((location) => {
            two_storey_extension_locations += location.name + ' ';
          });

          worksDescription.push(two_storey_extension_locations + 'two storey extension.');

        } else {
          worksDescription.push('Two storey extension. You did not provide the location of the works for the two storey extension.');
        }

      }

      if (application.proposal_extension.original_house.windows_doors) {
        if (application.proposal_extension.original_house.windows_doors.works_locations.length > 0) {

          let windows_doors_locations = '';
          application.proposal_extension.original_house.windows_doors.works_locations.forEach((location) => {
            windows_doors_locations += location.name + ' ';
          });

          worksDescription.push(windows_doors_locations + 'addition and/or replacement of windows or doors, including bay windows.');

        } else {
          worksDescription.push('Addition and/or replacement of windows or doors, including bay windows. You did not provide the location of the works for the addition and/or replacement of windows or doors, including bay windows.');
        }
      }

    }
  }

  
  if (application.proposal_equipment) {

    if (application.proposal_equipment.equipment) {

    
      if (application.proposal_equipment.equipment.equipment_conservation_types) {

        let listOfEquipments = [];

        application.proposal_equipment.equipment.equipment_conservation_types.forEach((equipment) => {

          let currentEquipmentInfo = '';

          if (application.proposal_equipment.equipment.equipment_conservation_locations) {
            let currentEquipment = application.proposal_equipment.equipment.equipment_conservation_locations.find((eq) => eq.equipment_type_id === equipment.id);

            if (currentEquipment && currentEquipment.locations) {
              currentEquipment.locations.forEach((equipmentLocation, locationIndex) => {
                if (locationIndex + 1 === currentEquipment.locations.length) {
                  currentEquipmentInfo += equipmentLocation.name + ' ';
                } else {
                  currentEquipmentInfo += equipmentLocation.name + ', ';
                }
              });
            }

            currentEquipmentInfo += equipment.name;

          } else {
            currentEquipmentInfo += 'You did not provide the location of the works related to an equipment in a conservation area.';
          }

          

          listOfEquipments.push(currentEquipmentInfo);

        });

        application.proposal_equipment.equipment.equipment_types.forEach((equipment) => {

          let currentEquipmentInfo = '';

          if (application.proposal_equipment.equipment.equipment_locations) {
            let currentEquipment = application.proposal_equipment.equipment.equipment_locations.find((eq) => eq.equipment_type_id === equipment.id);

            if (currentEquipment && currentEquipment.locations) {
              currentEquipment.locations.forEach((equipmentLocation, locationIndex) => {
                if (locationIndex + 1 === currentEquipment.locations.length) {
                  currentEquipmentInfo += equipmentLocation.name + ' ';
                } else {
                  currentEquipmentInfo += equipmentLocation.name + ', ';
                }
              });
            }
  
            currentEquipmentInfo += equipment.name;
          } else {
            currentEquipmentInfo += 'You did not provide the location of the works related to an equipment.';
          }



          listOfEquipments.push(currentEquipmentInfo);

        });

        listOfEquipments.forEach((equipment) => {
          worksDescription.push(equipment);
        });
      }
    }
  } 
  
  if (!application.proposal_equipment && !application.proposal_equipment) {
    worksDescription.push('You did not specifiy any equipment works.');
  }

  return worksDescription;
}

export default { generateWorkDescription };

