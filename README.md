KGL Management System
📌 Project Overview
The KGL Management System is a full‑stack web application designed to manage operations for Karibu Groceries LTD. It includes both frontend and backend components, with dashboards for agents, managers, and directors. The system streamlines sales, credit sales, procurements, and stock management.

🛠️ Technologies Used
Frontend: HTML, CSS, JavaScript

Backend: Node.js, Express.js

Database: MongoDB

Tools: ESLint, Prettier (for linting and formatting)

Version Control: Git & GitHub

⚙️ Features
Agent Dashboard: Handles daily sales and credit sales entry.

Manager Dashboard: Summarizes branch performance (sales, credit sales, procurements, stock).

Director Dashboard: Provides company‑wide insights (top selling products, low stock alerts).

Authentication: Secure login system for different user roles.

Data Models: Structured with MongoDB for users, products, sales, procurements, and credit sales.

🧹 Code Quality
ESLint configured to enforce clean, error‑free JavaScript.

Prettier applied for consistent formatting across all files.

.gitignore added to keep the repository clean (ignores node_modules, logs, and environment files).


🚀 How to Run
Clone the repository:

bash
git clone https://github.com/Ir-Prosper/kgl_managment_system.git
Navigate into the project:

bash
cd kgl_managment_system
Install dependencies:

bash
npm install
Run the backend server:

bash
npm start
Open the frontend in your browser (frontend/index.html).

🐞 Bug Fixes & ESLint/Prettier Notes
During debugging, several issues were identified and corrected:

Tonnage Validation

Bug: Returned true instead of an empty string when valid.

Fix: Returns "" to indicate no error.

Phone Validation

Bug: Crashed if input was null or not a string.

Fix: Added type check and clear error message.

NIN Validation

Bug: Used != instead of strict !==.

Fix: Corrected logic and added error message.

Price Validation

Bug: No type checking, compared text to numbers.

Fix: Added type check and minimum price rule.

Empty Field Check

Bug: Crashed if value was null or a number.

Fix: Safely converts to string and trims spaces.

Date Validation

Bug: Crashed on invalid dates.

Fix: Added isNaN check with clear error message.

ESLint/Prettier Application
Ran npm run lint → fixed all errors, only minor warnings remain (no-unused-vars).

Ran npm run format → applied consistent formatting across frontend and backend.

Config files: .eslintrc.json

👨‍💻 Author
Prosper  