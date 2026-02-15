import React from "react";

const TaskCard = ({ task }) => {
  const { name, subtasks, completionProbability } = task;

  const getRiskColor = (prob) => {
    if (prob > 70) return "bg-red-600";
    if (prob > 40) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="bg-indigo-800 p-4 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
      <h2 className="text-xl font-semibold text-white mb-2">{name}</h2>
      <p className="text-gray-300 mb-2">
        Completion Probability: {completionProbability}%
      </p>
      <div className={`w-full h-2 rounded ${getRiskColor(completionProbability)}`}></div>

      <ul className="mt-3 space-y-1">
        {subtasks.map((sub, index) => (
          <li key={index} className="text-gray-200 text-sm">
            • {sub.name} ({sub.hours}h)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskCard;
