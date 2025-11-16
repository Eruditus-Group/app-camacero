import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, PlusCircle, Trash2, GripVertical } from 'lucide-react';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [product, setProduct] = useState({
    name: '',
    regular_price: '',
    sale_price: '',
    description: '',
    short_description: '',
    sku: '',
    stock_quantity: '',
    manage_stock: true,
    stock_status: 'instock',
    categories: [],
    tags: [],
    images: [],
    acf: [],
    type: 'simple',
  });
  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing) {
      toast({
        title: "🚧 Simulación de API",
        description: `Cargando datos de muestra para el producto ID: ${id}.`,
      });
      setProduct({
        name: 'Laptop Pro',
        regular_price: '1200.00',
        sale_price: '1100.00',
        description: 'Una laptop potente para profesionales, con procesador de última generación y pantalla retina.',
        short_description: 'Laptop profesional de alto rendimiento.',
        sku: 'LP123',
        stock_quantity: '50',
        manage_stock: true,
        stock_status: 'instock',
        categories: [{id: 1, name: 'Electrónica'}],
        tags: [{id: 1, name: 'laptop'}, {id: 2, name: 'pro'}],
        images: [
          { id: 1, src: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600' },
          { id: 2, src: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600' },
        ],
        acf: [
          { key: 'procesador', value: 'Intel i9' },
          { key: 'memoria_ram', value: '32GB DDR5' },
        ],
        type: 'simple',
      });
    }
  }, [id, isEditing, toast]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };
  
  const handleAcfChange = (index, field, value) => {
    const newAcf = [...product.acf];
    newAcf[index][field] = value;
    setProduct(prev => ({ ...prev, acf: newAcf }));
  };

  const addAcfField = () => {
    setProduct(prev => ({ ...prev, acf: [...prev.acf, { key: '', value: '' }] }));
  };

  const removeAcfField = (index) => {
    const newAcf = product.acf.filter((_, i) => i !== index);
    setProduct(prev => ({ ...prev, acf: newAcf }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: `✅ Producto ${isEditing ? 'Actualizado' : 'Creado'}`,
      description: `El producto "${product.name}" ha sido guardado con éxito (simulación).`,
    });
    navigate('/products');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">{isEditing ? 'Editar Producto' : 'Nuevo Producto'}</h1>
            <div className="flex gap-2">
                <Button variant="outline" onClick={() => navigate('/products')}>Cancelar</Button>
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700">Guardar Producto</Button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Detalles del Producto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Nombre del Producto</Label>
                  <Input id="name" name="name" value={product.name} onChange={handleChange} required />
                </div>
                <div>
                  <Label htmlFor="description">Descripción Larga</Label>
                  <textarea id="description" name="description" value={product.description} onChange={handleChange} rows={8} className="w-full bg-gray-700/50 border border-gray-600 rounded-lg text-white p-2 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>Datos del producto</CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="general">
                        <TabsList>
                            <TabsTrigger value="general">General</TabsTrigger>
                            <TabsTrigger value="inventory">Inventario</TabsTrigger>
                            <TabsTrigger value="shipping">Envío</TabsTrigger>
                            <TabsTrigger value="advanced">Avanzado</TabsTrigger>
                        </TabsList>
                        <TabsContent value="general" className="pt-4 space-y-4">
                            <div>
                                <Label htmlFor="regular_price">Precio Normal ($)</Label>
                                <Input id="regular_price" name="regular_price" type="number" value={product.regular_price} onChange={handleChange} required />
                            </div>
                             <div>
                                <Label htmlFor="sale_price">Precio Rebajado ($)</Label>
                                <Input id="sale_price" name="sale_price" type="number" value={product.sale_price} onChange={handleChange} />
                            </div>
                        </TabsContent>
                        <TabsContent value="inventory" className="pt-4 space-y-4">
                            <div>
                                <Label htmlFor="sku">SKU</Label>
                                <Input id="sku" name="sku" value={product.sku} onChange={handleChange} />
                            </div>
                            <div className="flex items-center space-x-2">
                                <input type="checkbox" id="manage_stock" name="manage_stock" checked={product.manage_stock} onChange={handleChange} />
                                <Label htmlFor="manage_stock">¿Gestionar inventario?</Label>
                            </div>
                            {product.manage_stock && (
                                <div>
                                    <Label htmlFor="stock_quantity">Cantidad en Stock</Label>
                                    <Input id="stock_quantity" name="stock_quantity" type="number" value={product.stock_quantity} onChange={handleChange} />
                                </div>
                            )}
                        </TabsContent>
                        <TabsContent value="shipping" className="pt-4">
                            <p className="text-gray-400">Funcionalidad de envío no implementada.</p>
                        </TabsContent>
                        <TabsContent value="advanced" className="pt-4">
                             <div>
                                <Label htmlFor="short_description">Descripción Corta</Label>
                                <textarea id="short_description" name="short_description" value={product.short_description} onChange={handleChange} rows={3} className="w-full bg-gray-700/50 border border-gray-600 rounded-lg text-white p-2 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Campos Personalizados (ACF)</CardTitle>
                <CardDescription>Añade metadatos personalizados a tu producto.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {product.acf.map((field, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input placeholder="Clave" value={field.key} onChange={(e) => handleAcfChange(index, 'key', e.target.value)} />
                    <Input placeholder="Valor" value={field.value} onChange={(e) => handleAcfChange(index, 'value', e.target.value)} />
                    <Button variant="ghost" size="icon" onClick={() => removeAcfField(index)}>
                      <Trash2 className="h-4 w-4 text-red-400" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" onClick={addAcfField}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Añadir Campo
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Galería del Producto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  {product.images.map((image, index) => (
                    <div key={image.id} className="relative group">
                      <img-replace src={image.src} alt={`Imagen de producto ${index + 1}`} className="aspect-square w-full rounded-md object-cover" />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="destructive" size="icon" className="h-8 w-8">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full">
                  <Upload className="mr-2 h-4 w-4" /> Añadir imágenes
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Categorías y Etiquetas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Categorías</Label>
                  <p className="text-sm text-gray-400">Funcionalidad no implementada. Mostrando datos de ejemplo.</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {product.categories.map(cat => <span key={cat.id} className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-md text-sm">{cat.name}</span>)}
                  </div>
                </div>
                <div>
                  <Label>Etiquetas</Label>
                   <p className="text-sm text-gray-400">Funcionalidad no implementada. Mostrando datos de ejemplo.</p>
                   <div className="flex flex-wrap gap-2 mt-2">
                    {product.tags.map(tag => <span key={tag.id} className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-md text-sm">{tag.name}</span>)}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default ProductForm;