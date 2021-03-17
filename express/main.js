const express = require("express");
const app = express();
const fs = require("fs");
const template = require("./lib/template.js");
const path = require("path");
const sanitizeHtml = require("sanitize-html");
var qs = require("querystring");

const port = 5000;

app.get("/", (request, response) => {
  fs.readdir("./data", function (error, filelist) {
    const title = "Welcome";
    const description = "Hello, Node.js";
    const list = template.list(filelist);
    const html = template.HTML(
      title,
      list,
      `<h2>${title}</h2>${description}`,
      `<a href="/create">create</a>`
    );
    response.send(html);
  });
});

app.get("/page/:pageId", (req, res) => {
  fs.readdir("./data", function (error, filelist) {
    const filteredId = path.parse(req.params.pageId).base;
    fs.readFile(`data/${filteredId}`, "utf8", function (err, description) {
      const title = req.params.pageId;
      const sanitizedTitle = sanitizeHtml(title);
      const sanitizedDescription = sanitizeHtml(description, {
        allowedTags: ["h1"],
      });
      const list = template.list(filelist);
      const html = template.HTML(
        sanitizedTitle,
        list,
        `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
        ` <a href="/create">create</a>
          <a href="/update/${sanitizedTitle}">update</a>
          <form action="delete_process" method="post">
            <input type="hidden" name="id" value="${sanitizedTitle}">
            <input type="submit" value="delete">
          </form>`
      );
      res.send(html);
    });
  });
});

app.get("/create", (req, res) => {
  fs.readdir("./data", function (error, filelist) {
    const title = "WEB - create";
    const list = template.list(filelist);
    const html = template.HTML(
      title,
      list,
      `
      <form action="/create" method="post">
        <p><input type="text" name="title" placeholder="title"></p>
        <p>
          <textarea name="description" placeholder="description"></textarea>
        </p>
        <p>
          <input type="submit">
        </p>
      </form>
    `,
      ""
    );
    res.send(html);
  });
});

app.post("/create", (req, res) => {
  let body = "";
  req.on("data", function (data) {
    body += data;
  });
  req.on("end", function () {
    const post = qs.parse(body);
    const title = post.title;
    const description = post.description;
    fs.writeFile(`data/${title}`, description, "utf8", function (err) {
      res.send();
    });
  });
});

app.get("/update/:pageId", (req, res) => {
  fs.readdir("./data", function (error, filelist) {
    const filteredId = path.parse(req.params.pageId).base;
    fs.readFile(`data/${filteredId}`, "utf8", function (err, description) {
      const title = req.params.pageId;
      const list = template.list(filelist);
      const html = template.HTML(
        title,
        list,
        `
        <form action="/update" method="post">
          <input type="hidden" name="id" value="${title}">
          <p><input type="text" name="title" placeholder="title" value="${title}"></p>
          <p>
            <textarea name="description" placeholder="description">${description}</textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>
        `,
        `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
      );
      res.send(html);
    });
  });
});

app.post("/update", (req, res) => {
  let body = "";
  req.on("data", function (data) {
    body = body + data;
  });
  req.on("end", function () {
    const post = qs.parse(body);
    const id = post.id;
    const title = post.title;
    const description = post.description;
    fs.rename(`data/${id}`, `data/${title}`, function (error) {
      fs.writeFile(`data/${title}`, description, "utf8", function (err) {
        res.send();
      });
    });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

/*
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');

var app = http.createServer(function(request,response){
    
    } else if(pathname === '/create'){
      
    } else if(pathname === '/create_process'){
     
    } else if(pathname === '/update'){
      
    } else if(pathname === '/update_process'){
      
    } else if(pathname === '/delete_process'){
      var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          var id = post.id;
          var filteredId = path.parse(id).base;
          fs.unlink(`data/${filteredId}`, function(error){
            response.writeHead(302, {Location: `/`});
            response.end();
          })
      });
    } else {
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3000);
*/
