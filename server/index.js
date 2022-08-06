const express = require("express");
const config = require("config");
const userRouter = require("./routes/user.routes");
const postRouter = require("./routes/post.routes");
const authRouter = require("./routes/auth.routes");
const fileRouter = require("./routes/file.routes");
const corsMiddleware = require("./middleware/cors.middleware");
//fileUpload
const fileUpload = require("express-fileupload");

const app = express();

const PORT = config.get("PORT");

app.use(corsMiddleware);
app.use(express.json());
//fileUpload
app.use(fileUpload({}));

app.use(express.static("static"));

app.use("/api", userRouter);
app.use("/api", postRouter);
app.use("/api", authRouter);
app.use("/api", fileRouter);

const start = () => {
  try {
    app.listen(PORT, () => {
      console.log(`server started on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
