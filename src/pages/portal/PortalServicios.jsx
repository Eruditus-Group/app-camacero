
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { PlusCircle, Trash2, Briefcase } from 'lucide-react';

const sampleServices = [
  { id: 1, name: 'Consultoría en Aceros', description: 'Asesoría especializada en selección y aplicación de aceros.' },
  { id: 2, name: 'Fabricación de Estructuras', description: 'Diseño y fabricación de estructuras metálicas a medida.' },
];

const PortalServicios = () => {
  const { toast } = useToast();
  const [services, setServices] = useState(sampleServices);
  const [newService, setNewService] = useState({ name: '', description: '' });

  const handleAddService = () => {
    if (!newService.name || !newService.description) {
        toast({ title: '❌ Error', description: 'Por favor completa todos los campos.', variant: 'destructive'});
        return;
    }
    setServices([...services, { ...newService, id: Date.now() }]);
    setNewService({ name: '', description: '' });
    toast({ title: '✅ Servicio Añadido', description: 'Tu nuevo servicio ha sido agregado.'});
  };
  
  const handleDelete = (serviceId) => {
    setServices(services.filter(s => s.id !== serviceId));
    toast({ title: '🗑️ Servicio Eliminado', description: 'El servicio ha sido eliminado.' });
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold flex items-center gap-2"><Briefcase /> Gestionar Mis Servicios</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Mis Servicios Actuales</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {services.map(service => (
                        <div key={service.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50">
                            <div>
                                <p className="font-semibold text-white">{service.name}</p>
                                <p className="text-sm text-gray-400">{service.description}</p>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => handleDelete(service.id)}>
                                <Trash2 className="h-4 w-4 text-red-400" />
                            </Button>
                        </div>
                    ))}
                    {services.length === 0 && <p className="text-gray-500">Aún no tienes servicios. ¡Añade uno!</p>}
                </CardContent>
            </Card>
        </div>
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Añadir Nuevo Servicio</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input 
                        placeholder="Nombre del Servicio" 
                        value={newService.name}
                        onChange={(e) => setNewService({...newService, name: e.target.value})}
                    />
                    <Textarea 
                        placeholder="Descripción del Servicio"
                        value={newService.description}
                        onChange={(e) => setNewService({...newService, description: e.target.value})}
                    />
                    <Button onClick={handleAddService} className="w-full bg-red-600 hover:bg-red-700 text-white">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Añadir Servicio
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default PortalServicios;
