import JwtService from '@/common/jwt.service'

//creates application with application id returned from the backend, selected address info and site's geojson
export function createApplication (state, data) {
  const applications = state.state.applications;
  applications.push(data);
  state.state.applications = applications;
}

export function updateApplication (state, data) {
  const position = state.state.applications.findIndex( application => application.data.id === data.id );

  if (position > -1) {
    state.state.applications[position].data = data;
  }
}

export function getApplication (state, data) {
  const position = state.state.applications.findIndex( application => application.data.id === data.id );
  var application = {};

  application.data = data;

  if (position === -1) {
    console.log('doesnt exist');
    state.state.applications.push(application);
    console.log('THE FINAL STATE', state.state);
  }
}

export function addProposal (state, data) {
  const position = state.state.applications.findIndex( application => application.data.id === data.applicationId );

  if (position > -1) {
    let applicationData = state.state.applications[position].data;

    if (data.type === 'extension') {
      applicationData.proposal_extension = data.data;

      state.state.applications[position].data = applicationData;
    } else if (data.type === 'equipment') {
      applicationData.proposal_equipment = data.data;
    } else {
      //then it is both
      
      let merged = {...applicationData, ...data.data};
      applicationData = merged;
    }

    state.state.applications[position].data = applicationData;
  }
}

export function updateProposal (state, data) {
  const position = state.state.applications.findIndex( application => application.data.id === data.applicationId );

  if (position > -1) {
    let applicationData = state.state.applications[position].data;
    let merged = {};

    if (data.type === 'extension') {
      merged = {...applicationData.proposal_extension, ...data.data};
      state.state.applications[position].data.proposal_extension = merged;

    } else if (data.type === 'equipment') {
      merged = {...applicationData.proposal_equipment, ...data.data};
      state.state.applications[position].data.proposal_equipment = merged;
    }

    console.log('final state', state.state.applications[position]);
  }
}

export function createFirstFlow (state, data) {
  data.selectedProposal.forEach(function(element, index) {
    state.state.proposalFlow.forEach(function(el) {

      if (element === el.proposalId) {
        data.selectedProposal.splice(index, 1);
      }
    });
  });

  if (data.selectedProposal.length === 0) {
    return;
  }

  var mapKeys = Object.keys(state.state.proposalMap);

  var currentLevelInMap = mapKeys.find(function(element) {
    return element === data.currentLevel;
  });

  var listOfOptions = state.state.proposalMap[currentLevelInMap];

  let firstFlow = [];

  data.selectedProposal.forEach(function(element) {
    var selectedProposal = listOfOptions.find(function(option) {
      return option.proposalId === element;
    });

    firstFlow.push(selectedProposal);

  });

  state.state.proposalFlow = firstFlow;

  console.log('------CREATED FLOW', state.state.proposalFlow);
}

export function updateFlow (state, data) {
  //todo check if selected proposal already exists
  data.selectedProposal.forEach(function(element, index) {
    state.state.proposalFlow.forEach(function(el) {

      if (element === el.proposalId) {
        data.selectedProposal.splice(index, 1);
      }
    });
  });

  if (data.selectedProposal.length === 0) {
    return;
  }

  var mapKeys = Object.keys(state.state.proposalMap);

  var currentLevelInMap = mapKeys.find(function(element) {
    return element === data.currentLevel;
  });

  var listOfOptions = state.state.proposalMap[currentLevelInMap];

  let flow = [];

  data.selectedProposal.forEach(function(element) {
    var selectedProposal = listOfOptions.find(function(option) {
      return option.proposalId === element;
    });

    flow.push(selectedProposal);
  });

  var currentLevelPosition = state.state.proposalFlow.findIndex(x => x.proposalId === currentLevelInMap);

  for (let i = 0; i < flow.length; i++) { 
    state.state.proposalFlow.splice(currentLevelPosition + 1 + i, 0, flow[i]);
  }
  console.log('------UPDATED FLOW', state.state.proposalFlow);

  return state.state.proposalFlow;
}

export function updateEquipmentFlow (state, data) {
  state.state.proposalMap.proposal_equipment = data.proposal_equipment;
}


export function signIn (state, data) {
  state.state.user = data;
  state.state.isAuthenticated = true;
  JwtService.saveToken(state.state.user.jwt);
}

export function addDocumentTypes (state, data) {
  state.state.documentTypes = data;
}

export function addDocumentSizes (state, data) {
  state.state.documentSizes = data;
}





