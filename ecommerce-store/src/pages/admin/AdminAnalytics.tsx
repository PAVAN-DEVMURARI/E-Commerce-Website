import React from 'react';

const AdminAnalytics: React.FC = () => {
  // Mock data - replace with real analytics data
  const salesData = {
    totalRevenue: 45672.50,
    totalOrders: 234,
    avgOrderValue: 195.18,
    conversionRate: 3.2
  };

  const monthlyData = [
    { month: 'Jan', revenue: 4200, orders: 28 },
    { month: 'Feb', revenue: 3800, orders: 24 },
    { month: 'Mar', revenue: 5200, orders: 32 },
    { month: 'Apr', revenue: 4700, orders: 29 },
    { month: 'May', revenue: 5800, orders: 38 },
    { month: 'Jun', revenue: 6200, orders: 41 }
  ];

  const topProducts = [
    { name: 'Wireless Headphones', sales: 45, revenue: 2250 },
    { name: 'Smart Watch', sales: 38, revenue: 7600 },
    { name: 'Laptop Bag', sales: 32, revenue: 1600 },
    { name: 'USB-C Cable', sales: 28, revenue: 560 },
    { name: 'Phone Case', sales: 25, revenue: 750 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
        <div className="flex space-x-2">
          <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>Last 6 months</option>
            <option>Last year</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200">
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-md">
              <span className="text-2xl">💰</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${salesData.totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-green-600">+12.5% from last month</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-md">
              <span className="text-2xl">📦</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{salesData.totalOrders}</p>
              <p className="text-sm text-blue-600">+8.3% from last month</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-md">
              <span className="text-2xl">🎯</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
              <p className="text-2xl font-bold text-gray-900">${salesData.avgOrderValue}</p>
              <p className="text-sm text-purple-600">+4.2% from last month</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-md">
              <span className="text-2xl">📈</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{salesData.conversionRate}%</p>
              <p className="text-sm text-yellow-600">+0.8% from last month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue</h3>
          <div className="space-y-3">
            {monthlyData.map((data, index) => (
              <div key={data.month} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 w-12">{data.month}</span>
                <div className="flex-1 mx-4">
                  <div className="bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-blue-600 h-4 rounded-full"
                      style={{ width: `${(data.revenue / 6200) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-900 w-16">
                  ${data.revenue.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Orders Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Orders</h3>
          <div className="space-y-3">
            {monthlyData.map((data, index) => (
              <div key={data.month} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 w-12">{data.month}</span>
                <div className="flex-1 mx-4">
                  <div className="bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-green-600 h-4 rounded-full"
                      style={{ width: `${(data.orders / 41) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-900 w-12">
                  {data.orders}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Top Selling Products</h3>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sales
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topProducts.map((product, index) => (
                  <tr key={product.name}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">
                          #{index + 1} {product.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.sales} units</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ${product.revenue.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(product.sales / 45) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">
                          {Math.round((product.sales / 45) * 100)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Customer Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Demographics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">New Customers</span>
              <span className="font-semibold">64%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Returning Customers</span>
              <span className="font-semibold">36%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average Session Duration</span>
              <span className="font-semibold">4m 32s</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Bounce Rate</span>
              <span className="font-semibold">23.5%</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Traffic Sources</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Direct</span>
              <span className="font-semibold">42%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Search Engines</span>
              <span className="font-semibold">31%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Social Media</span>
              <span className="font-semibold">18%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Email Marketing</span>
              <span className="font-semibold">9%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
