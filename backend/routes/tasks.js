const express = require("express");
const router = express.Router();
const { getTasks, addTask } = require("../controllers/tasksController");

// GET all tasks
router.get("/", getTasks);

// POST new task
router.post("/", addTask);

module.exports = router;
