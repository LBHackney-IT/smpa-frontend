import { ApplicationsService, ExtensionProposalService } from '@/common/api.service'

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

export function createExtensionProposal ({commit}, data) {
  return ExtensionProposalService
    .post(data)
    .then( response => {
    });
}


export function createEquipmentProposal ({commit}, data) {
  return EquipmentProposalService
    .post(data)
    .then( response => {
    });
}

