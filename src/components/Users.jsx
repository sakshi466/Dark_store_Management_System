import axios from "axios";
import { useEffect, useState} from "react";

const Users = () => {

    const [formData, setFormData] = useState(
        {
            name: "",
            email: "",
            password: "",
            address:"", 
            role:"",
    })

    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] =useState(false);


    const fetchUsers = async () => {
       setLoading(true);
       try{

        const response = await axios.get("http://localhost:5000/api/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('pos-token')}`
          }
        });
        
        setUsers(response.data.users);
        setFilteredUsers(response.data.users);
        setLoading(false);
       }
       catch (error)
       {
        console.error("Error fetching categories:", error);
       }
       finally
       {
        setLoading(false);
       }
}
   useEffect(() =>{
      fetchUsers();
    }, []);

const handleSearch= (e) =>
  {
     setFilteredUsers(
      users.filter((user) =>
      user.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    )
  } 

    const handleSubmit = async (e) => {
      e.preventDefault();
      
    const response = await axios.post("http://localhost:5000/api/users/add", 
        formData,
        {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('pos-token')}`
            },
        }
      );
      if(response.data.success) {
        // Handle success (e.g., show a success message, reset form, etc.)
          
            alert('Users added successfully');
            setFormData({
            name: "",
            email: "",
            password: "",
            address:"", 
            role:"",

            });
            fetchUsers(); 
     } else {
        // Handle error (e.g., show an error message)
        alert('Failed to add users');
      }

      }
 
     
  
const handleChange = (e) =>
  {
    const {name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }      

const handleDeleteEdit = async (id) =>
{
  const confirmDelete = window.confirm("Are you sure you want to delete this User?");
  if(confirmDelete)
  {
    try{
      const response = await axios.delete(`http://localhost:5000/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('pos-token')}`
        }
      });
      if(response.data.success) {
        alert('User deleted successfully');
        fetchUsers(); 
      } else {
        alert('Failed to delete User');
      }
    }
    catch(error)  
    {
      console.error("Error deleting User:", error);
      
    }
  }

}

    if(loading) 
      {
      return <div>Loading...</div>;
    }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-8">Users Management</h1>

      {/* Flex Layout: Form (left) + List (right) */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Add Category Form */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-center text-xl font-bold mb-4">Add User</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                   value={formData.name}
                  className="border w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                   value={formData.email}
                  placeholder="Enter email"
                  className="border w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onChange={handleChange}
                />
              </div>
               <div>
                <input
                  type="password"
                  name="password"
                   value={formData.password}
                  placeholder="Enter password"
                  className="border w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onChange={handleChange}
                />
              </div>
               <div>
                <input
                  type="address"
                  name="address"
                   value={formData.address}
                  placeholder="Enter address"
                  className="border w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onChange={handleChange}
                />
              </div>
               <div>
                <select
                 name="role" 
                 value={formData.role}
                 className="border w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                 onChange={handleChange}
                  >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="customer">Customer</option>
                </select>
              </div>

              <div>
                <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
                onSubmit={handleSubmit}
              >
               Add User
              </button>
              </div>
            </form>
          </div>
        </div>

        {/* Category List */}
       <div className="w-full lg:w-2/3">
         <div className="bg-white shadow-md rounded-lg p-6">

          <input type="text" onChange={handleSearch} placeholder="Search user.." className="p-2 bg-white w-full mb-4 rounded-2xl"/>
          
           <h2 className="text-center text-xl font-bold mb-4">Users List</h2>
           <ul className="space-y-2">
             {
                filteredUsers && filteredUsers.map((user) => (
               <li key={user._id} className="border-b py-2">
                 <h3 className="font-semibold">{user.name}</h3>
                 <p className="text-sm text-gray-600">{user.email}</p>
                 <p className="text-sm text-gray-600">{user.address}</p>
                 <p className="text-sm text-gray-600">{user.role}</p>

                 <button 
                 className="text-red-600 hover:text-red-800"
                 onClick={() => handleDeleteEdit(user._id)}>
                Delete
                </button>
               </li>
             ))}
           </ul>
           
         </div>
       </div>
      </div>
    </div>
  );
};

export default Users;
