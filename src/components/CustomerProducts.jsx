import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CustomerProducts = () => {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [suppliers, setSuppliers] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [orderData, setOrderData] = useState(
    {
        productId: "",
        quantity: 1,
        total: 0,
        stock: 0,
        price: 0
    }
  )

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/product', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('pos-token')}`,
        },
      })
      if (response.data.success) {
        setCategories(response.data.categories)
        setProducts(response.data.products)
        setFilteredProducts(response.data.products)
      } else {
        alert('Failed to fetch products. Please try again')
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const handleSearch = (e) => {
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    )
  }
  const handleChangeCategory = (e) => {
  const selectedId = e.target.value;
     setFilteredProducts(
      products.filter((product) => product.categoryId._id === selectedId)
     )
  }
 
const handleOrderChange = (product) => {

    setOrderData({
        productId: product._id,
        quantity: 1,
        total:product.total,
        stock: product.stock,
        price: product.price
    })
    setOpenModal(true);
}

const closeModel = () => {
setOpenModal(false);

}

const handleSubmit = async (e) =>
{
  e.preventDefault();
  try 
  {
    const response = await axios.post('http://localhost:5000/api/order/add',orderData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('pos-token')}`,
        },
      })
      if (response.data.success) 
      {
        setOpenModal(false);
        setOrderData(
            {
                productId: "",
                quantity: 1,
                stock: 0,
                total: 0,
                price: 0
            }
        );
        alert("Order added successfuly")
      }
  }
  catch (error) 
  {
    alert("Error", error.message);
  }
}

const increasedQuantity = (e) =>
{

     if( parseInt(e.target.value) > orderData.stock)
    {
     alert("Not available stock")
    }
    else
    {
        setOrderData((prev) => ({
            ...prev,
            quantity: parseInt(e.target.value),
            total: parseInt(e.target.value) * parseInt(orderData.price)
        }))
    }
}

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div>
      <h2>Products</h2>

      <div className="my-4 flex gap-4">
        <div>
            <select name="category" id="" onChange={handleChangeCategory}>
                <option value="">Select Category</option>
                {
                    categories.map((cat, index) => (
                        <option key={cat._id} value={cat._id}>{cat.categoryName}</option>
                    ))
                }
            </select>
        </div>
        <input
          type="text"
          placeholder="Search products..."
          onChange={handleSearch}
          className="border border-gray-300 rounded-md px-3 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <table className="w-full border-collapse border border-gray-300 shadow-sm rounded-md overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Category Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Supplier Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Stock</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product._id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{product.name}</td>
              <td className="border border-gray-300 px-4 py-2">{product.categoryId.categoryName}</td>
              <td className="border border-gray-300 px-4 py-2">{product.supplierId.name}</td>
              <td className="border border-gray-300 px-4 py-2">{product.price}</td>
              <td className="border border-gray-300 px-4 py-2">
                {product.stock === 0 ? (
                  <span className="bg-red-100 text-red-500 px-2 py-1 rounded-2xl">{product.stock}</span>
                ) : product.stock < 5 ? (
                  <span className="bg-yellow-100 text-yellow-500 px-2 py-1 rounded-2xl">{product.stock}</span>
                ) : (
                  <span className="bg-green-100 text-green-500 px-2 py-1 rounded-2xl">{product.stock}</span>
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center space-x-2">
                <button
                  onClick={() => handleOrderChange(product)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-yellow-600"
                >
                  Order
                </button>
             
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {openModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <h1 className='text-xl font-bold'> Place Order </h1>
            <button
              onClick={closeModel}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold"
            >
              X
            </button>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="number"
                name="quantity"
                placeholder="Increase Quantity"
                value={orderData.quantity}
                onChange={increasedQuantity}
                required
                className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            <p>{orderData.quantity * orderData.price}</p>
              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
                >
                 Save Changes
                </button>

                <button
                  type="button"
                  className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
                  onClick={closeModel}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomerProducts
