import axios from "axios";
import { CLIENT_ID, PARAM_CLIENT_ID } from "@/constants";
import { baseTransform } from "@/utils/transform";

export async function dispatchRequestWithTransform(config, transformer) {
  config.transformResponse = data => {
    const baseTransformed = baseTransform(data);
    return transformer(baseTransformed);
  };

  return await dispatchRequest(config);
}

export async function dispatchRequest(config) {
  config.params[PARAM_CLIENT_ID] = CLIENT_ID;

  return await axios.request(config);
}
