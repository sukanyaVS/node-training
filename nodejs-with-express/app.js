const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

let movies = JSON.parse(fs.readFileSync("./data/movies.json", "utf8"));

app.get("/", (req, res) => {
  res.status(200).send("Hello from Express!");
});

app.get("/users", (req, res) => {
  res.status(200).json({ message: "Getting all users", status: "success" });
});

//Get - api/movies
app.get("/api/v1/movies", (req, res) => {
  res.status(200).json({ status: "success", data: { movies: movies } });
});

app.get("/api/v1/movies/:id", (req, res) => {
  const movieId = Number(req.params.id);
  const movie = movies.find((m) => m && m.id === movieId);

  if (!movie) {
    return res.status(404).json({ status: "fail", message: "Movie not found" });
  }

  res.status(200).json({ status: "success", data: { movie } });
});

//Post - api/movies
app.post("/api/v1/movies", (req, res) => {
  console.log(req.body);
  const newMovie = req.body;
  movies.push(newMovie);
  fs.writeFileSync("./data/movies.json", JSON.stringify(movies));
  res.status(201).json({ status: "success", data: { movie: newMovie } });
});

//PUT
app.put("/api/v1/movies/:id", (req, res) => {
  const movieId = Number(req.params.id);
  const movieIndex = movies.findIndex((m) => m && m.id === movieId);

  if (movieIndex === -1) {
    return res.status(404).json({ status: "fail", message: "Movie not found" });
  }

  const updatedMovie = { ...movies[movieIndex], ...req.body };
  movies[movieIndex] = updatedMovie;
  fs.writeFileSync("./data/movies.json", JSON.stringify(movies));

  res.status(200).json({ status: "success", data: { movie: updatedMovie } });
});

//Patch
app.patch("/api/v1/movies/:id", (req, res) => {
  const movieId = Number(req.params.id);
  const movieIndex = movies.findIndex((m) => m && m.id === movieId);

  if (movieIndex === -1) {
    return res.status(404).json({ status: "fail", message: "Movie not found" });
  }

  const updatedMovie = { ...movies[movieIndex], ...req.body };
  movies[movieIndex] = updatedMovie;
  fs.writeFileSync("./data/movies.json", JSON.stringify(movies));

  res.status(200).json({ status: "success", data: { movie: updatedMovie } });
});

//Delete
app.delete("/api/v1/movies/:id", (req, res) => {
  const movieId = Number(req.params.id);
  const movieIndex = movies.findIndex((m) => m && m.id === movieId);

  if (movieIndex === -1) {
    return res.status(404).json({ status: "fail", message: "Movie not found" });
  }

  movies.splice(movieIndex, 1);
  fs.writeFileSync("./data/movies.json", JSON.stringify(movies));

  res.status(204).json({ status: "success", data: null });
});

//create a server
const port = 3200;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
