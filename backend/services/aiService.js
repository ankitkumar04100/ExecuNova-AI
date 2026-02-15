/**
 * aiService.js
 * Handles AI-powered task predictions and plan optimization
 */

const { evaluateRisk } = require("../utils/riskCalculator");

/**
 * Predict task completion risk
 * @param {Array} tasks
 * @param {Number} availableHoursPerDay
 * @returns {Object} { overallRisk, adjustments }
 */
const predictExecution = (tasks, availableHoursPerDay = 8) => {
  return evaluateRisk(tasks, availableHoursPerDay);
};

/**
 * Generate AI-optimized plan (stub)
 * Can later integrate GPT API for dynamic suggestions
 * @param {Array} tasks
 */
const generatePlan = (tasks, availableHoursPerDay = 8) => {
  // Currently uses evaluateRisk logic; future GPT integration
  const { adjustments } = evaluateRisk(tasks, availableHoursPerDay);
  return adjustments;
};

module.exports = { predictExecution, generatePlan };
