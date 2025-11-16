import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Type, Image, Columns, Divide, Code, Eye, Save, Trash2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate, useParams } from 'react-router-dom';

const components = [
  { id: 'text', label: 'Texto', icon: Type, defaultContent: 'Este es un párrafo de texto. Haz clic para editar.' },
  { id: 'image', label: 'Imagen', icon: Image, defaultContent: 'https://images.unsplash.com/photo-1715930792947-f8434a2c490a?w=400' },
  { id: 'columns', label: '2 Columnas', icon: Columns },
  { id: 'divider', label: 'Divisor', icon: Divide },
  { id: 'html', label: 'HTML', icon: Code, defaultContent: '<div>Tu código HTML aquí</div>' },
];

const TemplateBuilder = () => {
  const [layout, setLayout] = useState([]);
  const [templateName, setTemplateName] = useState('Nueva Plantilla sin Título');
  const [selectedElement, setSelectedElement] = useState(null);
  const [nextId, setNextId] = useState(1);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const savedTemplates = JSON.parse(localStorage.getItem('emailTemplates') || '[]');
      const templateToEdit = savedTemplates.find(t => t.id === id);
      if (templateToEdit) {
        setTemplateName(templateToEdit.name);
        setLayout(templateToEdit.layout || []);
        // Ensure nextId is higher than any existing instanceId
        const maxId = (templateToEdit.layout || []).reduce((max, el) => {
            const currentId = parseInt(el.instanceId.split('-')[1]);
            return currentId > max ? currentId : max;
        }, 0);
        setNextId(maxId + 1);
      }
    }
  }, [id]);


  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId === 'components' && destination.droppableId === 'canvas') {
      const componentType = components[source.index];
      const newComponent = {
        instanceId: `el-${nextId}`,
        type: componentType.id,
        content: componentType.defaultContent || `Contenido de ${componentType.label}`,
      };
      setNextId(nextId + 1);

      const newLayout = Array.from(layout);
      newLayout.splice(destination.index, 0, newComponent);
      setLayout(newLayout);
    } else if (source.droppableId === 'canvas' && destination.droppableId === 'canvas') {
      const newLayout = Array.from(layout);
      const [removed] = newLayout.splice(source.index, 1);
      newLayout.splice(destination.index, 0, removed);
      setLayout(newLayout);
    }
  };
  
  const handleSaveTemplate = () => {
      const savedTemplates = JSON.parse(localStorage.getItem('emailTemplates') || '[]');
      const newTemplate = {
          id: id || `template-${Date.now()}`,
          name: templateName,
          layout: layout,
          thumbnail: layout.find(el => el.type === 'image')?.content || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643'
      };

      let updatedTemplates;
      if (id) {
        updatedTemplates = savedTemplates.map(t => t.id === id ? newTemplate : t);
      } else {
        updatedTemplates = [...savedTemplates, newTemplate];
      }

      localStorage.setItem('emailTemplates', JSON.stringify(updatedTemplates));
      
      toast({
          title: "✅ Plantilla Guardada",
          description: "Tu plantilla de email ha sido guardada correctamente.",
      });
      navigate('/templates');
  };
  
  const handleElementClick = (element) => setSelectedElement(element);
  const handleContentChange = (e) => {
      if (!selectedElement) return;
      const newLayout = layout.map(el => (el.instanceId === selectedElement.instanceId) ? { ...el, content: e.target.value } : el);
      setLayout(newLayout);
      setSelectedElement({...selectedElement, content: e.target.value});
  }
  const deleteElement = (instanceId) => {
    setLayout(layout.filter(el => el.instanceId !== instanceId));
    setSelectedElement(null);
  }

  const renderElement = (element, isSelected) => {
    const baseClasses = `p-2 border rounded-lg transition-all duration-300 cursor-pointer ${isSelected ? 'border-purple-500 ring-2 ring-purple-500' : 'border-dashed border-gray-600 hover:border-purple-400'}`;
    switch (element.type) {
      case 'text': return <p className={baseClasses}>{element.content}</p>;
      case 'image': return <img src={element.content} alt="Elemento de imagen" className={`${baseClasses} w-full h-auto object-cover`}/>;
      case 'columns': return <div className={`${baseClasses} grid grid-cols-2 gap-4 p-4`}><div className="border border-dashed border-gray-500 p-2 rounded-md min-h-[50px]">Col 1</div><div className="border border-dashed border-gray-500 p-2 rounded-md min-h-[50px]">Col 2</div></div>;
      case 'divider': return <hr className={`my-4 ${isSelected ? 'border-purple-500' : 'border-gray-600'}`} />;
      case 'html': return <div className={`${baseClasses} flex items-center gap-2 font-mono text-sm`}><Code className="h-5 w-5 text-gray-400" /><span>{element.content.substring(0, 30)}...</span></div>;
      default: return null;
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col h-[calc(100vh-5rem)]">
        <header className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800/80 shrink-0">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/templates')}><ArrowLeft/></Button>
            <Input value={templateName} onChange={(e) => setTemplateName(e.target.value)} className="max-w-xs bg-gray-900"/>
          </div>
          <div className="flex gap-2">
            <Button variant="outline"><Eye className="h-4 w-4 mr-2" /> Previsualizar</Button>
            <Button onClick={handleSaveTemplate} className="bg-purple-600 hover:bg-purple-700"><Save className="h-4 w-4 mr-2" /> Guardar Plantilla</Button>
          </div>
        </header>
        <div className="flex flex-grow overflow-hidden">
          <Droppable droppableId="components" isDropDisabled={true}>
            {(provided) => (
              <aside {...provided.droppableProps} ref={provided.innerRef} className="w-64 bg-gray-800 p-4 overflow-y-auto shrink-0">
                <h2 className="text-lg font-bold mb-4">Componentes</h2>
                <div className="space-y-2">
                  {components.map((comp, index) => (
                    <Draggable key={comp.id} draggableId={comp.id} index={index}>
                      {(provided) => (
                        <motion.div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} whileHover={{ scale: 1.05, backgroundColor: 'rgba(126, 34, 206, 0.3)'}} className="p-3 bg-gray-700 rounded-lg flex items-center gap-3 cursor-grab">
                          <comp.icon className="h-5 w-5 text-purple-400" />
                          <span>{comp.label}</span>
                        </motion.div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </aside>
            )}
          </Droppable>

          <main className="flex-1 bg-gray-900 flex justify-center p-8 overflow-y-auto">
            <Droppable droppableId="canvas">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className={`w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-2xl transition-colors ${snapshot.isDraggingOver ? 'bg-purple-900/20' : ''}`}>
                  {layout.length === 0 && <div className="text-center text-gray-500 border-2 border-dashed border-gray-600 rounded-xl p-12"><p>Arrastra componentes aquí para empezar.</p></div>}
                  {layout.map((el, index) => (
                    <Draggable key={el.instanceId} draggableId={el.instanceId} index={index}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} onClick={() => handleElementClick(el)} className="p-1 mb-2 rounded-lg">
                          {renderElement(el, selectedElement?.instanceId === el.instanceId)}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </main>
          
          <aside className={`w-80 bg-gray-800 p-4 overflow-y-auto transition-all duration-300 ${selectedElement ? 'translate-x-0' : 'translate-x-full absolute right-0 h-full'}`}>
             <h2 className="text-lg font-bold mb-4">Propiedades</h2>
             {selectedElement ? (
                 <div className="space-y-4">
                    <p className="text-sm text-gray-400">Editando: <span className="font-bold text-purple-400">{selectedElement.type}</span></p>
                    {selectedElement.type === 'text' && (
                        <div><label className="text-sm font-medium">Contenido</label><textarea value={selectedElement.content} onChange={handleContentChange} rows="5" className="w-full mt-1 p-2 bg-gray-900 rounded-md border border-gray-600 focus:ring-purple-500"/></div>
                    )}
                     {selectedElement.type === 'image' && (
                        <div><label className="text-sm font-medium">URL de la Imagen</label><Input value={selectedElement.content} onChange={handleContentChange} className="mt-1"/></div>
                    )}
                    <Button variant="destructive" onClick={() => deleteElement(selectedElement.instanceId)} className="w-full"><Trash2 className="h-4 w-4 mr-2"/>Eliminar Elemento</Button>
                 </div>
             ) : (<p className="text-gray-500">Selecciona un elemento.</p>)}
          </aside>
        </div>
      </div>
    </DragDropContext>
  );
};

export default TemplateBuilder;