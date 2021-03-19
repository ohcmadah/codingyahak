const http = require("http");
const cookie = require("cookie");

const app = http.createServer((req, res) => {
  let cookies = {};
  if (req.headers.cookie !== undefined) {
    cookies = cookie.parse(req.headers.cookie);
  }
  console.log(cookies);
  res.writeHead(200, {
    "Set-Cookie": [
      "yummy_cookie=choco",
      "tasty_cookie=strawberry",
      `Parmanent=cookies; Max-Age=${60 * 60 * 24 * 30}`,
      "Secure=Secure; Secure",
      "HttpOnly=HttpOnly; HttpOnly",
    ],
  });

  res.end("cookie!");
});

app.listen(3000);
