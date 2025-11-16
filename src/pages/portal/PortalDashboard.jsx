import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, MessageSquare, BarChart2, Newspaper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import { API_BASE } from '@/api'; // crea src/api.js como te indiqué antes

const statCard = (title, Icon, value, subtitle, actionBtn) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-red-400" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-gray-500">{subtitle}</p>
      {actionBtn}
    </CardContent>
  </Card>
);

const PortalDashboard = () => {
  const navigate = useNavigate();
  // Si tu dashboard depende del id de la empresa desde la ruta: /portal/empresa/:id
  // const { id } = useParams();
  // Si el dashboard es para la empresa del usuario, obtén companyId del perfil/logica
  const companyId = 'REPLACE_WITH_COMPANY_ID'; // <- sustituye por dinámico (prop, context o useParams)

  const [stats, setStats] = useState({ visits: 0, messages: 0, clicks: 0, news: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/empresas/${companyId}/stats`);
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setStats({ visits: data.visits, messages: data.messages, clicks: data.clicks, news: data.news });
    } catch (err) {
      console.error(err);
      setError('No se pudieron cargar métricas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!companyId || companyId === 'REPLACE_WITH_COMPANY_ID') {
      setError('companyId no configurado. Pasa el id de la empresa al dashboard.');
      setLoading(false);
      return;
    }
    fetchStats();
    // opcional: polling cada 10s
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, [companyId]);

  // helpers de prueba: disparan endpoints para incrementar counters
  const sendVisit = async () => {
    await fetch(`${API_BASE}/api/empresas/${companyId}/visit`, { method: 'POST' });
    fetchStats();
  };
  const sendMessage = async () => {
    await fetch(`${API_BASE}/api/empresas/${companyId}/message`, { method: 'POST' });
    fetchStats();
  };
  const sendClick = async () => {
    await fetch(`${API_BASE}/api/empresas/${companyId}/click`, { method: 'POST' });
    fetchStats();
  };

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold">Bienvenido, Empresa</h1>
        <p className="text-gray-400">Aquí tienes un resumen del rendimiento de tu perfil.</p>
      </motion.div>

      {loading ? (
        <div className="text-gray-300">Cargando métricas...</div>
      ) : error ? (
        <div className="text-blue-400">{error}</div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {statCard('Visitas al Perfil', Eye, stats.visits, '+ desde inicio', (
              <div className="mt-2">
                <Button size="sm" onClick={sendVisit} className="bg-gray-700">Simular visita</Button>
              </div>
            ))}

            {statCard('Mensajes Recibidos', MessageSquare, stats.messages, `${stats.messages > 0 ? 'nuevos' : 'sin mensajes'}`, (
              <div className="mt-2">
                <Button size="sm" onClick={sendMessage} className="bg-gray-700">Simular mensaje</Button>
              </div>
            ))}

            {statCard('Clics a Servicios', BarChart2, stats.clicks, 'Interés en tus servicios', (
              <div className="mt-2">
                <Button size="sm" onClick={sendClick} className="bg-gray-700">Simular clic</Button>
              </div>
            ))}

            {statCard('Noticias Publicadas', Newspaper, stats.news, 'Artículos publicados', (
              <div className="mt-2">
                <Button size="sm" onClick={() => navigate('/portal/noticias')} className="bg-red-600 hover:bg-red-700 text-white">Gestionar Noticias</Button>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Completa tu Perfil</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">Un perfil completo atrae más clientes. ¡Asegúrate de tener toda tu información al día!</p>
                <Button onClick={() => navigate('/portal/perfil')} className="bg-red-600 hover:bg-red-700 text-white">
                  Editar mi Perfil
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Últimas Noticias</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">Mantén a la comunidad informada sobre tus logros y novedades.</p>
                <Button onClick={() => navigate('/portal/noticias')} className="bg-red-600 hover:bg-red-700 text-white">
                  Gestionar Noticias
                </Button>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default PortalDashboard;