import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious,
  CarouselDots
} from "@/components/ui/carousel"
import { 
  MapPin, Phone, Mail, Globe, Send, Package, Video, Image as ImageIcon,
  Facebook, Instagram, Twitter, Linkedin, ArrowLeft, MoreHorizontal, Newspaper, Calendar
} from 'lucide-react';

const sampleEmpresa = {
  id: 1,
  name: 'Acerías Paz del Río',
  description: 'Somos una empresa siderúrgica integrada de Colombia, dedicada a la producción y transformación de acero desde 1948. Ofrecemos un amplio portafolio de productos para los sectores de la construcción, la industria y el agro, comprometidos con el desarrollo sostenible del país. Con más de 75 años de experiencia, somos líderes en la producción de alambrón, perfiles estructurales y barras corrugadas.',
  category: 'Siderúrgica',
  size: 'Grande',
  foundedYear: '1948',
  employees: '2500',
  certifications: ['ISO 9001:2015', 'ISO 14001:2015', 'OHSAS 18001:2007', 'BASC'],
  website: 'https://www.pazdelrio.com.co',
  gallery: [
    'https://images.unsplash.com/photo-1534398079543-2ae36a7a8fb1?q=80&w=800',
    'https://images.unsplash.com/photo-1621962433189-06a15548a3e2?q=80&w=800',
    'https://images.unsplash.com/photo-1581092916346-53f2ff80334e?q=80&w=800',
    'https://images.unsplash.com/photo-1617864333215-2557515e1735?q=80&w=800',
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800',
    'https://images.unsplash.com/photo-1505798577917-a65157d3320a?q=80&w=800',
  ],
  videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  socials: { facebook: 'pazdelrio', instagram: 'pazdelrio', x: 'pazdelrio', linkedin: 'company/pazdelrio' },
  contact: { phone: '+57 310 123 4567', email: 'ventas@pazdelrio.com.co', address: 'Cra. 10 #28-49, Torre Empresarial, Bogotá, Colombia' },
  mapLocation: '4.6140,-74.0712',
  products: [
    { id: 1, name: 'Alambrón', description: 'Alambrón de acero al carbono para trefilación, construcción y aplicaciones industriales. Diámetros de 5.5mm a 12mm.', image: 'https://images.unsplash.com/photo-1521633585145-8c0af066461a?q=80&w=400' },
    { id: 2, name: 'Perfiles Estructurales', description: 'Vigas IPE, HEA, canales U y ángulos para construcción de estructuras metálicas y edificaciones.', image: 'https://images.unsplash.com/photo-1616440339209-895424751457?q=80&w=400' },
    { id: 3, name: 'Barras Corrugadas', description: 'Varillas corrugadas para refuerzo de concreto, grados 420 y 500 MPa. Diámetros de 6mm a 32mm.', image: 'https://images.unsplash.com/photo-1594027220556-9bcc4c7d35dc?q=80&w=400' },
    { id: 4, name: 'Perfiles Livianos', description: 'Perfiles conformados en frío para construcción liviana, tabiquería y estructuras secundarias.', image: 'https://images.unsplash.com/photo-1599488848103-7622d992e21b?q=80&w=400' },
    { id: 5, name: 'Mallas Electrosoldadas', description: 'Mallas de refuerzo para losas, muros y pavimentos. Diferentes calibres y espaciamientos disponibles.', image: 'https://images.unsplash.com/photo-1611689102019-38378e6904f4?q=80&w=400' },
    { id: 6, name: 'Planchas y Láminas', description: 'Láminas de acero al carbono en caliente y frío. Espesores de 1mm a 50mm para aplicaciones industriales.', image: 'https://images.unsplash.com/photo-1599488848103-7622d992e21b?q=80&w=400' },
  ],
  news: [
    { id: 1, title: 'Anuncia inversión de $200 millones en nueva planta de laminación', date: 'Hace 2 días', image: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?q=80&w=400' },
    { id: 2, title: 'Recibe certificación BASC por seguridad en comercio internacional', date: 'Hace 1 semana', image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=400' },
    { id: 3, title: 'Firma alianza estratégica con universidades para investigación en metalurgia', date: 'Hace 2 semanas', image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=400' },
    { id: 4, title: 'Implementa programa de sostenibilidad ambiental en todas sus plantas', date: 'Hace 3 semanas', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=400' },
  ],
  logo: 'https://images.unsplash.com/photo-1534398079543-2ae36a7a8fb1?q=80&w=200'
};


const ProductSlider = ({ products }) => {
  const { toast } = useToast();
  const duplicatedProducts = [...products, ...products];

  const handleVerMas = (productName) => {
    toast({
      title: `Viendo ${productName}`,
      description: "🚧 Esta funcionalidad aún no está implementada. ¡Pero puedes solicitarla en tu próximo prompt! 🚀",
    });
  };

  return (
    <div className="w-full overflow-hidden relative group">
      <div className="flex w-max animate-infinite-scroll group-hover:pause">
        {duplicatedProducts.map((product, index) => (
          <div key={`${product.id}-${index}`} className="w-64 mx-4 flex-shrink-0">
            <Card className="overflow-hidden bg-gray-900 border-gray-700 h-full">
              <CardContent className="p-0 flex flex-col h-full">
                <img src={product.image} alt={product.name} loading="lazy" className="h-40 w-full object-cover" />
                <div className="p-4 flex flex-col flex-grow">
                  <h4 className="font-semibold text-white mb-2 flex-grow">{product.name}</h4>
                  <Button onClick={() => handleVerMas(product.name)} size="sm" variant="outline" className="w-full mt-auto text-red-400 border-red-400 hover:bg-red-400/10 hover:text-red-300">
                    <MoreHorizontal className="mr-2 h-4 w-4" /> Ver más
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
       <div className="absolute inset-0 bg-gradient-to-r from-gray-800/50 via-transparent to-gray-800/50 pointer-events-none"></div>
    </div>
  );
};


const EmpresaPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [empresa, setEmpresa] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(`companyProfile:${id}`);
      if (stored) {
        const profile = JSON.parse(stored);
        const gallery = Array.isArray(profile.gallery) ? profile.gallery.map(g => g.url || g) : sampleEmpresa.gallery;
        setEmpresa({
          ...sampleEmpresa,
          ...profile,
          gallery,
          logo: profile.logo || sampleEmpresa.logo,
          socials: profile.socials || sampleEmpresa.socials,
          contact: profile.contact || sampleEmpresa.contact,
        });
        return;
      }
    } catch {}
    setEmpresa(sampleEmpresa);
  }, [id]);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "✅ Mensaje Enviado",
      description: "Tu mensaje ha sido enviado a la empresa (simulación).",
    });
    e.target.reset();
  };

  if (!empresa) {
    return <div className="flex items-center justify-center h-screen"><div className="loader"></div></div>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <>
      <Helmet>
        <title>{empresa.name} | Marketplaces Camacero</title>
        <meta name="description" content={empresa.description.substring(0, 160)} />
      </Helmet>
      <div className="bg-gray-800/50">
        <div className="container mx-auto px-6 py-8">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Directorio
          </Button>
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            {/* Header */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center gap-6 mb-8 p-6 bg-gray-900/50 rounded-xl border border-gray-700">
              <img src={empresa.logo} alt={`Logo de ${empresa.name}`} loading="lazy" className="h-24 w-24 rounded-full border-4 border-red-500 object-cover" />
              <div className="text-center md:text-left">
                <h1 className="text-4xl font-bold text-red-500">{empresa.name}</h1>
                <p className="text-lg text-gray-300">{empresa.contact.address}</p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* Description */}
                <motion.div variants={itemVariants}>
                  <Card>
                    <CardHeader><CardTitle>Sobre Nosotros</CardTitle></CardHeader>
                    <CardContent><p className="text-gray-300 leading-relaxed">{empresa.description}</p></CardContent>
                  </Card>
                </motion.div>

                {/* Gallery */}
                <motion.div variants={itemVariants}>
                  <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2"><ImageIcon /> Galería</CardTitle></CardHeader>
                    <CardContent>
                      <Carousel className="w-full" opts={{ loop: true }}>
                        <CarouselContent>
                          {empresa.gallery.map((img, index) => (
                            <CarouselItem key={index}>
                              <div className="aspect-video w-full rounded-lg overflow-hidden">
                                <img src={img} alt={`Imagen de ${empresa.name} ${index + 1}`} loading="lazy" className="w-full h-full object-cover" />
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-4" />
                        <CarouselNext className="right-4" />
                        <CarouselDots />
                      </Carousel>
                    </CardContent>
                  </Card>
                </motion.div>
                
                {/* News */}
                {empresa.news && empresa.news.length > 0 && (
                  <motion.div variants={itemVariants}>
                    <Card>
                      <CardHeader><CardTitle className="flex items-center gap-2"><Newspaper /> Últimas Noticias</CardTitle></CardHeader>
                      <CardContent className="space-y-4">
                        {empresa.news.map(noticia => (
                          <div key={noticia.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer" onClick={() => navigate(`/noticia/${noticia.id}`)}>
                            <img src={noticia.image} alt={noticia.title} loading="lazy" className="h-20 w-24 object-cover rounded-md" />
                            <div className="flex-grow">
                              <h4 className="font-semibold text-white leading-tight">{noticia.title}</h4>
                              <p className="text-xs text-gray-400 mt-1 flex items-center gap-1"><Calendar className="h-3 w-3" /> {noticia.date}</p>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </motion.div>
                )}


                {/* Video */}
                {empresa.videoUrl && (
                  <motion.div variants={itemVariants}>
                    <Card>
                      <CardHeader><CardTitle className="flex items-center gap-2"><Video /> Video Destacado</CardTitle></CardHeader>
                      <CardContent>
                        <div className="aspect-video bg-black rounded-md">
                          <iframe
                            className="w-full h-full rounded-md"
                            src={empresa.videoUrl.replace("watch?v=", "embed/")}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen>
                          </iframe>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Products */}
                <motion.div variants={itemVariants}>
                  <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2"><Package /> Productos y Servicios</CardTitle></CardHeader>
                    <CardContent>
                      <ProductSlider products={empresa.products} />
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              <div className="lg:col-span-1 space-y-8">
                {/* Contact Info */}
                <motion.div variants={itemVariants}>
                  <Card>
                    <CardHeader><CardTitle>Información de Contacto</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-3"><Phone className="h-5 w-5 text-red-500" /><span className="text-gray-700">{empresa.contact.phone}</span></div>
                 <div className="flex items-center gap-3"><Mail className="h-5 w-5 text-red-500" /><span className="text-gray-700">{empresa.contact.email}</span></div>
                 <div className="flex items-start gap-3"><MapPin className="h-5 w-5 text-red-500 mt-1" /><span className="text-gray-700">{empresa.contact.address}</span></div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Social Media */}
                <motion.div variants={itemVariants}>
                  <Card>
                    <CardHeader><CardTitle>Redes Sociales</CardTitle></CardHeader>
                    <CardContent className="flex gap-4">
                      <a href={`https://facebook.com/${empresa.socials.facebook}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500"><Facebook /></a>
                 <a href={`https://instagram.com/${empresa.socials.instagram}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500"><Instagram /></a>
                 <a href={`https://x.com/${empresa.socials.x}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500"><Twitter /></a>
                 <a href={`https://linkedin.com/${empresa.socials.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500"><Linkedin /></a>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Contact Form */}
                <motion.div variants={itemVariants}>
                  <Card>
                    <CardHeader><CardTitle>Contactar a la Empresa</CardTitle></CardHeader>
                    <CardContent>
                      <form onSubmit={handleContactSubmit} className="space-y-4">
                        <div><Label htmlFor="name">Tu Nombre</Label><Input id="name" required /></div>
                        <div><Label htmlFor="email">Tu Email</Label><Input id="email" type="email" required /></div>
                        <div><Label htmlFor="message">Mensaje</Label><Textarea id="message" required /></div>
                        <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white"><Send className="mr-2 h-4 w-4" /> Enviar Mensaje</Button>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default EmpresaPage;