const http = require("http");
const fs = require("fs");

const app = http.createServer((request, response) => {
  const url = request.url;

  if (request.url == "/") {
    url = "/index.html";
  }

  if (request.url == "/favicon.ico") {
    return response.writeHead(404);
    response.end();
    return;
  }

  response.writeHead(200);
  response.end(fs.readFileSync(__dirname + url));
});

const port = 3000;
app.listen(port);
