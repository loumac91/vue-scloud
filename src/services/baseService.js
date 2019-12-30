import axios from "axios";
import { CLIENT_ID, PARAM_CLIENT_ID } from "@/constants";

export async function dispatchRequest(config) {
  config.params[PARAM_CLIENT_ID] = CLIENT_ID;

  return await axios.request(config);
}
