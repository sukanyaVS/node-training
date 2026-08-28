const http = require("http");
const fs = require("fs");
const path = require("path");

const contentTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".png": "image/png",
  ".jpg": "image/jpeg",
};


const server = http.createServer((request, response) => {
  if (request.method !== "GET") {
    response.statusCode = 405;
    response.end("Method Not Allowed");
    return;
  }

    let filePath = request.url;
      if (filePath === "/") {
    filePath = "/index.html";
  }

    const fullPath = path.join(__dirname, "public", filePath);
  const extension = path.extname(fullPath).toLowerCase();
const contentType =
    contentTypes[extension] || "application/octet-stream";

      fs.readFile(fullPath, (error, data) => {
    // File doesn't exist
    if (error) {
      response.statusCode = 404;
      response.setHeader("Content-Type", "text/html");
      response.end("<h1>404 - File Not Found</h1>");
      return;
    }

    // File exists
    response.statusCode = 200;
    response.setHeader("Content-Type", contentType);
    response.end(data);
    console.log("Content-Type", contentType);
    console.log("extension", extension);

  });

});

server.listen(3200, () => {
  console.log("Server is running on port 3200");
});