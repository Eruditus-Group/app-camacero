
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight } from 'lucide-react';

const SuccessPage = () => {
  return (
    <>
      <Helmet>
        <title>¡Compra Exitosa! | Marketplaces Camacero</title>
        <meta name="description" content="Tu pago ha sido procesado con éxito." />
      </Helmet>
      <div className="container mx-auto px-6 py-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800/50 p-10 rounded-2xl text-center max-w-2xl"
        >
          <CheckCircle className="h-20 w-20 text-green-400 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-white mb-4">¡Pago Exitoso!</h1>
          <p className="text-gray-300 text-lg mb-8">
            ¡Gracias por tu compra! Hemos recibido tu pedido y lo estamos procesando. Recibirás un correo electrónico de confirmación en breve.
          </p>
          <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white">
            <Link to="/tienda">
              Seguir Comprando <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </>
  );
};

export default SuccessPage;
