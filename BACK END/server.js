require("dotenv").config();
const publicrouter = require("./routes/public_routs");
const verifyJWT = require("./middlewear/verifyJWT");
const admin_rout = require("./routes/admin_routs");
const user_rout = require("./routes/user_routs");
const chef_rout = require('./routes/chef_routs')
const corsOptions = require("./config/corsOptions");
const credentials = require("./middlewear/credentions");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");


const app = express();

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connection to MongoDB: ", err);
  });

app.use(credentials);
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
app.use("/admin", admin_rout);
app.use("/user", user_rout);
app.use("/chef",chef_rout)

app.listen(4000, () => {
  console.log("renning on 4000");
});
