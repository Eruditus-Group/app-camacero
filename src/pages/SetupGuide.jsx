import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Rocket, Settings } from 'lucide-react';

const SetupGuide = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="w-full max-w-2xl text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-purple-500/20 rounded-full">
                <Rocket className="h-10 w-10 text-purple-400" />
              </div>
            </div>
            <CardTitle className="text-3xl">¡Bienvenido a tu Sitio Headless!</CardTitle>
            <CardDescription className="text-lg text-gray-400 mt-2">
              Estás a un solo paso de lanzar tu sitio web ultrarrápido.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p>
              Para empezar, necesitamos conectar tu frontend con tu sitio de WordPress.
              Por favor, ve a la página de configuración para introducir la URL de tu sitio.
            </p>
            <Button onClick={() => navigate('/settings')} size="lg" className="bg-purple-600 hover:bg-purple-700">
              <Settings className="mr-2 h-5 w-5" />
              Ir a Configuración
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SetupGuide;