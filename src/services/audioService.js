import { UPDATE_PLAYER_TIMES, LOAD_NEXT_TRACK } from "@/store/action.types";
import { PLAYING, PAUSED } from "@/constants";
import {
  SET_PLAYER_STATE,
  SET_CURRENT_TRACK,
  SET_VOLUME
} from "@/store/mutation.types";
import { formatReadVolume, formatSetVolume } from "@/utils/formatting";
import store from "@/store";

export function initialiseAudio(track) {
  let audio = new Audio(track.streamUrl);

  audio.addEventListener("ended", () => {
    store.dispatch(LOAD_NEXT_TRACK);
  });

  audio.addEventListener("pause", () => {
    store.commit(SET_PLAYER_STATE, PAUSED);
  });

  audio.addEventListener("playing", () => {
    store.commit(SET_CURRENT_TRACK, track);
    store.commit(SET_PLAYER_STATE, PLAYING);
  });

  audio.addEventListener("volumechange", () => {
    store.commit(SET_VOLUME, formatReadVolume(audio.volume));
  });

  audio.addEventListener("timeupdate", e =>
    store.dispatch(UPDATE_PLAYER_TIMES, e.target)
  );

  audio.volume = formatSetVolume(store.getters["getVolume"]);

  return audio;
}
