import { FETCH_TRACKS } from "@/store/action.types";
import { SET_TRACKS, SET_CURRENT_TRACK } from "@/store/mutation.types";
import { fetchTracks } from "@/services";

const state = {
  tracks: [],
  currentTrack: null,
  selectedTracks: []
};

const getters = {
  isCurrentTrack(state) {
    return track => !!state.currentTrack && state.currentTrack.id === track.id;
  },
  getCurrentTrack(state) {
    return state.currentTrack; // bad?
  },
  getNextTrack(state) {
    const currentTrack = state.currentTrack;
    return state.tracks[state.tracks.indexOf(currentTrack) + 1];
  },
  getPreviousTrack(state) {
    const currentTrack = state.currentTrack;
    return state.tracks[state.tracks.indexOf(currentTrack) - 1];
  }
};

const actions = {
  [FETCH_TRACKS]: async function({ commit }, query) {
    const tracks = await fetchTracks(query);
    commit(SET_TRACKS, tracks);
  }
};

const mutations = {
  [SET_TRACKS]: function(state, tracks) {
    state.tracks = tracks;
  },
  [SET_CURRENT_TRACK]: function(state, track) {
    state.currentTrack = track;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
