
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Sparkles, Clipboard, ClipboardCheck, Loader2 } from 'lucide-react';

const Generator = () => {
  const [productName, setProductName] = useState('');
  const [keywords, setKeywords] = useState('');
  const [descriptions, setDescriptions] = useState({ long: '', short: '', tech: '' });
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState({ long: false, short: false, tech: false });
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const ollamaConfig = localStorage.getItem('ollama_config');
    if (!ollamaConfig) {
      toast({
        title: 'Configuración Requerida',
        description: 'Por favor, configura tu conexión a Ollama en la página de Ajustes.',
        variant: 'destructive',
      });
      navigate('/settings');
    }
  }, [navigate, toast]);

  const handleGenerate = async () => {
    if (!productName) {
      toast({ title: 'Error', description: 'El nombre del producto es obligatorio.', variant: 'destructive' });
      return;
    }
    
    const ollamaConfig = JSON.parse(localStorage.getItem('ollama_config') || '{}');
    if (!ollamaConfig.url || !ollamaConfig.model) {
      toast({ title: 'Error de Configuración', description: 'Falta la URL o el modelo de Ollama en los ajustes.', variant: 'destructive' });
      navigate('/settings');
      return;
    }

    setLoading(true);
    setDescriptions({ long: '', short: '', tech: '' });

    toast({
      title: '✨ Generando Descripciones...',
      description: 'La IA está trabajando. Esto es una simulación y tomará unos segundos.',
    });

    // Simulación de llamada a la API de Ollama
    setTimeout(() => {
      const baseText = `Producto: ${productName}. Palabras clave: ${keywords}.`;
      setDescriptions({
        long: `Descubre el nuevo ${productName}, la solución perfecta que combina diseño y funcionalidad. ${baseText} Creado con materiales de alta calidad, este producto está diseñado para durar y superar tus expectativas. Ideal para quienes buscan lo mejor en su categoría.`,
        short: `El revolucionario ${productName}. Eficiencia y estilo en un solo producto. ${keywords}.`,
        tech: `Especificaciones técnicas de ${productName}:\n- Modelo: ${productName.replace(/\s/g, '-')}-2025\n- Dimensiones: 25x15x10 cm\n- Peso: 1.2kg\n- Conectividad: Bluetooth 5.3, USB-C\n- Material: Aluminio aeroespacial`,
      });
      setLoading(false);
      toast({
        title: '✅ ¡Descripciones Generadas!',
        description: 'Tus descripciones están listas para copiar.',
      });
    }, 2500);
  };

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(prev => ({ ...prev, [type]: true }));
    toast({ title: 'Copiado al portapapeles' });
    setTimeout(() => setCopied(prev => ({ ...prev, [type]: false })), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Generador de Contenido</CardTitle>
          <CardDescription>Introduce los detalles de tu producto para generar descripciones con IA.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="product-name">Nombre del Producto</Label>
            <Input id="product-name" placeholder="Ej: Zapatillas Deportivas UltraBoost" value={productName} onChange={(e) => setProductName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="keywords">Palabras Clave (separadas por comas)</Label>
            <Input id="keywords" placeholder="Ej: running, comodidad, ligero, diseño moderno" value={keywords} onChange={(e) => setKeywords(e.target.value)} />
          </div>
          <Button onClick={handleGenerate} disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generando...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generar Descripciones
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Card className="lg:col-span-1 min-h-[400px]">
        <CardHeader>
          <CardTitle>Resultados</CardTitle>
          <CardDescription>Aquí aparecerán las descripciones generadas por la IA.</CardDescription>
        </CardHeader>
        <CardContent>
          <AnimatePresence>
            {loading && (
              <motion.div
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-64"
              >
                <Loader2 className="h-12 w-12 text-purple-400 animate-spin" />
                <p className="mt-4 text-gray-400">Creando magia...</p>
              </motion.div>
            )}
          </AnimatePresence>
          {!loading && (descriptions.long || descriptions.short || descriptions.tech) && (
            <Tabs defaultValue="long">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="long">Larga</TabsTrigger>
                <TabsTrigger value="short">Corta</TabsTrigger>
                <TabsTrigger value="tech">Técnica</TabsTrigger>
              </TabsList>
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <TabsContent value="long" className="relative mt-4">
                  <Textarea readOnly value={descriptions.long} rows={8} />
                  <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => handleCopy(descriptions.long, 'long')}>
                    {copied.long ? <ClipboardCheck className="h-4 w-4 text-green-400" /> : <Clipboard className="h-4 w-4" />}
                  </Button>
                </TabsContent>
                <TabsContent value="short" className="relative mt-4">
                  <Textarea readOnly value={descriptions.short} rows={4} />
                   <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => handleCopy(descriptions.short, 'short')}>
                    {copied.short ? <ClipboardCheck className="h-4 w-4 text-green-400" /> : <Clipboard className="h-4 w-4" />}
                  </Button>
                </TabsContent>
                <TabsContent value="tech" className="relative mt-4">
                  <Textarea readOnly value={descriptions.tech} rows={8} />
                   <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => handleCopy(descriptions.tech, 'tech')}>
                    {copied.tech ? <ClipboardCheck className="h-4 w-4 text-green-400" /> : <Clipboard className="h-4 w-4" />}
                  </Button>
                </TabsContent>
              </motion.div>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Generator;
