
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Save, Settings as SettingsIcon, Database } from 'lucide-react';

const Ajustes = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: '✅ Ajustes Guardados',
      description: 'Tus ajustes han sido guardados (simulación).',
    });
  };
  
  const handleConnectDb = () => {
    toast({
      title: '🚧 Conexión pendiente',
      description: 'Por favor, completa la integración de Supabase desde el botón "Integrations" en la esquina superior derecha.',
    });
  };

  return (
    <div className="space-y-8">
       <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-500/20 rounded-full">
              <SettingsIcon className="h-8 w-8 text-amber-400" />
            </div>
            <div>
              <CardTitle className="text-2xl">Ajustes Generales</CardTitle>
              <CardDescription>
                Configura los ajustes principales de la plataforma.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="site-name">Nombre del Sitio</Label>
            <Input id="site-name" defaultValue="Marketplaces Camacero" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-email">Email del Administrador</Label>
            <Input id="admin-email" type="email" defaultValue="admin@camacero.com" />
          </div>
          <div className="space-y-2">
            <Label>Clave de API de Google Maps (para mapas)</Label>
            <Input placeholder="Introduce tu clave de API aquí" />
            <p className="text-xs text-gray-400 pt-1">
              Esta clave es necesaria para mostrar los mapas en los perfiles de empresa.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave} className="w-full bg-amber-500 hover:bg-amber-600 text-black">
            <Save className="mr-2 h-4 w-4" />
            Guardar Cambios
          </Button>
        </CardFooter>
      </Card>
      
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
           <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/20 rounded-full">
              <Database className="h-8 w-8 text-green-400" />
            </div>
            <div>
              <CardTitle className="text-2xl">Base de Datos</CardTitle>
              <CardDescription>
                Gestiona la conexión con tu base de datos en tiempo real.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-lg bg-gray-800 text-center">
            <p className="text-gray-300">Actualmente los datos se guardan de forma local.</p>
            <p className="text-sm text-gray-400 mt-1">Para habilitar la base de datos en tiempo real, conecta tu cuenta de Supabase.</p>
          </div>
        </CardContent>
        <CardFooter>
            <Button onClick={handleConnectDb} variant="outline" className="w-full border-green-500 text-green-400 hover:bg-green-500/10 hover:text-green-300">
                Conectar con Supabase
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Ajustes;
