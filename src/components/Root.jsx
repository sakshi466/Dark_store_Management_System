import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext.jsx';
import React from 'react';

const Root = () =>
{
    const {user} = useAuth();

    const navigate = useNavigate();

    useEffect(() => 
    {
        if(user)
        {
            if(user.role === 'admin')
            {
                navigate('/admin-dashboard');
            }
            else if(user.role === 'customer')
            {
                navigate('/customer-dashboard');
            }
            else{
                navigate('/login');
            }
        }
        else{
            navigate('/login');
        }
    }, [user, navigate])
}

export default Root;