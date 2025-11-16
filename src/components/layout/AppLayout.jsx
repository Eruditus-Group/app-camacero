
import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Building, Users, Settings, LayoutDashboard, HardHat } from 'lucide-react';
import { motion } from 'framer-motion';

const AppLayout = () => {
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    if (path.startsWith('/empresas/editar')) return 'Editar Empresa';
    if (path.startsWith('/empresas/nueva')) return 'Nueva Empresa';
    if (path.startsWith('/empresas')) return 'Directorio de Empresas';
    if (path.startsWith('/usuarios')) return 'Gestión de Usuarios';
    if (path.startsWith('/ajustes')) return 'Ajustes';
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
            <NavLink to="/" className="flex items-center gap-2 font-semibold">
              <HardHat className="h-6 w-6 text-amber-400" />
              <span className="">Marketplaces Camacero</span>
            </NavLink>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <NavLink to="/" className={navLinkClasses} end>
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </NavLink>
              <NavLink to="/empresas" className={navLinkClasses}>
                <Building className="h-4 w-4" />
                Empresas
              </NavLink>
              <NavLink to="/usuarios" className={navLinkClasses}>
                <Users className="h-4 w-4" />
                Usuarios
              </NavLink>
              <NavLink to="/ajustes" className={navLinkClasses}>
                <Settings className="h-4 w-4" />
                Ajustes
              </NavLink>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b border-gray-800 bg-gray-900/50 px-4 lg:h-[60px] lg:px-6">
           <div className="w-full flex-1">
            <h1 className="text-lg font-semibold">{getPageTitle()}</h1>
           </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 lg:p-10 bg-gray-900/80">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
