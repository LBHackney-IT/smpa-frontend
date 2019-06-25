export function getExtensionId (state) {
  return (id) => {
    if (state.state.applications && state.state.applications.length > 0) {
      const position = state.state.applications.findIndex( application => application.data.id === id );
      return state.state.applications[position].data.extension.id;
    }
  }
}

export function getEquipmentId (state) {
  return (id) => {
    if (state.state.applications && state.state.applications.length > 0) {
      const position = state.state.applications.findIndex( application => application.data.id === id );
      return state.state.applications[position].data.equipment.id;
    }
  }
}

