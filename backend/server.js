const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const tasksRouter = require("./routes/tasks");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/tasks", tasksRouter);

// Health check
app.get("/", (req, res) => {
  res.send({ message: "ExecuNova AI Backend Running" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
