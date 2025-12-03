// import { useState, useEffect } from 'react'
// import axios from 'axios';



// const Suppliers = () => {
//   const [addEditModal, setAddEditModal] = useState(null);
//   const [editSupplier, setEditSupplier] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     address: '',
//     phone: '',
//   });

//   const [suppliers, setSuppliers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [filteredSuppliers, setFilteredSuppliers] = useState([]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const fetchSuppliers = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get("http://localhost:5000/api/supplier", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('pos-token')}`
//         }
//       });
//       console.log("Fetched suppliers:", response.data.suppliers);
//       setSuppliers(response.data.suppliers);
//       setFilteredSuppliers(response.data.suppliers);
//     } catch (error) {
//       console.error("Error fetching suppliers:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSuppliers();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (editSupplier) {
//       try {
//         const response = await axios.put(
//           `http://localhost:5000/api/supplier/${editSupplier}`,
//           formData,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem('pos-token')}`
//             },
//           }
//         );
//         if (response.data.success) {
//             fetchSuppliers();
//           alert('Supplier Updated successfully');
//           setAddEditModal(false);
//           setFormData({ name: '', email: '', address: '', phone: '' });
//         } else {
//           alert('Failed to update supplier');
//         }
//       } catch (error) {
//         alert("Error updating supplier");
//       }
//     } else {
//       try {
//         const response = await axios.post(
//           "http://localhost:5000/api/supplier/add",
//           formData,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem('pos-token')}`
//             },
//           }
//         );
//         if (response.data.success) {
//           alert("Supplier added successfully");
//           setAddEditModal(false);
//           setFormData({ name: '', email: '', address: '', phone: '' });
//           fetchSuppliers();
//         } else {
//           alert('Failed to add Supplier. Please try again');
//         }
//       } catch (error) {
//         alert("Error adding Supplier");
//       }
//     }
//   };

//   const handleEdit = async (supplier) => {
//     setFormData({
//       name: supplier.name,
//       email: supplier.email,
//       address: supplier.address,
//       phone: supplier.phone,
//     });
//     setAddEditModal(supplier._id);
//   };

//   const closeModal = () => {
//     setAddEditModal(false);
//     setFormData({ name: '', email: '', address: '', phone: '' });
//     setEditSupplier(null);
//   };

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this supplier?");
//     if (confirmDelete) {
//       try {
//         const response = await axios.delete(`http://localhost:5000/api/supplier/${id}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('pos-token')}`
//           }
//         });
//         if (response.data.success) {
//           alert('Supplier deleted successfully');
//           fetchSuppliers();
//         } else {
//           alert('Failed to delete supplier');
//         }
//       } catch (error) {
//         console.error("Error deleting supplier:", error);
//       }
//     }
//   };

//   const handleSearch = (e) => {
//     setFilteredSuppliers(
//       suppliers.filter((supplier) =>
//         supplier.name.toLowerCase().includes(e.target.value.toLowerCase())
//       )
//     );
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Supplier Management</h1>
//       <div className="flex items-center justify-between mb-6">
//         <input
//           type="text"
//           placeholder="Search Suppliers..."
//           className="border p-2 rounded-md w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           onChange={handleSearch}
//         />
//         <button
//           onClick={() => setAddEditModal(true)}
//           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//         >
//           Add Supplier
//         </button>
//       </div>

//       {loading ? (
//         <h1 className="text-gray-500">Loading...</h1>
//       ) : (
//         <div>
//         <table className="w-full border-collapse border border-gray-300 shadow-sm rounded-md overflow-hidden">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
//               <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
//               <th className="border border-gray-300 px-4 py-2 text-left">Address</th>
//               <th className="border border-gray-300 px-4 py-2 text-left">Phone</th>
//               <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredSuppliers.map((supplier) => (
//               <tr key={supplier._id} className="hover:bg-gray-50">
//                 <td className="border border-gray-300 px-4 py-2">{supplier.name}</td>
//                 <td className="border border-gray-300 px-4 py-2">{supplier.email}</td>
//                 <td className="border border-gray-300 px-4 py-2">{supplier.address}</td>
//                 <td className="border border-gray-300 px-4 py-2">{supplier.phone}</td>
//                 <td className="border border-gray-300 px-4 py-2 text-center space-x-2">
//                   <button
//                     onClick={() => handleEdit(supplier)}
//                     className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(supplier._id)}
//                     className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {filteredSuppliers.length === 0 && <h1 className="text-gray-500">No suppliers found</h1>}
//         </div>
//       )}

