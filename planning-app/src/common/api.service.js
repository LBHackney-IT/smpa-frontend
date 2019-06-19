import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import JwtService from '@/common/jwt.service';
import { API_URL } from '@/common/config';

const ApiService = {
  init () {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;
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
  }
}

export default ApiService;