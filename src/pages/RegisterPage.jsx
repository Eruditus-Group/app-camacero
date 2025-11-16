import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Zap } from 'lucide-react';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('user_authenticated', 'true');
    toast({
      title: '✅ ¡Cuenta Creada!',
      description: 'Te hemos redirigido a tu nuevo panel de control.',
    });
    navigate('/dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <Card className="w-full max-w-md mx-auto bg-gray-800/50 border-gray-700">
          <CardHeader className="text-center">
            <div className="mx-auto bg-purple-500/20 text-purple-400 rounded-full p-3 w-fit mb-4">
                <Zap className="h-8 w-8" />
            </div>
            <CardTitle className="text-3xl font-bold text-white">Crea tu Cuenta</CardTitle>
            <CardDescription className="text-gray-400">
              Únete a nosotros y empieza a construir hoy mismo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre Completo</Label>
                <Input id="name" type="text" placeholder="Tu Nombre" required className="bg-gray-900 border-gray-600 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="tu@email.com" required className="bg-gray-900 border-gray-600 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input id="password" type="password" placeholder="••••••••" required className="bg-gray-900 border-gray-600 text-white" />
              </div>
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                Crear Cuenta Gratis
              </Button>
            </form>
             <p className="mt-6 text-center text-sm text-gray-400">
              ¿Ya tienes una cuenta?{' '}
              <Link to="/login" className="font-medium text-purple-400 hover:underline">
                Inicia Sesión
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default RegisterPage;