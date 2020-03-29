import {
  CLIENT_ID,
  PARAM_CLIENT_ID,
  TRACKS_URL,
  TRACK_FETCH_LIMIT
} from "@/constants";
import { dispatchRequestWithTransform } from "@/services/baseService";
import { transformTrack } from "@/utils/transform";

export async function fetchTracks(query) {
  const response = await dispatchRequestWithTransform(
    {
      url: TRACKS_URL,
      params: {
        q: query,
        limit: TRACK_FETCH_LIMIT,
        linked_partitioning: 1,
        [PARAM_CLIENT_ID]: CLIENT_ID
      }
    },
    transformTracks
  );

  return response.data;
}

export async function fetchNextPageUrl(nextPageUrl) {
  const response = await dispatchRequestWithTransform(
    {
      url: nextPageUrl
    },
    transformTracks
  );

  return response.data;
}

function transformTracks(response) {
  response.collection = response.collection.map(track => transformTrack(track));
  return response;
}
