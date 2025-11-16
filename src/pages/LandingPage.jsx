import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Search, Building, ArrowRight, ChevronLeft, ChevronRight, Newspaper, Calendar } from 'lucide-react';

const sampleEmpresas = [
  { 
    id: 1, 
    name: 'Acerías Paz del Río', 
    city: 'Bogotá', 
    description: 'La siderúrgica integrada de Colombia, produciendo acero de alta calidad desde 1948. Especialistas en alambrón, perfiles estructurales y barras corrugadas.', 
    logo: 'https://images.unsplash.com/photo-1534398079543-2ae36a7a8fb1?q=80&w=200', 
    banner: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200',
    category: 'Siderúrgica',
    size: 'Grande',
    foundedYear: '1948',
    employees: '2500',
    website: 'https://www.pazdelrio.com.co'
  },
  { 
    id: 2, 
    name: 'Gerdau Diaco', 
    city: 'Cali', 
    description: 'Líder en aceros largos en Colombia, con un fuerte compromiso ambiental. Producimos varillas, alambrón y perfiles para construcción sostenible.', 
    logo: 'https://images.unsplash.com/photo-1621962433189-06a15548a3e2?q=80&w=200', 
    banner: 'https://images.unsplash.com/photo-1558221799-a93a4a6c8901?q=80&w=1200',
    category: 'Siderúrgica',
    size: 'Grande',
    foundedYear: '1901',
    employees: '1800',
    website: 'https://www.gerdau.com.co'
  },
  { 
    id: 3, 
    name: 'Ternium Colombia', 
    city: 'Manizales', 
    description: 'Parte de un grupo líder en el mercado siderúrgico de las Américas. Especialistas en aceros planos, galvanizados y productos para la industria automotriz.', 
    logo: 'https://images.unsplash.com/photo-1581092916346-53f2ff80334e?q=80&w=200', 
    banner: 'https://images.unsplash.com/photo-1605152276526-1b35315b8b99?q=80&w=1200',
    category: 'Siderúrgica',
    size: 'Grande',
    foundedYear: '1961',
    employees: '3200',
    website: 'https://www.ternium.com'
  },
  { 
    id: 4, 
    name: 'Sidenal', 
    city: 'Sogamoso', 
    description: 'Especialistas en perfiles de acero para la construcción y la industria. Ofrecemos soluciones integrales en estructuras metálicas y perfiles especiales.', 
    logo: 'https://images.unsplash.com/photo-1617864333215-2557515e1735?q=80&w=200', 
    banner: 'https://images.unsplash.com/photo-1505798577917-a65157d3320a?q=80&w=1200',
    category: 'Metalúrgica',
    size: 'Mediana',
    foundedYear: '1985',
    employees: '450',
    website: 'https://www.sidenal.com.co'
  },
  { 
    id: 5, 
    name: 'Colmena Aceros', 
    city: 'Medellín', 
    description: 'Distribuidores especializados en aceros para construcción. Amplio inventario de varillas, mallas electrosoldadas y accesorios para obra.', 
    logo: 'https://images.unsplash.com/photo-1599488848103-7622d992e21b?q=80&w=200', 
    banner: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200',
    category: 'Distribución',
    size: 'Mediana',
    foundedYear: '1995',
    employees: '280',
    website: 'https://www.colmenaaceros.com'
  },
  { 
    id: 6, 
    name: 'Ferrasa', 
    city: 'Barranquilla', 
    description: 'Ferretería industrial especializada en herramientas, equipos de soldadura y suministros para la industria siderúrgica del Caribe colombiano.', 
    logo: 'https://images.unsplash.com/photo-1611689102019-38378e6904f4?q=80&w=200', 
    banner: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?q=80&w=1200',
    category: 'Servicios',
    size: 'Pequeña',
    foundedYear: '2008',
    employees: '85',
    website: 'https://www.ferrasa.com.co'
  }
];

