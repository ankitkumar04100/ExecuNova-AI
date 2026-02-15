/**
 * Generate a daily schedule from tasks
 * @param {Array} tasks
 * @param {Number} availableHoursPerDay
 * @returns {Array} daily plan
 */
export const generateDailyPlan = (tasks, availableHoursPerDay) => {
  const plan = [];
  let day = 1;

  // Sort tasks by priority descending
  const sortedTasks = tasks.sort((a, b) => b.priority - a.priority);

  sortedTasks.forEach((task) => {
    let remainingHours = task.hours;
    while (remainingHours > 0) {
      if (!plan[day - 1]) plan[day - 1] = { day, tasks: [], plannedHours: 0 };
      const hoursForDay = Math.min(remainingHours, availableHoursPerDay - plan[day - 1].plannedHours);

      if (hoursForDay <= 0) {
        day++;
        continue;
      }

      plan[day - 1].tasks.push({ name: task.name, hours: hoursForDay });
      plan[day - 1].plannedHours += hoursForDay;
      remainingHours -= hoursForDay;
    }
  });

  return plan;
};
