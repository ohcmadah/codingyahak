const express = require("express");
const app = express();
const fs = require("fs");

const port = 3000;

app.get("/", (req, res) => {
  fs.readFile("./main.html", (error, data) => {
    if (error) throw error;
    res.writeHead(200);
    res.end(data);
  });
});

app.listen(port);
