import { DISPLAY_PLAYER } from "@/store/action.types";
import { SET_SHOW_PLAYER } from "@/store/mutation.types";

export default {
  state: {
    showPlayer: false
  },
  actions: {
    [DISPLAY_PLAYER]: function({ commit }, showPlayer) {
      commit(SET_SHOW_PLAYER, showPlayer);
    }
  },
  mutations: {
    [SET_SHOW_PLAYER]: function(state, showPlayer) {
      state.showPlayer = showPlayer;
    }
  }
};
