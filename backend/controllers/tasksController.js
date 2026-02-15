const fs = require("fs");
const path = require("path");
const { evaluateRisk } = require("../utils/riskCalculator");

const tasksFilePath = path.join(__dirname, "../data/tasks.json");

// GET all tasks
const getTasks = (req, res) => {
  const tasksData = JSON.parse(fs.readFileSync(tasksFilePath, "utf8"));
  const { overallRisk, adjustments } = evaluateRisk(tasksData, 8); // assume 8h/day
  res.json({ tasks: tasksData, overallRisk, adjustments });
};

// POST new task
const addTask = (req, res) => {
  const newTask = req.body;
  const tasksData = JSON.parse(fs.readFileSync(tasksFilePath, "utf8"));
  tasksData.push(newTask);
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasksData, null, 2));
  const { overallRisk, adjustments } = evaluateRisk(tasksData, 8);
  res.json({ message: "Task added", tasks: tasksData, overallRisk, adjustments });
};

module.exports = { getTasks, addTask };
