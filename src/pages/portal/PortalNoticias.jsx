import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { PlusCircle, Trash2, Newspaper, Edit, Upload, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const sampleNews = [
  { id: 1, title: 'Anunciamos inversión en nueva planta de producción', content: 'Con el objetivo de aumentar nuestra capacidad...', image: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?q=80&w=400' },
  { id: 2, title: 'Recibimos certificación de calidad ISO 9001', content: 'Este logro reafirma nuestro compromiso con la excelencia...', image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=400' },
];

const PortalNoticias = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [news, setNews] = useState(sampleNews);
  const [currentNews, setCurrentNews] = useState({ title: '', content: '', image: null });
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveNews = () => {
    if (!currentNews.title || !currentNews.content) {
      toast({ title: '❌ Error', description: 'El título y el contenido son obligatorios.', variant: 'destructive' });
      return;
    }

    if (isEditing) {
      setNews(news.map(n => n.id === currentNews.id ? currentNews : n));
      toast({ title: '✅ Noticia Actualizada', description: 'La noticia ha sido guardada con éxito.' });
    } else {
      setNews([...news, { ...currentNews, id: Date.now(), image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=400' }]);
      toast({ title: '✅ Noticia Creada', description: 'Tu nueva noticia ha sido publicada.' });
    }
    
    setCurrentNews({ title: '', content: '', image: null });
    setIsEditing(false);
  };

  const handleEdit = (noticia) => {
    setCurrentNews(noticia);
    setIsEditing(true);
  };

  const handleDelete = (newsId) => {
    setNews(news.filter(n => n.id !== newsId));
    toast({ title: '🗑️ Noticia Eliminada', description: 'La noticia ha sido eliminada.' });
  };
  
  const handleCancelEdit = () => {
    setCurrentNews({ title: '', content: '', image: null });
    setIsEditing(false);
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold flex items-center gap-2"><Newspaper /> Gestionar Mis Noticias</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Mis Noticias Publicadas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {news.map(noticia => (
                <div key={noticia.id} className="flex items-start gap-4 p-4 rounded-lg bg-gray-800/50">
                  <img-replace src={noticia.image} alt={noticia.title} className="h-20 w-20 rounded-md object-cover" />
                  <div className="flex-grow">
                    <p className="font-semibold text-white">{noticia.title}</p>
                    <p className="text-sm text-gray-400 line-clamp-2">{noticia.content}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(noticia)} title="Editar">
                      <Edit className="h-4 w-4 text-blue-400" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => navigate(`/noticia/${noticia.id}`)} title="Ver noticia">
                        <ExternalLink className="h-4 w-4 text-green-400" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(noticia.id)} title="Eliminar">
                      <Trash2 className="h-4 w-4 text-red-400" />
                    </Button>
                  </div>
                </div>
              ))}
              {news.length === 0 && <p className="text-gray-500">Aún no tienes noticias. ¡Crea una!</p>}
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>{isEditing ? 'Editar Noticia' : 'Crear Nueva Noticia'}</CardTitle>
              <CardDescription>{isEditing ? 'Modifica los detalles de tu noticia.' : 'Comparte las novedades de tu empresa.'}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Título de la noticia"
                value={currentNews.title}
                onChange={(e) => setCurrentNews({ ...currentNews, title: e.target.value })}
              />
              <Textarea
                placeholder="Contenido de la noticia..."
                rows={8}
                value={currentNews.content}
                onChange={(e) => setCurrentNews({ ...currentNews, content: e.target.value })}
              />
              <Button variant="outline" className="w-full">
                <Upload className="mr-2 h-4 w-4" /> {currentNews.image ? 'Cambiar Imagen' : 'Subir Imagen'}
              </Button>
              <div className="flex gap-2">
                {isEditing && <Button variant="outline" onClick={handleCancelEdit} className="w-full">Cancelar</Button>}
                <Button onClick={handleSaveNews} className="w-full bg-red-600 hover:bg-red-700 text-white">
                  <PlusCircle className="mr-2 h-4 w-4" /> {isEditing ? 'Guardar Cambios' : 'Publicar Noticia'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PortalNoticias;