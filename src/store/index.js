import Vue from 'vue'
import Vuex from 'vuex'
import settings from './modules/settings'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    settings,
  },
  state: {},
  mutations: {},
  actions: {
    load({ commit, dispatch }){
      dispatch('settings/setMenus');
    },
  },
});