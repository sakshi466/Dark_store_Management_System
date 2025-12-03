import React, {useState, useEffect} from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router'
import {NavLink} from 'react-router'

import {
  FaHome,
  FaTable,
  FaBox,
  FaTruck,
  FaShoppingCart,
  FaUsers,
  FaCog,
  FaSignOutAlt
} from 'react-icons/fa'


const Sidebar = () => {
  const menuItems = [
    {
      name: 'Dashboard',
      path: '/admin-dashboard',
      icon: <FaHome />,
      isParent: true,
    },
    {
      name: 'Categories',
      path: '/admin-dashboard/categories',
      icon: <FaTable />,
      isParent: false,
    },
    {
      name: 'Products',
      path: '/admin-dashboard/products',
      icon: <FaBox />,
      isParent: false,
    },
    {
      name: 'Suppliers',
      path: '/admin-dashboard/suppliers',
      icon: <FaTruck />,
      isParent: false,   
    },
    {
      name: 'Orders',
      path: '/admin-dashboard/orders',
      icon: <FaShoppingCart />,
      isParent: false,
    },
    {
      name: 'Users',
      path: '/admin-dashboard/users',
      icon: <FaUsers />,
      isParent: false,
    },
    {
      name: 'Profile',
      path: '/admin-dashboard/profile',
      icon: <FaCog />,
      isParent: false,
    },
    {
      name: 'Logout',
      path: '/admin-dashboard/logout',
      icon: <FaSignOutAlt />,
      isParent: false,
    }
  ]

    const customerItems = [
    {
      name: 'Products',
      path: '/customer-dashboard',
      icon: <FaBox />,
      isParent: true,
    },
    { name: 'Orders',
      path: '/customer-dashboard/orders',
      icon: <FaShoppingCart />,
      isParent: false,
    },
    {
      name: 'Profile',
      path: '/customer-dashboard/profile',
      icon: <FaCog />,
      isParent: false,
    },
    {
      name: 'Logout',
      path: '/customer-dashboard/logout',
      icon: <FaSignOutAlt />,
      isParent: false,
    }
  ]

  const { user } = useAuth();
  const navigate = useNavigate();
  const [menuLinks, setMenuLinks] = useState(customerItems);
  
  useEffect(() => { 

      if(user && user.role === 'admin'){
         setMenuLinks(menuItems);
       
      }
      else{
        setMenuLinks(customerItems);
      }
  }, []);

  return (
    <div className="h-screen w-64 bg-gray-900 text-gray-100 flex flex-col shadow-xl">
  
      <div className="flex items-center justify-center py-6 border-b border-gray-700">
        <span className="hidden md:block text-2xl font-bold tracking-wide">
          Inventory MS
        </span>
        <span className="md:hidden text-2xl font-bold">IMS</span>
      </div>

      <div className="flex-1 overflow-y-auto mt-4">
        <ul className="space-y-2 px-4">
          {
          menuLinks.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                end={item.isParent}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 
                  ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`
                }
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
