require("dotenv").config();
var sslRedirect = require("heroku-ssl-redirect");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("connect-flash");

const passport = require("passport");

require("./configs/passport");

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/gerrit-project3", {
    useNewUrlParser: true
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// enable ssl redirect
app.use(sslRedirect());
// Express View engine setup

app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "/client/build")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

// session settings
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    })
  })
);

// passport and session initializations
// allowing our app to use these libraries
app.use(passport.initialize());
app.use(passport.session());

// default value for title local
app.locals.title = "Gerrit - Project3 ";

mongoose.set("useFindAndModify", false);

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

const chatRoutes = require("./routes/chat");
app.use("/chat", chatRoutes);

const profileRoutes = require("./routes/profile");
app.use("/profile", profileRoutes);

const uploadRoutes = require("./routes/upload");
app.use("/upload", uploadRoutes);

const locateRoutes = require("./routes/locate");
app.use("/locate", locateRoutes);

app.use((req, res) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + "/client/build/index.html");
});

module.exports = app;
