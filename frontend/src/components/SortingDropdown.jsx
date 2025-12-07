import React from 'react';

const SortingDropdown = ({ sortBy, setSortBy, sortOrder, setSortOrder, totalRecords }) => {
    return (
        <div className="sorting-dropdown">
            <div className="results-info">
                Showing {totalRecords.toLocaleString()} results
            </div>

            <div className="sort-controls">
                <label>Sort by:</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="date">Date</option>
                    <option value="quantity">Quantity</option>
                    <option value="customerName">Customer Name</option>
                </select>

                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                </select>
            </div>
        </div>
    );
};

export default SortingDropdown;
