import { TRACKS_URL } from "@/constants";
import { dispatchRequest } from "@/services/baseService";

export async function fetchTracks(query) {
  const response = await dispatchRequest({
    url: TRACKS_URL,
    params: {
      q: query
    }
  });

  console.log("trackServe.fetchTracks", response);

  return response.data;
}
