
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, Server } from 'lucide-react';
import SupabaseStatus from '@/components/SupabaseStatus';

const Settings = () => {
  const [config, setConfig] = useState(() => {
    const savedConfig = localStorage.getItem('ollama_config');
    return savedConfig ? JSON.parse(savedConfig) : { url: 'http://localhost:11434', model: 'llama3' };
  });
  const { toast } = useToast();

  const handleSave = () => {
    if (!config.url || !config.model) {
      toast({
        title: 'Campos Incompletos',
        description: 'Por favor, completa la URL y selecciona un modelo.',
        variant: 'destructive',
      });
      return;
    }
    localStorage.setItem('ollama_config', JSON.stringify(config));
    toast({
      title: '✅ Configuración Guardada',
      description: 'Tus ajustes de Ollama han sido guardados correctamente.',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-6">
        {/* Estado de Supabase */}
        <SupabaseStatus />
        
        <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500/20 rounded-full">
              <Server className="h-8 w-8 text-purple-400" />
            </div>
            <div>
              <CardTitle className="text-2xl">Ajustes de Ollama</CardTitle>
              <CardDescription>
                Configura la conexión a tu instancia local de Ollama.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="ollama-url">URL del Servidor Ollama</Label>
            <Input
              id="ollama-url"
              type="url"
              placeholder="http://localhost:11434"
              value={config.url}
              onChange={(e) => setConfig(prev => ({ ...prev, url: e.target.value }))}
            />
            <p className="text-xs text-gray-400 pt-1">
              Asegúrate de que tu servidor Ollama esté en ejecución y accesible desde esta URL.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="ollama-model">Modelo de Lenguaje</Label>
            <Select
              value={config.model}
              onValueChange={(value) => setConfig(prev => ({ ...prev, model: value }))}
            >
              <SelectTrigger id="ollama-model">
                <SelectValue placeholder="Selecciona un modelo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="llama3">Llama 3</SelectItem>
                <SelectItem value="mistral">Mistral</SelectItem>
                <SelectItem value="gemma">Gemma</SelectItem>
                <SelectItem value="phi3">Phi-3</SelectItem>
                <SelectItem value="llava">LLaVA</SelectItem>
              </SelectContent>
            </Select>
             <p className="text-xs text-gray-400 pt-1">
              Asegúrate de haber descargado el modelo seleccionado con `ollama pull &lt;modelo&gt;`.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave} className="w-full bg-purple-600 hover:bg-purple-700">
            <Save className="mr-2 h-4 w-4" />
            Guardar Configuración
          </Button>
        </CardFooter>
      </Card>
      </div>
    </motion.div>
  );
};

export default Settings;
