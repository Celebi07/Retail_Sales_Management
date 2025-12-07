import React from 'react';

const SummaryCards = ({ data }) => {
    // Calculate summary statistics
    const totalUnits = data.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = data.reduce((sum, item) => sum + item.totalAmount, 0);
    const totalDiscount = data.reduce((sum, item) => sum + (item.totalAmount - item.finalAmount), 0);

    return (
        <div className="summary-cards">
            <div className="summary-card">
                <div className="summary-icon">📦</div>
                <div className="summary-content">
                    <p className="summary-label">Total units sold</p>
                    <h3 className="summary-value">{totalUnits.toLocaleString()}</h3>
                </div>
            </div>

            <div className="summary-card">
                <div className="summary-icon">💰</div>
                <div className="summary-content">
                    <p className="summary-label">Total Amount</p>
                    <h3 className="summary-value">₹{totalAmount.toLocaleString()} ({data.length} Rs)</h3>
                </div>
            </div>

            <div className="summary-card">
                <div className="summary-icon">🎁</div>
                <div className="summary-content">
                    <p className="summary-label">Total Discount</p>
                    <h3 className="summary-value">₹{totalDiscount.toLocaleString()} ({(totalDiscount / totalAmount * 100).toFixed(0)} Rs)</h3>
                </div>
            </div>
        </div>
    );
};

export default SummaryCards;
