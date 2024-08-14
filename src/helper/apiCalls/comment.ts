import axios from "axios";
import env from "../env";

const metadataUrl = env.METADATA_SERVER_URL + "/api/comment";

export async function createComment(payload: {
  videoId: string;
  comment: string;
  userId: string;
  expiresAt?: string;
}) {
  return await axios.post(`${metadataUrl}/create`, payload);
}

export async function fetchVideoComments(id: string) {
  return await axios.get(`${metadataUrl}/fetch-by-video/${id}`);
}

export async function deleteComment(videoId: string, userId: string) {
  return await axios.delete(`${metadataUrl}/delete/${videoId}`, {
    data: { userId },
  });
}

export async function editComment(payload: {
  videoId: string;
  comment: string;
  userId: string;
}) {
  return await axios.put(`${metadataUrl}/edit`, payload);
}
