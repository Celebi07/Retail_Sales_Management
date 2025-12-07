# Frontend

React UI for the sales management system.

## Running It

```bash
npm install
npm run dev
```

Runs on port 3000.

## What's Inside

**Components:**
- SearchBar - text input for searching
- FilterPanel - dropdown filters (7 different ones)
- TransactionTable - shows the data in a table
- Pagination - page navigation
- SummaryCards - shows totals (units sold, amount, discount)
- LoadingSkeleton - nice loading animation

**State Management:**
Used a custom hook (`useSalesData`) that manages everything - search text, selected filters, current page, etc. When anything changes, it fetches new data from the API.

**Performance:**
Added debouncing on search so it waits 500ms after you stop typing before making the API call. Prevents lag.

## Building for Production

```bash
npm run build
```

Creates `dist/` folder with the production build.

## Config

`vite.config.js` has proxy setup to forward `/api` requests to `localhost:5000` during development. For production, update the API URL in `src/services/api.js`.
