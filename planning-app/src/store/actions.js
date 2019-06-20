import { 
  ApplicationsService, 
  ExtensionProposalService, 
  EquipmentProposalService,
  CreateBothProposals 
} from '@/common/api.service';

export function createApplication ({commit}, applicationData) {
  return ApplicationsService
  .create()
  .then( response => {
    applicationData.data = response.data;
    commit('createApplication', applicationData);
    return applicationData;
  });
}

export function updateApplication ({commit}, data) {
  return ApplicationsService
  .update(data.id, data.data)
  .then( response => {
    commit('updateApplication', response.data);
  });
}

export function createFirstFlow ({commit}, data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      commit('createFirstFlow', data);
      resolve();
    }, 1000);
  });
}

export function updateFlow ({commit}, data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      commit('updateFlow', data);
      resolve();
    }, 1000);
  });
}

export function createExtensionProposal ({commit}, application) {
  return ExtensionProposalService
    .post(application)
    .then( response => {
      commit('addProposal', {
        'applicationId': application.application_id,
        'data': response.data,
        'type': 'extension'
      });
    });
}

export function updateExtensionProposal ({commit}, data) {
  return ExtensionProposalService
    .update(data.selectedProposals, data.extension_id )
    .then( response => {
      commit('updateProposal', {
        'applicationId': data.application_id,
        'data': response.data,
        'type': 'extension'
      });
    });
}

export function createEquipmentProposal ({commit}, application) {
  return EquipmentProposalService
    .post(application)
    .then( response => {
      commit('addProposal', {
        'applicationId': application.application_id,
        'data': response.data,
        'type': 'equipment'
      });
    });
}

export function updateEquipmentProposal ({commit}, data) {
  return ExtensionProposalService
    .update(data.selectedProposals, data.extension_id )
    .then( response => {
      commit('updateProposal', {
        'applicationId': data.application_id,
        'data': response.data,
        'type': 'equipment'
      });
    });
}

export function createBothProposals ({commit}, application) {
  return CreateBothProposals
    .create(application)
    .then ( response => {
      commit('addProposal', {
        'applicationId': application.application_id,
        'data': response
      });
    });
}


