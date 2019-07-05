import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import JwtService from '@/common/jwt.service';
import { API_URL } from '@/common/config';
import qs from 'qs';

const ApiService = {
  init () {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;
  },

  setFormUrlencoded () {
    Vue.axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
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
        throw new Error(`[RWV] ApiService ${error}`);
      })
  },

  getResource(resource, id) {
    return Vue.axios.get(`${resource}/${id}`);
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

  get (id) {
    ApiService.setHeader();
    return ApiService.getResource('applications', id);
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

  update (payload, id) {
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
      let response = [];

      response = responseGeneral.data;

      responseConservationArea.data.forEach(function(element) {
        response.push(element);
      });
      
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
      response.extension = extension.data;
      response.equipment = equipment.data;
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

