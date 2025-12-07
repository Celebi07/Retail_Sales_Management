import dataLoader from '../utils/dataLoader.js';

class SalesService {
    /**
     * Search, filter, sort, and paginate sales data
     * @param {Object} params - Query parameters
     * @returns {Object} Paginated results with metadata
     */
    async getSales(params) {
        const {
            search = '',
            regions = [],
            genders = [],
            minAge,
            maxAge,
            categories = [],
            tags = [],
            paymentMethods = [],
            startDate,
            endDate,
            sortBy = 'date',
            sortOrder = 'desc',
            page = 1,
            pageSize = 10
        } = params;

        // Get all data
        let data = await dataLoader.loadData();

        // Apply search
        if (search && search.trim()) {
            const searchLower = search.toLowerCase().trim();
            data = data.filter(item =>
                item.customerName.toLowerCase().includes(searchLower) ||
                item.phoneNumber.includes(searchLower)
            );
        }

        // Apply filters
        data = this.applyFilters(data, {
            regions,
            genders,
            minAge,
            maxAge,
            categories,
            tags,
            paymentMethods,
            startDate,
            endDate
        });

        // Apply sorting
        data = this.applySorting(data, sortBy, sortOrder);

        // Calculate pagination
        const totalRecords = data.length;
        const totalPages = Math.ceil(totalRecords / pageSize);
        const currentPage = Math.max(1, Math.min(page, totalPages || 1));
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        // Get paginated data
        const paginatedData = data.slice(startIndex, endIndex);

        return {
            data: paginatedData,
            metadata: {
                totalRecords,
                totalPages,
                currentPage,
                pageSize,
                hasNextPage: currentPage < totalPages,
                hasPreviousPage: currentPage > 1
            }
        };
    }

    /**
     * Apply all filters to the data
     * @param {Array} data - Sales data
     * @param {Object} filters - Filter parameters
     * @returns {Array} Filtered data
     */
    applyFilters(data, filters) {
        const { regions, genders, minAge, maxAge, categories, tags, paymentMethods, startDate, endDate } = filters;

        let filtered = data;

        // Filter by regions (multi-select)
        if (regions && regions.length > 0) {
            filtered = filtered.filter(item => regions.includes(item.customerRegion));
        }

        // Filter by genders (multi-select)
        if (genders && genders.length > 0) {
            filtered = filtered.filter(item => genders.includes(item.gender));
        }

        // Filter by age range
        if (minAge !== undefined && minAge !== null && minAge !== '') {
            filtered = filtered.filter(item => item.age >= parseInt(minAge, 10));
        }
        if (maxAge !== undefined && maxAge !== null && maxAge !== '') {
            filtered = filtered.filter(item => item.age <= parseInt(maxAge, 10));
        }

        // Filter by product categories (multi-select)
        if (categories && categories.length > 0) {
            filtered = filtered.filter(item => categories.includes(item.productCategory));
        }

        // Filter by tags (multi-select)
        if (tags && tags.length > 0) {
            filtered = filtered.filter(item => {
                if (!item.tags) return false;
                const itemTags = item.tags.replace(/"/g, '').split(',').map(t => t.trim());
                return tags.some(tag => itemTags.includes(tag));
            });
        }

        // Filter by payment methods (multi-select)
        if (paymentMethods && paymentMethods.length > 0) {
            filtered = filtered.filter(item => paymentMethods.includes(item.paymentMethod));
        }

        // Filter by date range
        if (startDate) {
            filtered = filtered.filter(item => new Date(item.date) >= new Date(startDate));
        }
        if (endDate) {
            filtered = filtered.filter(item => new Date(item.date) <= new Date(endDate));
        }

        return filtered;
    }

    /**
     * Sort data based on specified field and order
     * @param {Array} data - Sales data
     * @param {string} sortBy - Field to sort by
     * @param {string} sortOrder - 'asc' or 'desc'
     * @returns {Array} Sorted data
     */
    applySorting(data, sortBy, sortOrder) {
        const sorted = [...data];

        sorted.sort((a, b) => {
            let comparison = 0;

            switch (sortBy) {
                case 'date':
                    comparison = new Date(a.date) - new Date(b.date);
                    break;
                case 'quantity':
                    comparison = a.quantity - b.quantity;
                    break;
                case 'customerName':
                    comparison = a.customerName.localeCompare(b.customerName);
                    break;
                default:
                    comparison = 0;
            }

            return sortOrder === 'desc' ? -comparison : comparison;
        });

        return sorted;
    }

    /**
     * Get unique filter options for dropdowns
     * @returns {Object} Filter options
     */
    async getFilterOptions() {
        await dataLoader.loadData();
        return dataLoader.getFilterOptions();
    }
}

export default new SalesService();
