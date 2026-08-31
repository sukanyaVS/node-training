const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 3200;
const messages = [];

function sendHtml(response) {
  const filePath = path.join(__dirname, "public", "index.html");

  fs.readFile(filePath, "utf8", (error, html) => {
    if (error) {
      response.writeHead(500, { "Content-Type": "text/plain" });
      response.end("Server error: unable to read page");
      return;
    }

    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(html);
  });
}

const server = http.createServer((request, response) => {
  const { method, url } = request;

  if (method === "GET" && url === "/") {
    sendHtml(response);
    return;
  }

  if (method === "GET" && url === "/messages") {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(messages));
    return;
  }

  if (method === "POST" && url === "/chat") {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk.toString();
    });

    request.on("end", () => {
      try {
        const { name, text } = JSON.parse(body);

        if (!name || !text) {
          response.writeHead(400, { "Content-Type": "application/json" });
          response.end(JSON.stringify({ error: "Name and message are required" }));
          return;
        }

        messages.push({ name, text });

        response.writeHead(201, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ success: true, message: { name, text } }));
      } catch (error) {
        response.writeHead(400, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ error: "Invalid JSON payload" }));
      }
    });
    return;
  }

  response.writeHead(404, { "Content-Type": "text/plain" });
  response.end("Route not found");
});

server.listen(port, () => {
  console.log(`Chat app running at http://localhost:${port}`);
});
