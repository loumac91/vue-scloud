import { LOAD_PLAYER, UPDATE_PLAYER_TIMES } from "@/store/action.types";
import {
  SET_PLAYER,
  RESET_PLAYER,
  SET_CURRENT_TRACK,
  SET_CURRENT_TRACK_PLAYING,
  SET_PLAYING,
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
  volume: 5,
  currentProgress: 0,
  currentTime: 0,
  trackDuration: 0
};

const getters = {
  getCurrentTrackPlaying(state) {
    return !!state.currentTrack && state.currentTrack.isPlaying;
  }
};

const actions = {
  [LOAD_PLAYER]: function({ commit, dispatch, state }, track) {
    if (state.playing) {
      commit(SET_CURRENT_TRACK, null);
      commit(RESET_PLAYER);
    }

    const audio = initialiseAudio(commit, dispatch, track);
    commit(SET_PLAYER, audio);

    audio.play();
  },
  [UPDATE_PLAYER_TIMES]: function(
    { commit },
    { buffered, currentTime, duration }
  ) {
    const bufferedTime = buffered.length ? buffered.end(0) : 0;

    commit(SET_CURRENT_PROGRESS, bufferedTime);
    commit(SET_CURRENT_TIME, currentTime);
    commit(SET_TRACK_DURATION, duration);
  }
};

const mutations = {
  [SET_PLAYER]: function(state, audio) {
    state.audio = audio;
  },
  [RESET_PLAYER]: function() {
    state.audio.pause();
    state.audio.removeAttribute("src");
    state.audio.load();
    state.audio = null;
  },
  [SET_CURRENT_TRACK]: function(state, track) {
    state.currentTrack = track;
  },
  [SET_PLAYING]: function(state, playing) {
    state.playing = playing;
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
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
