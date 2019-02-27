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
  var mapKeys = Object.keys(state.state.proposalMap);

  var currentLevelInMap = mapKeys.find(function(element) {
    return element === data.currentLevel;
  });

  var listOfOptions = state.state.proposalMap[currentLevelInMap];

  var firstFlow = [];

  listOfOptions.forEach(function(element) {
    firstFlow = firstFlow.concat(element);
  });

  state.state.proposalFlow = firstFlow;
}

export function updateFlow (state, data) {


  var mapKeys = Object.keys(state.state.proposalMap);

  console.log('-------CURRENT FLOW', state.state.proposalFlow);

  console.log('----map keys', mapKeys);

  var currentLevelInMap = mapKeys.find(function(element) {
    return element === data.currentLevel;
  });



  console.log('current', currentLevelInMap);

  var listOfOptions = state.state.proposalMap[currentLevelInMap];


  console.log('------LIST OF OPTIONS', listOfOptions);

  console.log('------data sent', data);

  let flow = [];

  data.selectedProposal.forEach(function(element) {
    console.log('element', element);
    
    var selectedProposal = listOfOptions.find(function(option) {
      return option.proposalId === element;
    });

    flow.push(selectedProposal);

  });


  var currentLevelPosition = state.state.proposalFlow.findIndex(x => x.proposalId === currentLevelInMap);


  console.log('-------new flow? ', flow);

  for (let i = 0; i < flow.length; i++) { 
    state.state.proposalFlow.splice(currentLevelPosition + 1 + i, 0, flow[i]);
  }

  console.log('--------FINAL FLOW', state.state.proposalFlow);





  // state.state.proposalFlow = firstFlow;
}





