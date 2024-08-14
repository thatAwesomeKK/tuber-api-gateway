import express from "express";
import videoRouter from "./router/video";
import authRouter from "./router/auth";
import userRouter from "./router/user";
import commentRouter from "./router/comment";
import cors from "cors";
import cookieParser from "cookie-parser";
import env from "./helper/env";
import morgan from "morgan";
import { Server } from "socket.io";
import { v4 as uuid } from "uuid";
import { setTimeout } from "timers/promises";

const app = express();
const PORT = process.env.PORT || 5005;

app.use(morgan("dev"));
app.use(
  cors({
    origin: [env.CLIENT_URL],
    credentials: true,
  })
);
app.use(express.json({ limit: "100mb" }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/video", videoRouter);
app.use("/api/comment", commentRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

const expressServer = app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});

const io = new Server(expressServer, {
  cors: {
    origin: [env.CLIENT_URL],
  },
});

io.on("connection", (socket) => {
  socket.on("connect-client", () => {
    console.log("Client connected: " + socket.id);
    const uploadId = uuid();
    socket.join(uploadId);
    socket.emit("connected", { uploadId });
  });

  socket.on("connect-upload-form", (payload) => {
    console.log("Client connected: " + socket.id);
    socket.join(payload.uploadId);
  });

  socket.on("thumbnail-complete", async (payload) => {
    const { uploadId } = payload;
    // if ((await io.in(uploadId).fetchSockets()).length < 2) return;
    await setTimeout(5000);
    console.log("Thumbnail complete: " + uploadId);
    io.to(payload.uploadId).emit("video-thumbnail-complete", {
      thumbnail: payload.thumbnail,
    });
  });
  socket.on("process-complete", async (payload) => {
    const { uploadId } = payload;
    await setTimeout(5000);
    console.log("Process complete: " + uploadId);
    io.to(uploadId).emit("video-process-complete", {
      message: "Video processing complete",
    });
  });

  socket.on("connect-metadata", (payload) => {
    console.log(payload);
    console.log("Metadata Connected: " + socket.id);
    socket.join(payload.uploadId);
  });

  socket.on("disconnect", () => {
    console.log(socket.id + " disconnected!");
  });
});
