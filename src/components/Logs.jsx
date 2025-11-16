import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { logs as initialLogs } from '@/lib/data';
import { FileText, Play, Pause, Trash2, Download } from 'lucide-react';

const Logs = () => {
  const [logs, setLogs] = useState(initialLogs);
  const [isStreaming, setIsStreaming] = useState(true);

  useEffect(() => {
    let interval;
    if (isStreaming) {
      interval = setInterval(() => {
        const newLog = {
          id: logs.length + 1,
          level: ['info', 'warn', 'error'][Math.floor(Math.random() * 3)],
          message: `Generated log entry at ${new Date().toLocaleTimeString()}`,
          timestamp: new Date().toISOString(),
        };
        setLogs(prevLogs => [newLog, ...prevLogs].slice(0, 100)); // Keep max 100 logs
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isStreaming, logs]);

  const getLevelClasses = (level) => {
    switch (level) {
      case 'info':
        return 'text-blue-400';
      case 'warn':
        return 'text-yellow-400';
      case 'error':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <FileText className="mr-3 h-7 w-7" />
          Logs del Sistema
        </h2>
        <div className="flex space-x-2">
          <Button
            onClick={() => setIsStreaming(!isStreaming)}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            {isStreaming ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            {isStreaming ? 'Pausar' : 'Reanudar'}
          </Button>
          <Button
            onClick={() => setLogs([])}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Limpiar
          </Button>
          <Button
            onClick={() => toast({ title: "🚧 Esta funcionalidad no está implementada aún—¡pero no te preocupes! ¡Puedes solicitarla en tu próximo prompt! 🚀" })}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            <Download className="h-4 w-4 mr-2" />
            Descargar
          </Button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-900 border border-gray-700 rounded-xl h-[60vh] overflow-y-auto p-4 font-mono text-sm"
      >
        {logs.map(log => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-start"
          >
            <span className="text-gray-500 mr-4">{new Date(log.timestamp).toLocaleTimeString()}</span>
            <span className={`font-bold mr-4 ${getLevelClasses(log.level)}`}>[{log.level.toUpperCase()}]</span>
            <span className="text-gray-300 flex-1 whitespace-pre-wrap">{log.message}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Logs;