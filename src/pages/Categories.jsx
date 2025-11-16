import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Categories = () => {
  const { toast } = useToast();
  const sampleCategories = [
    { id: 1, name: 'Electrónica', slug: 'electronica', count: 12 },
    { id: 2, name: 'Móviles', slug: 'moviles', count: 5 },
    { id: 3, name: 'Accesorios', slug: 'accesorios', count: 23 },
    { id: 4, name: 'Periféricos', slug: 'perifericos', count: 8 },
  ];

  const handleAddCategory = (e) => {
    e.preventDefault();
    toast({ title: "🚧 Funcionalidad no implementada." });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start"
    >
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Añadir Nueva Categoría</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <div>
                <Input placeholder="Nombre de la categoría" required />
              </div>
              <div>
                <Input placeholder="Slug (opcional)" />
              </div>
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                <PlusCircle className="mr-2 h-4 w-4" /> Añadir Categoría
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <div className="md:col-span-2">
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead><span className="sr-only">Acciones</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleCategories.map(cat => (
                <TableRow key={cat.id}>
                  <TableCell className="font-medium text-white">{cat.name}</TableCell>
                  <TableCell>{cat.slug}</TableCell>
                  <TableCell>{cat.count}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => toast({ title: "🚧 Funcionalidad no implementada." })}>
                      <Trash2 className="h-4 w-4 text-red-400" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </motion.div>
  );
};

export default Categories;