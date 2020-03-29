import { FETCH_TRACKS, FETCH_NEXT_PAGE_URL } from "@/store/action.types";
import {
  SET_TRACKS,
  ADD_TRACKS,
  SET_CURRENT_TRACK,
  SET_NEXT_PAGE_URL
} from "@/store/mutation.types";
import { fetchTracks, fetchNextPageUrl } from "@/services";

const state = {
  tracks: [],
  currentTrack: null,
  selectedTracks: [],
  nextPageUrl: null
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
  },
  getIsMoreTracks(state) {
    return state.nextPageUrl && state.nextPageUrl.length > 0;
  }
};

const actions = {
  [FETCH_TRACKS]: async function({ commit }, query) {
    const { collection: tracks, next_href: nextPageUrl } = await fetchTracks(
      query
    );

    commit(SET_TRACKS, tracks);
    commit(SET_NEXT_PAGE_URL, nextPageUrl);
  },
  [FETCH_NEXT_PAGE_URL]: async function({ commit, state }) {
    const {
      collection: tracks,
      next_href: nextPageUrl
    } = await fetchNextPageUrl(state.nextPageUrl);

    commit(ADD_TRACKS, tracks);
    commit(SET_NEXT_PAGE_URL, nextPageUrl);
  }
};

const mutations = {
  [SET_TRACKS]: function(state, tracks) {
    state.tracks = tracks;
  },
  [ADD_TRACKS]: function(state, tracks) {
    state.tracks = [...state.tracks, ...tracks];
  },
  [SET_CURRENT_TRACK]: function(state, track) {
    state.currentTrack = track;
  },
  [SET_NEXT_PAGE_URL]: function(state, nextPageUrl) {
    state.nextPageUrl = nextPageUrl;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
