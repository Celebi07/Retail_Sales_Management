# Architecture

This doc explains how the system is built and how the parts work together.

## System Overview

The app has two parts:
- **Backend** - Node.js server that handles data
- **Frontend** - React app that shows the UI

They talk to each other through REST API.

## Backend

### How Data Flows

1. On startup, server reads `sales_data.csv` and loads it into memory
2. When a request comes to `/api/sales`, it:
   - Takes the query parameters (search, filters, sort, page)
   - Filters the in-memory data
   - Sorts it
   - Cuts it into pages
   - Returns the requested page as JSON

### Code Organization

```
controllers/ - receives HTTP requests, calls services, sends responses
services/    - contains the filtering, sorting, pagination logic
utils/       - loads and parses CSV file
routes/      - maps URLs to controllers
```

### Why In-Memory?

For 1 million records, loading into RAM is fast enough. Typical response time is under 500ms. No need for a database for this assignment.

## Frontend

### How State Works

Everything is managed by `useSalesData` hook:
- When you type in search, it updates search state
- When you select a filter, it updates filter state
- When state changes, React triggers a new API call
- When data comes back, UI updates

The hook also resets to page 1 whenever filters or search change, so you don't end up on page 500 with no results.

### Components

Each component does one thing:
- `SearchBar` - just the input box
- `FilterPanel` - all the filter dropdowns
- `TransactionTable` - renders the table rows
- `Pagination` - prev/next buttons and page numbers
- `SummaryCards` - calculates and shows totals

They all get their data from App.jsx which uses the hook.

### Performance

Search is debounced (500ms delay) so we don't spam the server while typing. Also added a loading skeleton instead of just "Loading..." text to make it feel faster.

## API Design

Simple REST endpoints:
- `GET /api/sales` - main endpoint with all the query params
- `GET /api/sales/filters` - returns unique values for dropdowns

Response format:
```json
{
  "success": true,
  "data": [...],
  "metadata": {
    "totalRecords": 1000000,
    "totalPages": 100000,
    "currentPage": 1,
    "pageSize": 10,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

This way frontend knows how many pages there are and can show pagination correctly.

## Tech Choices

**Why Express?** Simple and everyone knows it.

**Why React?** Modern, component-based, easy to manage state with hooks.

**Why Vite?** Way faster than Create React App. Hot reload is instant.

**Why CSV Parser?** Streams the file so we don't load 224MB all at once. Memory efficient.

**Why no database?** Not needed. Data fits in RAM and reads are super fast. Plus the assignment uses CSV.

## How to Extend

If you need to add more filters:
1. Add the filter to frontend/FilterPanel
2. Add it to the state in useSalesData hook
3. Handle it in backend salesService applyFilters method

If you need more sort options:
1. Add option to frontend sort dropdown
2. Add case in backend salesService applySorting method
