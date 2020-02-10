import {
  replaceDefaultImageSize,
  formatStreamUrl,
  formatWaveformUrl
} from "@/utils/formatting";

export function transformTrack(trackData) {
  return {
    artworkUrl: replaceDefaultImageSize(
      trackData.artwork_url || trackData.user.avatar_url
    ),
    duration: trackData.duration,
    id: trackData.id,
    isPlaying: false,
    liked: !!trackData.user_favorite, // forces boolean
    likesCount: trackData.favoritings_count || trackData.likes_count || 0,
    permalinkUrl: trackData.permalink_url,
    playbackCount: trackData.playback_count || 0,
    streamable: trackData.streamable,
    streamUrl: trackData.streamable
      ? formatStreamUrl(trackData.stream_url)
      : null,
    title: trackData.title,
    userId: trackData.user.id,
    username: trackData.user.username,
    userPermalinkUrl: trackData.user.permalink_url,
    waveformUrl: formatWaveformUrl(trackData.waveform_url)
  };
}
