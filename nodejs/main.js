const http = require("http");
const fs = require("fs");
const url = require("url");
const qs = require("querystring");

function templateHTML(title, list, body, control) {
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
        ${control}
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
          <p>${description}</p>`,
          `<a href="/create">create</a>`
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
            <p>${description}</p>`,
            `<a href="/create">create</a>
            <a href="/update?id=${title}">update</a>
            <form action="delete_process" method="post">
              <input type="hidden" name="id" value="${title}">
              <input type="submit" value="delete">
            </form>`
          );

          response.writeHead(200);
          response.end(template);
        });
      });
    }
  } else if (pathname === "/create") {
    fs.readdir("./data", (err, files) => {
      const title = "WEB - create";
      const list = templateList(files);

      const template = templateHTML(
        title,
        list,
        `
          <form action="/create_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
              <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
        `,
        ``
      );

      response.writeHead(200);
      response.end(template);
    });
  } else if (pathname === "/create_process") {
    let body = "";
    request.on("data", (data) => {
      body += data;
    });
    request.on("end", () => {
      const post = qs.parse(body);
      const title = post.title;
      const description = post.description;
      fs.writeFile(`./data/${title}`, description, "utf8", (err) => {
        response.writeHead(302, {
          location: `/?id=${title}`,
        });
        response.end();
      });
    });
  } else if (pathname === "/update") {
    fs.readdir("./data", (err, files) => {
      const title = queryData.id;
      const list = templateList(files);

      fs.readFile(`data/${title}`, "utf8", (err, description) => {
        const template = templateHTML(
          title,
          list,
          `
            <form action="/update_process" method="post">
            <input type="hidden" name="id" value=${title}>
              <p><input type="text" name="title" placeholder="title" value=${title}></p>
              <p>
                <textarea name="description" placeholder="description">${description}</textarea>
              </p>
              <p>
                <input type="submit">
              </p>
            </form>
          `,
          `<a href="/create">create</a>
          <a href="/update?id=${title}">update</a>`
        );

        response.writeHead(200);
        response.end(template);
      });
    });
  } else if (pathname === "/update_process") {
    let body = "";
    request.on("data", (data) => {
      body += data;
    });
    request.on("end", () => {
      const post = qs.parse(body);
      const id = post.id;
      const title = post.title;
      const description = post.description;
      fs.rename(`./data/${id}`, `./data/${title}`, (err) => {
        fs.writeFile(`./data/${title}`, description, "utf8", (err) => {
          response.writeHead(302, {
            location: `/?id=${title}`,
          });
          response.end();
        });
      });
    });
  } else if (pathname === "/delete_process") {
    let body = "";
    request.on("data", (data) => {
      body += data;
    });
    request.on("end", () => {
      const post = qs.parse(body);
      const id = post.id;
      fs.unlink(`./data/${id}`, (err) => {
        response.writeHead(302, {
          location: `/`,
        });
        response.end();
      });
    });
  } else {
    response.writeHead(404);
    response.end("Not found");
  }
});

const port = 3000;
app.listen(port);
