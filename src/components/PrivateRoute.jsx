import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children, requiredRole = null, requiredPermission = null }) => {
  const { user, isAuthenticated, hasPermission } = useAuth();
  const location = useLocation();

  const isAdminRoute = requiredRole === 'superadmin';

  // No autenticado → enviar al login correcto
  if (!isAuthenticated) {
    const loginPath = isAdminRoute ? '/admin/login' : '/login';
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  // Requiere rol específico y no coincide
  if (requiredRole && user?.role !== requiredRole) {
    const redirectPath = isAdminRoute ? '/admin/login' : '/portal/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  // Requiere permiso específico y no lo tiene
  if (requiredPermission && !hasPermission(requiredPermission)) {
    const redirectPath = user?.role === 'superadmin' ? '/admin' : '/portal/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default PrivateRoute;