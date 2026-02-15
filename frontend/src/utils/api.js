import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

/**
 * Fetch tasks from backend API
 */
export const fetchTasks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tasks`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return { tasks: [], overallRisk: 0 };
  }
};

/**
 * Submit new task
 * @param {Object} task
 */
export const submitTask = async (task) => {
  try {
    const response = await axios.post(`${BASE_URL}/tasks`, task);
    return response.data;
  } catch (error) {
    console.error("Error submitting task:", error);
    return null;
  }
};
