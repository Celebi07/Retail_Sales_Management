import React from 'react';
import LoadingSkeleton from './LoadingSkeleton';

const TransactionTable = ({ data, loading, error }) => {
    if (loading) {
        return <LoadingSkeleton />;
    }

    if (error) {
        return (
            <div className="transaction-table-container">
                <div className="error-state">Error: {error}</div>
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="transaction-table-container">
                <div className="empty-state">No transactions found. Try adjusting your filters.</div>
            </div>
        );
    }

    const getStatusClass = (status) => {
        const statusLower = status.toLowerCase();
        if (statusLower === 'completed') return 'status-completed';
        if (statusLower === 'pending') return 'status-pending';
        if (statusLower === 'cancelled') return 'status-cancelled';
        if (statusLower === 'returned') return 'status-returned';
        return '';
    };

    return (
        <div className="transaction-table-container">
            <div className="table-wrapper">
                <table className="transaction-table">
                    <thead>
                        <tr>
                            <th>Transaction ID</th>
                            <th>Date</th>
                            <th>Customer Name</th>
                            <th>Phone</th>
                            <th>Gender</th>
                            <th>Age</th>
                            <th>Region</th>
                            <th>Type</th>
                            <th>Product</th>
                            <th>Brand</th>
                            <th>Category</th>
                            <th>Tags</th>
                            <th>Qty</th>
                            <th>Price/Unit</th>
                            <th>Discount %</th>
                            <th>Final Amount</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Delivery</th>
                            <th>Store</th>
                            <th>Location</th>
                            <th>Employee</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((transaction) => (
                            <tr key={transaction.transactionId}>
                                <td>{transaction.transactionId}</td>
                                <td>{transaction.date}</td>
                                <td>{transaction.customerName}</td>
                                <td>{transaction.phoneNumber}</td>
                                <td>{transaction.gender}</td>
                                <td>{transaction.age}</td>
                                <td>{transaction.customerRegion}</td>
                                <td>{transaction.customerType}</td>
                                <td>{transaction.productName}</td>
                                <td>{transaction.brand}</td>
                                <td>{transaction.productCategory}</td>
                                <td>{transaction.tags}</td>
                                <td>{transaction.quantity}</td>
                                <td>₹{transaction.pricePerUnit.toLocaleString()}</td>
                                <td>{transaction.discountPercentage}%</td>
                                <td>₹{transaction.finalAmount.toLocaleString()}</td>
                                <td>{transaction.paymentMethod}</td>
                                <td>
                                    <span className={`status-badge ${getStatusClass(transaction.orderStatus)}`}>
                                        {transaction.orderStatus}
                                    </span>
                                </td>
                                <td>{transaction.deliveryType}</td>
                                <td>{transaction.storeId}</td>
                                <td>{transaction.storeLocation}</td>
                                <td>{transaction.employeeName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransactionTable;
