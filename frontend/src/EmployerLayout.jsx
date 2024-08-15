import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from './useToken';


const EmployerLayout = ({ children }) => {
    const { token, userInfo } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token || userInfo.role !== 'employer') {
            navigate('/login')
        }
    }, [token, userInfo, navigate]);

    return (
        <div>
            {children}
        </div>
    );
};

export default EmployerLayout

