import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';
import * as state from './state';

export default new Vuex.Store({
  actions,
  getters: Object.assign({}, getters),
  mutations,
  state
});
