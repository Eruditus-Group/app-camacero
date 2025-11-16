import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { Card } from '@/components/ui/card';
import { Save } from 'lucide-react';

const BulkEdit = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos
    const sampleProducts = [
      { id: 1, name: 'Laptop Pro', sku: 'LP123', price: '1200.00', stock_quantity: 50 },
      { id: 2, name: 'Smartphone X', sku: 'SPX456', price: '800.00', stock_quantity: 120 },
      { id: 3, name: 'Auriculares Inalámbricos', sku: 'HW789', price: '150.00', stock_quantity: 0 },
      { id: 4, name: 'Teclado Mecánico', sku: 'KM101', price: '95.00', stock_quantity: 75 },
    ];
    setProducts(sampleProducts);
    setLoading(false);
  }, []);

  const handleInputChange = (e, productId, field) => {
    const newProducts = products.map(p => {
      if (p.id === productId) {
        return { ...p, [field]: e.target.value };
      }
      return p;
    });
    setProducts(newProducts);
  };

  const handleSave = () => {
    toast({
      title: '✅ Cambios Guardados (Simulación)',
      description: 'Todos los cambios en los productos han sido guardados.',
    });
    navigate('/products');
  };

  if (loading) {
    return <div className="text-center text-gray-400">Cargando productos para edición...</div>;
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Edición Rápida de Productos</h1>
        <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/products')}>Cancelar</Button>
            <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Guardar Cambios
            </Button>
        </div>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead className="w-[150px]">SKU</TableHead>
              <TableHead className="w-[120px]">Precio</TableHead>
              <TableHead className="w-[120px]">Stock</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map(product => (
              <TableRow key={product.id}>
                <TableCell>
                  <Input 
                    value={product.name} 
                    onChange={(e) => handleInputChange(e, product.id, 'name')}
                    className="bg-transparent border-gray-700"
                  />
                </TableCell>
                <TableCell>
                  <Input 
                    value={product.sku} 
                    onChange={(e) => handleInputChange(e, product.id, 'sku')}
                    className="bg-transparent border-gray-700"
                  />
                </TableCell>
                <TableCell>
                  <Input 
                    type="number"
                    value={product.price} 
                    onChange={(e) => handleInputChange(e, product.id, 'price')}
                    className="bg-transparent border-gray-700"
                  />
                </TableCell>
                <TableCell>
                  <Input 
                    type="number"
                    value={product.stock_quantity} 
                    onChange={(e) => handleInputChange(e, product.id, 'stock_quantity')}
                    className="bg-transparent border-gray-700"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </motion.div>
  );
};

export default BulkEdit;