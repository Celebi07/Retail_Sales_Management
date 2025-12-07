import React from 'react';

const SearchBar = ({ search, setSearch }) => {
    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Name, Phone no."
                value={search}
                onChange={handleChange}
            />
        </div>
    );
};

export default SearchBar;
