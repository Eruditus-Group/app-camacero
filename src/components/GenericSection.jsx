
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const GenericSection = ({ title, icon: Icon }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Icon className="h-8 w-8 text-blue-400" />
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 text-center"
      >
        <div className="max-w-md mx-auto">
          <Icon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Próximamente</h3>
          <p className="text-gray-400 mb-6">
            Esta sección estará disponible pronto. Estamos trabajando para traerte las mejores funcionalidades.
          </p>
          <Button
            onClick={() => toast({ title: "🚧 Esta funcionalidad no está implementada aún—¡pero no te preocupes! ¡Puedes solicitarla en tu próximo prompt! 🚀" })}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            Solicitar Acceso
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default GenericSection;
