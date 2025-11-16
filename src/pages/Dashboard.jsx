
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Users, Package, BarChart } from 'lucide-react';

const StatCard = ({ icon, title, value, description, color }) => {
  const Icon = icon;
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-400">{title}</CardTitle>
        <Icon className={`h-4 w-4 text-${color}-400`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-gray-500">{description}</p>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.h1 variants={itemVariants} className="text-3xl font-bold">Dashboard de Camacero</motion.h1>
      
      <motion.div variants={containerVariants} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div variants={itemVariants}>
          <StatCard icon={Building} title="Empresas Registradas" value="125" description="+5 este mes" color="amber" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard icon={Users} title="Usuarios Activos" value="350" description="+20% que el mes pasado" color="purple" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard icon={Package} title="Servicios Registrados" value="850" description="En 45 categorías" color="green" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard icon={BarChart} title="Visitas al Directorio" value="15,201" description="+12.1% esta semana" color="blue" />
        </motion.div>
      </motion.div>

      <motion.div variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Actividad Reciente</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">Simulación de actividad reciente. Funcionalidad no implementada.</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center gap-2"><span className="font-bold text-amber-400">Aceros S.A.</span> actualizó su información empresarial.</li>
                <li className="flex items-center gap-2">Nuevo usuario: <span className="font-bold text-purple-400">Metalúrgica del Norte</span> se unió al directorio.</li>
                <li className="flex items-center gap-2"><span className="font-bold text-amber-400">Hierros y Perfiles C.A.</span> añadió nuevos servicios.</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Empresas Destacadas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">Simulación de empresas destacadas. Funcionalidad no implementada.</p>
               <ul className="mt-4 space-y-2 text-sm">
                <li className="font-bold text-amber-400">Aceros S.A.</li>
                <li className="font-bold text-amber-400">Metalúrgica del Norte</li>
                <li className="font-bold text-amber-400">Hierros y Perfiles C.A.</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
