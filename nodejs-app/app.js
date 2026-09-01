const express = require("express");
const moviesRouter = require("./routes/moviesRouter");
const userRouter = require("./routes/userRouter");

const app = express();
const port = process.env.PORT || 3200;

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/movies", moviesRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
