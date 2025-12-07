import React from 'react';

const Pagination = ({ metadata, currentPage, setCurrentPage }) => {
    const { totalPages, hasNextPage, hasPreviousPage, totalRecords, pageSize } = metadata;

    const handlePrevious = () => {
        if (hasPreviousPage) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (hasNextPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;

        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        if (endPage - startPage < maxPagesToShow - 1) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    const startRecord = (currentPage - 1) * pageSize + 1;
    const endRecord = Math.min(currentPage * pageSize, totalRecords);

    return (
        <div className="pagination">
            <div className="pagination-info">
                Showing {startRecord.toLocaleString()} to {endRecord.toLocaleString()} of {totalRecords.toLocaleString()} results
            </div>

            <div className="pagination-controls">
                <button
                    className="pagination-btn"
                    onClick={handlePrevious}
                    disabled={!hasPreviousPage}
                >
                    Previous
                </button>

                {getPageNumbers().map(page => (
                    <button
                        key={page}
                        className={`pagination-btn ${page === currentPage ? 'active' : ''}`}
                        onClick={() => handlePageClick(page)}
                    >
                        {page}
                    </button>
                ))}

                <button
                    className="pagination-btn"
                    onClick={handleNext}
                    disabled={!hasNextPage}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Pagination;