//       {addEditModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
//             <h1 className="text-xl font-bold mb-4">{editSupplier ? "Edit Supplier" : "Add Supplier"}</h1>
//             <button
//               onClick={closeModal}
//               className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold"
//             >
//               X
//             </button>
//             <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <input
//                 type="text"
//                 name="address"
//                 placeholder="Address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 required
//                 className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <input
//                 type="text"
//                 name="phone"
//                 placeholder="Phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 required
//                 className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />

//               <div className="flex flex-col gap-2">
//                 <button
//                   type="submit"
//                   className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
//                 >
//                   {addEditModal ? "Save Changes" : "Add Supplier"}
//                 </button>

//                 {addEditModal && (
//                   <button
//                     type="button"
//                     className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
//                     onClick={closeModal}
//                   >
//                     Cancel
//                   </button>
//                 )}
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// };

// export default Suppliers;

import { useState, useEffect } from 'react';
import axios from 'axios';

const Suppliers = () => {
  const [addEditModal, setAddEditModal] = useState(null);
  const [editSupplier, setEditSupplier] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
  });

  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/supplier", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('pos-token')}`
        }
      });
      setSuppliers(response.data.suppliers);
      setFilteredSuppliers(response.data.suppliers);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editSupplier) {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/supplier/${editSupplier}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('pos-token')}`
            },
          }
        );
        if (response.data.success) {
          fetchSuppliers();
          alert('Supplier Updated successfully');
          setAddEditModal(false);
          setFormData({ name: '', email: '', address: '', phone: '' });
          setEditSupplier(null);   // ✅ reset after update
        } else {
          alert('Failed to update supplier');
        }
      } catch (error) {
        alert("Error updating supplier");
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/supplier/add",
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('pos-token')}`
            },
          }
        );
        if (response.data.success) {
          alert("Supplier added successfully");
          setAddEditModal(false);
          setFormData({ name: '', email: '', address: '', phone: '' });
          fetchSuppliers();
        } else {
          alert('Failed to add Supplier. Please try again');
        }
      } catch (error) {
        alert("Error adding Supplier");
      }
    }
  };

  const handleEdit = (supplier) => {
    setFormData({
      name: supplier.name,
      email: supplier.email,
      address: supplier.address,
      phone: supplier.phone,
    });
    setEditSupplier(supplier._id);   // ✅ fixed: properly set editSupplier
    setAddEditModal(true);           // ✅ open modal for editing
  };

  const closeModal = () => {
    setAddEditModal(false);
    setFormData({ name: '', email: '', address: '', phone: '' });
    setEditSupplier(null);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this supplier?");
    if (confirmDelete) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/supplier/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('pos-token')}`
          }
        });
        if (response.data.success) {
          alert('Supplier deleted successfully');
          fetchSuppliers();
        } else {
          alert('Failed to delete supplier');
        }
      } catch (error) {
        console.error("Error deleting supplier:", error);
      }
    }
  };

  const handleSearch = (e) => {
    setFilteredSuppliers(
      suppliers.filter((supplier) =>
        supplier.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Supplier Management</h1>
      <div className="flex items-center justify-between mb-6">
        <input
          type="text"
          placeholder="Search Suppliers..."
          className="border p-2 rounded-md w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleSearch}
        />
        <button
          onClick={() => setAddEditModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Add Supplier
        </button>
      </div>

      {loading ? (
        <h1 className="text-gray-500">Loading...</h1>
      ) : (
        <div>
          <table className="w-full border-collapse border border-gray-300 shadow-sm rounded-md overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Address</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Phone</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map((supplier) => (
                <tr key={supplier._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{supplier.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{supplier.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{supplier.address}</td>
                  <td className="border border-gray-300 px-4 py-2">{supplier.phone}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(supplier)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(supplier._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredSuppliers.length === 0 && <h1 className="text-gray-500">No suppliers found</h1>}
        </div>
      )}

      {addEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <h1 className="text-xl font-bold mb-4">{editSupplier ? "Edit Supplier" : "Add Supplier"}</h1>
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold"
            >
              X
            </button>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
                className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
                >
                  {editSupplier ? "Save Changes" : "Add Supplier"}
                </button>

                {addEditModal && (
                  <button
                    type="button"
                    className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
};

export default Suppliers;

