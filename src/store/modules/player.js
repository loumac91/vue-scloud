import { LOAD_PLAYER, UPDATE_PLAYER_TIMES } from "@/store/action.types";
import {
  SET_PLAYER,
  RESET_PLAYER,
  SET_PLAYING,
  SET_VOLUME,
  SET_CURRENT_PROGRESS,
  SET_CURRENT_TIME,
  SET_TRACK_DURATION
} from "@/store/mutation.types";

const state = {
  audio: null,
  playing: false,
  volume: 5,
  currentProgress: 0,
  currentTime: 0,
  trackDuration: 0
};

const getters = {};

const actions = {
  [LOAD_PLAYER]: function({ commit, dispatch, state }, url) {
    if (state.playing) {
      commit(RESET_PLAYER);
    }

    const audio = initialiseAudio(commit, dispatch, url);
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
  [SET_PLAYING]: function(state, playing) {
    state.playing = playing;
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

function initialiseAudio(commit, dispatch, url) {
  let audio = new Audio(url);
  audio.addEventListener("ended", () => {
    commit(SET_PLAYING, false);
    commit(SET_PLAYER, null);
  });
  audio.addEventListener("pause", () => commit(SET_PLAYING, false));
  audio.addEventListener("playing", () => commit(SET_PLAYING, true));
  audio.addEventListener("volumechange", () =>
    commit(SET_VOLUME, getVolume(audio))
  );
  audio.addEventListener("timeupdate", e =>
    dispatch(UPDATE_PLAYER_TIMES, e.target)
  );

  return audio;
}

function getVolume(audio) {
  return Math.floor(audio.volume * 100);
}

export default {
  state,
  getters,
  actions,
  mutations
};
