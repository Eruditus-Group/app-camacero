
import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Users, Plus, Trash2, MoreHorizontal } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const teamMembers = [
    { id: 1, name: 'Admin Principal', email: 'admin@camacero.com', role: 'Superadmin', lastAccess: 'Hace 2 horas' },
    { id: 2, name: 'Editor de Contenido', email: 'editor@camacero.com', role: 'Editor', lastAccess: 'Hace 1 día' },
];

const Usuarios = () => {
  const { toast } = useToast();

  const getRoleClasses = (role) => {
    switch (role) {
      case 'Superadmin': return 'bg-purple-500/20 text-purple-400';
      case 'Editor': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const handleAction = () => {
     toast({ title: "🚧 Esta funcionalidad no está implementada aún." })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-2"><Users /> Gestión de Usuarios</h1>
        <Button onClick={handleAction} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Invitar Usuario
        </Button>
      </div>

       <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuario</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Último Acceso</TableHead>
                <TableHead><span className="sr-only">Acciones</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="font-medium text-white">{member.name}</div>
                    <div className="text-sm text-gray-400">{member.email}</div>
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
                        <Button variant="ghost" className="h-8 w-8 p-0" disabled={member.role === 'Superadmin'}>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={handleAction}>Editar Rol</DropdownMenuItem>
                        <DropdownMenuItem onClick={handleAction} className="text-red-400">Eliminar</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Usuarios;
