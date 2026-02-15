import React from "react";

const RiskMeter = ({ score }) => {
  const getColor = (score) => {
    if (score > 70) return "bg-red-600";
    if (score > 40) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="bg-indigo-800 p-6 rounded-xl shadow-lg text-center">
      <h3 className="text-2xl font-bold text-white mb-2">Overall Execution Risk</h3>
      <div className="w-full h-6 bg-gray-700 rounded-full">
        <div
          className={`${getColor(score)} h-6 rounded-full transition-all duration-500`}
          style={{ width: `${score}%` }}
        ></div>
      </div>
      <p className="text-gray-300 mt-2 text-lg">{score}% risk</p>
    </div>
  );
};

export default RiskMeter;
