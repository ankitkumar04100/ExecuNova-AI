/**
 * Backend version of risk calculator
 * Reusable from frontend logic
 */

const calculateCompletionProbability = (task, availableHours) => {
  const estimatedTime = task.subtasks.reduce((acc, sub) => acc + sub.hours, 0);
  return Math.min(100, Math.round((availableHours / estimatedTime) * 100));
};

const determineRiskLevel = (probability) => {
  if (probability > 70) return "low";
  if (probability > 40) return "medium";
  return "high";
};

const evaluateRisk = (tasks, availableHoursPerDay) => {
  const adjustments = [];
  let totalRisk = 0;

  tasks.forEach((task) => {
    const probability = calculateCompletionProbability(task, availableHoursPerDay);
    const riskLevel = determineRiskLevel(probability);
    totalRisk += probability;

    if (riskLevel === "medium" || riskLevel === "high") {
      adjustments.push({
        task: task.name,
        suggestedHoursPerDay: Math.ceil(task.subtasks.reduce((acc, s) => acc + s.hours, 0) / availableHoursPerDay),
      });
    }
  });

  const overallRisk = Math.round(totalRisk / tasks.length);
  return { overallRisk, adjustments };
};

module.exports = { calculateCompletionProbability, determineRiskLevel, evaluateRisk };
