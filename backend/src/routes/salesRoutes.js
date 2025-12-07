import express from 'express';
import salesController from '../controllers/salesController.js';

const router = express.Router();

/**
 * GET /api/sales
 * Get sales data with optional search, filter, sort, and pagination
 * 
 * Query Parameters:
 * - search: string (customer name or phone number)
 * - regions: array (customer regions)
 * - genders: array (gender filter)
 * - minAge: number (minimum age)
 * - maxAge: number (maximum age)
 * - categories: array (product categories)
 * - tags: array (product tags)
 * - paymentMethods: array (payment methods)
 * - startDate: date string (start date filter)
 * - endDate: date string (end date filter)
 * - sortBy: string (date, quantity, customerName)
 * - sortOrder: string (asc, desc)
 * - page: number (page number, default 1)
 * - pageSize: number (items per page, default 10)
 */
router.get('/sales', salesController.getSales);

/**
 * GET /api/sales/filters
 * Get unique values for filter dropdowns
 */
router.get('/sales/filters', salesController.getFilterOptions);

export default router;
