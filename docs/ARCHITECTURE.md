# ExecuNova AI — System Architecture

## Overview
ExecuNova AI is an AI-powered execution forecasting and dynamic scheduling system.  
Its primary goal is to **predict execution risk, dynamically plan tasks, and prevent missed deadlines**.  

The system integrates:

- **Frontend (React + Tailwind CSS)** — interactive dashboard, risk meters, charts  
- **Backend (Node.js + Express)** — API endpoints, task management, risk evaluation  
- **AI Engine** — structured prompt engineering + mathematical risk calculations  
- **Data Layer** — JSON-based storage (future-ready for DB integration)

---

## High-Level Architecture Diagram
```
[User Interface] ---> [React Components]
                |
                v
        [API Calls via axios]
                |
                v
[Express Backend] ---> [Controllers] ---> [Services / AI Logic]
                |
                v
       [Data Layer: tasks.json]
```

---

## AI Pipeline

1. **Task Parsing**  
   - Parses input tasks and subtasks  
   - Extracts estimated hours, dependencies, priorities  

2. **Risk Calculation**  
   - Calculates completion probability for each task  
   - Determines risk levels: low, medium, high  

3. **Daily Plan Generation**  
   - Scheduler allocates tasks across available hours  
   - Detects bottlenecks and overload days  

4. **Dynamic Recalibration**  
   - Adjusts plan in real-time if tasks fall behind  
   - Provides recommendations and risk mitigation  

5. **Visualization**  
   - Dashboard renders risk meters, daily plan cards, forecast charts  
   - Color-coded: Green (low), Yellow (medium), Red (high)

---

## Technology Stack

- **Frontend:** React, Tailwind CSS, Chart.js, Recharts  
- **Backend:** Node.js, Express, Body-Parser, CORS  
- **AI Logic:** Custom risk calculation & scheduling algorithms  
- **Deployment:** Vercel / Heroku  
- **Version Control:** GitHub

---

## Notes

- The architecture supports **modular scaling**  
- Ready for **team collaboration**, **multi-user extensions**, and **AI enhancements**  
- Focused on **real-world productivity improvements**

---
