import { TRACKS_URL } from "@/constants";
import { dispatchRequestWithTransform } from "@/services/baseService";
import { transformTrack } from "@/utils/transform";

export async function fetchTracks(query) {
  const response = await dispatchRequestWithTransform(
    {
      url: TRACKS_URL,
      params: {
        q: query
      }
    },
    transformTracks
  );

  return response.data;
}

function transformTracks(tracksData) {
  return tracksData.map(track => transformTrack(track));
}
