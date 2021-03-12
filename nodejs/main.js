const http = require("http");
const fs = require("fs");
const url = require("url");

function templateHTML(title, list, body) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        ${list}
        ${body}
      </body>
    </html>
    `;
}

function templateList(files) {
  let list = `<ul>`;
  files.forEach((file) => {
    list += `<li><a href="/?id=${file}">${file}</a></li>`;
  });
  list += `</ul>`;
  return list;
}

const app = http.createServer((request, response) => {
  let _url = request.url;
  const queryData = url.parse(_url, true).query;
  const pathname = url.parse(_url, true).pathname;

  if (pathname === "/") {
    if (queryData.id === undefined) {
      fs.readdir("./data", (err, files) => {
        const title = "Welcome";
        const description = "Hello, Node.js";
        const list = templateList(files);

        const template = templateHTML(
          title,
          list,
          `<h2>${title}</h2>
          <p>${description}</p>`
        );

        response.writeHead(200);
        response.end(template);
      });
    } else {
      fs.readdir("./data", (err, files) => {
        const title = queryData.id;
        const list = templateList(files);

        fs.readFile(`data/${title}`, "utf8", (err, description) => {
          const template = templateHTML(
            title,
            list,
            `<h2>${title}</h2>
            <p>${description}</p>`
          );

          response.writeHead(200);
          response.end(template);
        });
      });
    }
  } else {
    response.writeHead(404);
    response.end("Not found");
  }
});

const port = 3000;
app.listen(port);
