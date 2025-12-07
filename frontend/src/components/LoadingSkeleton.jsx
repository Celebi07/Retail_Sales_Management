import React from 'react';

const LoadingSkeleton = () => {
    return (
        <div className="loading-skeleton">
            <div className="skeleton-summary-cards">
                {[1, 2, 3].map(i => (
                    <div key={i} className="skeleton-card">
                        <div className="skeleton-icon"></div>
                        <div className="skeleton-text-group">
                            <div className="skeleton-text skeleton-text-sm"></div>
                            <div className="skeleton-text skeleton-text-lg"></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="skeleton-table">
                <div className="skeleton-table-header"></div>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
                    <div key={i} className="skeleton-table-row"></div>
                ))}
            </div>
        </div>
    );
};

export default LoadingSkeleton;
