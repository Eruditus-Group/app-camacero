
import React from 'react';
import { Helmet } from 'react-helmet-async';
import ProductsList from '@/components/ProductsList';
import { motion } from 'framer-motion';

const StorePage = () => {
  return (
    <>
      <Helmet>
        <title>Tienda | Marketplaces Camacero</title>
        <meta name="description" content="Explora nuestra selección de productos de acero de alta calidad." />
      </Helmet>
      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">Nuestra Tienda</h1>
          <p className="text-lg text-gray-300 mt-2">Productos de acero para la industria y construcción.</p>
        </motion.div>
        <ProductsList />
      </div>
    </>
  );
};

export default StorePage;
