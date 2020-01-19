import { FETCH_TRACKS } from "@/store/action.types";
import { SET_TRACKS } from "@/store/mutation.types";
import { fetchTracks } from "@/services/trackService";

const state = {
  currentTrack: {},
  tracks: []
};

const getters = {};

const actions = {
  [FETCH_TRACKS]: async function({ commit }, query) {
    const tracks = await fetchTracks(query);
    commit(SET_TRACKS, tracks);
  }
};

const mutations = {
  [SET_TRACKS]: function(state, tracks) {
    state.tracks = tracks;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
