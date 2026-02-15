import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navbar */}
        <nav className="bg-indigo-800 shadow-lg p-4 flex justify-between items-center">
          <Link to="/" className="text-white text-2xl font-bold">
            ExecuNova AI
          </Link>
          <div className="space-x-4">
            <Link to="/" className="text-gray-200 hover:text-white transition">
              Home
            </Link>
            <Link to="/about" className="text-gray-200 hover:text-white transition">
              About
            </Link>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-indigo-900 p-4 text-center text-gray-400">
          &copy; {new Date().getFullYear()} ExecuNova AI. Predict. Plan. Finish.
        </footer>
      </div>
    </Router>
  );
};

export default App;
