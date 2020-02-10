import {
  LOAD_PLAYER,
  SET_PLAYER_PAUSED,
  UPDATE_PLAYER_TIMES
} from "@/store/action.types";
import { UNINITIALISED, PLAYING, PAUSED, ENDED } from "@/constants";
import {
  SET_PLAYER,
  SET_PLAYER_STATE,
  RESET_PLAYER,
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
  isCurrentTrack(state) {
    return track => !!state.currentTrack && state.currentTrack.id === track.id;
  },
  getCurrentTrackPlaying(state) {
    return !!state.currentTrack && state.currentTrack.isPlaying;
  },
  getPlayerState(state) {
    return state.playerState;
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

    audio.play(); // sets the current track
  },
  [SET_PLAYER_STATE]: function({commit, state}, playerState) {
    {
      switch (playerState) {
        case PLAYING:
          state.audio.pause();
          break;
        case PAUSED:
          state.audio.play();
          break;
      }

      commit(SET_PLAYER_STATE, playerState);
  }
  [SET_PLAYER_PAUSED]: function({ state }) {
    state.audio.pause(); // event driven mutations update player state
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
  [SET_PLAYER_STATE]: function(state, playerState) {
    state.playerState = playerState;
  },
  [RESET_PLAYER]: function() {
    // TODO MOVE THE BUSINESS LOGIC INTO THE ACTION
    state.audio.pause();
    state.audio.removeAttribute("src");
    state.audio.load();
    state.audio = null;
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
