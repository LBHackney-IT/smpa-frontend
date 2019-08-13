import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import JwtService from '@/common/jwt.service';
import { API_URL } from '@/common/config';
import router from '../router';
import store from '../store';
import qs from 'qs';

const ApiService = {
  init () {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;

    axios.interceptors.response.use(function (response) {
      return response;
    }, function (error) {

      // todo find a more elegant way of doing this
      if (error.response.data.message === 'Email is already registered') {
        return Promise.reject(error);
      }
      if (error.response.status === 401) {
        store.dispatch('HandleUnauthorizedAccess');
        router.push({ name: 'SignIn'});
      }
      return Promise.reject(error);
    });
  },

  setFormData () {
    Vue.axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
  },

  setFormUrlencoded () {
    Vue.axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
  },

  setAuthorization () {
    Vue.axios.defaults.headers.common['Authorization'] = `jwt ${JwtService.getToken()}`;
  },

  setHeader () {
    Vue.axios.defaults.headers.common['Content-Type'] = 'application/json; charset=UTF-8';
    Vue.axios.defaults.headers.common['Authorization'] = `jwt ${JwtService.getToken()}`;
  },

  get(resource) {
    return Vue.axios
      .get(`${resource}`)
      .catch((error) => {
        throw new Error(`ApiService ${error}`);
      })
  },

  post(resource, params) {
    return Vue.axios.post(`${resource}`, params);
  },

  update(resource, id, params) {
    return Vue.axios.patch(`${resource}/${id}`, params);
  },

  put(resource, params) {
    return Vue.axios
      .put(`${resource}`, params);
  },

  delete(resource) {
    return Vue.axios
      .delete(resource)
      .catch((error) => {
        throw new Error(`ApiService ${error}`);
      })
  },

  getResource(resource, id) {
    return Vue.axios.get(`${resource}/${id}`);
  },

  postWithConfig(resource, params, config) {
    return Vue.axios.post(`${resource}`, params, config);
  },

  updateWithCustomResource(resource, params) {
    return Vue.axios.patch(`${resource}`, params);
  }
}

export default ApiService;

export const AuthService = {
  post (payload) {
    ApiService.setFormUrlencoded();
    return ApiService.post('auth', qs.stringify(payload));
  }
}

export const ApplicationsService = {
  create () {
    ApiService.setHeader();
    return ApiService.post('applications', {});
  },

  update (id, payload) {
    ApiService.setHeader();
    return ApiService.update('applications', id, payload);
  },

  addSiteAddress (payload) {
    ApiService.setHeader();
    return ApiService.post('site-addresses', payload);
  },

  updateSiteAddress (id, payload) {
    ApiService.setHeader();
    return ApiService.update('site-addresses', id, payload);
  },

  addSiteConstraints (payload) {
    ApiService.setHeader();
    return ApiService.post('site-constraints', payload);
  },

  get (id) {
    ApiService.setHeader();
    return ApiService.getResource('applications', id);
  },

  getAll () {
    ApiService.setHeader();
    return ApiService.get('applications');
  },

  submitApplication (id, payload) {
    ApiService.setHeader();
    var resource = 'applications/' + id + '/submit'
    return ApiService.updateWithCustomResource(resource, payload);
  }
}

export const ExtensionProposalService = {
  post (payload) {
    ApiService.setHeader();
    return ApiService.post('extension-proposals', payload);
  },

  update (payload, id) {
    ApiService.setHeader();
    return ApiService.update('extension-proposals', id, payload);
  }
}

export const EquipmentProposalService = {
  post (payload) {
    ApiService.setHeader();
    return ApiService.post('equipment-proposals', payload);
  },

  update (id, payload) {
    ApiService.setHeader();
    return ApiService.update('equipment-proposals', id, payload);
  }
}

export const GenericWorkService = {
  get (resource) {
    ApiService.setHeader();
    return ApiService.get(`${resource}`);
  },

  getBoth (resources) {
    ApiService.setHeader();

    return Vue.axios.all([
      ApiService.get(`${resources.general}`), 
      ApiService.get(`${resources.conservationArea}`)
    ])
    .then(axios.spread(function (responseGeneral, responseConservationArea) {
      let response = {};

      response.general = responseGeneral.data;
      response.conservationArea = responseConservationArea.data;

      return response;
    }));
  }
}

export const CreateBothProposals = {
  create (id) {
    return Vue.axios.all([
      ExtensionProposalService.post(id), 
      EquipmentProposalService.post(id)
    ])
    .then(axios.spread(function (extension, equipment) {
      let response = {};
      response.proposal_extension = extension.data;
      response.proposal_equipment = equipment.data;
      return response;
    }));
  }
}

export const SubmitWorksLocation = {
  update (payload) {
    ApiService.setHeader();
    return ApiService.update(payload.resource, payload.id, payload.data);
  }
}

export const DocumentsService = {
  getDocumentSizes () {
    ApiService.setHeader();
    return ApiService.get('document-sizes');
  },

  getDocumentTypes () {
    ApiService.setHeader();
    return ApiService.get('document-types');
  },

  uploadDocument (data) {
    let form = new FormData();
    form.append('document', new Blob([data.document], {'type': data.document.type}), data.document.name);
    form.append('document_size_id', data.document_size_id);
    form.append('application_id', data.application_id);
    form.append('proposed', data.proposed);
    form.append('existing', data.existing);
    
    ApiService.setAuthorization();

    //multipart/form-data forms need to have content-type undefined and let the browser calculate boundaries automatically

    const config = {
      headers: {
          'content-type': undefined
      }
    };

    return ApiService.postWithConfig('documents', form, config);
  },

  deleteDocument (data) {
    ApiService.setAuthorization();

    const config = {
      headers: {
          'content-type': undefined
      }
    };

    var resource = 'documents/' + data.id;
    return ApiService.delete(resource);
  }
}

export const PaymentsService = {
  createPayment (applicationId) {
    ApiService.setHeader();
    const resourceUrl = 'applications/' + applicationId + '/payments';
    return ApiService.post(resourceUrl);
  },

  checkPayment (paymentId) {
    ApiService.setHeader();
    const resourceUrl = 'payments/' + paymentId + '/check';
    return ApiService.get(resourceUrl);
  }
}

export const AccountService = {
  createAccount (payload) {
    ApiService.setFormUrlencoded();
    return ApiService.post('users/create', qs.stringify(payload));
  },

  verifyAccount (token) {
    ApiService.setHeader();
    const resourceUrl = 'users/verify/' + token;
    return ApiService.get(resourceUrl);
  },

  resetPasswordRequest (payload) {
    ApiService.setHeader();
    return ApiService.post('users/reset-password', payload);
  },

  resetPassword(payload) {
    ApiService.setFormUrlencoded();
    return ApiService.post('users/reset-password', payload);
  }
}