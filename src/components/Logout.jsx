import React from 'react'
import { useAuth } from '../context/AuthContext';   
import { useNavigate } from 'react-router';

const Logout = () => {

  const navigate = useNavigate();
  const {logout} = useAuth();  
  logout();
  navigate('/login');

}

export default Logout
