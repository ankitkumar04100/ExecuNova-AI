import React from "react";

const About = () => {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-indigo-900 to-purple-900 text-white font-sans">
      <h1 className="text-4xl font-bold mb-4">About ExecuNova AI</h1>
      <p className="text-lg mb-4">
        ExecuNova AI is a cutting-edge productivity tool designed to **predict execution risk, plan dynamically, and help users finish tasks on time**.
      </p>
      <p className="text-lg mb-4">
        Unlike traditional to-do lists or trackers, ExecuNova AI uses **structured AI reasoning** combined with **task decomposition** and **risk analytics** to prevent missed deadlines.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">Key Features</h2>
      <ul className="list-disc list-inside text-lg space-y-1">
        <li>Predict completion probability for each task</li>
        <li>Dynamic daily plan optimization</li>
        <li>Detect bottlenecks and prevent burnout</li>
        <li>Visual dashboards and analytics</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-6 mb-2">Vision</h2>
      <p className="text-lg">
        Our long-term goal is to build the **world's first AI Execution Operating System**, where missed deadlines become preventable events, improving productivity for students, professionals, and teams worldwide.
      </p>
    </div>
  );
};

export default About;
