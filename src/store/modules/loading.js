import Vue from "vue";
import { SET_ACTION_LOADING_STATE } from "@/store/action.types";
import { SET_LOADING_STATE } from "@/store/mutation.types";

const state = {
  loadingStates: new Proxy(
    {},
    {
      // Default accessor
      get: function(loadingStates, actionName) {
        return actionName in loadingStates ? loadingStates[actionName] : false;
      }
    }
  )
};

const getters = {
  getLoadingState(state) {
    return actionName => state.loadingStates[actionName];
  }
};

const actions = {
  [SET_ACTION_LOADING_STATE]: function({ commit }, action) {
    commit(SET_LOADING_STATE, action);
  }
};

const mutations = {
  [SET_LOADING_STATE]: function(state, { name, status }) {
    Vue.set(state.loadingStates, name, status);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
