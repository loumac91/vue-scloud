import {
  LOAD_PLAYER,
  RESET_PLAYER,
  SET_PLAYER_PLAYING,
  SET_PLAYER_PAUSED,
  UPDATE_PLAYER_TIMES,
  SET_PLAYER_CURRENT_TIME,
  DECREASE_PLAYER_VOLUME,
  INCREASE_PLAYER_VOLUME
} from "@/store/action.types";
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
import {
  formatReadVolume,
  formatSetVolume,
  formatTime
} from "@/utils/formatting";
import {
  PLAYER_MAX_VOLUME,
  PLAYER_VOLUME_INCREMENT,
  UNINITIALISED,
  PLAYING,
  PAUSED
} from "@/constants";

const state = {
  audio: null, // PROBS DONT NEED THIS - USE CLOSURE ON AUDIO SERVICE INSTEAD
  currentTrack: null,
  playing: false,
  playerState: UNINITIALISED,
  volume: null,
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
  getCurrentTrack(state) {
    return state.currentTrack;
  },
  getIsPlaying(state) {
    return state.playerState == PLAYING;
  },
  getIsPaused(state) {
    return state.playerState == PAUSED;
  },
  getVolume(state) {
    return state.volume;
  },
  getCurrentTime(state) {
    return formatTime(state.currentTime);
  },
  getTrackDuration(state) {
    return formatTime(state.trackDuration);
  },
  getBufferedPercent(state) {
    return `${(state.currentProgress / state.trackDuration) * 100 || 0}%`;
  },
  getPlayedPercent(state) {
    return `${(state.currentTime / state.trackDuration) * 100 || 0}%`;
  }
};

const actions = {
  [LOAD_PLAYER]: async function({ commit, dispatch, state }, track) {
    if (state.audio || state.currentTrack) {
      commit(SET_CURRENT_TRACK, null);
      await dispatch(RESET_PLAYER);
    }

    const audio = initialiseAudio(commit, dispatch, track);
    commit(SET_PLAYER, audio);
    commit(SET_VOLUME);

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
  },
  [DECREASE_PLAYER_VOLUME]: function({ state }) {
    let volume = formatReadVolume(state.audio.volume) - PLAYER_VOLUME_INCREMENT;
    if (volume < 0) return;
    state.audio.volume = formatSetVolume(volume);
  },
  [INCREASE_PLAYER_VOLUME]: function({ state }) {
    let volume = formatReadVolume(state.audio.volume) + PLAYER_VOLUME_INCREMENT;
    if (volume > PLAYER_MAX_VOLUME) return;
    state.audio.volume = formatSetVolume(volume);
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
