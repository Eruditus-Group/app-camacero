
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { HardHat, LogIn } from 'lucide-react';

const PublicHeader = () => {
  const navigate = useNavigate();

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 left-0 right-0 z-50 bg-gray-900/70 border-b border-gray-800 backdrop-blur-lg"
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <HardHat className="h-8 w-8 text-red-500" />
          <span className="text-xl md:text-2xl font-bold text-white">Marketplaces Camacero</span>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <a href="/#directorio" className="text-gray-300 hover:text-white transition-colors">Directorio</a>
          <a href="/#noticias" className="text-gray-300 hover:text-white transition-colors">Noticias</a>
          <a href="/#contacto" className="text-gray-300 hover:text-white transition-colors">Contacto</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate('/login')} className="text-black">
            <LogIn className="mr-2 h-4 w-4" />
            Acceso Empresas
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

const PublicFooter = () => {
  return (
    <footer id="contacto" className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <HardHat className="h-6 w-6 text-red-900" />
            <p className="text-lg font-semibold text-white">Marketplaces Camacero</p>
          </div>
          <div className="flex space-x-6 text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Facebook</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
        <div className="text-center text-gray-500 mt-8 pt-8 border-t border-gray-800">
          <p>&copy; 2025 Marketplaces Camacero. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <PublicHeader />
      <main className="flex-grow">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
};

export default PublicLayout;
