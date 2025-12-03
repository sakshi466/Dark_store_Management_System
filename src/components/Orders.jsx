import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import axios from 'axios';

const Orders = () => {

const [orders, setOrders]= useState([]);

const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/order', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('pos-token')}`,
        },
      });
      if(response.data.success)
      {
        setOrders(response.data.orders);

      }
      else {
        alert("Failed to fetch products. Please try again");
      }
 
    } catch (error) {
      console.error('Error fetching :', error);
    }
  };

useEffect(() =>
{
  fetchOrders();
}, []);

  return (
      <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Order Management</h1>

    <div>
          <table className="w-full border-collapse border border-gray-300 shadow-sm rounded-md overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Product Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Category Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Quantity</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Total Price</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
             
              </tr>
            </thead>
            <tbody>
              {orders && orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{order.product?.name || "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2">
  {order.product?.categoryId?.categoryName || "N/A"}
</td>

                  <td className="border border-gray-300 px-4 py-2">{order.quantity}</td>
                  <td className="border border-gray-300 px-4 py-2">{order.totalPrice}</td>
               <td className="border px-4 py-2">
  {order.createdAt ? new Date(order.createdAt).toLocaleDateString() 
                   : new Date(order.orderDate).toLocaleDateString()}
</td>

                </tr>
              ))}
            </tbody>
          </table>          
        </div>
        </div>
  )
}

export default Orders
