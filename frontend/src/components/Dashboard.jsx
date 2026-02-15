import React, { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import RiskMeter from "./RiskMeter";
import ChartVisualization from "./ChartVisualization";
import { fetchTasks } from "../utils/api";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [riskScore, setRiskScore] = useState(0);

  useEffect(() => {
    const getTasks = async () => {
      const data = await fetchTasks();
      setTasks(data.tasks || []);
      setRiskScore(data.overallRisk || 0);
    };
    getTasks();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-indigo-900 to-purple-900">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">ExecuNova AI</h1>
        <p className="text-gray-300 text-lg">
          Predict. Plan. Finish. — Your AI-powered deadline optimizer.
        </p>
      </header>

      <section className="mb-8">
        <RiskMeter score={riskScore} />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </section>

      <section>
        <ChartVisualization tasks={tasks} />
      </section>
    </div>
  );
};

export default Dashboard;
