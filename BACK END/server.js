require("dotenv").config();
const publicrouter = require("./routes/public_routs");
const verifyJWT = require("./middlewear/verifyJWT");
const accessControl = require("./middlewear/accessControl");
const admin_rout = require("./routes/admin_routs");
const user_rout = require("./routes/user_routs");
const privet_router = require("./routes/privet_routs");
const chef_rout = require("./routes/chef_routs");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middlewear/credentions");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const socketIo = require("socket.io");
const http = require("http");
const community_schema = require("./schemas/community_schema");
const allowdOrgins = require("./config/allowdOrgins");

const app = express();
const server = http.createServer(app);
const io = new socketIo.Server(server, {
  maxHttpBufferSize: 1e8,
  path: "/socket.io",
  transports: ["websocket", "polling"],
  cors: {
    origin: allowdOrgins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});
io.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

io.on("connection", (socket) => {
  socket.on("setup", async function ({ room }) {
    console.log(`User attempting to join room: ${room}`);
    try {
      await socket.join(room);
    } catch (error) {
      console.error("Error joining room:", error);
    }
    socket.on("chat", async function (data) {
      io.to(room).emit("chat", data);
      try {
        const community = await community_schema.findByIdAndUpdate(
          data.groupId,
          {
            $push: { messages: data },
          },
          { new: true }
        );
      } catch (error) {
        console.error("Error updating community schema:", error);
      }
    });
  });
});

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connection to MongoDB: ", err);
  });

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

app.use(cookieParser());
app.use(express.static("public"));
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: 100 * 1024 * 1024 },
  })
);

app.use("/", publicrouter);
app.use("/refresh", require("./routes/refreshRouter"));

app.use(verifyJWT);
app.use("/admin", accessControl.adminAccess, admin_rout);
app.use("/user", accessControl.userAccess, user_rout);
app.use("/chef", accessControl.chefAccess, chef_rout);
app.use("/privet", privet_router);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

server.listen(4000, () => {
  console.log("renning on 4000");
});
