import salesService from '../services/salesService.js';

class SalesController {
    /**
     * Get sales data with search, filter, sort, and pagination
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     */
    async getSales(req, res) {
        try {
            const {
                search,
                regions,
                genders,
                minAge,
                maxAge,
                categories,
                tags,
                paymentMethods,
                startDate,
                endDate,
                sortBy,
                sortOrder,
                page,
                pageSize
            } = req.query;

            // Parse array parameters
            const parseArray = (param) => {
                if (!param) return [];
                return Array.isArray(param) ? param : [param];
            };

            const params = {
                search,
                regions: parseArray(regions),
                genders: parseArray(genders),
                minAge,
                maxAge,
                categories: parseArray(categories),
                tags: parseArray(tags),
                paymentMethods: parseArray(paymentMethods),
                startDate,
                endDate,
                sortBy,
                sortOrder,
                page: parseInt(page, 10) || 1,
                pageSize: parseInt(pageSize, 10) || 10
            };

            const result = await salesService.getSales(params);

            res.json({
                success: true,
                ...result
            });
        } catch (error) {
            console.error('Error in getSales:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch sales data',
                message: error.message
            });
        }
    }

    /**
     * Get unique filter options for dropdowns
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     */
    async getFilterOptions(req, res) {
        try {
            const options = await salesService.getFilterOptions();

            res.json({
                success: true,
                data: options
            });
        } catch (error) {
            console.error('Error in getFilterOptions:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch filter options',
                message: error.message
            });
        }
    }
}

export default new SalesController();
