import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Users, Plus, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';


const teamMembers = [
    { id: 1, name: 'Ana García', email: 'ana.garcia@example.com', role: 'Owner', lastAccess: 'Hace 2 horas', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100' },
    { id: 2, name: 'Carlos Rodriguez', email: 'carlos.r@example.com', role: 'Admin', lastAccess: 'Hace 1 día', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100' },
    { id: 3, name: 'Beatriz Lima', email: 'beatriz.lima@example.com', role: 'Developer', lastAccess: 'Hace 5 horas', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100' },
    { id: 4, name: 'David Martinez', email: 'david.m@example.com', role: 'Viewer', lastAccess: 'Hace 3 días', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100' },
];

const UserManagement = () => {
  const { toast } = useToast();

  const getRoleClasses = (role) => {
    switch (role) {
      case 'Owner': return 'bg-purple-500/20 text-purple-400';
      case 'Admin': return 'bg-blue-500/20 text-blue-400';
      case 'Developer': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const handleAction = () => {
     toast({ title: "🚧 Esta funcionalidad no está implementada aún—¡pero no te preocupes! ¡Puedes solicitarla en tu próximo prompt! 🚀" })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white flex items-center">
          <Users className="mr-3 h-8 w-8" />
          Gestión de Usuarios
        </h1>
        <Button 
          onClick={handleAction}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Invitar Usuario
        </Button>
      </div>

       <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Miembro</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Último Acceso</TableHead>
                <TableHead><span className="sr-only">Acciones</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.id} className="hover:bg-gray-700/30">
                  <TableCell>
                    <div className="flex items-center">
                      <img className="h-10 w-10 rounded-full" alt={`Avatar de ${member.name}`} src={`${member.avatar}`} />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">{member.name}</div>
                        <div className="text-sm text-gray-400">{member.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleClasses(member.role)}`}>
                      {member.role}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-gray-300">{member.lastAccess}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0" disabled={member.role === 'Owner'}>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuItem onClick={handleAction}>Editar Rol</DropdownMenuItem>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-400 focus:bg-red-500/10 focus:text-red-300">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Eliminar Usuario
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción no se puede deshacer. Esto eliminará permanentemente al usuario de tu equipo.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction onClick={handleAction}>Eliminar</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
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

export default UserManagement;