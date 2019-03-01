export function setSite (state, data) {
  state.site = data;
}

export function addWorksAnswers (state, data) {
  state.workStarted = data;
}

export function addMultipleOccupationAnswers (state, data) {
  state.multipleOccupation = data;
}

export function addProposalAnswers (state, data) {
  state.proposal = data;
}

export function addAboutProposalAnswers (state, data) {
  state.aboutProposal = data;
}

export function addAboutDevelopmentAnswers (state, data) {
  state.aboutDevelopment = data;
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

}

export function updateFlow (state, data) {
  //check if selected proposal already exists
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

  console.log('--------FINAL FLOW', state.state.proposalFlow);
}





