import { TRACKS_URL } from "@/constants";
import { dispatchRequest } from "@/services/baseService";

export async function fetchTracks(query) {
  return await dispatchRequest({
    url: TRACKS_URL,
    params: {
      q: query
    }
  });
}
