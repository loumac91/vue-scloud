import { UPDATE_PLAYER_TIMES } from "@/store/action.types";
import {
  SET_PLAYER,
  RESET_PLAYER,
  SET_CURRENT_TRACK,
  SET_CURRENT_TRACK_PLAYING,
  SET_PLAYING,
  SET_VOLUME
} from "@/store/mutation.types";

export function initialiseAudio(commit, dispatch, track) {
  let audio = new Audio(track.streamUrl);
  audio.addEventListener("ended", () => {
    commit(SET_CURRENT_TRACK, null);
    commit(SET_PLAYING, false);
    commit(SET_PLAYER, null);
    commit(RESET_PLAYER);
  });
  audio.addEventListener("pause", () => {
    commit(SET_CURRENT_TRACK_PLAYING, false);
    commit(SET_PLAYING, false);
  });
  audio.addEventListener("playing", () => {
    commit(SET_CURRENT_TRACK, track);
    commit(SET_CURRENT_TRACK_PLAYING, true);
    commit(SET_PLAYING, true);
  });
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
