import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';

import AdminLayout from '@/components/layout/AdminLayout';
import PublicLayout from '@/components/layout/PublicLayout';
import PortalLayout from '@/components/layout/PortalLayout';
import AuthLayout from '@/components/layout/AuthLayout';

import Dashboard from '@/pages/Dashboard';
import AdminDashboard from '@/pages/AdminDashboard';
import Templates from '@/pages/Templates';
import Campaigns from '@/pages/Campaigns';
import Empresas from '@/pages/Empresas';
import EmpresaForm from '@/pages/EmpresaForm';
import Usuarios from '@/pages/Usuarios';
import Ajustes from '@/pages/Ajustes';
import LoginPage from '@/pages/LoginPage';
import AdminLoginPage from '@/pages/AdminLoginPage';

import LandingPage from '@/pages/LandingPage';
import EmpresaPage from '@/pages/EmpresaPage';
import SuccessPage from '@/pages/SuccessPage';
import NoticiaPage from '@/pages/NoticiaPage';

import PortalDashboard from '@/pages/portal/PortalDashboard';
import PortalPerfil from '@/pages/portal/PortalPerfil';
import PortalServicios from '@/pages/portal/PortalServicios';
import PortalNoticias from '@/pages/portal/PortalNoticias';

import PrivateRoute from '@/components/PrivateRoute';

// Marketplace público solamente

const PrivateRouteWithLayout = ({ children, layout: Layout, isAdminRoute = false }) => (
  <PrivateRoute requiredRole={isAdminRoute ? 'superadmin' : null}>
    <Layout>{children}</Layout>
  </PrivateRoute>
);

function App() {
  return (
    <AuthProvider>
      <HelmetProvider>
        <main className="min-h-screen bg-gray-900 text-white">
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/empresa/:id" element={<EmpresaPage />} />
              <Route path="/noticia/:id" element={<NoticiaPage />} />
              <Route path="/exito" element={<SuccessPage />} />
            </Route>

            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/admin/login" element={<AdminLoginPage />} />
            </Route>

            <Route
              path="/portal/*"
              element={
                <PrivateRouteWithLayout layout={PortalLayout}>
                  <Routes>
                    <Route path="dashboard" element={<PortalDashboard />} />
                    <Route path="perfil" element={<PortalPerfil />} />
                    <Route path="servicios" element={<PortalServicios />} />
                    <Route path="noticias" element={<PortalNoticias />} />
                    <Route index element={<Navigate to="dashboard" />} />
                  </Routes>
                </PrivateRouteWithLayout>
              }
            />

            <Route
              path="/admin/*"
              element={
                <PrivateRouteWithLayout layout={AdminLayout} isAdminRoute={true}>
                  <Routes>
                    <Route index element={<AdminDashboard />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="empresas" element={<Empresas />} />
                    <Route path="empresas/nueva" element={<EmpresaForm />} />
                    <Route path="empresas/editar/:id" element={<EmpresaForm />} />
                    <Route path="usuarios" element={<Usuarios />} />
                    <Route path="ajustes" element={<Ajustes />} />
                    <Route path="templates" element={<Templates />} />
                    <Route path="templates/new" element={<Templates />} />
                    <Route path="templates/:id/edit" element={<Templates />} />
                    <Route path="campaigns" element={<Campaigns />} />
                    <Route path="campaigns/new" element={<Campaigns />} />
                  </Routes>
                </PrivateRouteWithLayout>
              }
            />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Toaster position="top-right" />
        </main>
      </HelmetProvider>
    </AuthProvider>
  );
}

export default App;