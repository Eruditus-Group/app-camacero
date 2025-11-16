import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, User, Bell, LogOut } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';


const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user_authenticated');
    toast({
      title: "👋 ¡Hasta pronto!",
      description: "Has cerrado sesión correctamente.",
    });
    navigate('/login');
  };

  return (
    <header className="sticky top-0 bg-gray-900/50 backdrop-blur-lg z-40">
      <div className="flex items-center justify-between h-20 px-6 lg:px-8 border-b border-gray-700">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-300 hover:text-white lg:hidden"
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          <h1 className="text-2xl font-bold text-white hidden lg:block">Panel de Administración</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toast({ title: "🚧 Funcionalidad no implementada." })}
            className="text-gray-300 hover:text-white"
          >
            <Bell className="h-6 w-6" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-white"
              >
                <User className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => toast({ title: '🚧 No implementado' })}>
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast({ title: '🚧 No implementado' })}>
                Facturación
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast({ title: '🚧 No implementado' })}>
                Ajustes
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar Sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;