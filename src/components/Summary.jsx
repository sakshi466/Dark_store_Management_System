import React, { useState, useEffect } from "react";
import axios from "axios";

const Summary = () => {
  const [dashboardData, setDashboardData] = useState({
    totalProducts: 0,
    totalStock: 0,
    ordersToday: 0,     
    revenue: 0,
    outOfStock: [],
    highestSaleProduct: null,
    lowStock: [],
  });

const [loading, setLoading]=useState(false);

  // Fetch dashboard data from API
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/dashboard",
        { headers:
        {
          Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
        },
    });
    setDashboardData(response.data.dashboardData);

    } catch (error) {
      alert(error.message)
      //console.error("Error fetching dashboard data:", error);
    } finally
  {
    setLoading(false);
  }
  } 

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if(loading)
  {
    return <div> Loading ... </div>
  }

  return (
    <div className="p-5">
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

      {/* Top Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
          <p className="text-lg font-semibold">Total Products</p>
          <p className="text-2xl font-bold">{dashboardData.totalProducts}</p>
        </div>

        <div className="bg-green-500 text-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
          <p className="text-lg font-semibold">Total Stock</p>
          <p className="text-2xl font-bold">{dashboardData.totalStock}</p>
        </div>

        <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
          <p className="text-lg font-semibold">Orders Today</p>
          <p className="text-2xl font-bold">{dashboardData.ordersToday}</p>
        </div>

        <div className="bg-purple-500 text-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
          <p className="text-lg font-semibold">Revenue</p>
          <p className="text-2xl font-bold">${dashboardData.revenue}</p>
        </div>
      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Out of Stock Products
          </h3>
          <p className="text-2xl font-bold text-red-500">
            {dashboardData.outOfStock}
          </p>
        </div> */}
<div className="bg-white p-4 rounded-lg shadow-md">
  <h3 className="text-xl font-semibold text-gray-800 mb-3">
    Out of Stock Products
  </h3>

  {dashboardData.outOfStock.length > 0 ? (
    <ul className="space-y-2">
      {dashboardData.outOfStock.map((product, index) => (
        <li key={index} className="text-gray-600">
          {product.name}{" "}
          <span className="text-gray-400">
            ({product.categoryId?.categoryName || "No Category"})
          </span>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-gray-500">No products out of stock.</p>
  )}
</div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Highest Sale Product
          </h3>
          <p className="text-2xl font-bold text-green-600">
            {
            dashboardData.highestSaleProduct?.name ?
            (
              <div>
                <p><strong>Name:</strong> {dashboardData.highestSaleProduct.name}</p>
                <p><strong>Category:</strong> {dashboardData.highestSaleProduct.category}</p>
                <p><strong>Total Units Sold:</strong> ${dashboardData.highestSaleProduct.totalQuantity}</p>
              </div>
            ) : (
              <span className="text-gray-500">No Sales</span>
            )
             
            }
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Low Stock Products
          </h3>
          <p className="text-2xl font-bold text-yellow-600">
            {
            dashboardData.lowStock.length > 0 ? (
              <ul className="list-disc list-inside">
                {dashboardData.lowStock.map((product, index) => (
                  <li key={index} className="text-gray-600">
                    <strong>{product.name}</strong> - {product.stock} left{" "}
                    <span className="text-gray-400">{product.categoryId.categoryName}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <span className="text-gray-500">No Low Stock Products</span>
            )
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
