const express = require("express");
const fs = require("fs");
const template = require("./lib/template.js");
const bodyParser = require("body-parser");
const compression = require("compression");
const topicRouter = require("./routes/topic");

const app = express();
const port = 5000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.get("*", (req, res, next) => {
  fs.readdir("./data", (err, fileList) => {
    req.list = fileList;
    next();
  });
});

app.use("/topic", topicRouter);

app.get("/", (req, res) => {
  const title = "Welcome";
  const description = "Hello, Node.js";
  const list = template.list(req.list);
  const html = template.HTML(
    title,
    list,
    `<h2>${title}</h2>${description}
     <img src="images/hello.jpg" style="width: 300px; display: block; margin-top: 10px" alt="hello" />`,
    `<a href="/topic/create">create</a>`
  );
  res.send(html);
});

app.use((req, res, next) => {
  res.status(404).send("Sorry cant find that!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Somehing broke!");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
