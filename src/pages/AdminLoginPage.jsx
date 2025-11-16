
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, LogIn, HardHat, User, Lock, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '../contexts/AuthContext';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { loginSuperAdmin } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await loginSuperAdmin(formData.email, formData.password);
      if (success) {
        toast({
          title: '👑 Acceso concedido',
          description: 'Bienvenido, Super Administrador'
        });
        navigate('/admin');
      } else {
        toast({
          title: '❌ Acceso denegado',
          description: 'Credenciales de super admin incorrectas',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: '❌ Error de autenticación',
        description: 'Ha ocurrido un error inesperado',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setFormData({
      email: 'superadmin@camacero.com',
      password: 'superadmin123'
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="inline-block mx-auto mb-4 p-3 bg-purple-500/20 rounded-full">
          <Shield className="h-10 w-10 text-purple-400" />
        </div>
        <CardTitle className="text-2xl">Panel de Super Admin</CardTitle>
        <CardDescription>Acceso exclusivo para administradores.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Email de Administrador
            </Label>
            <Input 
              id="email" 
              name="email"
              type="email" 
              placeholder="superadmin@camacero.com" 
              value={formData.email}
              onChange={handleInputChange}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Contraseña Maestra
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
            className="w-full bg-purple-600 hover:bg-purple-700"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Verificando acceso...
              </div>
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4" />
                Acceder como Super Admin
              </>
            )}
          </Button>
        </form>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={fillDemoCredentials}
            className="w-full"
          >
            Usar credenciales de demostración
          </Button>
        </div>
      </CardContent>
       <CardFooter className="flex-col gap-4 text-center">
        <p className="text-xs text-gray-400">¿Eres una empresa registrada?</p>
        <Button variant="link" className="text-amber-400" onClick={() => navigate('/login')}>
          <HardHat className="mr-2 h-4 w-4" />
          Ir al Login de Empresas
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AdminLoginPage;
