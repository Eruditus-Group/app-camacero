
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { HardHat, LogIn, Shield, Eye, EyeOff, User, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginCompany } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDemoCredentials, setShowDemoCredentials] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const userData = await loginCompany(formData.email, formData.password);
      
      // Redirigir según el rol del usuario
      switch (userData.role) {
        case 'admin':
        case 'manager':
          navigate('/portal/dashboard');
          break;
        case 'user':
          navigate('/portal/perfil');
          break;
        case 'operator':
          navigate('/portal/servicios');
          break;
        default:
          navigate('/portal/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = (role) => {
    const demoCredentials = {
      admin: { email: 'admin@aceriaspaz.com', password: 'admin123' },
      manager: { email: 'gerente@gerdau.com', password: 'gerente123' },
      user: { email: 'usuario@ternium.com', password: 'usuario123' },
      operator: { email: 'operador@sidenal.com', password: 'operador123' }
    };
    
    setFormData(demoCredentials[role]);
  };

  return (
    <div className="space-y-6">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="inline-block mx-auto mb-4 p-3 bg-amber-500/20 rounded-full">
            <HardHat className="h-10 w-10 text-amber-400" />
          </div>
          <CardTitle className="text-2xl">Portal de Empresas</CardTitle>
          <CardDescription>Inicia sesión para gestionar tu perfil empresarial</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Email Corporativo
              </Label>
              <Input 
                id="email" 
                name="email"
                type="email" 
                placeholder="tu@empresa.com" 
                value={formData.email}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Contraseña
              </Label>
              <div className="relative">
                <Input 
                  id="password" 
                  name="password"
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  required 
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-amber-500 hover:bg-amber-600 text-black"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  Iniciando sesión...
                </div>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Ingresar al Portal
                </>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center space-y-4">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowDemoCredentials(!showDemoCredentials)}
            className="w-full"
          >
            {showDemoCredentials ? 'Ocultar' : 'Ver'} Credenciales Demo
          </Button>
          <div className="space-y-2">
             <p className="text-sm text-gray-500">
               ¿Necesitas ayuda? <a href="#" className="text-amber-400 hover:underline">Contacta soporte</a>
             </p>
             <p className="text-xs text-gray-400">
               ¿Eres administrador de la plataforma? 
               <button 
                 onClick={() => navigate('/admin/login')}
                 className="text-purple-400 hover:underline ml-1"
               >
                 Acceso Super Admin
               </button>
             </p>
           </div>
        </CardFooter>
      </Card>

      {/* Demo Credentials */}
      {showDemoCredentials && (
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Credenciales de Demostración
            </CardTitle>
            <CardDescription>
              Haz clic en cualquier rol para llenar automáticamente las credenciales
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => fillDemoCredentials('admin')}
                className="justify-start"
              >
                <div className="flex items-center justify-between w-full">
                  <span>Administrador</span>
                  <Badge className="bg-purple-500/20 text-purple-400">Acceso Total</Badge>
                </div>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fillDemoCredentials('manager')}
                className="justify-start"
              >
                <div className="flex items-center justify-between w-full">
                  <span>Gerente</span>
                  <Badge className="bg-blue-500/20 text-blue-400">Gestión</Badge>
                </div>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fillDemoCredentials('user')}
                className="justify-start"
              >
                <div className="flex items-center justify-between w-full">
                  <span>Usuario</span>
                  <Badge className="bg-green-500/20 text-green-400">Estándar</Badge>
                </div>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fillDemoCredentials('operator')}
                className="justify-start"
              >
                <div className="flex items-center justify-between w-full">
                  <span>Operador</span>
                  <Badge className="bg-gray-500/20 text-gray-400">Solo Lectura</Badge>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LoginPage;
