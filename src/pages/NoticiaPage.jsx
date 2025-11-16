import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Building } from 'lucide-react';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel } from '@/components/ui/alert-dialog';

const sampleNewsData = {
  1: {
    id: 1,
    title: 'Acerías Paz del Río anuncia inversión en nueva planta',
    empresa: 'Acerías Paz del Río',
    empresaId: 1,
    date: 'Hace 2 días',
    image: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?q=80&w=1200',
    content: `<p>En un movimiento estratégico para consolidar su liderazgo en el mercado nacional, Acerías Paz del Río ha anunciado una inversión multimillonaria para la construcción de una nueva planta de producción en Boyacá.</p><br/><p>La nueva instalación, que se espera esté operativa para 2027, contará con tecnología de punta para la producción de aceros especiales, lo que permitirá a la compañía diversificar su portafolio y atender a sectores de alta demanda como el automotriz y el de energías renovables. Se estima que el proyecto generará más de 500 empleos directos durante su fase de construcción y operación.</p><br/><p>El CEO de la compañía afirmó: "Esta inversión no solo refuerza nuestro compromiso con el desarrollo industrial de Colombia, sino que también nos posiciona a la vanguardia de la siderurgia sostenible en América Latina".</p>`
  },
  2: {
    id: 2,
    title: 'Gerdau Diaco recibe certificación de sostenibilidad',
    empresa: 'Gerdau Diaco',
    empresaId: 2,
    date: 'Hace 1 semana',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200',
    content: `<p>Gerdau Diaco ha sido reconocida con la prestigiosa certificación 'Sello de Sostenibilidad' por sus destacadas prácticas en gestión ambiental, social y de gobernanza (ESG). Este reconocimiento destaca el compromiso de la empresa con la producción de acero responsable y su contribución al desarrollo de comunidades locales.</p><br/><p>La certificación evalúa múltiples criterios, incluyendo la reducción de la huella de carbono, el uso eficiente de recursos hídricos y energéticos, y la implementación de programas de desarrollo social en las áreas de influencia de sus operaciones. "Estamos orgullosos de este logro, que es el resultado del trabajo y la dedicación de todo nuestro equipo", comentó el gerente de sostenibilidad de la empresa.</p>`
  },
  3: {
    id: 3,
    title: 'Ternium lanza nueva línea de aceros galvanizados',
    empresa: 'Ternium Colombia',
    empresaId: 3,
    date: 'Hace 2 semanas',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200',
    content: `<p>Ternium Colombia ha presentado su nueva línea de aceros galvanizados de alta resistencia, diseñados específicamente para el sector de la construcción y la industria automotriz. Estos nuevos productos ofrecen una mayor durabilidad y resistencia a la corrosión, cumpliendo con los más altos estándares internacionales.</p><br/><p>El lanzamiento se realizó en un evento exclusivo para clientes y socios estratégicos, donde se demostraron las ventajas competitivas del nuevo material. Con esta innovación, Ternium busca fortalecer su posición en el mercado colombiano y expandir su oferta de soluciones de valor agregado.</p>`
  },
};


const NoticiaPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const noticia = sampleNewsData[id];
  const [previewOpen, setPreviewOpen] = useState(false);

  if (!noticia) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl text-red-500 font-bold">Noticia no encontrada</h1>
        <p className="text-gray-400 mt-4">La noticia que buscas no existe o ha sido eliminada.</p>
        <Button asChild className="mt-8">
          <Link to="/">Volver al inicio</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{noticia.title} | Marketplaces Camacero</title>
        <meta name="description" content={noticia.content.replace(/<[^>]*>?/gm, '').substring(0, 160)} />
      </Helmet>
      <div className="bg-gray-800/50">
        <div className="container mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Button variant="ghost" onClick={() => navigate(-1)} className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" /> Volver
            </Button>
            
            <article className="max-w-4xl mx-auto">
              <img src={noticia.image} alt={noticia.title} loading="lazy" onClick={() => setPreviewOpen(true)} className="w-full h-64 md:h-96 object-cover rounded-xl mb-8 shadow-lg cursor-zoom-in" />
              
              <div className="mb-6">
                <h1 className="text-3xl md:text-5xl font-bold text-red-500 leading-tight">{noticia.title}</h1>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-400 mb-8 border-y border-gray-700 py-4">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-red-400" />
                  <Link to={`/empresa/${noticia.empresaId}`} className="hover:text-white transition-colors">
                    {noticia.empresa}
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-red-400" />
                  <span>{noticia.date}</span>
                </div>
              </div>
              
              <div
                className="prose prose-lg prose-invert max-w-none text-gray-300 prose-p:leading-relaxed prose-headings:text-white"
                dangerouslySetInnerHTML={{ __html: noticia.content }}
              />

              <AlertDialog open={previewOpen} onOpenChange={setPreviewOpen}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Imagen de la noticia</AlertDialogTitle>
                    <AlertDialogDescription>{noticia.title}</AlertDialogDescription>
                  </AlertDialogHeader>
                  <div className="rounded-lg overflow-hidden">
                    <img src={noticia.image} alt={noticia.title} className="w-full h-auto object-cover" />
                  </div>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cerrar</AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

            </article>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default NoticiaPage;