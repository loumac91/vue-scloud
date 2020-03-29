import axios from "axios";
import { baseTransform } from "@/utils/transform";

export async function dispatchRequestWithTransform(config, transformer) {
  config.transformResponse = data => {
    const baseTransformed = baseTransform(data);
    return transformer(baseTransformed);
  };

  return await dispatchRequest(config);
}

export async function dispatchRequest(config) {
  return await axios.request(config);
}
