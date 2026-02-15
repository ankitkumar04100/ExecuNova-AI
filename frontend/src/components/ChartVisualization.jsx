import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartVisualization = ({ tasks }) => {
  const data = {
    labels: tasks.map((t) => t.name),
    datasets: [
      {
        label: "Completion Probability",
        data: tasks.map((t) => t.completionProbability),
        backgroundColor: tasks.map((t) =>
          t.completionProbability > 70
            ? "rgba(255, 99, 132, 0.7)"
            : t.completionProbability > 40
            ? "rgba(255, 206, 86, 0.7)"
            : "rgba(75, 192, 192, 0.7)"
        )
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Task Completion Probabilities" }
    },
    scales: {
      y: { beginAtZero: true, max: 100 }
    }
  };

  return (
    <div className="bg-indigo-800 p-6 rounded-xl shadow-lg">
      <Bar data={data} options={options} />
    </div>
  );
};

export default ChartVisualization;
