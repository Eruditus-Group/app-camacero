import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { databases } from '@/lib/data';
import { Database as DatabaseIcon, Plus, Terminal, Settings, Trash2 } from 'lucide-react';

const Database = () => {
  const getStatusClasses = (status) => {
    switch (status) {
      case 'Running':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'Stopped':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'Creating':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <DatabaseIcon className="mr-3 h-7 w-7" />
          Base de Datos
        </h2>
        <Button 
          onClick={() => toast({ title: "🚧 Esta funcionalidad no está implementada aún—¡pero no te preocupes! ¡Puedes solicitarla en tu próximo prompt! 🚀" })}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nueva Base de Datos
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {databases.map((db, index) => (
          <motion.div
            key={db.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{db.name}</h3>
                <p className="text-gray-400 text-sm">{db.type} - {db.region}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusClasses(db.status)}`}>
                {db.status}
              </span>
            </div>
            
            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-gray-400">CPU / RAM</span>
                <span className="text-white">{db.resources}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Almacenamiento</span>
                <span className="text-white">{db.storage}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Precio</span>
                <span className="text-white">{db.price}</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => toast({ title: "🚧 Esta funcionalidad no está implementada aún—¡pero no te preocupes! ¡Puedes solicitarla en tu próximo prompt! 🚀" })}
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <Terminal className="h-4 w-4 mr-2" />
                Conectar
              </Button>
               <Button
                size="sm"
                variant="outline"
                onClick={() => toast({ title: "🚧 Esta funcionalidad no está implementada aún—¡pero no te preocupes! ¡Puedes solicitarla en tu próximo prompt! 🚀" })}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => toast({ title: "🚧 Esta funcionalidad no está implementada aún—¡pero no te preocupes! ¡Puedes solicitarla en tu próximo prompt! 🚀" })}
                className="border-red-600 text-red-400 hover:bg-red-900/20"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Database;