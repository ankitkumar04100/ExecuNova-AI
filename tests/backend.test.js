/**
 * Backend Tests for ExecuNova AI
 * Using Jest + Supertest
 */

const request = require("supertest");
const express = require("express");
const tasksRouter = require("../backend/routes/tasks");

const app = express();
app.use(express.json());
app.use("/tasks", tasksRouter);

describe("ExecuNova AI Backend", () => {
  test("GET /tasks returns status 200 and tasks array", async () => {
    const response = await request(app).get("/tasks");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.tasks)).toBe(true);
  });

  test("POST /tasks adds a new task", async () => {
    const newTask = {
      id: 999,
      name: "Test Task",
      subtasks: [{ name: "Subtask 1", hours: 1, priority: 1 }]
    };
    const response = await request(app).post("/tasks").send(newTask);
    expect(response.statusCode).toBe(200);
    expect(response.body.tasks.some(t => t.id === 999)).toBe(true);
  });
});
