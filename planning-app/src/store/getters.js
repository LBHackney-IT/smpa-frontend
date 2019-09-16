export function getExtensionId (state) {
  return (id) => {
    if (state.state.applications && state.state.applications.length > 0) {
      const position = state.state.applications.findIndex( application => application.data.id === id );
      return state.state.applications[position].data.proposal_extension.id;
    }
  }
}

export function getEquipmentId (state) {
  return (id) => {
    if (state.state.applications && state.state.applications.length > 0) {
      const position = state.state.applications.findIndex( application => application.data.id === id );
      return state.state.applications[position].data.proposal_equipment.id;
    }
  }
}

export function getExistingApplication (state, applicationId) {
  let index = state.state.applications.findIndex( application => application.data.id === applicationId );

  return state.state.applications[index];
}

export function isLoggedIn (state) {
  return state.state.isAuthenticated;
}
