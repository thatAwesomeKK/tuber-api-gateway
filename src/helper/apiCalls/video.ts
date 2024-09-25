import axios from "axios";
import env from "../env";

const uploadUrl = env.UPLOAD_SERVER_URL + "/api/video";
const metadataUrl = env.METADATA_SERVER_URL + "/api/video";

export const uploadVideo = async (filename: string, fileStream: any) => {
  const payload = await axios({
    method: "post",
    url: `${uploadUrl}/upload`,
    headers: {
      "Content-Type": "application/octet-stream",
      filename,
    },
    data: fileStream,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  });
  return payload.data;
};

export const uploadComplete = async (
  originalname: string,
  user: any,
  uploadId: string
) => {
  //Send a request to the metadata server to create a new video entry
  const payload1 = new Promise(async (resolve, reject) => {
    await axios
      .post(
        `${metadataUrl}/upload`,
        {
          originalname,
          user,
          uploadId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data));
  });

  //Send a request to the upload server to start processing the video
  const payload2 = new Promise(async (resolve, reject) => {
    await axios
      .post(`${uploadUrl}/start-processing`, {
        originalname,
        expiresAt: user.expiresAt,
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data));
  });

  const data = await Promise.all([payload1, payload2]);

  return data[0];
};

export const fetchAllVideos = async () => {
  return await axios.get(`${metadataUrl}/fetch`);
};

export const searchVideos = async (s: string) => {
  return await axios.get(`${metadataUrl}/search?s=${s}`);
};

export const fetchVideoMetadata = async (id: string) => {
  return await axios.get(`${metadataUrl}/fetch-metadata/${id}`);
};

export const fetchVideoByTags = async (id: string) => {
  return await axios.get(`${metadataUrl}/fetch-by-tag/${id}`);
};

export const streamMetadata = async (fileid: string) => {
  const payload = await axios.get(
    `${metadataUrl}/stream-metadata?fileid=` + fileid
  );
  return payload.data;
};

export const updateMetadata = async (id: string, body: any) => {
  return await axios.put(`${metadataUrl}/update-metadata/${id}`, body);
};

export const handleViewCount = async (id: string) => {
  return await axios.put(`${metadataUrl}/handle-view-count/${id}`);
};

export const deleteVideoFromUploadServer = async (id: string) => {
  return await axios
    .delete(`${uploadUrl}/delete/${id}`)
    .then((res) => res.data);
};

export const deleteVideoFromMetadataServer = async (id: string) => {
  return await axios.delete(`${metadataUrl}/delete/${id}`);
};

export const handleLike = async (videoId: string, userId: string) => {
  return await axios.put(`${metadataUrl}/handle-like`, {
    videoId,
    userId,
  });
};

export const handleDislike = async (videoId: string, userId: string) => {
  return await axios.put(`${metadataUrl}/handle-dislike`, {
    videoId,
    userId,
  });
};
