import {
  LOAD_PLAYER,
  RESET_PLAYER,
  SET_PLAYER_PLAYING,
  SET_PLAYER_PAUSED,
  UPDATE_PLAYER_TIMES,
  SET_PLAYER_CURRENT_TIME
} from "@/store/action.types";
import { UNINITIALISED } from "@/constants";
import {
  SET_PLAYER,
  SET_PLAYER_STATE,
  SET_CURRENT_TRACK,
  SET_CURRENT_TRACK_PLAYING,
  SET_VOLUME,
  SET_CURRENT_PROGRESS,
  SET_CURRENT_TIME,
  SET_TRACK_DURATION
} from "@/store/mutation.types";
import { initialiseAudio } from "@/services";

const state = {
  audio: null,
  currentTrack: null,
  playing: false,
  playerState: UNINITIALISED,
  volume: 5,
  currentProgress: 0,
  currentTime: 0,
  trackDuration: 0
};

const getters = {
  isInitialised(state) {
    return state.playerState != UNINITIALISED;
  },
  isCurrentTrack(state) {
    return track => !!state.currentTrack && state.currentTrack.id === track.id;
  },
  getPlayerState(state) {
    return state.playerState;
  },
  getBufferedPercent(state) {
    return `${(state.currentProgress / state.trackDuration) * 100 || 0}%`;
  },
  getPlayedPercent(state) {
    return `${(state.currentTime / state.trackDuration) * 100 || 0}%`;
  }
};

const actions = {
  [LOAD_PLAYER]: function({ commit, dispatch, state }, track) {
    if (state.playing || state.currentTrack) {
      commit(SET_CURRENT_TRACK, null);
      dispatch(RESET_PLAYER);
    }

    const audio = initialiseAudio(commit, dispatch, track);
    commit(SET_PLAYER, audio);

    dispatch(SET_PLAYER_PLAYING);
  },
  [RESET_PLAYER]: function({ commit, state }) {
    state.audio.pause();
    state.audio.removeAttribute("src");
    state.audio.load();

    commit(SET_PLAYER, null);
  },
  [SET_PLAYER_PLAYING]: function({ state }) {
    state.audio.play(); // sets the current track
  },
  [SET_PLAYER_PAUSED]: function({ state }) {
    state.audio.pause();
  },
  [UPDATE_PLAYER_TIMES]: function(
    { commit },
    { buffered, currentTime, duration }
  ) {
    const bufferedTime = buffered.length ? buffered.end(0) : 0;

    commit(SET_CURRENT_PROGRESS, bufferedTime);
    commit(SET_CURRENT_TIME, currentTime);
    commit(SET_TRACK_DURATION, duration);
  },
  [SET_PLAYER_CURRENT_TIME]: function({ state }, time) {
    state.audio.currentTime = time;
  }
};

const mutations = {
  [SET_PLAYER]: function(state, audio) {
    state.audio = audio;
  },
  [SET_PLAYER_STATE]: function(state, playerState) {
    state.playerState = playerState;
  },
  [SET_CURRENT_TRACK]: function(state, track) {
    state.currentTrack = track;
  },
  [SET_CURRENT_TRACK_PLAYING]: function(state, isPlaying) {
    state.currentTrack.isPlaying = isPlaying;
  },
  [SET_VOLUME]: function(state, volume) {
    state.volume = volume;
  },
  [SET_CURRENT_PROGRESS]: function(state, currentProgress) {
    state.currentProgress = currentProgress;
  },
  [SET_CURRENT_TIME]: function(state, currentTime) {
    state.currentTime = currentTime;
  },
  [SET_TRACK_DURATION]: function(state, duration) {
    state.trackDuration = duration;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
