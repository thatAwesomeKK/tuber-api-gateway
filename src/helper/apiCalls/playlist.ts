import axios from "axios";
import env from "../env";

const metadataUrl = env.METADATA_SERVER_URL + "/api/playlist";
export async function createPlaylist(payload: {
  name: string;
  userId: string;
  videoId: string;
}) {
  return await axios.post(`${metadataUrl}/create`, payload);
}

export async function fetchPlaylistById(id: string) {
  return await axios.get(`${metadataUrl}/fetch-by-id/${id}`);
}

export async function updatePlaylist(payload: { name: string }, id: string) {
  return await axios.patch(`${metadataUrl}/update/${id}`, payload);
}

export async function deletePlaylist(id: string) {
  return await axios.delete(`${metadataUrl}/delete/${id}`);
}

export async function handlePlaylistVids(
  id: string,
  payload: { videoId: string }
) {
  return await axios.patch(`${metadataUrl}/handle-vids/${id}`, payload);
}

export async function fetchPlaylistByUserId(userId: string) {
  return await axios.get(`${metadataUrl}/fetch-by-user/${userId}`);
}
