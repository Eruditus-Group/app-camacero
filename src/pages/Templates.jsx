import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Mail, Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

const Templates = () => {
  const [templates, setTemplates] = useState([]);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [previewTemplate, setPreviewTemplate] = useState(null);

  const renderElement = (element) => {
    const base = 'p-2 border rounded-lg mb-2';
    switch (element.type) {
      case 'text':
        return <p className={base}>{element.content}</p>;
      case 'image':
        return <img src={element.content} alt="Imagen" loading="lazy" className={`${base} w-full h-auto object-cover`} />;
      case 'columns':
        return (
          <div className={`${base} grid grid-cols-2 gap-4 p-4`}>
            {element.columns && element.columns.length ? (
              element.columns.map((col, idx) => (
                <div key={col.id || idx} className="border border-dashed border-gray-500 p-2 rounded-md min-h-[50px]">
                  {Array.isArray(col.content) && col.content.length ? (
                    col.content.map((child) => (
                      <div key={child.instanceId}>{renderElement(child)}</div>
                    ))
                  ) : (
                    <span className="text-xs text-gray-400">Col {idx + 1}</span>
                  )}
                </div>
              ))
            ) : (
              <>
                <div className="border border-dashed border-gray-500 p-2 rounded-md min-h-[50px]">Col 1</div>
                <div className="border border-dashed border-gray-500 p-2 rounded-md min-h-[50px]">Col 2</div>
              </>
            )}
          </div>
        );
      case 'divider':
        return <hr className="my-4 border-gray-600" />;
      case 'html':
        return <div className={`${base} font-mono text-xs`}>{element.content}</div>;
      default:
        return null;
    }
  };

  useEffect(() => {
    const savedTemplates = JSON.parse(localStorage.getItem('emailTemplates') || '[]');
    setTemplates(savedTemplates);
  }, []);

  const handleUseTemplate = (template) => {
    toast({ title: "Plantilla cargada en el constructor de campañas." });
    navigate('/admin/campaigns/new', { state: { templateLayout: template.layout } });
  };
  
  const handleEditTemplate = (templateId) => {
    navigate(`/admin/templates/${templateId}/edit`);
  };

  const handleDeleteTemplate = (templateId) => {
    const updatedTemplates = templates.filter(t => t.id !== templateId);
    localStorage.setItem('emailTemplates', JSON.stringify(updatedTemplates));
    setTemplates(updatedTemplates);
    toast({
        title: "🗑️ Plantilla Eliminada",
        description: "La plantilla ha sido eliminada correctamente."
    });
  }
  
  const handlePreview = (template) => {
      setPreviewTemplate(template);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white flex items-center">
          <Mail className="mr-3 h-8 w-8" />
          Mis Plantillas
        </h1>
        <Button onClick={() => navigate('/admin/templates/new')} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Crear Nueva Plantilla
        </Button>
      </div>

      {templates.length === 0 ? (
        <div className="text-center py-20 bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-700">
            <Mail className="mx-auto h-12 w-12 text-gray-500"/>
            <h3 className="mt-2 text-xl font-semibold text-white">No hay plantillas todavía</h3>
            <p className="mt-1 text-sm text-gray-400">¡Empieza creando tu primera plantilla reutilizable!</p>
            <div className="mt-6">
                 <Button onClick={() => navigate('/admin/templates/new')} className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Crear Plantilla
                </Button>
            </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {templates.map((template, index) => (
            <motion.div
                key={template.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
            >
                <Card className="overflow-hidden flex flex-col h-full group">
                    <div className="relative">
                        <img src={template.thumbnail} alt={`Thumbnail de ${template.name}`} className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Button onClick={() => handlePreview(template)} variant="secondary" size="sm"><Eye className="h-4 w-4 mr-1"/>Ver</Button>
                            <Button onClick={() => handleEditTemplate(template.id)} variant="secondary" size="sm"><Edit className="h-4 w-4 mr-1"/>Editar</Button>
                        </div>
                    </div>
                <CardContent className="pt-4 flex-grow">
                    <h3 className="font-bold text-lg text-white">{template.name}</h3>
                </CardContent>
                <CardFooter className="flex gap-2">
                    <Button onClick={() => handleUseTemplate(template)} className="w-full bg-purple-600 hover:bg-purple-700">Usar Plantilla</Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="icon"><Trash2 className="h-4 w-4"/></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>¿Estás seguro de que quieres eliminar esta plantilla?</AlertDialogTitle>
                                <AlertDialogDescription>
                                Esta acción no se puede deshacer. Esto eliminará permanentemente la plantilla.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteTemplate(template.id)}>Eliminar</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardFooter>
                </Card>
            </motion.div>
            ))}
        </div>
      )}
      {previewTemplate && (
        <AlertDialog open={!!previewTemplate} onOpenChange={(open) => { if (!open) setPreviewTemplate(null); }}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Previsualización: {previewTemplate.name}</AlertDialogTitle>
              <AlertDialogDescription>
                Vista rápida de la plantilla seleccionada.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="space-y-4">
              {previewTemplate.thumbnail && (
                <img src={previewTemplate.thumbnail} alt="Preview" loading="lazy" className="w-full rounded-md border border-gray-700" />
              )}
              <div className="text-sm text-gray-300">
                {Array.isArray(previewTemplate.layout) && previewTemplate.layout.length > 0 ? (
                  <div className="border border-gray-700 rounded-md p-4 bg-gray-900/60">
                    {previewTemplate.layout.map((el) => (
                      <div key={el.instanceId}>{renderElement(el)}</div>
                    ))}
                  </div>
                ) : (
                  <p>Sin contenido definido.</p>
                )}
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cerrar</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </motion.div>
  );
};

export default Templates;