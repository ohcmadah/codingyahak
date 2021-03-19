const http = require("http");

const app = http.createServer((req, res) => {
  //   res.writeHead(200, {
  //     "Set-Cookie": [
  //        "yummy_cookie=choco",
  //        "tasty_cookie=strawberry"
  //     ],
  //   });
  res.end("cookie!");
});

app.listen(3000);
