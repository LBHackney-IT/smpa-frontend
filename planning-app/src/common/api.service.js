import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
//import JwtService from '@/common/jwt.service';
import { API_URL } from '@/common/config';

const ApiService = {
  init () {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;
  },

  setHeader () {
    Vue.axios.defaults.headers.common['Content-Type'] = 'application/json; charset=UTF-8';
    //Vue.axios.defaults.headers.common['Authorization'] = `jwt ${JwtService.getToken()}`;
    Vue.axios.defaults.headers.common['Authorization'] = 'jwt ' + process.env.VUE_APP_TEMP_AUTH_TOKEN;

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
  }
}

export default ApiService;

export const AuthService = {
  post (payload) {
    ApiService.setHeader();
    return ApiService.post(`auth`, payload);
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

