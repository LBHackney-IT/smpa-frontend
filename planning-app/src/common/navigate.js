export default {
  calculateNavigation (proposalFlow, currentWorks, currentLevel) {

    console.log('proposalFlow', proposalFlow);
    console.log('currentWorks', currentWorks);
    console.log('currentLevel', currentLevel);

    debugger;

    //find currentLevel in the current proposal
    var currentLevelIndex = currentWorks.goTo.findIndex(function(element) {
      return element === currentLevel;
    });

    // if (currentWorks.goTo.length > 1 && currentWorks.goTo.length < currentLevelIndex + 1) {
      
    if (currentWorks.goTo.length > 1 && currentWorks.goTo.length > currentLevelIndex + 1) {
      
      return { name: currentWorks.goTo[currentLevelIndex + 1], params: {currentLevelInfo: currentWorks }};

    } else {
      //check if it is the last item inside current flow.

      var currentWorkIndexInFlow = proposalFlow.findIndex(element => 
        element.proposalId ===currentWorks.proposalId
      );

      if (proposalFlow.length === currentWorkIndexInFlow) {
        //go to trees
        console.log('----------GO TO TREES');
      } else {
        return { name: proposalFlow[currentWorkIndexInFlow + 1].goTo[0], params: {currentLevelInfo: proposalFlow[currentWorkIndexInFlow + 1], id: proposalFlow[currentWorkIndexInFlow + 1].proposalId }};
      }
    }
  }
}
