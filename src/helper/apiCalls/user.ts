import axios from "axios";
import { env } from "process";

const baseUrl = env.METADATA_SERVER_URL + "/api/user";

export const getVideosByUid = async (userId: string) => {
  const payload = await axios.post(`${baseUrl}/videos`, {
    userId,
  });
  return payload;
};
