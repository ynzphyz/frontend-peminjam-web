# FRONTEND-PEMINJAM-WEB

A modern web application frontend for handling borrowing and loan request systems.  
Designed with performance, maintainability, and scalability in mind.

---

## Overview

Frontend Peminjam Web is the UI layer of a borrowing system application.  
It enables users to submit borrowing data and interact with backend services through a clean and structured interface.

This project is built as part of a larger full-stack system and is ready to be integrated with backend APIs.

---

## Features

- Modern component-based architecture using React
- Fast bundling and development with Vite
- API handling via Axios
- Clean and responsive design using Tailwind CSS
- Prepared for backend integration
- Production-ready build system

---

## Tech Stack

- React
- JavaScript
- Vite
- Tailwind CSS
- Axios
- ESLint

---

## Installation

Build frontend-peminjam-web from source and install dependencies:

### 1. Clone the repository

```bash
git clone https://github.com/ynzphyz/frontend-peminjam-web.git
2. Navigate to the project directory
bash
Copy code
cd frontend-peminjam-web
3. Install dependencies
Using npm:

bash
Copy code
npm install
4. Start development server
bash
Copy code
npm run dev
Open in your browser:

arduino
Copy code
http://localhost:5173
Usage
Once the application is running:

Access the web interface via browser

Fill borrowing form

Submit data

Ensure backend API is accessible

Configuration
API URL configuration should be set inside Axios configuration file:

js
Copy code
axios.create({
  baseURL: "http://localhost:8080"
});
Project Structure
arduino
Copy code
frontend-peminjam-web/
│
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
│
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
Roadmap
Basic frontend UI ✔

Backend integration

Approval workflow

Borrowing history

Authentication system

Report export

Author
Sebastian Alexander Eka Cahyana
GitHub: https://github.com/ynzphyz
