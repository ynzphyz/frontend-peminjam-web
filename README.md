<h1 align="center">Frontend Peminjam Web</h1>

<p align="center">
  A modern frontend web app for managing and submitting loan requests.  
  Built with performance, simplicity, and scalability in mind.
</p>

<p align="center">
  <img src="https://img.shields.io/github/last-commit/ynzphyz/frontend-peminjam-web" />
  <img src="https://img.shields.io/github/languages/top/ynzphyz/frontend-peminjam-web" />
  <img src="https://img.shields.io/github/repo-size/ynzphyz/frontend-peminjam-web" />
</p>

---

## Overview

**Frontend Peminjam Web** is the user interface layer of a loan / borrowing system.  
Its purpose is to provide a clean, fast, and maintainable interface for users to submit requests and interact with backend services.

This frontend was built with scalability and future expansion in mind and can be extended into a complete management dashboard system.

---

## Key Features

- Modern React architecture
- Clean and responsive UI using Tailwind CSS
- API communication via Axios
- Fast development environment powered by Vite
- Code quality enforcement with ESLint
- Ready for backend integration
- Designed for future scalability

---

## Technology Stack

| Category | Tools |
|----------|------|
| Framework | React |
| Build Tool | Vite |
| HTTP Client | Axios |
| Styling | Tailwind CSS |
| Linter | ESLint |
| Language | JavaScript |

---

## Project Structure

frontend-peminjam-web
│
├── public
├── src
│ ├── assets
│ ├── components
│ ├── pages
│ ├── App.jsx
│ └── main.jsx
│
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js

yaml
Copy code

---

## Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/ynzphyz/frontend-peminjam-web.git
cd frontend-peminjam-web
2. Install Dependencies
bash
Copy code
npm install
3. Run Development Server
bash
Copy code
npm run dev
4. Build for Production
bash
Copy code
npm run build
API Configuration
This project communicates with a backend system via API.
Ensure your API endpoint is set correctly in Axios configuration.

js
Copy code
axios.create({
  baseURL: "http://localhost:8080"
});
Project Intent
This project is designed as the frontend foundation for a larger ecosystem which can evolve into:

Approval system

User roles and access control

History and tracking

Automation workflows

Reporting dashboard

Development Status
Active Development

This project is actively being improved and prepared for production-level usage.

Author
Developed by
Sebastian Alexander Eka Cahyana
GitHub: https://github.com/ynzphyz
