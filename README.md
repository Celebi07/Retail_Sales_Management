# TruEstate - Retail Sales Management System

A web app for managing sales data with search, filters, sorting, and pagination. Built for the TruEstate internship assignment.

**Live Demo (Frontend) :** [Try it here](https://retail-sales-management-frontend.vercel.app/)

**Backend Deployment (Health) :** [Link for Health](https://truestate-assignment-backend.onrender.com/health)

## What This Does

Handles 1 million sales records from CSV and lets you:
- Search by customer name or phone
- Filter by region, gender, age, category, tags, payment method, date
- Sort by date, quantity, or customer name
- Navigate through pages (10 items per page)

## Tech Used

**Backend:** Node.js, Express, CSV Parser  
**Frontend:** React, Vite, Axios

## How to Run Locally

### Backend
```bash
cd backend
npm install
npm start
```
Server runs on `http://localhost:5000`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
App runs on `http://localhost:3000`

## How I Built It

**Search:** Used case-insensitive string matching on customer name and phone number fields.

**Filters:** Each filter works independently. When you select multiple options, it shows results matching ANY of them (OR logic). Combine different filter types and they work together (AND logic between filter types).

**Sorting:** JavaScript's built-in sort with custom comparators for dates, numbers, and strings.

**Pagination:** Split results into pages of 10. When you change filters or search, it resets to page 1 automatically.

**Performance:** Added debouncing on search (waits 500ms after you stop typing) to avoid spamming the backend.

## Project Structure
```
backend/src/
  controllers/  - handles HTTP requests
  services/     - business logic
  utils/        - CSV loading
  routes/       - API endpoints

frontend/src/
  components/   - UI pieces (search, filters, table, etc)
  hooks/        - state management
  services/     - API calls
  styles/       - CSS
```

## API Endpoints

`GET /api/sales` - get sales data (supports all query params)  
`GET /api/sales/filters` - get dropdown options  
`GET /health` - check if server is running
