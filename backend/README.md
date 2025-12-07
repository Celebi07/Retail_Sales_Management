# Backend

Express API for the sales management system.

## Running It

```bash
npm install
npm start
```

Runs on port 5000.

## API Endpoints

### GET /api/sales
Get sales data with optional filters.

**Query params:**
- `search` - search customer name or phone
- `regions[]` - filter by regions (can pass multiple)
- `genders[]` - filter by gender
- `minAge`, `maxAge` - age range
- `categories[]` - product categories
- `tags[]` - product tags
- `paymentMethods[]` - payment methods
- `startDate`, `endDate` - date range
- `sortBy` - field to sort by (date, quantity, customerName)
- `sortOrder` - asc or desc
- `page` - page number
- `pageSize` - items per page

**Example:**
```
GET /api/sales?search=John&regions=East&sortBy=date&page=1
```

Returns JSON with data and metadata (total pages, current page, etc).

### GET /api/sales/filters
Get unique values for filter dropdowns.

### GET /health
Check if server is running.

## How It Works

1. Loads sales_data.csv on startup and keeps it in memory
2. When request comes in, applies filters and search on the cached data
3. Sorts results
4. Splits into pages
5. Returns the requested page

No database needed since we cache everything in RAM.
