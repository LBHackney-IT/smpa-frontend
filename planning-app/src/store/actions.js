import { 
  AuthService,
  ApplicationsService, 
  ExtensionProposalService, 
  EquipmentProposalService,
  CreateBothProposals,
  GenericWorkService,
  SubmitWorksLocation,
  DocumentsService,
  PaymentsService,
  AccountService
} from '@/common/api.service';

import JwtService from '@/common/jwt.service';

export function signIn ({commit}, payload) {
  return AuthService
  .post(payload)
  .then( response => {
    commit('signIn', response.data);
    return response;
  })
  .catch(function (error) {
    let errorResponse = {};
    errorResponse.response = error;
    errorResponse.error = true;
    return errorResponse;
  });
}

export function signOut ({commit}) {
  JwtService.destroyToken();
  commit('signOut');
}

export function addAddressToApplication ({commit}, data) {
  return ApplicationsService
  .addSiteAddress(data)
  .then( response => {
    var payload = {};
    payload.application_id = data.application_id;
    payload.data = response.data;
    commit("addSiteAddress", payload);
    return response;
  })
  .catch(function (error) {
    let errorResponse = {};
    errorResponse.response = error;
    errorResponse.error = true;
    return errorResponse;
  });
}

export function addConstraintsToSite ({commit}, data) {
  return ApplicationsService
  .addSiteConstraints(data)
  .then( response => {
    var payload = {};
    payload.application_id = data.application_id;
    payload.data = response.data;
    commit("addSiteConstraints", payload);
    return response;
  })
  .catch(function (error) {
    let errorResponse = {};
    errorResponse.response = error;
    errorResponse.error = true;
    return errorResponse;
  });
}

export function getAllApplications () {
  return ApplicationsService
  .getAll()
  .then( response => {
    return response;
  })
  .catch(error => {
    var errorResponse = {};
    errorResponse.error = error;
    return errorResponse;
  });
}

export function createApplication ({commit}) {
  return ApplicationsService
  .create()
  .then( response => {
    commit('createApplication', response);
    return response;
  })
  .catch(function (error) {
    let errorResponse = {};
    errorResponse.response = error;
    errorResponse.error = true;
    return errorResponse;
  });
}

//chain both create application and add address to application
export function generateApplication ({commit}, siteData) {
  let applicationId;
  return this.dispatch('createApplication')
    .then((response) => {
      applicationId = response.data.id;
      siteData.address.application_id = applicationId;
      return this.dispatch('addAddressToApplication', siteData.address)
    })
    .then(() => {
      siteData.constraints.application_id = applicationId;
      return this.dispatch('addConstraintsToSite', siteData.constraints)
    })
    .catch(({error}) => {
      let errorResponse = {};
      errorResponse.response = error;
      errorResponse.error = true;
      return errorResponse;
    });
}

export function getApplication ({commit}, id) {
  return ApplicationsService
  .get(id)
  .then( response => {
    console.log('------GET APPLICATION', response.data);
    commit('getApplication', response.data);
  })
  .catch(function (error) {
    let errorResponse = {};
    errorResponse.response = error;
    errorResponse.error = true;
    return errorResponse;
  });
}

export function updateApplication ({commit}, data) {
  return ApplicationsService
  .update(data.id, data.data)
  .then( response => {
    console.log('-----application updated', response);
    commit('updateApplication', response.data);
    return response;
  })
  .catch(function (error) {
    let errorResponse = {};
    errorResponse.response = error;
    errorResponse.error = true;
    return errorResponse;
  });
}

