import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Building, Users, TrendingUp, AlertCircle, Search, Filter, Eye, Edit, Trash2, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [empresas, setEmpresas] = useState([
    {
      id: 1,
      name: 'Acerías Paz del Río',
      category: 'Siderúrgica',
      size: 'Grande',
      employees: 2500,
      status: 'Activo',
      foundedYear: 1948,
      city: 'Bogotá',
      lastActivity: '2024-01-15',
      certifications: ['ISO 9001', 'ISO 14001']
    },
    {
      id: 2,
      name: 'Gerdau Diaco',
      category: 'Siderúrgica',
      size: 'Grande',
      employees: 1800,
      status: 'Activo',
      foundedYear: 1961,
      city: 'Medellín',
      lastActivity: '2024-01-14',
      certifications: ['ISO 9001']
    },
    {
      id: 3,
      name: 'Ternium Colombia',
      category: 'Metalúrgica',
      size: 'Grande',
      employees: 3200,
      status: 'Pendiente',
      foundedYear: 1960,
      city: 'Cartagena',
      lastActivity: '2024-01-10',
      certifications: ['ISO 9001', 'ISO 14001', 'OHSAS 18001']
    },
    {
      id: 4,
      name: 'Siderúrgica del Pacífico',
      category: 'Siderúrgica',
      size: 'Mediana',
      employees: 150,
      status: 'Inactivo',
      foundedYear: 1995,
      city: 'Cali',
      lastActivity: '2023-12-20',
      certifications: []
    }
  ]);

  const stats = {
    total: empresas.length,
    active: empresas.filter(e => e.status === 'Activo').length,
    pending: empresas.filter(e => e.status === 'Pendiente').length,
    inactive: empresas.filter(e => e.status === 'Inactivo').length
  };

  const filteredEmpresas = empresas.filter(empresa => {
    const matchesSearch = empresa.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         empresa.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         empresa.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || empresa.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleStatusChange = (empresaId, newStatus) => {
    setEmpresas(empresas.map(empresa => 
      empresa.id === empresaId ? { ...empresa, status: newStatus } : empresa
    ));
    toast({
      title: '✅ Estado Actualizado',
      description: `El estado de la empresa ha sido cambiado a ${newStatus}.`
    });
  };

  const handleDelete = (empresaId) => {
    setEmpresas(empresas.filter(e => e.id !== empresaId));
    toast({
      title: '🗑️ Empresa Eliminada',
      description: 'La empresa ha sido eliminada del sistema.'
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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
          <Building className="h-8 w-8" />
          Dashboard Administrativo
        </h1>
        <Button 
          onClick={() => navigate('/admin/empresas/nueva')} 
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nueva Empresa
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Empresas</CardTitle>
            <Building className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.total}</div>
            <p className="text-xs text-gray-500">Registradas en el sistema</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Empresas Activas</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.active}</div>
            <p className="text-xs text-gray-500">Operando normalmente</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Pendientes</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.pending}</div>
            <p className="text-xs text-gray-500">Esperando aprobación</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Empleados</CardTitle>
            <Users className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {empresas.reduce((sum, empresa) => sum + empresa.employees, 0).toLocaleString()}
            </div>
            <p className="text-xs text-gray-500">En todas las empresas</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Gestión de Empresas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nombre, ciudad o categoría..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
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
          </div>

          {/* Companies Table */}
          <div className="space-y-4">
            {filteredEmpresas.map(empresa => (
              <div key={empresa.id} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{empresa.name}</h3>
                      <Badge className={getStatusColor(empresa.status)}>
                        {empresa.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-400">
                      <span><strong>Categoría:</strong> {empresa.category}</span>
                      <span><strong>Tamaño:</strong> {empresa.size}</span>
                      <span><strong>Empleados:</strong> {empresa.employees.toLocaleString()}</span>
                      <span><strong>Ciudad:</strong> {empresa.city}</span>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      <span><strong>Fundada:</strong> {empresa.foundedYear} | </span>
                      <span><strong>Última actividad:</strong> {empresa.lastActivity}</span>
                      {empresa.certifications.length > 0 && (
                        <span> | <strong>Certificaciones:</strong> {empresa.certifications.join(', ')}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/empresa/${empresa.id}`)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/admin/empresas/editar/${empresa.id}`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <select
                      value={empresa.status}
                      onChange={(e) => handleStatusChange(empresa.id, e.target.value)}
                      className="px-2 py-1 bg-gray-700 border border-gray-600 rounded text-sm text-white"
                    >
                      <option value="Activo">Activo</option>
                      <option value="Pendiente">Pendiente</option>
                      <option value="Inactivo">Inactivo</option>
                    </select>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(empresa.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredEmpresas.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No se encontraron empresas que coincidan con los criterios de búsqueda.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;