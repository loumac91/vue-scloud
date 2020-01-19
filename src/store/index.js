import Vue from "vue";
import Vuex from "vuex";
import baseState from "@/store/baseState";
import * as modules from "@/store/modules";

Vue.use(Vuex);

Object.assign(baseState, modules);

export default new Vuex.Store({
  modules,
  ...baseState
});
