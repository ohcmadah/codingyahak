const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const compression = require("compression");
const helmet = require("helmet");
const session = require("express-session");
const FileStore = require("session-file-store")(session);

const topicRouter = require("./routes/topic");
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");

const app = express();
const port = 5000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(helmet());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
  })
);

const authData = {
  email: "1234@1234",
  password: "1111",
  nickname: "hadam",
};

const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "pwd",
    },
    function (username, password, done) {
      if (username === authData.email) {
        if (password === authData.password) {
          console.log(1);
          return done(null, authData);
        } else {
          return done(null, false, { message: "Incorrect password." });
        }
      } else {
        return done(null, false, { message: "Incorrect username." });
      }
    }
  )
);

app.post(
  "/auth/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
  })
);

app.get("*", (req, res, next) => {
  fs.readdir("./data", (err, fileList) => {
    req.list = fileList;
    next();
  });
});

app.use("/", indexRouter);
app.use("/topic", topicRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  res.status(404).send("Sorry cant find that!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Somehing broke!");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
