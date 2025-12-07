import axios from 'axios';

const API_BASE_URL = '/api';

/**
 * Fetch sales data with filters, search, sort, and pagination
 * @param {Object} params - Query parameters
 * @returns {Promise} API response
 */
export const getSalesData = async (params) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/sales`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching sales data:', error);
        throw error;
    }
};

/**
 * Fetch unique filter options for dropdowns
 * @returns {Promise} Filter options
 */
export const getFilterOptions = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/sales/filters`);
        return response.data;
    } catch (error) {
        console.error('Error fetching filter options:', error);
        throw error;
    }
};
