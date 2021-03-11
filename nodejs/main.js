const http = require("http");
const fs = require("fs");
const url = require("url");

const app = http.createServer((request, response) => {
  let _url = request.url;
  const queryData = url.parse(_url, true).query;
  const title = queryData.id;

  if (_url == "/") {
    _url = "/index.html";
  }

  if (_url == "/favicon.ico") {
    return response.writeHead(404);
  }

  response.writeHead(200);
  fs.readFile(`data/${title}`, "utf8", (err, description) => {
    const template = `
      <!doctype html>
      <html>
        <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
          <ol>
            <li><a href="/?id=HTML">HTML</a></li>
            <li><a href="/?id=CSS">CSS</a></li>
            <li><a href="/?id=JavaScript">JavaScript</a></li>
          </ol>
          <h2>${title}</h2>
          <p>${description}</p>
        </body>
      </html>
      `;
    response.end(template);
  });
});

const port = 3000;
app.listen(port);
