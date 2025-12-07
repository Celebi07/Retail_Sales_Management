import React, { useState } from 'react';

const FilterPanel = ({
    filterOptions,
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
    clearFilters
}) => {
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (dropdownName) => {
        setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
    };

    const closeDropdown = () => {
        setOpenDropdown(null);
    };

    const handleCheckboxChange = (value, selectedArray, setterFunction) => {
        if (selectedArray.includes(value)) {
            setterFunction(selectedArray.filter(item => item !== value));
        } else {
            setterFunction([...selectedArray, value]);
        }
    };

    const getFilterLabel = (filterName, selectedArray) => {
        if (selectedArray.length === 0) return filterName;
        if (selectedArray.length === 1) return selectedArray[0];
        return `${filterName} (${selectedArray.length})`;
    };

    const getAgeRangeLabel = () => {
        if (!minAge && !maxAge) return 'Age Range';
        if (minAge && maxAge) return `${minAge}-${maxAge}`;
        if (minAge) return `${minAge}+`;
        if (maxAge) return `0-${maxAge}`;
        return 'Age Range';
    };

    const getDateRangeLabel = () => {
        if (!startDate && !endDate) return 'Date';
        if (startDate && endDate) return `${startDate} to ${endDate}`;
        if (startDate) return `From ${startDate}`;
        if (endDate) return `Until ${endDate}`;
        return 'Date';
    };

    return (
        <div className="filter-panel-horizontal">
            <div className="filter-actions">
                <button className="reset-icon-btn" onClick={clearFilters} title="Clear all filters">
                    ⟲
                </button>
            </div>

            {/* Customer Region */}
            <div className="filter-dropdown">
                <button
                    className={`filter-btn ${selectedRegions.length > 0 ? 'active' : ''}`}
                    onClick={() => toggleDropdown('region')}
                >
                    {getFilterLabel('Customer Region', selectedRegions)}
                    <span className="dropdown-arrow">▼</span>
                </button>
                {openDropdown === 'region' && (
                    <div className="dropdown-menu">
                        <div className="dropdown-content">
                            {filterOptions.regions.map(region => (
                                <label key={region} className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={selectedRegions.includes(region)}
                                        onChange={() => handleCheckboxChange(region, selectedRegions, setSelectedRegions)}
                                    />
                                    {region}
                                </label>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Gender */}
            <div className="filter-dropdown">
                <button
                    className={`filter-btn ${selectedGenders.length > 0 ? 'active' : ''}`}
                    onClick={() => toggleDropdown('gender')}
                >
                    {getFilterLabel('Gender', selectedGenders)}
                    <span className="dropdown-arrow">▼</span>
                </button>
                {openDropdown === 'gender' && (
                    <div className="dropdown-menu">
                        <div className="dropdown-content">
                            {filterOptions.genders.map(gender => (
                                <label key={gender} className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={selectedGenders.includes(gender)}
                                        onChange={() => handleCheckboxChange(gender, selectedGenders, setSelectedGenders)}
                                    />
                                    {gender}
                                </label>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Age Range */}
            <div className="filter-dropdown">
                <button
                    className={`filter-btn ${(minAge || maxAge) ? 'active' : ''}`}
                    onClick={() => toggleDropdown('age')}
                >
                    {getAgeRangeLabel()}
                    <span className="dropdown-arrow">▼</span>
                </button>
                {openDropdown === 'age' && (
                    <div className="dropdown-menu">
                        <div className="dropdown-content age-inputs">
                            <input
                                type="number"
                                placeholder="Min Age"
                                value={minAge}
                                onChange={(e) => setMinAge(e.target.value)}
                                min="0"
                                max="100"
                            />
                            <span>to</span>
                            <input
                                type="number"
                                placeholder="Max Age"
                                value={maxAge}
                                onChange={(e) => setMaxAge(e.target.value)}
                                min="0"
                                max="100"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Product Category */}
            <div className="filter-dropdown">
                <button
                    className={`filter-btn ${selectedCategories.length > 0 ? 'active' : ''}`}
                    onClick={() => toggleDropdown('category')}
                >
                    {getFilterLabel('Product Category', selectedCategories)}
                    <span className="dropdown-arrow">▼</span>
                </button>
                {openDropdown === 'category' && (
                    <div className="dropdown-menu">
                        <div className="dropdown-content scrollable">
                            {filterOptions.categories.map(category => (
                                <label key={category} className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(category)}
                                        onChange={() => handleCheckboxChange(category, selectedCategories, setSelectedCategories)}
                                    />
                                    {category}
                                </label>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Tags */}
            <div className="filter-dropdown">
                <button
                    className={`filter-btn ${selectedTags.length > 0 ? 'active' : ''}`}
                    onClick={() => toggleDropdown('tags')}
                >
                    {getFilterLabel('Tags', selectedTags)}
                    <span className="dropdown-arrow">▼</span>
                </button>
                {openDropdown === 'tags' && (
                    <div className="dropdown-menu">
                        <div className="dropdown-content scrollable">
                            {filterOptions.tags.map(tag => (
                                <label key={tag} className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={selectedTags.includes(tag)}
                                        onChange={() => handleCheckboxChange(tag, selectedTags, setSelectedTags)}
                                    />
                                    {tag}
                                </label>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Payment Method */}
            <div className="filter-dropdown">
                <button
                    className={`filter-btn ${selectedPaymentMethods.length > 0 ? 'active' : ''}`}
                    onClick={() => toggleDropdown('payment')}
                >
                    {getFilterLabel('Payment Method', selectedPaymentMethods)}
                    <span className="dropdown-arrow">▼</span>
                </button>
                {openDropdown === 'payment' && (
                    <div className="dropdown-menu">
                        <div className="dropdown-content">
                            {filterOptions.paymentMethods.map(method => (
                                <label key={method} className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={selectedPaymentMethods.includes(method)}
                                        onChange={() => handleCheckboxChange(method, selectedPaymentMethods, setSelectedPaymentMethods)}
                                    />
                                    {method}
                                </label>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Date Range */}
            <div className="filter-dropdown">
                <button
                    className={`filter-btn ${(startDate || endDate) ? 'active' : ''}`}
                    onClick={() => toggleDropdown('date')}
                >
                    {getDateRangeLabel()}
                    <span className="dropdown-arrow">▼</span>
                </button>
                {openDropdown === 'date' && (
                    <div className="dropdown-menu">
                        <div className="dropdown-content date-inputs">
                            <label>
                                <span>From:</span>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </label>
                            <label>
                                <span>To:</span>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </label>
                        </div>
                    </div>
                )}
            </div>

            {/* Overlay to close dropdown when clicking outside */}
            {openDropdown && (
                <div className="dropdown-overlay" onClick={closeDropdown}></div>
            )}
        </div>
    );
};

export default FilterPanel;
