const express = require("express");
const {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  patchMovie,
  deleteMovie,
} = require("../controllers/movieController");
const { checkMovieId } = require("../middleware/checkMovieId");

const router = express.Router();

router.param("id", checkMovieId);
router.get("/", getAllMovies);
router.get("/:id", getMovieById);
router.post("/", createMovie);
router.put("/:id", updateMovie);
router.patch("/:id", patchMovie);
router.delete("/:id", deleteMovie);

module.exports = router;
