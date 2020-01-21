import Vue from "vue";
import Vuex from "vuex";
import baseState from "@/store/baseState";
import * as modules from "@/store/modules";
import { initialiseStore } from "@/store/initialise";

Vue.use(Vuex);

Object.assign(baseState, modules);

const store = new Vuex.Store({
  modules,
  ...baseState
});

export default store;

initialiseStore(store);
