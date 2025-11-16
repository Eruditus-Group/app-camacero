import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Rocket, Settings, Zap, ShieldCheck, GaugeCircle } from 'lucide-react';

const FeatureCard = ({ icon, title, description }) => {
  const Icon = icon;
  return (
    <motion.div 
      className="bg-gray-800/50 p-6 rounded-xl border border-gray-700"
      whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
    >
      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-500/20 mb-4">
        <Icon className="h-6 w-6 text-purple-400" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
};

const Frontend = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white overflow-x-hidden">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.section 
          className="text-center py-20 lg:py-32"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block bg-purple-500/10 text-purple-300 px-4 py-1 rounded-full text-sm mb-4">
            Sitio Headless con WordPress + Breakdance
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            La Velocidad del Futuro, <br /> con el CMS que Ya Amas.
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-8">
            Este es el frontend de tu nuevo sitio headless. Conéctalo a tu WordPress para renderizar tu contenido de Breakdance a la velocidad de la luz, manteniendo tu SEO y diseño intactos.
          </p>
          <div className="flex justify-center gap-4">
            <Button onClick={() => navigate('/settings')} size="lg" className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-6">
              <Settings className="mr-2 h-5 w-5" />
              Configurar Ahora
            </Button>
          </div>
        </motion.section>

        {/* Features Section */}
        <section className="py-20">
          <h2 className="text-3xl font-bold text-center mb-12">¿Por Qué Headless?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Zap}
              title="Velocidad Extrema"
              description="Ofrece tiempos de carga casi instantáneos al separar el frontend del backend de WordPress."
            />
            <FeatureCard 
              icon={ShieldCheck}
              title="Seguridad Mejorada"
              description="Reduce la superficie de ataque al ocultar tu backend de WordPress del acceso público directo."
            />
            <FeatureCard 
              icon={GaugeCircle}
              title="SEO Intacto"
              description="Renderizamos tu página del lado del servidor, asegurando que los motores de búsqueda vean todo el contenido y las metaetiquetas."
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-20">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 p-12 rounded-2xl"
            >
                <Rocket className="h-12 w-12 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-4">¿Listo para Despegar?</h2>
                <p className="text-purple-200 max-w-xl mx-auto mb-8">
                    Solo necesitas la URL de tu sitio WordPress para empezar. Haz clic en el botón de abajo para finalizar la configuración.
                </p>
                <Button onClick={() => navigate('/settings')} size="lg" variant="secondary" className="bg-white text-purple-700 hover:bg-gray-200 text-lg px-8 py-6">
                    Conectar mi WordPress
                </Button>
            </motion.div>
        </section>

        <footer className="text-center py-8 text-gray-500">
            <p>Powered by Hostinger Horizons</p>
        </footer>
      </div>
    </div>
  );
};

export default Frontend;