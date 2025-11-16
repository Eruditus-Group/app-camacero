
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, PlusCircle, Trash2, Save, MapPin, Link as LinkIcon, Video, Image as ImageIcon, Package, Building, Users, Calendar, Award } from 'lucide-react';

function getNextCompanyId() {
  try {
    const keys = Object.keys(localStorage).filter(k => k.startsWith('companyProfile:'));
    const ids = keys.map(k => k.split(':')[1]).map(x => Number(x)).filter(n => !Number.isNaN(n));
    const maxId = ids.length ? Math.max(...ids) : 0;
    return String(maxId + 1);
  } catch {
    return String(Date.now());
  }
}

const EmpresaForm = ({ id: propId, returnPath, prefillFromUser = false }) => {
  const { id: paramId } = useParams();
  const id = propId || paramId;
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = Boolean(id);
  const { user, updateUserProfile } = useAuth();
  const fileInputRef = useRef(null);
  const logoInputRef = useRef(null);

  const [empresa, setEmpresa] = useState({
    name: '',
    description: '',
    category: '',
    size: '',
    foundedYear: '',
    employees: '',
    certifications: [],
    website: '',
    logo: '',
    gallery: [],
    videoUrl: '',
    socials: { facebook: '', instagram: '', x: '', linkedin: '' },
    contact: { phone: '', email: '', address: '' },
    mapLocation: '',
    products: [],
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!empresa.name?.trim()) e.name = 'Este campo es obligatorio';
    if (!empresa.category) e.category = 'Selecciona una categoría';
    if (!empresa.size) e.size = 'Selecciona un tamaño';
    if (!empresa.contact.email?.trim() || !empresa.contact.email.includes('@')) e.contactEmail = 'Email válido requerido';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  useEffect(() => {
    if (prefillFromUser && user) {
      setEmpresa(prev => ({
        ...prev,
        name: user.name || prev.name,
        category: user.category || prev.category,
        size: user.size || prev.size,
        foundedYear: user.foundedYear?.toString?.() || prev.foundedYear,
        employees: user.employees?.toString?.() || prev.employees,
        website: user.website || prev.website,
        logo: user.logo || prev.logo,
        socials: {
          facebook: user.socials?.facebook || prev.socials.facebook,
          instagram: user.socials?.instagram || prev.socials.instagram,
          x: user.socials?.x || prev.socials.x,
          linkedin: user.socials?.linkedin || prev.socials.linkedin,
        },
        contact: {
          phone: user.contact?.phone || prev.contact.phone,
          email: user.email || user.contact?.email || prev.contact.email,
          address: user.contact?.address || prev.contact.address,
        },
      }));
    } else if (isEditing) {
      try {
        const raw = localStorage.getItem(`companyProfile:${id}`);
        if (raw) {
          const profile = JSON.parse(raw);
          setEmpresa(prev => ({
            ...prev,
            ...profile,
          }));
          return;
        }
      } catch {}
      toast({
        title: "Cargando datos de empresa...",
        description: `Mostrando datos de ejemplo para la empresa ID: ${id}.`,
      });
      setEmpresa({
        name: 'Acerías Paz del Río',
        description: 'Somos una empresa siderúrgica integrada de Colombia, dedicada a la producción y transformación de acero. Ofrecemos un amplio portafolio de productos para los sectores de la construcción, la industria y el agro.',
        category: 'Siderúrgica',
        size: 'Grande',
        foundedYear: '1948',
        employees: '2500',
        certifications: ['ISO 9001', 'ISO 14001', 'OHSAS 18001'],
        website: 'https://www.pazdelrio.com.co',
        logo: 'https://images.unsplash.com/photo-1534398079543-2ae36a7a8fb1?q=80&w=200',
        gallery: [
          { id: 1, url: 'https://images.unsplash.com/photo-1534398079543-2ae36a7a8fb1?q=80&w=600' },
          { id: 2, url: 'https://images.unsplash.com/photo-1621962433189-06a15548a3e2?q=80&w=600' },
        ],
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        socials: { facebook: 'pazdelrio', instagram: 'pazdelrio', x: 'pazdelrio', linkedin: 'company/pazdelrio' },
        contact: { phone: '+57 310 123 4567', email: 'ventas@pazdelrio.com.co', address: 'Cra. 10 #28-49, Bogotá' },
        mapLocation: '4.6140,-74.0712',
        products: [
          { id: 1, name: 'Alambrón', description: 'Utilizado en trefilación, construcción y metalmecánica.' },
          { id: 2, name: 'Perfiles Estructurales', description: 'Vigas, canales y ángulos para construcción.' },
        ],
      });
    }
  }, [id, isEditing, toast, prefillFromUser, user]);

  const handleProductChange = (index, field, value) => {
    const newProducts = [...empresa.products];
    newProducts[index][field] = value;
    setEmpresa(prev => ({ ...prev, products: newProducts }));
  };

  const addProduct = () => {
    setEmpresa(prev => ({ ...prev, products: [...prev.products, { id: Date.now(), name: '', description: '' }] }));
  };

  const removeProduct = (index) => {
    setEmpresa(prev => ({ ...prev, products: empresa.products.filter((_, i) => i !== index) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      toast({ title: 'Completa los campos obligatorios', variant: 'destructive' });
      return;
    }
    toast({
      title: `✅ Empresa ${isEditing ? 'Actualizada' : 'Creada'}`,
      description: `La empresa "${empresa.name}" ha sido guardada con éxito (simulación).`,
    });
    const profileId = id || user?.id || getNextCompanyId();
    try {
      localStorage.setItem(`companyProfile:${profileId}`, JSON.stringify(empresa));
    } catch {}
    if (typeof updateUserProfile === 'function') {
      updateUserProfile({
        name: empresa.name,
        website: empresa.website,
        logo: empresa.logo,
        socials: empresa.socials,
        contact: empresa.contact,
        category: empresa.category,
        size: empresa.size,
        employees: empresa.employees,
        foundedYear: empresa.foundedYear,
      });
    }
    navigate(returnPath || '/admin/empresas');
  };

  const handleLogoUpload = (e) => {
    const file = (e.target.files || [])[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setEmpresa(prev => ({ ...prev, logo: reader.result }));
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const readers = files.map(file => new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    }));
    Promise.all(readers).then(urls => {
      setEmpresa(prev => ({
        ...prev,
        gallery: [
          ...prev.gallery,
          ...urls.map((url, i) => ({ id: Date.now() + i, url }))
        ]
      }));
    });
    e.target.value = '';
  };

  const removeImage = (imgId) => {
    setEmpresa(prev => ({ ...prev, gallery: prev.gallery.filter(g => g.id !== imgId) }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">{isEditing ? 'Editar Empresa' : 'Nueva Empresa'}</h1>
        <div className="flex gap-2">
          <Button variant="outline" type="button" onClick={() => navigate('/admin/empresas')}>Cancelar</Button>
          <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">
            <Save className="mr-2 h-4 w-4" />
            Guardar Cambios
          </Button>
        </div>
      </div>

      <Tabs defaultValue="info">
        <TabsList>
          <TabsTrigger value="info">Información General</TabsTrigger>
          <TabsTrigger value="media">Galería y Video</TabsTrigger>
          <TabsTrigger value="products">Productos</TabsTrigger>
          <TabsTrigger value="contact">Contacto y Redes</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader><CardTitle>Datos Principales</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Nombre de la Empresa</Label>
                  <Input id="name" value={empresa.name} onChange={e => setEmpresa({...empresa, name: e.target.value})} className={errors.name ? 'border-red-500 focus:ring-red-500' : ''} />
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea id="description" value={empresa.description} onChange={e => setEmpresa({...empresa, description: e.target.value})} rows={6} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Categoría</Label>
                    <select id="category" value={empresa.category} onChange={e => setEmpresa({...empresa, category: e.target.value})} className={`w-full px-3 py-2 bg-gray-800 border rounded-md text-white ${errors.category ? 'border-red-500' : 'border-gray-600'}`}>
                      <option value="">Seleccionar categoría</option>
                      <option value="Siderúrgica">Siderúrgica</option>
                      <option value="Metalúrgica">Metalúrgica</option>
                      <option value="Construcción">Construcción</option>
                      <option value="Manufactura">Manufactura</option>
                      <option value="Servicios">Servicios</option>
                    </select>
                    {errors.category && <p className="text-red-400 text-sm mt-1">{errors.category}</p>}
                  </div>
                  <div>
                    <Label htmlFor="size">Tamaño de Empresa</Label>
                    <select id="size" value={empresa.size} onChange={e => setEmpresa({...empresa, size: e.target.value})} className={`w-full px-3 py-2 bg-gray-800 border rounded-md text-white ${errors.size ? 'border-red-500' : 'border-gray-600'}`}>
                      <option value="">Seleccionar tamaño</option>
                      <option value="Micro">Micro (1-10 empleados)</option>
                      <option value="Pequeña">Pequeña (11-50 empleados)</option>
                      <option value="Mediana">Mediana (51-250 empleados)</option>
                      <option value="Grande">Grande (250+ empleados)</option>
                    </select>
                    {errors.size && <p className="text-red-400 text-sm mt-1">{errors.size}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="foundedYear">Año de Fundación</Label>
                    <Input id="foundedYear" type="number" min="1800" max="2024" value={empresa.foundedYear} onChange={e => setEmpresa({...empresa, foundedYear: e.target.value})} />
                  </div>
                  <div>
                    <Label htmlFor="employees">Número de Empleados</Label>
                    <Input id="employees" type="number" min="1" value={empresa.employees} onChange={e => setEmpresa({...empresa, employees: e.target.value})} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="website">Sitio Web</Label>
                  <Input id="website" type="url" placeholder="https://www.empresa.com" value={empresa.website} onChange={e => setEmpresa({...empresa, website: e.target.value})} />
                </div>
                <div>
                  <Label htmlFor="logo">Logo de la Empresa</Label>
                  <div className="flex gap-2">
                    <Input id="logo" type="url" placeholder="https://ejemplo.com/logo.png" value={empresa.logo} onChange={e => setEmpresa({...empresa, logo: e.target.value})} />
                    <input type="file" accept="image/*" ref={logoInputRef} onChange={handleLogoUpload} className="hidden" />
                    <Button type="button" variant="outline" onClick={() => logoInputRef.current?.click()}>Subir Logo</Button>
                  </div>
                  {empresa.logo && (
                    <div className="mt-2">
                      <img src={empresa.logo} alt="Logo preview" className="h-16 w-16 object-contain rounded border" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Award className="h-5 w-5" />Certificaciones</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {empresa.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-800 rounded">
                      <span className="text-sm text-white">{cert}</span>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          const newCerts = empresa.certifications.filter((_, i) => i !== index);
                          setEmpresa({...empresa, certifications: newCerts});
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Nueva certificación" 
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const value = e.target.value.trim();
                        if (value && !empresa.certifications.includes(value)) {
                          setEmpresa({...empresa, certifications: [...empresa.certifications, value]});
                          e.target.value = '';
                        }
                      }
                    }}
                  />
                  <Button 
                    type="button" 
                    size="sm" 
                    onClick={(e) => {
                      const input = e.target.parentElement.querySelector('input');
                      const value = input.value.trim();
                      if (value && !empresa.certifications.includes(value)) {
                        setEmpresa({...empresa, certifications: [...empresa.certifications, value]});
                        input.value = '';
                      }
                    }}
                  >
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5" />Ubicación</CardTitle></CardHeader>
              <CardContent>
                <Label htmlFor="mapLocation">Coordenadas (Lat,Lon)</Label>
                <Input id="mapLocation" value={empresa.mapLocation} onChange={e => setEmpresa({...empresa, mapLocation: e.target.value})} />
                <div className="mt-4 aspect-video bg-gray-700 rounded-md flex items-center justify-center">
                  <MapPin className="h-10 w-10 text-gray-500" />
                  <p className="sr-only">Simulación de mapa</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="media" className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
          <Card>
            <CardHeader><CardTitle><ImageIcon className="inline-block mr-2"/>Galería de Imágenes</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {empresa.gallery.map((img, index) => (
                  <div key={img.id} className="relative group">
                    <img src={img.url} alt={`Imagen ${index + 1}`} loading="lazy" className="aspect-square w-full rounded-md object-cover" />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => removeImage(img.id)}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </div>
                ))}
              </div>
              <input type="file" accept="image/*" multiple ref={fileInputRef} onChange={handleGalleryUpload} className="hidden" />
              <Button variant="outline" className="w-full" type="button" onClick={() => fileInputRef.current?.click()}><Upload className="mr-2 h-4 w-4" /> Subir Imágenes</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle><Video className="inline-block mr-2"/>Video Destacado</CardTitle></CardHeader>
            <CardContent>
              <Label htmlFor="videoUrl">URL del Video (YouTube)</Label>
              <Input id="videoUrl" value={empresa.videoUrl} onChange={e => setEmpresa({...empresa, videoUrl: e.target.value})} />
              {empresa.videoUrl && (
                <div className="mt-4 aspect-video bg-black rounded-md">
                  <iframe
                    className="w-full h-full rounded-md"
                    src={empresa.videoUrl.replace("watch?v=", "embed/")}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
                  </iframe>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle><Package className="inline-block mr-2"/>Productos y Servicios</CardTitle>
              <CardDescription>Añade los productos o servicios que ofrece la empresa.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {empresa.products.map((prod, index) => (
                <div key={prod.id} className="flex items-start gap-2 p-3 border border-gray-700 rounded-lg">
                  <div className="flex-grow space-y-2">
                    <Input placeholder="Nombre del producto" value={prod.name} onChange={e => handleProductChange(index, 'name', e.target.value)} />
                    <Textarea placeholder="Descripción del producto" value={prod.description} onChange={e => handleProductChange(index, 'description', e.target.value)} rows={2} />
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeProduct(index)}><Trash2 className="h-4 w-4 text-red-400" /></Button>
                </div>
              ))}
              <Button variant="outline" onClick={addProduct}><PlusCircle className="mr-2 h-4 w-4" /> Añadir Producto</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
          <Card>
            <CardHeader><CardTitle>Datos de Contacto</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><Label>Teléfono</Label><Input value={empresa.contact.phone} onChange={e => setEmpresa({...empresa, contact: {...empresa.contact, phone: e.target.value}})} /></div>
              <div><Label>Email</Label><Input type="email" value={empresa.contact.email} onChange={e => setEmpresa({...empresa, contact: {...empresa.contact, email: e.target.value}})} className={errors.contactEmail ? 'border-red-500 focus:ring-red-500' : ''} />{errors.contactEmail && <p className="text-red-400 text-sm mt-1">{errors.contactEmail}</p>}</div>
              <div><Label>Dirección</Label><Textarea value={empresa.contact.address} onChange={e => setEmpresa({...empresa, contact: {...empresa.contact, address: e.target.value}})} /></div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle><LinkIcon className="inline-block mr-2"/>Redes Sociales</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><Label>Facebook (usuario)</Label><Input value={empresa.socials.facebook} onChange={e => setEmpresa({...empresa, socials: {...empresa.socials, facebook: e.target.value}})} /></div>
              <div><Label>Instagram (usuario)</Label><Input value={empresa.socials.instagram} onChange={e => setEmpresa({...empresa, socials: {...empresa.socials, instagram: e.target.value}})} /></div>
              <div><Label>X / Twitter (usuario)</Label><Input value={empresa.socials.x} onChange={e => setEmpresa({...empresa, socials: {...empresa.socials, x: e.target.value}})} /></div>
              <div><Label>LinkedIn (URL de la empresa)</Label><Input value={empresa.socials.linkedin} onChange={e => setEmpresa({...empresa, socials: {...empresa.socials, linkedin: e.target.value}})} /></div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </form>
  );
};

export default EmpresaForm;
