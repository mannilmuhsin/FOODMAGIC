require("dotenv").config();
const publicrouter = require("./routes/public_routs");
const verifyJWT = require("./middlewear/verifyJWT");
const accessControl = require("./middlewear/accessControl")
const admin_rout = require("./routes/admin_routs");
const user_rout = require("./routes/user_routs");
const privet_router = require("./routes/privet_routs")
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
const allowdOrgins = require("./config/allowdOrgins")

const app = express();
const server = http.createServer(app);
const io = new socketIo.Server(server, {
  maxHttpBufferSize: 1e8 ,
  path: "/socket.io",
  transports: ["websocket", "polling"],
  cors: {
    origins: ["http://localhost:4000", "http://localhost:5173","https://foodmagic.mannilmuhsin.shop","https://foodmagic.vercel.app","wss://foodmagic.mannilmuhsin.shop"], 
    // origins: allowdOrgins, 
    methods: ["GET", "POST"],
    credentials: true,
  },
});
io.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("setup", async function ({ room }) {
    await socket.join(room);
    console.log(`User joined room ${room}`);
    
    socket.on("chat", async function (data) {
      console.log('shkkkkkoooooooooooooooooooooooooooo');
      console.log(data);

      try {
        const community = await community_schema.findByIdAndUpdate(
          data.groupId,
          {
            $push: { messages: data },
          },
          { new: true }
        );

        io.to(room).emit("chat", data);
      } catch (error) {
        console.error("Error updating community schema:", error);
      }
    });

    socket.on("disconnect", async () => {
     await socket.leaveAll();
      console.log("User disconnected");
      
      // Perform cleanup or remove the user from rooms
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

// app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
// app.use(accessControl);
app.use("/admin",accessControl.adminAccess, admin_rout);
app.use("/user",accessControl.userAccess, user_rout);
app.use("/chef",accessControl.chefAccess, chef_rout);
app.use("/privet",privet_router)

// io.on("connection", (socket) => {
//   console.log("new ws connection.. ");
// });

server.listen(4000, () => {
  console.log("renning on 4000");
});
