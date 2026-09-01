let movies = [
  { id: 1, title: "Inception", genre: "Sci-Fi" },
  { id: 2, title: "The Dark Knight", genre: "Action" },
  { id: 3, title: "Interstellar", genre: "Drama" },
];

const getAllMovies = (req, res) => {
  res.status(200).json({
    status: "success",
    data: { movies },
  });
};

const getMovieById = (req, res) => {
  const movieId = Number(req.params.id);
  const movie = movies.find((m) => m.id === movieId);

  if (!movie) {
    return res.status(404).json({
      status: "fail",
      message: "Movie not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: { movie },
  });
};

const createMovie = (req, res) => {
  const newMovie = req.body;
  movies.push(newMovie);

  res.status(201).json({
    status: "success",
    data: { movie: newMovie },
  });
};

const updateMovie = (req, res) => {
  const movieId = Number(req.params.id);
  const movieIndex = movies.findIndex((m) => m.id === movieId);

  if (movieIndex === -1) {
    return res.status(404).json({
      status: "fail",
      message: "Movie not found",
    });
  }

  const updatedMovie = { ...movies[movieIndex], ...req.body };
  movies[movieIndex] = updatedMovie;

  res.status(200).json({
    status: "success",
    data: { movie: updatedMovie },
  });
};

const patchMovie = (req, res) => {
  const movieId = Number(req.params.id);
  const movieIndex = movies.findIndex((m) => m.id === movieId);

  if (movieIndex === -1) {
    return res.status(404).json({
      status: "fail",
      message: "Movie not found",
    });
  }

  const updatedMovie = { ...movies[movieIndex], ...req.body };
  movies[movieIndex] = updatedMovie;

  res.status(200).json({
    status: "success",
    data: { movie: updatedMovie },
  });
};

const deleteMovie = (req, res) => {
  const movieId = Number(req.params.id);
  const movieIndex = movies.findIndex((m) => m.id === movieId);

  if (movieIndex === -1) {
    return res.status(404).json({
      status: "fail",
      message: "Movie not found",
    });
  }

  movies.splice(movieIndex, 1);

  res.status(204).json({
    status: "success",
    data: null,
  });
};

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  patchMovie,
  deleteMovie,
};
