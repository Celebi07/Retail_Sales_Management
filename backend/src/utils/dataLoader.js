import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import csv from 'csv-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class DataLoader {
  constructor() {
    this.data = null;
    this.isLoaded = false;
  }

  /**
   * Load and parse the CSV file
   * @returns {Promise<Array>} Parsed sales data
   */
  async loadData() {
    if (this.isLoaded && this.data) {
      return this.data;
    }

    return new Promise((resolve, reject) => {
      const results = [];
      const csvPath = path.join(__dirname, '../../../sales_data_100k.csv');

      fs.createReadStream(csvPath)
        .pipe(csv())
        .on('data', (row) => {
          // Parse numeric fields
          results.push({
            transactionId: row['Transaction ID'],
            date: row['Date'],
            customerId: row['Customer ID'],
            customerName: row['Customer Name'],
            phoneNumber: row['Phone Number'],
            gender: row['Gender'],
            age: parseInt(row['Age'], 10),
            customerRegion: row['Customer Region'],
            customerType: row['Customer Type'],
            productId: row['Product ID'],
            productName: row['Product Name'],
            brand: row['Brand'],
            productCategory: row['Product Category'],
            tags: row['Tags'],
            quantity: parseInt(row['Quantity'], 10),
            pricePerUnit: parseFloat(row['Price per Unit']),
            discountPercentage: parseFloat(row['Discount Percentage']),
            totalAmount: parseFloat(row['Total Amount']),
            finalAmount: parseFloat(row['Final Amount']),
            paymentMethod: row['Payment Method'],
            orderStatus: row['Order Status'],
            deliveryType: row['Delivery Type'],
            storeId: row['Store ID'],
            storeLocation: row['Store Location'],
            salespersonId: row['Salesperson ID'],
            employeeName: row['Employee Name']
          });
        })
        .on('end', () => {
          this.data = results;
          this.isLoaded = true;
          console.log(`✓ Loaded ${results.length} sales records`);
          resolve(results);
        })
        .on('error', (error) => {
          console.error('Error loading CSV:', error);
          reject(error);
        });
    });
  }

  /**
   * Get unique values for filter dropdowns
   * @returns {Object} Object containing unique values for each filterable field
   */
  getFilterOptions() {
    if (!this.isLoaded || !this.data) {
      return null;
    }

    return {
      regions: [...new Set(this.data.map(item => item.customerRegion))].sort(),
      genders: [...new Set(this.data.map(item => item.gender))].sort(),
      categories: [...new Set(this.data.map(item => item.productCategory))].sort(),
      paymentMethods: [...new Set(this.data.map(item => item.paymentMethod))].sort(),
      tags: [...new Set(this.data.flatMap(item =>
        item.tags ? item.tags.replace(/"/g, '').split(',').map(t => t.trim()) : []
      ))].sort()
    };
  }

  getData() {
    return this.data;
  }
}

// Singleton instance
const dataLoader = new DataLoader();

export default dataLoader;
