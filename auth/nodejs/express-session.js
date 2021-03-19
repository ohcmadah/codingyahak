const express = require("express");
const parseurl = require("parseurl");
const session = require("express-session");

const app = express();

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/foo", function (req, res, next) {
  res.send(`Hello Session!`);
});

app.listen(3001);
