import {
  LOAD_PLAYER,
  STOP_AUDIO,
  SET_PLAYER_PLAYING,
  SET_PLAYER_PAUSED,
  UPDATE_PLAYER_TIMES,
  SET_PLAYER_CURRENT_TIME,
  DECREASE_PLAYER_VOLUME,
  INCREASE_PLAYER_VOLUME
} from "@/store/action.types";
import {
  SET_AUDIO,
  SET_PLAYER_STATE,
  SET_VOLUME,
  SET_CURRENT_PROGRESS,
  SET_CURRENT_TIME,
  SET_TRACK_DURATION,
  SET_TITLE
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
  PLAYER_DEFAULT_VOLUME,
  UNINITIALISED,
  PLAYING,
  PAUSED,
  ENDED
} from "@/constants";
import { LOAD_NEXT_TRACK, LOAD_PREVIOUS_TRACK } from "../action.types";

const state = {
  audio: null,
  playing: false,
  playerState: UNINITIALISED,
  volume: PLAYER_DEFAULT_VOLUME, // each audio has it's own volume
  title: null,
  currentProgress: 0,
  currentTime: 0,
  trackDuration: 0,
  defaultTimeStamp: "00:00"
};

const getters = {
  isInitialised(state) {
    return state.playerState != UNINITIALISED;
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
    if (!state.currentTime || Number.isNaN(state.currentTime))
      return state.defaultTimeStamp;
    return formatTime(state.currentTime);
  },
  getTrackDuration(state) {
    if (!state.trackDuration || Number.isNaN(state.trackDuration))
      return state.defaultTimeStamp;
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
  [LOAD_PLAYER]: async function({ state, commit, dispatch }, track) {
    commit(SET_TITLE, track.title);

    if (state.audio) {
      await dispatch(STOP_AUDIO);
    }

    const audio = initialiseAudio(track);
    commit(SET_AUDIO, audio);

    dispatch(SET_PLAYER_PLAYING);
  },
  [STOP_AUDIO]: function({ state }) {
    state.audio.pause();
    state.audio.removeAttribute("src");
    state.audio.load();
  },
  [SET_PLAYER_PLAYING]: function({ state }) {
    let promise = state.audio.play(); // sets the current track
    if (promise && promise.catch) promise.catch(() => {}); // stops DOM exceptions
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
  },
  [LOAD_NEXT_TRACK]: function({ rootGetters, commit, dispatch }) {
    const nextTrack = rootGetters["getNextTrack"];
    if (nextTrack) {
      dispatch(LOAD_PLAYER, nextTrack);
    } else {
      commit(SET_PLAYER_STATE, ENDED);
    }
  },
  [LOAD_PREVIOUS_TRACK]: function({ rootGetters, dispatch }) {
    const previousTrack = rootGetters["getPreviousTrack"];
    if (previousTrack) {
      dispatch(LOAD_PLAYER, previousTrack);
    }
  }
};

const mutations = {
  [SET_AUDIO]: function(state, audio) {
    state.audio = audio;
  },
  [SET_PLAYER_STATE]: function(state, playerState) {
    state.playerState = playerState;
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
  },
  [SET_TITLE]: function(state, title) {
    state.title = title;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
