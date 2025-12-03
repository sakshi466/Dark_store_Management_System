// // import React, { useState} from 'react'
// // import {useNavigate} from 'react-router'
// // import {useAuth} from '../context/AuthContext.jsx'
// // import axios from 'axios';

// // const Login = () => {

// //     const [email, setEmail] = useState("");
// //     const [password, setPassword] = useState("");
// //     const [loading, setLoading] = useState(false);
// //     const [error, setError] = useState(null);
// //     const navigate = useNavigate();

// //     const {login} = useAuth();

// //     const handleSubmit = async (e) =>
// //     {
// //         e.preventDefault();
// //         setLoading(true);
// //         setError(null);

// //         try{
// //             const response = await axios.post('http://localhost:5000/api/auth/login', {email: email, password});
// //             if(response.data.status)
// //             {
// //                 await login(response.data.user, response.data.token);
// //                 if(response.data.user.role === 'admin')
// //                 {
// //                     navigate('/admin/dashboard');
// //                 }
// //                 else{
// //                     navigate('/customer/dashboard');
// //                 }
// //             }
// //             else{
// //                 alert(response.data.error);
// //             }
// //         }
// //         catch(error)
// //         {
// //               setError(error.message);
// //         }
// //         finally
// //           {
// //             setLoading(false);
// //         }
        
// //     }

// //   return (
// //      <div className="login-container">
// //       <h2>Inventory Management System</h2>
// //      <div>
// //         <h2>Login</h2>
// //         {
// //           error && (
// //             <div className='bg-red-200 text-red-700 p-2 mb-4 rounded'>
// //               {error}
// //             </div>
// //           )
// //         }
      
// //       <form onSubmit={handleSubmit} className="login-form">
// //         <div className="form-group">
// //           <label htmlFor="email">Email</label>
// //           <input
// //             type="email"
// //             id="email"
// //             name="email"
// //             onChange={(e) => setEmail(e.target.value)}
// //             required
// //           />
// //         </div>

// //         <div className="form-group">
// //           <label htmlFor="password">Password</label>
// //           <input
// //             type="password"
// //             id="password"
// //             name="password"
// //             onChange={(e) => setPassword(e.target.value)}
// //             required
// //           />
// //         </div>

// //         <button type="submit">Login</button>
// //         {loading ? "Loading..." : "Login"} 
// //       </form>
// //      </div>
// //     </div>
// //   );
// // };

// // export default Login;


// import React, { useState } from "react";
// import { useNavigate } from "react-router";
// import { useAuth } from "../context/AuthContext.jsx";
// import axios from "axios";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const { login } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.post("http://localhost:5000/api/auth/login", {
//         email,
//         password,
//       });

//       if (response.data.status) {
//         await login(response.data.user, response.data.token);

//         if (response.data.user.role === "admin") {
//           navigate("/admin/dashboard");
//         } else {
//           navigate("/customer/dashboard");
//         }
//       } else {
//         alert(response.data.error);
//       }
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex h-screen items-center justify-center bg-gray-100">
//       <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
//           Inventory Management System
//         </h2>

//         <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
//           Login
//         </h3>

//         {error && (
//           <div className="bg-red-100 text-red-700 p-3 mb-4 rounded-lg text-sm">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:bg-gray-400"
//           >
//             {loading ? "Loading..." : "Login"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;




import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      if (response.data.success)
         {
        await login(response.data.user, response.data.token);

        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        }
         else {
          navigate("/customer-dashboard");
        }
      }
       else {
        alert(response.data.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      // keep loading visible for 800ms (feel smoother)
      setTimeout(() => setLoading(false), 800);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Inventory Management System
        </h2>

        <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
          Login
        </h3>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 mb-4 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:bg-gray-400"
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            )}
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
