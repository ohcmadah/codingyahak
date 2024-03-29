const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const compression = require("compression");
const helmet = require("helmet");
const topicRouter = require("./routes/topic");
const indexRouter = require("./routes/index");

const app = express();
const port = 5000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(helmet());
app.get("*", (req, res, next) => {
  fs.readdir("./data", (err, fileList) => {
    req.list = fileList;
    next();
  });
});

app.use("/topic", topicRouter);
app.use("/", indexRouter);

app.use((req, res, next) => {
  res.status(404).send("Sorry cant find that!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Somehing broke!");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
