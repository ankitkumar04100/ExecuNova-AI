/**
 * taskModel.js
 * Task data model definition
 */

class Task {
  constructor(id, name, subtasks = [], deadline = null, availableHoursPerDay = 8) {
    this.id = id;
    this.name = name;
    this.subtasks = subtasks.map((sub, index) => ({
      id: index + 1,
      name: sub.name,
      hours: sub.hours,
      priority: sub.priority || 1,
      dependency: sub.dependency || null,
      completionStatus: false
    }));
    this.deadline = deadline; // ISO string
    this.availableHoursPerDay = availableHoursPerDay;
  }
}

module.exports = Task;
