const checkMovieId = (req, res, next, val) => {
  const movieId = Number(val);

  if (!movieId) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid movie id",
    });
  }

  next();
};

module.exports = { checkMovieId };
