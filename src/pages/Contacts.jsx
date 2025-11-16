import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Users, Plus, Upload, Trash2, Search } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const contacts = [
  { id: 1, email: 'juan.perez@example.com', name: 'Juan Pérez', list: 'Clientes VIP', subscribed_at: '2025-07-15' },
  { id: 2, email: 'maria.gomez@example.com', name: 'María Gómez', list: 'Newsletter General', subscribed_at: '2025-07-14' },
  { id: 3, email: 'test@test.dev', name: 'Test User', list: 'Pruebas Internas', subscribed_at: '2025-07-12' },
  { id: 4, email: 'ana.lopez@example.com', name: 'Ana López', list: 'Clientes VIP', subscribed_at: '2025-07-11' },
];

const Contacts = () => {
  const { toast } = useToast();

  const handleAction = () => {
    toast({ title: "🚧 Esta funcionalidad no está implementada todavía." });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-white flex items-center">
          <Users className="mr-3 h-8 w-8" />
          Contactos
        </h1>
        <div className="flex gap-2">
           <Button onClick={handleAction} variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Importar Contactos
          </Button>
          <Button onClick={handleAction} className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            Añadir Contacto
          </Button>
        </div>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input placeholder="Buscar por email o nombre..." className="pl-10" />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Lista</TableHead>
                <TableHead>Fecha de Suscripción</TableHead>
                <TableHead><span className="sr-only">Acciones</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell className="font-medium text-white">{contact.email}</TableCell>
                  <TableCell>{contact.name}</TableCell>
                  <TableCell>
                     <span className="bg-gray-700 text-gray-300 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">{contact.list}</span>
                  </TableCell>
                  <TableCell>{contact.subscribed_at}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={handleAction}>
                      <Trash2 className="h-4 w-4 text-red-400" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Contacts;