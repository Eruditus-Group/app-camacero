
import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, User, Briefcase, LogOut, HardHat, ExternalLink, Newspaper, Building } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { useAuth } from '../../contexts/AuthContext';

const PortalLayout = ({ children }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast({ title: '👋 Sesión cerrada', description: 'Has salido de tu portal de empresa.' });
    navigate('/login');
  };

  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-white ${
      isActive ? 'bg-red-500/20 text-red-400' : 'text-gray-400'
    }`;
  
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r border-gray-800 bg-gray-900/50 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b border-gray-800 px-4 lg:h-[60px] lg:px-6">
            <div className="flex items-center gap-2 font-semibold">
              <HardHat className="h-6 w-6 text-red-500" />
              <div className="flex flex-col">
                <span className="text-white text-sm">Portal Empresa</span>
                {user && (
                  <span className="text-xs text-gray-400">{user.company}</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <NavLink to="/portal/dashboard" className={navLinkClasses}>
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </NavLink>
              <NavLink to="/portal/perfil" className={navLinkClasses}>
                <User className="h-4 w-4" />
                Mi Perfil
              </NavLink>
              <NavLink to="/portal/servicios" className={navLinkClasses}>
              <Briefcase className="h-4 w-4" />
              Servicios
            </NavLink>
              <NavLink to="/portal/noticias" className={navLinkClasses}>
                <Newspaper className="h-4 w-4" />
                Noticias
              </NavLink>
            </nav>
          </div>
          <div className="mt-auto p-4 space-y-2">
            <Button asChild variant="outline" className="w-full">
              <a href="/empresa/1" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" /> Ver Mi Perfil Público
              </a>
            </Button>
             <Button variant="outline" className="w-full" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b border-gray-800 bg-gray-900/50 px-4 lg:h-[60px] lg:px-6">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-lg font-semibold text-white">Dashboard Empresarial</h1>
            {user && (
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Building className="h-4 w-4" />
                <span>{user.name}</span>
                <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">
                  {user.role}
                </span>
              </div>
            )}
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-900/80">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PortalLayout;
