
import React from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Building, Users, Settings, LayoutDashboard, HardHat, Home, LogOut, User, Mail, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '../../contexts/AuthContext';

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast({ title: '👑 Sesión de Super Admin cerrada.' });
    navigate('/admin/login');
  };

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/admin' || path === '/admin/') return 'Dashboard Administrativo';
    if (path.endsWith('/dashboard')) return 'Dashboard Estadísticas';
    if (path.includes('/empresas/editar')) return 'Editar Empresa';
    if (path.includes('/empresas/nueva')) return 'Nueva Empresa';
    if (path.includes('/empresas')) return 'Directorio de Empresas';
    if (path.includes('/usuarios')) return 'Gestión de Usuarios';
    if (path.includes('/ajustes')) return 'Ajustes';
    return 'Marketplaces Camacero';
  };

  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-white ${
      isActive ? 'bg-gray-700 text-white' : 'text-gray-400'
    }`;

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r border-gray-800 bg-gray-900/50 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b border-gray-800 px-4 lg:h-[60px] lg:px-6">
            <NavLink to="/admin" className="flex items-center gap-2 font-semibold">
              <HardHat className="h-6 w-6 text-red-500" />
              <span className="">Camacero Admin</span>
            </NavLink>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <NavLink to="/admin" className={navLinkClasses} end>
                <LayoutDashboard className="h-4 w-4" />
                Dashboard Principal
              </NavLink>
              <NavLink to="/admin/dashboard" className={navLinkClasses}>
                <LayoutDashboard className="h-4 w-4" />
                Estadísticas
              </NavLink>
              <NavLink to="/admin/empresas" className={navLinkClasses}>
                <Building className="h-4 w-4" />
                Empresas
              </NavLink>
              <NavLink to="/admin/usuarios" className={navLinkClasses}>
                <Users className="h-4 w-4" />
                Usuarios
              </NavLink>
              <NavLink to="/admin/templates" className={navLinkClasses}>
                <Mail className="h-4 w-4" />
                Plantillas
              </NavLink>
              <NavLink to="/admin/campaigns" className={navLinkClasses}>
                <Send className="h-4 w-4" />
                Campañas
              </NavLink>
              <NavLink to="/admin/ajustes" className={navLinkClasses}>
                <Settings className="h-4 w-4" />
                Ajustes
              </NavLink>
            </nav>
          </div>
          <div className="mt-auto p-4 space-y-2">
            <Button asChild variant="outline" className="w-full">
              <a href="/" target="_blank" rel="noopener noreferrer">
                <Home className="mr-2 h-4 w-4" /> Ver Sitio Público
              </a>
            </Button>
            <Button variant="destructive" className="w-full" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b border-gray-800 bg-gray-900/50 px-4 lg:h-[60px] lg:px-6">
           <div className="w-full flex-1">
            <h1 className="text-lg font-semibold">{getPageTitle()}</h1>
           </div>
           <div className="flex items-center gap-4">
             {user && (
               <div className="flex items-center gap-2 text-sm text-gray-300">
                 <User className="h-4 w-4" />
                 <span>{user.name}</span>
                 <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">
                   {user.role === 'superadmin' ? 'Super Admin' : user.role}
                 </span>
               </div>
             )}
           </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 lg:p-10 bg-gray-900/80">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children || <Outlet />}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
