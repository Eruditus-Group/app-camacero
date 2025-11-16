import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { PlugZap, Plus, Server, Mail, MoreVertical } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const connections = [
  { id: 1, type: 'SendGrid', email: 'api@example.com', status: 'Activo', icon: Mail },
  { id: 2, type: 'SMTP Personalizado', email: 'smtp.office365.com', status: 'Activo', icon: Server },
  { id: 3, type: 'Mailgun', email: 'api@example.com', status: 'Inactivo', icon: Mail },
];

const Connections = () => {
  const { toast } = useToast();
  
  const handleAction = () => {
    toast({ title: "🚧 Funcionalidad no implementada" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white flex items-center">
          <PlugZap className="mr-3 h-8 w-8" />
          Conexiones de Envío
        </h1>
        <Button onClick={handleAction} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Añadir Conexión
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {connections.map((conn, index) => (
          <motion.div
            key={conn.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-4">
                  <conn.icon className="h-8 w-8 text-purple-400" />
                  <CardTitle>{conn.type}</CardTitle>
                </div>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={handleAction}>Editar</DropdownMenuItem>
                      <DropdownMenuItem onClick={handleAction} className="text-red-400">Eliminar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">{conn.email}</p>
              </CardContent>
              <CardFooter>
                 <span className={`text-xs font-semibold px-2 py-1 rounded-full ${conn.status === 'Activo' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                    {conn.status}
                  </span>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Connections;