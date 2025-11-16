
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, PlusCircle, Search, Building, Edit, Trash2, Eye, Filter } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { getAllCompanies } from '@/lib/supabaseAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const sampleEmpresas = [
  { 
    id: 1, 
    name: 'Acerías Paz del Río', 
    city: 'Bogotá', 
    category: 'Siderúrgica',
    size: 'Grande',
    employees: 2500,
    plan: 'Premium', 
    status: 'Activo',
    foundedYear: 1948,
    lastActivity: '2024-01-15'
  },
  { 
    id: 2, 
    name: 'Gerdau Diaco', 
    city: 'Medellín', 
    category: 'Siderúrgica',
    size: 'Grande',
    employees: 1800,
    plan: 'Básico', 
    status: 'Activo',
    foundedYear: 1961,
    lastActivity: '2024-01-14'
  },
  { 
    id: 3, 
    name: 'Ternium Colombia', 
    city: 'Cartagena', 
    category: 'Metalúrgica',
    size: 'Grande',
    employees: 3200,
    plan: 'Premium', 
    status: 'Pendiente',
    foundedYear: 1960,
    lastActivity: '2024-01-10'
  },
  { 
    id: 4, 
    name: 'Siderúrgica del Pacífico', 
    city: 'Cali', 
    category: 'Siderúrgica',
    size: 'Mediana',
    employees: 150,
    plan: 'Gratis', 
    status: 'Inactivo',
    foundedYear: 1995,
    lastActivity: '2023-12-20'
  },
];

const Empresas = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [empresas, setEmpresas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSize, setFilterSize] = useState('all');

  const filteredEmpresas = empresas.filter(empresa => {
    const matchesSearch = empresa.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         empresa.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         empresa.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || empresa.status === filterStatus;
    const matchesSize = filterSize === 'all' || empresa.size === filterSize;
    return matchesSearch && matchesStatus && matchesSize;
  });

  useEffect(() => {
    (async () => {
      try {
        const { companies } = await getAllCompanies();
        if (companies && companies.length) {
          const mapped = companies.map(c => ({
            id: c.id,
            name: c.name,
            city: c.city || 'Colombia',
            category: c.category || '',
            size: c.size || '',
            employees: c.employees || 0,
            plan: c.plan || 'Gratis',
            status: c.status || 'Activo',
            foundedYear: c.foundedYear || ''
          }));
          setEmpresas(mapped);
          return;
        }
      } catch {}
      try {
        const keys = Object.keys(localStorage).filter(k => k.startsWith('companyProfile:'));
        const byId = new Map(sampleEmpresas.map(e => [String(e.id), e]));
        keys.forEach(k => {
          const id = k.split(':')[1];
          const raw = JSON.parse(localStorage.getItem(k) || '{}');
          const sid = String(id);
          const base = byId.get(sid) || { id: Number(id) || id, name: '', city: 'Colombia', category: '', size: '', employees: 0, plan: 'Gratis', status: 'Activo', foundedYear: '' };
          const merged = { ...base, ...raw, id: base.id };
          byId.set(sid, merged);
        });
        setEmpresas(Array.from(byId.values()));
      } catch {}
    })();
  }, []);

  const handleDelete = (empresaId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta empresa?')) {
      setEmpresas(empresas.filter(e => e.id !== empresaId));
      try { localStorage.removeItem(`companyProfile:${empresaId}`); } catch {}
      toast({
        title: "🗑️ Empresa Eliminada",
        description: `La empresa ha sido eliminada del sistema.`,
      });
    }
  };

  const handleStatusChange = (empresaId, newStatus) => {
    setEmpresas(empresas.map(empresa => 
      empresa.id === empresaId ? { ...empresa, status: newStatus } : empresa
    ));
    try {
      const key = `companyProfile:${empresaId}`;
      const raw = localStorage.getItem(key);
      if (raw) {
        const obj = JSON.parse(raw);
        obj.status = newStatus;
        localStorage.setItem(key, JSON.stringify(obj));
      }
    } catch {}
    toast({
      title: '✅ Estado Actualizado',
      description: `El estado de la empresa ha sido cambiado a ${newStatus}.`
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Activo': return 'bg-green-500/20 text-green-400';
      case 'Pendiente': return 'bg-yellow-500/20 text-yellow-400';
      case 'Inactivo': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getPlanColor = (plan) => {
    switch (plan) {
      case 'Premium': return 'bg-purple-500/20 text-purple-400';
      case 'Básico': return 'bg-blue-500/20 text-blue-400';
      case 'Gratis': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-2 text-white">
          <Building className="h-8 w-8" /> 
          Directorio de Empresas
        </h1>
        <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={() => navigate('/admin/empresas/nueva')}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Añadir Empresa
        </Button>
      </div>

      {/* Filtros y Búsqueda */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros y Búsqueda
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Buscar empresas..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white"
            >
              <option value="all">Todos los estados</option>
              <option value="Activo">Activo</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Inactivo">Inactivo</option>
            </select>
            <select
              value={filterSize}
              onChange={(e) => setFilterSize(e.target.value)}
              className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white"
            >
              <option value="all">Todos los tamaños</option>
              <option value="Grande">Grande</option>
              <option value="Mediana">Mediana</option>
              <option value="Pequeña">Pequeña</option>
            </select>
            <div className="text-sm text-gray-400 flex items-center">
              Mostrando {filteredEmpresas.length} de {empresas.length} empresas
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Empresas */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Empresa</TableHead>
                <TableHead>Ubicación</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Tamaño</TableHead>
                <TableHead>Empleados</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmpresas.map(empresa => (
                <TableRow key={empresa.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-white">{empresa.name}</div>
                      <div className="text-sm text-gray-400">Fundada en {empresa.foundedYear}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300">{empresa.city}</TableCell>
                  <TableCell className="text-gray-300">{empresa.category}</TableCell>
                  <TableCell className="text-gray-300">{empresa.size}</TableCell>
                  <TableCell className="text-gray-300">{(empresa.employees ?? 0).toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={getPlanColor(empresa.plan)}>
                      {empresa.plan}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <select
                      value={empresa.status}
                      onChange={(e) => handleStatusChange(empresa.id, e.target.value)}
                      className={`px-2 py-1 text-xs rounded border-0 ${getStatusColor(empresa.status)}`}
                    >
                      <option value="Activo">Activo</option>
                      <option value="Pendiente">Pendiente</option>
                      <option value="Inactivo">Inactivo</option>
                    </select>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/empresa/${empresa.id}`)}
                        title="Ver perfil"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/admin/empresas/editar/${empresa.id}`)}
                        title="Editar"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(empresa.id)}
                        className="text-red-400 hover:text-red-300"
                        title="Eliminar"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredEmpresas.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    No se encontraron empresas que coincidan con los criterios de búsqueda.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Empresas;
