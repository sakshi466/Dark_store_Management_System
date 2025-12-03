// import React from "react";
// import { useState, useEffect } from "react";
// import axios from "axios";

// const Profile = () => {


//   const [user, setUser] = useState({
//     name: "",
//     email:"",
//     address: "",
//     password:""
//   });

//   const fetchUser = async () =>
//     {
//        try {
//       const response = await axios.get('http://localhost:5000/api/users/profile', {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('pos-token')}`,
//         },
//       });
//       if(response.data.success)
//       {
//         setUser({
//             name: response.data.user.name,
//             email: response.data.user.email,
//             address: response.data.user.address,
//             password: ""

//         })
//       }
//       else {
//         alert("Failed to fetch User Information. Please try again");
//       }
 
//     } catch (error) {
//       console.error('Error fetching profile :', error);
//     }
//   };
// const handleSubmit = (e) => {
//   e.preventDefault();
//   console.log("Updating user:", user);
//   // Call API here: axios.put('/api/user/profile', user, { headers: ... })
// };



// useEffect(() =>
// {
//   fetchUser();
// }, [])

// return (
//     <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//         User Profile
//       </h2>

//       <form className="space-y-4" onSubmit={handleSubmit}>
//         <div>
//           <label
//             htmlFor="Name"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Name
//           </label>
//           <input
//             type="text"
//             id="Name"
//             name="name"
//             //value={user.name}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           />
//         </div>

//         <div>
//           <label
//             htmlFor="email"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//            // value={user.email}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           />
//         </div>

//         <div>
//           <label
//             htmlFor="Address"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Address
//           </label>
//           <input
//             type="text"
//             id="Address"
//             name="address"
//            // value={user.address}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
//         >
//           Update Profile
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Profile;
import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    password: ""
  });

  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
        },
      });

      if (response.data.success) {
        setUser({
          name: response.data.user.name,
          email: response.data.user.email,
          address: response.data.user.address,
          password: "",
        });
      } else {
        alert("Failed to fetch User Information. Please try again");
      }
    } catch (error) {
      console.error("Error fetching profile :", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // ✅ handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updating user:", user);
    // Call API here: axios.put("http://localhost:5000/api/users/profile", user, { headers: ... })
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        User Profile
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="Name"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="Address" className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            id="Address"
            name="address"
            value={user.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
