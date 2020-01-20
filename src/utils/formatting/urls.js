import {
  CLIENT_ID,
  IMAGE_DEFAULT_SIZE,
  IMAGE_XLARGE_SIZE,
  WAVEFORM_IMAGE_HOST,
  WAVEFORM_JSON_HOST
} from "@/constants";

export function replaceDefaultImageSize(imageUrl) {
  return imageUrl.replace(IMAGE_DEFAULT_SIZE, IMAGE_XLARGE_SIZE);
}

export function formatStreamUrl(streamUrl) {
  return `${streamUrl}?${CLIENT_ID}`;
}

export function formatWaveformUrl(waveformUrl) {
  if (waveformUrl.includes(".json")) return waveformUrl;
  return waveformUrl
    .replace(WAVEFORM_IMAGE_HOST, WAVEFORM_JSON_HOST)
    .replace(".png", ".json");
}
