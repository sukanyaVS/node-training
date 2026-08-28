const http = require("http");

// const server = http.createServer((request, response) => {
//   console.log("Request received");
//   response.end("Hello from Node.js!");
// });

const server = http.createServer((request, response) => {
  const { method, url } = request;

  console.log(`Method: ${method}`);
  console.log(`URL: ${url}`);

  // GET
  if (method === "GET" && url === "/users") {
    response.end("Getting all users");
  }

  // POST
  else if (method === "POST" && url === "/users") {
    response.end("Creating a new user");
  }

  // PUT
  else if (method === "PUT" && url === "/users") {
    response.end("Updating the entire user");
  }

  // PATCH
  else if (method === "PATCH" && url === "/users") {
    response.end("Partially updating the user");
  }

  // DELETE
  else if (method === "DELETE" && url === "/users") {
    response.end("Deleting the user");
  }

  else {
    response.statusCode = 404;
    response.end("Route not found");
  }
});

server.listen(3200, () => {
  console.log("Server is running on port 3000");
});