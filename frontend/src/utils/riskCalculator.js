/**
 * Calculate completion probability for a task
 * @param {Object} task
 * @param {Number} totalAvailableHours
 * @returns {Number} probability 0-100
 */
export const calculateCompletionProbability = (task, totalAvailableHours) => {
  const estimatedTime = task.subtasks.reduce((acc, sub) => acc + sub.hours, 0);
  const probability = Math.min(100, Math.round((totalAvailableHours / estimatedTime) * 100));
  return probability;
};

/**
 * Determine risk level from probability
 * @param {Number} probability
 * @returns {String} "low" | "medium" | "high"
 */
export const determineRiskLevel = (probability) => {
  if (probability > 70) return "low";
  if (probability > 40) return "medium";
  return "high";
};

/**
 * Evaluate overall task risk and suggest adjustments
 * @param {Array} tasks
 * @param {Number} availableHoursPerDay
 * @returns {Object} { overallRisk, adjustments }
 */
export const evaluateRisk = (tasks, availableHoursPerDay) => {
  const adjustments = [];
  let totalRisk = 0;

  tasks.forEach((task) => {
    const probability = calculateCompletionProbability(task, availableHoursPerDay);
    const riskLevel = determineRiskLevel(probability);

    totalRisk += probability;

    if (riskLevel === "medium" || riskLevel === "high") {
      adjustments.push({
        task: task.name,
        suggestedHoursPerDay: Math.ceil(task.hours / availableHoursPerDay)
      });
    }
  });

  const overallRisk = Math.round(totalRisk / tasks.length);
  return { overallRisk, adjustments };
};