const sampleNoticias = [
  { id: 1, title: 'Acerías Paz del Río anuncia inversión de $200 millones en nueva planta de laminación', empresa: 'Acerías Paz del Río', date: 'Hace 2 días', image: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?q=80&w=800' },
  { id: 2, title: 'Gerdau Diaco recibe certificación ISO 14001 por gestión ambiental', empresa: 'Gerdau Diaco', date: 'Hace 1 semana', image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800' },
  { id: 3, title: 'Ternium Colombia lanza nueva línea de aceros galvanizados para sector automotriz', empresa: 'Ternium Colombia', date: 'Hace 2 semanas', image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800' },
  { id: 4, title: 'Sidenal inaugura centro de distribución en Bogotá', empresa: 'Sidenal', date: 'Hace 3 semanas', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800' },
  { id: 5, title: 'Colmena Aceros expande operaciones a la Costa Atlántica', empresa: 'Colmena Aceros', date: 'Hace 1 mes', image: 'https://images.unsplash.com/photo-1599488848103-7622d992e21b?q=80&w=800' },
  { id: 6, title: 'Ferrasa implementa nuevo sistema de gestión de inventarios', empresa: 'Ferrasa', date: 'Hace 1 mes', image: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?q=80&w=800' },
];

const logosDefault = [...sampleEmpresas, ...sampleEmpresas];

const EmpresaCard = ({ empresa }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="cursor-pointer"
      onClick={() => navigate(`/empresa/${empresa.id}`)}
    >
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:border-red-500/50 hover:shadow-red-500/10 bg-white/90">
        <div className="h-32 bg-gray-700 flex items-center justify-center">
          <img src={empresa.logo} alt={`Logo de ${empresa.name}`} loading="lazy" className="h-20 w-20 object-contain rounded-full bg-white p-1" />
        </div>
        <CardContent className="p-4 flex-grow flex flex-col">
          <h3 className="text-lg font-bold text-red-500">{empresa.name}</h3>
          <p className="text-sm text-gray-400 mb-2">{empresa.city}</p>
          <p className="text-sm text-black flex-grow">{empresa.description}</p>
          <div className="mt-4 text-red-500 flex items-center text-sm font-semibold">
            Ver Perfil <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const [empresasSlide, setEmpresasSlide] = useState(0);
  const [noticiasSlide, setNoticiasSlide] = useState(0);
  const [empresas, setEmpresas] = useState(sampleEmpresas);
  const [logos, setLogos] = useState(logosDefault);

  useEffect(() => {
    try {
      const keys = Object.keys(localStorage).filter(k => k.startsWith('companyProfile:'));
      const profiles = keys.map(k => {
        const id = k.split(':')[1];
        const raw = JSON.parse(localStorage.getItem(k) || '{}');
        return { id: Number(id) || id, ...raw };
      });
      if (profiles.length) {
        const byId = new Map(sampleEmpresas.map(e => [String(e.id), e]));
        profiles.forEach(p => {
          const sid = String(p.id);
          const base = byId.get(sid);
          const merged = {
            ...(base || {}),
            ...p,
            description: p.description || (base && base.description) || '',
            city: p.city || (base && base.city) || 'Colombia',
            logo: p.logo || (base && base.logo),
          };
          if (base) byId.set(sid, merged); else byId.set(sid, merged);
        });
        const mergedList = Array.from(byId.values());
        setEmpresas(mergedList);
        setLogos([...mergedList, ...mergedList]);
      }
    } catch {}
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev === empresas.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? Math.max(0, empresas.length - 1) : prev - 1));

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  // Auto-scroll para slider de empresas
  useEffect(() => {
    const interval = setInterval(() => {
      setEmpresasSlide(prev => (prev + 1) % Math.max(1, sampleEmpresas.length - 2));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll para slider de noticias
  useEffect(() => {
    const interval = setInterval(() => {
      setNoticiasSlide(prev => (prev + 1) % Math.max(1, sampleNoticias.length - 2));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Slider Section */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <AnimatePresence>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${(empresas[currentSlide] || sampleEmpresas[currentSlide] || {}).banner})` }}
          >
            <div className="absolute inset-0 bg-black/60" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <motion.h1 
            key={`title-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-red-500"
          >
            {(empresas[currentSlide] || sampleEmpresas[currentSlide] || {}).name}
          </motion.h1>
          <motion.p 
            key={`desc-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto text-lg md:text-xl text-gray-200 mb-8"
          >
            {(empresas[currentSlide] || sampleEmpresas[currentSlide] || {}).description}
          </motion.p>
          <motion.div 
            key={`button-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
             <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white" onClick={() => navigate(`/empresa/${(empresas[currentSlide] || sampleEmpresas[currentSlide] || {}).id}`)}>
              Conoce Más <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>

        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 hover:bg-black/80 transition-colors">
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 hover:bg-black/80 transition-colors">
          <ChevronRight className="h-6 w-6 text-white" />
        </button>
      </section>

      {/* Search Section */}
      <section className="bg-gray-800 py-12">
        <div className="container mx-auto px-6">
           <div className="relative max-w-3xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input placeholder="Buscar empresa o ciudad..." className="w-full pl-12 pr-28 h-14 text-lg" />
              <Button className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white h-10">Buscar</Button>
            </div>
        </div>
      </section>

      {/* Directory Section - Slider */}
      <section id="directorio" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-3 text-gray-900">
            <Building className="text-red-500" /> Últimas 10 Empresas Registradas
          </h2>
          <div className="relative">
            {/* Controles de navegación */}
            <button 
              onClick={() => setEmpresasSlide(prev => prev === 0 ? Math.max(0, empresas.length - 3) : prev - 1)}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-all duration-300"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button 
              onClick={() => setEmpresasSlide(prev => (prev + 1) % Math.max(1, empresas.length - 2))}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-all duration-300"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            
            {/* Slider container */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${empresasSlide * (100 / 3)}%)` }}
              >
                {empresas.map(empresa => (
                  <div key={empresa.id} className="w-1/3 flex-shrink-0 px-4">
                    <EmpresaCard empresa={empresa} />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Indicadores */}
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: Math.max(1, empresas.length - 2) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setEmpresasSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === empresasSlide ? 'bg-red-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Logo Cloud */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10 text-white">Nuestros Miembros</h2>
          <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
              {logos.map((logo, index) => (
                <li key={index}>
                  <img src={logo.logo} className="h-16 w-auto" loading="lazy" alt={`Logo de ${logo.name}`} />
                </li>
              ))}
            </ul>
             <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll" aria-hidden="true">
              {logos.map((logo, index) => (
                <li key={index}>
                  <img src={logo.logo} className="h-16 w-auto" loading="lazy" alt={`Logo de ${logo.name}`} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* News Section - Slider */}
      <section id="noticias" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-3">
            <Newspaper className="text-red-500" /> Últimas Noticias del Sector
          </h2>
          <div className="relative">
            {/* Controles de navegación */}
            <button 
              onClick={() => setNoticiasSlide(prev => prev === 0 ? Math.max(0, sampleNoticias.length - 3) : prev - 1)}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-all duration-300"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button 
              onClick={() => setNoticiasSlide(prev => (prev + 1) % Math.max(1, sampleNoticias.length - 2))}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-all duration-300"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            
            {/* Slider container */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${noticiasSlide * (100 / 3)}%)` }}
              >
                {sampleNoticias.map(noticia => (
                  <div key={noticia.id} className="w-1/3 flex-shrink-0 px-4">
                    <motion.div 
                      onClick={() => navigate(`/noticia/${noticia.id}`)} 
                      className="cursor-pointer h-full" 
                      whileHover={{ y: -5 }}
                    >
                      <Card className="overflow-hidden bg-gray-800/50 border-gray-700 h-full">
                        <img src={noticia.image} alt={noticia.title} loading="lazy" className="h-48 w-full object-cover" />
                        <CardContent className="p-4">
                          <h3 className="text-lg font-bold text-white mb-2">{noticia.title}</h3>
                          <div className="flex items-center text-sm text-gray-400 gap-4">
                            <span>{noticia.empresa}</span>
                            <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {noticia.date}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Indicadores */}
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: Math.max(1, sampleNoticias.length - 2) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setNoticiasSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === noticiasSlide ? 'bg-red-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;