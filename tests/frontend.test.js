/**
 * Frontend Tests for ExecuNova AI
 * Using Jest + React Testing Library
 */

import { render, screen } from "@testing-library/react";
import App from "../src/App";

describe("ExecuNova AI Frontend", () => {
  test("renders navbar with title", () => {
    render(<App />);
    const titleElement = screen.getByText(/ExecuNova AI/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders Home page content", () => {
    render(<App />);
    const homeHeading = screen.getByText(/Predict\. Plan\. Finish\./i);
    expect(homeHeading).toBeInTheDocument();
  });
});
