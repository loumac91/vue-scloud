import { UPDATE_PLAYER_TIMES } from "@/store/action.types";
import { PLAYER_DEFAULT_VOLUME, PLAYING, PAUSED, ENDED } from "@/constants";
import {
  SET_PLAYER,
  SET_PLAYER_STATE,
  RESET_PLAYER,
  SET_CURRENT_TRACK,
  SET_CURRENT_TRACK_PLAYING,
  SET_VOLUME
} from "@/store/mutation.types";
import { formatReadVolume, formatSetVolume } from "@/utils/formatting";

export function initialiseAudio(commit, dispatch, track) {
  let audio = new Audio(track.streamUrl);

  audio.addEventListener("ended", () => {
    commit(SET_CURRENT_TRACK_PLAYING, false);
    commit(SET_CURRENT_TRACK, null);
    commit(SET_PLAYER_STATE, ENDED);
    commit(SET_PLAYER, null);
    commit(RESET_PLAYER); // NOT SURE ABOUT THIS - probably a way to set the next track instead ?
  });

  audio.addEventListener("pause", () => {
    commit(SET_CURRENT_TRACK_PLAYING, false);
    commit(SET_PLAYER_STATE, PAUSED);
  });

  audio.addEventListener("playing", () => {
    commit(SET_CURRENT_TRACK, track);
    commit(SET_PLAYER_STATE, PLAYING);
    commit(SET_CURRENT_TRACK_PLAYING, true);
  });

  audio.addEventListener("volumechange", () => {
    commit(SET_VOLUME, formatReadVolume(audio.volume));
  });

  audio.addEventListener("timeupdate", e =>
    dispatch(UPDATE_PLAYER_TIMES, e.target)
  );

  audio.volume = formatSetVolume(PLAYER_DEFAULT_VOLUME);

  return audio;
}
