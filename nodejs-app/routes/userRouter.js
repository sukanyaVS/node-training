const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Getting all users",
    data: {
      users: [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
      ],
    },
  });
});

router.get("/:id", (req, res) => {
  const userId = Number(req.params.id);

  if (!userId) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid user id",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      user: { id: userId, name: "Sample User" },
    },
  });
});

router.post("/", (req, res) => {
  const user = req.body;

  res.status(201).json({
    status: "success",
    data: {
      user,
    },
  });
});

module.exports = router;
