import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, PlusCircle, ListFilter, Upload, Download, Edit } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Papa from 'papaparse';
import { getAllProducts } from '@/lib/supabaseProducts';

const Products = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataSource, setDataSource] = useState('mock'); // 'supabase' o 'mock'
  const fileInputRef = useRef(null);

  const sampleProducts = [
    { id: 1, name: 'Laptop Pro', price: '1200.00', sku: 'LP123', stock_quantity: 50, status: 'publish', categories: ['Electrónica'], tags: ['laptop', 'pro'] },
    { id: 2, name: 'Smartphone X', price: '800.00', sku: 'SPX456', stock_quantity: 120, status: 'publish', categories: ['Electrónica', 'Móviles'], tags: ['smartphone'] },
    { id: 3, name: 'Auriculares Inalámbricos', price: '150.00', sku: 'HW789', stock_quantity: 0, status: 'publish', categories: ['Accesorios'], tags: ['audio', 'wireless'] },
    { id: 4, name: 'Teclado Mecánico', price: '95.00', sku: 'KM101', stock_quantity: 75, status: 'draft', categories: ['Periféricos'], tags: ['gaming', 'teclado'] },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      
      try {
        const { products: loadedProducts, error } = await getAllProducts();
        
        if (error) {
          console.warn('Error cargando productos:', error);
          setDataSource('mock');
          setProducts(sampleProducts);
          toast({
            title: "⚠️ Modo Sin Conexión",
            description: "Mostrando datos de ejemplo. Configura Supabase para datos reales.",
            variant: "destructive"
          });
        } else {
          setDataSource('supabase');
          setProducts(loadedProducts || []);
          toast({
            title: "✅ Productos Cargados",
            description: `Se cargaron ${loadedProducts.length} productos desde la base de datos.`,
          });
        }
      } catch (err) {
        console.error('Error al cargar productos:', err);
        setDataSource('mock');
        setProducts(sampleProducts);
        toast({
          title: "⚠️ Error de Conexión",
          description: "Mostrando datos de ejemplo.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [toast]);

  const handleDelete = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
    toast({
      title: "✅ Producto Eliminado",
      description: `El producto con ID ${productId} ha sido eliminado (simulación).`,
    });
  };

  const handleExport = () => {
    const csv = Papa.unparse(products);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'productos.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({ title: '✅ Exportación Completa', description: 'Tus productos se han exportado a productos.csv.' });
  };
  
  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          console.log("Datos importados (simulación):", results.data);
          toast({
            title: '✅ Importación Exitosa (Simulación)',
            description: `Se han procesado ${results.data.length} productos del archivo.`,
          });
        },
        error: (error) => {
          toast({
            variant: "destructive",
            title: '❌ Error de Importación',
            description: error.message,
          });
        }
      });
    }
     event.target.value = '';
  };


  if (loading) {
    return <div className="text-center text-gray-400">Cargando productos...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-400 bg-red-500/10 p-4 rounded-lg">
        <p>{error}</p>
        <Button onClick={() => navigate('/settings')} className="mt-4">Ir a Ajustes</Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Input placeholder="Filtrar productos..." className="max-w-sm" />
          <Badge variant={dataSource === 'supabase' ? 'default' : 'secondary'}>
            {dataSource === 'supabase' ? '🔗 Conectado a Supabase' : '📱 Datos Locales'}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Filtro</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
              <DropdownMenuItem>Activo</DropdownMenuItem>
              <DropdownMenuItem>Borrador</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-9 gap-1" onClick={() => fileInputRef.current.click()}>
            <Upload className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Importar</span>
            <input type="file" ref={fileInputRef} className="hidden" accept=".csv" onChange={handleImport} />
          </Button>
          <Button size="sm" variant="outline" className="h-9 gap-1" onClick={handleExport}>
            <Download className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Exportar</span>
          </Button>
          <Button size="sm" variant="outline" className="h-9 gap-1" onClick={() => navigate('/products/bulk-edit')}>
            <Edit className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Edición Rápida</span>
          </Button>
          <Button size="sm" className="h-9 gap-1 bg-purple-600 hover:bg-purple-700" onClick={() => navigate('/products/new')}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Añadir Producto</span>
          </Button>
        </div>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]"><Checkbox /></TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Categorías</TableHead>
              <TableHead>Etiquetas</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead><span className="sr-only">Acciones</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map(product => (
              <TableRow key={product.id}>
                <TableCell><Checkbox /></TableCell>
                <TableCell className="font-medium text-white">{product.name}</TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>{product.stock_quantity > 0 ? product.stock_quantity : <span className="text-red-400">Agotado</span>}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell className="text-xs">{product.categories.join(', ')}</TableCell>
                <TableCell className="text-xs">{product.tags.join(', ')}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 text-xs rounded-full ${product.status === 'publish' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                    {product.status === 'publish' ? 'Publicado' : 'Borrador'}
                  </span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => navigate(`/products/edit/${product.id}`)}>Editar</DropdownMenuItem>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Eliminar</DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción no se puede deshacer. Esto eliminará permanentemente el producto.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(product.id)}>Eliminar</AlertDialogAction>
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
      </Card>
    </motion.div>
  );
};

export default Products;