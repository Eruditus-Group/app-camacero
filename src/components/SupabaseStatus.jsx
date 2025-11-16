import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Database, CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { supabase, checkSupabaseConnection } from '@/lib/supabaseClient';
import { getAllCompanies } from '@/lib/supabaseAuth';

const SupabaseStatus = () => {
  const [connectionStatus, setConnectionStatus] = useState({
    connected: false,
    loading: true,
    error: null,
    companiesCount: 0
  });
  const { toast } = useToast();

  const checkConnection = async () => {
    setConnectionStatus(prev => ({ ...prev, loading: true }));
    
    try {
      if (!supabase) {
        setConnectionStatus({
          connected: false,
          loading: false,
          error: 'Cliente de Supabase no inicializado. Verifica las variables de entorno.',
          companiesCount: 0
        });
        return;
      }

      // Intentar obtener empresas para verificar conexión
      const { companies, error } = await getAllCompanies();
      
      if (error) {
        setConnectionStatus({
          connected: false,
          loading: false,
          error: error,
          companiesCount: 0
        });
      } else {
        setConnectionStatus({
          connected: true,
          loading: false,
          error: null,
          companiesCount: companies.length
        });
        
        toast({
          title: '✅ Conexión Exitosa',
          description: `Conectado a Supabase. ${companies.length} empresas encontradas.`,
        });
      }
    } catch (err) {
      setConnectionStatus({
        connected: false,
        loading: false,
        error: err.message,
        companiesCount: 0
      });
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  const getStatusIcon = () => {
    if (connectionStatus.loading) {
      return <RefreshCw className="h-5 w-5 animate-spin text-blue-500" />;
    }
    if (connectionStatus.connected) {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
    return <XCircle className="h-5 w-5 text-red-500" />;
  };

  const getStatusBadge = () => {
    if (connectionStatus.loading) {
      return <Badge variant="secondary">Verificando...</Badge>;
    }
    if (connectionStatus.connected) {
      return <Badge variant="default" className="bg-green-500">Conectado</Badge>;
    }
    return <Badge variant="destructive">Desconectado</Badge>;
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-full">
              <Database className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <CardTitle className="text-xl">Estado de Supabase</CardTitle>
              <CardDescription>
                Conexión a la base de datos en tiempo real
              </CardDescription>
            </div>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
          {getStatusIcon()}
          <div className="flex-1">
            <p className="font-medium">
              {connectionStatus.connected ? 'Conexión Activa' : 'Sin Conexión'}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {connectionStatus.connected 
                ? `Base de datos operativa con ${connectionStatus.companiesCount} empresas registradas`
                : connectionStatus.error || 'No se pudo establecer conexión'
              }
            </p>
          </div>
        </div>

        {!connectionStatus.connected && (
          <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-800 dark:text-yellow-200">Configuración Requerida</h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                  Para conectar a Supabase, configura las variables de entorno en tu archivo .env:
                </p>
                <ul className="text-sm text-yellow-700 dark:text-yellow-300 mt-2 space-y-1">
                  <li>• VITE_SUPABASE_URL=tu_url_de_supabase</li>
                  <li>• VITE_SUPABASE_ANON_KEY=tu_clave_anonima</li>
                </ul>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-2">
                  Luego ejecuta el script SQL proporcionado en tu proyecto de Supabase.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button 
            onClick={checkConnection} 
            disabled={connectionStatus.loading}
            variant="outline"
            className="flex-1"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${connectionStatus.loading ? 'animate-spin' : ''}`} />
            Verificar Conexión
          </Button>
          
          {connectionStatus.connected && (
            <Button 
              onClick={() => {
                toast({
                  title: '🎉 ¡Supabase Conectado!',
                  description: 'Tu aplicación está usando la base de datos en tiempo real.',
                });
              }}
              className="bg-green-500 hover:bg-green-600"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Activo
            </Button>
          )}
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-400">
          <p>💡 <strong>Modo Híbrido:</strong> La aplicación funciona con datos locales cuando Supabase no está disponible.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupabaseStatus;