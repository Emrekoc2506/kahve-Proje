import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contest/AuthContext';

const PrivateRoute: React.FC = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Yükleniyor...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;