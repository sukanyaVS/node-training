const express = require("express");
const moviesRouter = require("./routes/moviesRouter");
const userRouter = require("./routes/userRouter");
const logger = require("./middleware/logger");
const morgan = require("morgan");


const app = express();
const port = process.env.PORT || 3200;

app.use(logger);
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/movies", moviesRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
