import React from 'react';
import { useSalesData } from './hooks/useSalesData';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import SummaryCards from './components/SummaryCards';
import TransactionTable from './components/TransactionTable';
import Pagination from './components/Pagination';
import './styles/index.css';

function App() {
    const {
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
    } = useSalesData();

    return (
        <div className="app">
            {/* Header */}
            <div className="app-header">
                <h1>Sales Management System</h1>
            </div>

            {/* Top Bar with Search and Sort */}
            <div className="top-bar">
                <SearchBar search={search} setSearch={setSearch} />

                <div className="sort-control">
                    <label>Sort by:</label>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="date">Date</option>
                        <option value="quantity">Quantity</option>
                        <option value="customerName">Customer Name (A-Z)</option>
                    </select>
                    <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                        <option value="desc">Descending</option>
                        <option value="asc">Ascending</option>
                    </select>
                </div>
            </div>

            {/* Filter Bar */}
            <FilterPanel
                filterOptions={filterOptions}
                selectedRegions={selectedRegions}
                setSelectedRegions={setSelectedRegions}
                selectedGenders={selectedGenders}
                setSelectedGenders={setSelectedGenders}
                minAge={minAge}
                setMinAge={setMinAge}
                maxAge={maxAge}
                setMaxAge={setMaxAge}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                selectedPaymentMethods={selectedPaymentMethods}
                setSelectedPaymentMethods={setSelectedPaymentMethods}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                clearFilters={clearFilters}
            />

            {/* Content Section */}
            <div className="content-section">
                {/* Summary Cards */}
                {!loading && !error && data.length > 0 && (
                    <SummaryCards data={data} />
                )}

                {/* Transaction Table */}
                <TransactionTable
                    data={data}
                    loading={loading}
                    error={error}
                />

                {/* Pagination */}
                {!loading && !error && data.length > 0 && (
                    <Pagination
                        metadata={metadata}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                )}
            </div>
        </div>
    );
}

export default App;
