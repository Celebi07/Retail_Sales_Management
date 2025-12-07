import { useState, useEffect, useCallback } from 'react';
import { getSalesData, getFilterOptions } from '../services/api';

/**
 * Custom debounce hook to delay API calls
 */
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

/**
 * Custom hook for managing sales data with search, filter, sort, and pagination
 */
export const useSalesData = () => {
    const [data, setData] = useState([]);
    const [metadata, setMetadata] = useState({
        totalRecords: 0,
        totalPages: 0,
        currentPage: 1,
        pageSize: 10,
        hasNextPage: false,
        hasPreviousPage: false
    });
    const [filterOptions, setFilterOptions] = useState({
        regions: [],
        genders: [],
        categories: [],
        paymentMethods: [],
        tags: []
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Filter and search states
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500); // Debounce search by 500ms
    const [selectedRegions, setSelectedRegions] = useState([]);
    const [selectedGenders, setSelectedGenders] = useState([]);
    const [minAge, setMinAge] = useState('');
    const [maxAge, setMaxAge] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedPaymentMethods, setSelectedPaymentMethods] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [sortBy, setSortBy] = useState('date');
    const [sortOrder, setSortOrder] = useState('desc');
    const [currentPage, setCurrentPage] = useState(1);

    // Fetch filter options on mount
    useEffect(() => {
        const fetchFilterOptions = async () => {
            try {
                const response = await getFilterOptions();
                if (response.success) {
                    setFilterOptions(response.data);
                }
            } catch (err) {
                console.error('Error loading filter options:', err);
            }
        };
        fetchFilterOptions();
    }, []);

    // Fetch sales data
    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const params = {
                search: debouncedSearch,
                regions: selectedRegions,
                genders: selectedGenders,
                minAge,
                maxAge,
                categories: selectedCategories,
                tags: selectedTags,
                paymentMethods: selectedPaymentMethods,
                startDate,
                endDate,
                sortBy,
                sortOrder,
                page: currentPage,
                pageSize: 10
            };

            const response = await getSalesData(params);

            if (response.success) {
                setData(response.data);
                setMetadata(response.metadata);
            }
        } catch (err) {
            setError(err.message || 'Failed to fetch data');
            setData([]);
        } finally {
            setLoading(false);
        }
    }, [
        debouncedSearch,
        selectedRegions,
        selectedGenders,
        minAge,
        maxAge,
        selectedCategories,
        selectedTags,
        selectedPaymentMethods,
        startDate,
        endDate,
        sortBy,
        sortOrder,
        currentPage
    ]);

    // Fetch data when dependencies change
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Reset to page 1 when filters or search change
    useEffect(() => {
        if (currentPage !== 1) {
            setCurrentPage(1);
        }
    }, [
        debouncedSearch,
        selectedRegions,
        selectedGenders,
        minAge,
        maxAge,
        selectedCategories,
        selectedTags,
        selectedPaymentMethods,
        startDate,
        endDate,
        sortBy,
        sortOrder
    ]);

    const clearFilters = () => {
        setSearch('');
        setSelectedRegions([]);
        setSelectedGenders([]);
        setMinAge('');
        setMaxAge('');
        setSelectedCategories([]);
        setSelectedTags([]);
        setSelectedPaymentMethods([]);
        setStartDate('');
        setEndDate('');
        setCurrentPage(1);
    };

    return {
        data,
        metadata,
        filterOptions,
        loading,
        error,
        search,
        setSearch,
        selectedRegions,
        setSelectedRegions,
        selectedGenders,
        setSelectedGenders,
        minAge,
        setMinAge,
        maxAge,
        setMaxAge,
        selectedCategories,
        setSelectedCategories,
        selectedTags,
        setSelectedTags,
        selectedPaymentMethods,
        setSelectedPaymentMethods,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        sortBy,
        setSortBy,
        sortOrder,
        setSortOrder,
        currentPage,
        setCurrentPage,
        clearFilters
    };
};
