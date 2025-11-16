
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { getStatusIcon, getStatusColor } from '@/lib/utils';
import { Rocket, CheckCircle, Zap, Shield, ExternalLink } from 'lucide-react';

const Dashboard = ({ projects, deployments }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-300 text-sm font-medium">Proyectos Activos</p>
              <p className="text-3xl font-bold text-white mt-2">{projects.length}</p>
            </div>
            <Rocket className="h-8 w-8 text-blue-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm border border-green-500/30 rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-300 text-sm font-medium">Despliegues Exitosos</p>
              <p className="text-3xl font-bold text-white mt-2">847</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-300 text-sm font-medium">Tiempo Promedio</p>
              <p className="text-3xl font-bold text-white mt-2">1.2m</p>
            </div>
            <Zap className="h-8 w-8 text-purple-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-sm border border-orange-500/30 rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-300 text-sm font-medium">Uptime</p>
              <p className="text-3xl font-bold text-white mt-2">99.9%</p>
            </div>
            <Shield className="h-8 w-8 text-orange-400" />
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold text-white mb-4">Actividad Reciente</h3>
          <div className="space-y-4">
            {deployments.slice(0, 5).map((deployment) => {
              const StatusIcon = getStatusIcon(deployment.status);
              return (
                <div key={deployment.id} className="flex items-center space-x-3">
                  <StatusIcon className={`h-5 w-5 ${getStatusColor(deployment.status).split(' ')[0]}`} />
                  <div className="flex-1">
                    <p className="text-white font-medium">{deployment.project}</p>
                    <p className="text-gray-400 text-sm">{deployment.time} • {deployment.duration}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold text-white mb-4">Proyectos Destacados</h3>
          <div className="space-y-4">
            {projects.slice(0, 3).map((project) => {
              const StatusIcon = getStatusIcon(project.status);
              return (
                <div key={project.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <StatusIcon className={`h-5 w-5 ${getStatusColor(project.status).split(' ')[0]}`} />
                    <div>
                      <p className="text-white font-medium">{project.name}</p>
                      <p className="text-gray-400 text-sm">{project.framework}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(project.url, '_blank')}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
