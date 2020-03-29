import Vue from "vue";
import { SET_ACTION_LOADING_STATE } from "@/store/action.types";
import { SET_ACTION_STATE } from "@/store/mutation.types";

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
  [SET_ACTION_LOADING_STATE]: function({ commit }, { name, loading }) {
    commit(SET_ACTION_STATE, { name, loading });
  }
};

const mutations = {
  [SET_ACTION_STATE]: function(state, { name, loading }) {
    Vue.set(state.loadingStates, name, loading);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