export function createFlow ({commit}, data) {
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

export function submitFlow ({commit}, data) {
  return this.dispatch(data.action, data).then(() => {
    console.log('the flow was updated-------', this.state);

    let patch = {};
    patch.id = data.application_id;
    patch.data = {};
    patch.data.proposalFlow = JSON.stringify(this.state.state.proposalFlow);

    return this.dispatch('updateApplication', patch);

  })
  .catch(function (error) {
    let errorResponse = {};
    errorResponse.response = error;
    errorResponse.error = true;
    return errorResponse;
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
    })
    .catch(function (error) {
      let errorResponse = {};
      errorResponse.response = error;
      errorResponse.error = true;
      return errorResponse;
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
    })
    .catch(function (error) {
      let errorResponse = {};
      errorResponse.response = error;
      errorResponse.error = true;
      return errorResponse;
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
    })
    .catch(function (error) {
      let errorResponse = {};
      errorResponse.response = error;
      errorResponse.error = true;
      return errorResponse;
    });
}

export function updateEquipmentProposal ({commit}, data) {
  return EquipmentProposalService
    .update(data.id, data.equipment )
    .then( response => {
      console.log('Update equipment proposal----', response);
      commit('updateProposal', {
        'applicationId': response.data.application_id,
        'data': response.data,
        'type': 'equipment'
      });
    })
    .catch(function (error) {
      let errorResponse = {};
      errorResponse.response = error;
      errorResponse.error = true;
      return errorResponse;
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
    })
    .catch(function (error) {
      let errorResponse = {};
      errorResponse.response = error;
      errorResponse.error = true;
      return errorResponse;
    });
}


export function getDefaultData ({commit}, type) {
  return GenericWorkService
    .get(type)
    .then( response => {
      return response;
    })
    .catch(function (error) {
      let errorResponse = {};
      errorResponse.response = error;
      errorResponse.error = true;
      return errorResponse;
    });
}

export function getDefaultDataFromTwoSources ({commit}, resource) {
  return GenericWorkService
    .getBoth(resource)
    .then( response => {
      return response;
    })
    .catch(function (error) {
      let errorResponse = {};
      errorResponse.response = error;
      errorResponse.error = true;
      return errorResponse;
    });
}

export function submitWorksLocation ({commit}, payload) {  
  return SubmitWorksLocation
    .update(payload)
    .then( response => {
      commit('updateProposal', {
        'applicationId': response.data.application_id,
        'data': response.data,
        'type': payload.type
      });
    })
    .catch(function (error) {
      let errorResponse = {};
      errorResponse.response = error;
      errorResponse.error = true;
      return errorResponse;
    });
}


//generate the content for state.js
export function generateProposalEquipment ({commit}, data) {
  let proposal_equipment = [];

  data.forEach(element => {
    var finalObject = {
      'proposalName': element.name,
      'proposalId': element.id,
      'goTo': ["WorksXLocation"]
    }

    proposal_equipment.push(finalObject);
  });

  commit('updateEquipmentFlow', {
    'proposal_equipment': proposal_equipment
  });
}

export function getDocumentSizes ({commit}) {
  return DocumentsService
    .getDocumentSizes()
    .then( response => {
      commit('addDocumentSizes', response.data);
    })
    .catch(function (error) {
      let errorResponse = {};
      errorResponse.response = error;
      errorResponse.error = true;
      return errorResponse;
    });
}

export function getDocumentTypes ({commit}) {
  return DocumentsService
    .getDocumentTypes()
    .then( response => {
      commit('addDocumentTypes', response.data);
    })
    .catch(function (error) {
      let errorResponse = {};
      errorResponse.response = error;
      errorResponse.error = true;
      return errorResponse;
    });
}

export function uploadDocument ({commit}, payload) {
  return DocumentsService
    .uploadDocument(payload)
    .then( response => {

      var data = {
        id: payload.application_id,
        data: response.data
      };

      commit('updateDocuments', data);
      
      return response;
    })
    .catch(function (error) {
      let errorResponse = {};
      errorResponse.response = error;
      errorResponse.error = true;
      return errorResponse;
    });
}

export function deleteDocument ({commit}, payload) {
  return DocumentsService
    .deleteDocument(payload)
    .then( response => {
      return response;
    })
    .catch(function (error) {
      let errorResponse = {};
      errorResponse.response = error;
      errorResponse.error = true;
      return errorResponse;
    });
}

export function createPayment ({commit}, data) {
  return PaymentsService
    .createPayment(data)
    .then( response => {
      console.log('PAYMENT CREATED---------', response);
      return response;
    })
    .catch(function (error) {
      let errorResponse = {};
      errorResponse.response = error;
      errorResponse.error = true;
      return errorResponse;
    });
}

export function checkPayment ({commit}, data) {
  return PaymentsService
    .checkPayment(data)
    .then( response => {
      console.log('PAYMENT checked---------', response);
      return response;
    })
    .catch(function (error) {
      let errorResponse = {};
      errorResponse.response = error;
      errorResponse.error = true;
      return errorResponse;
    });
}

export function createAccount ({commit}, data) {
  return AccountService
    .createAccount(data)
    .then( response => {
      console.log('account creation---------', response);
      return response;
    })
    .catch(function (error) {
      let errorResponse = {};
      errorResponse.response = error;
      errorResponse.error = true;
      return errorResponse;
    });
}

export function verifyAccount ({commit}, data) {
  return AccountService
    .verifyAccount(data)
    .then( response => {
      commit('accountVerified', response.data);
      return response;
    })
    .catch(function (error) {
      let errorResponse = {};
      errorResponse.response = error;
      errorResponse.error = true;
      return errorResponse;
    });
}

export function resetPasswordRequest ({commit}, data) {
  return AccountService
    .resetPasswordRequest(data)
    .then( response => {
      console.log('reset password request---------', response);
      return response;
    })
    .catch(function (error) {
      let errorResponse = {};
      errorResponse.response = error;
      errorResponse.error = true;
      return errorResponse;
    });
}

export function resetPassword ({commit}, data) {
  return AccountService
    .resetPassword(data)
    .then( response => {
      console.log('reset password request---------', response);
      return response;
    })
    .catch(function (error) {
      let errorResponse = {};
      errorResponse.response = error;
      errorResponse.error = true;
      return errorResponse;
    });
}

export function submitApplication ({commit}, data) {
  return ApplicationsService
  .submitApplication(data.id, data.data)
  .then( response => {
    console.log('-----application submitted', response);
    return response;
  })
  .catch(function (error) {
    let errorResponse = {};
    errorResponse.response = error;
    errorResponse.error = true;
    return errorResponse;
  });
}