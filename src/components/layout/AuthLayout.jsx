
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HardHat } from 'lucide-react';

const AuthLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="absolute top-8 left-8 cursor-pointer" onClick={() => navigate('/')}>
        <div className="flex items-center gap-3">
          <HardHat className="h-8 w-8 text-amber-400" />
          <span className="text-2xl font-bold text-white">Marketplaces Camacero</span>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full"
      >
        <Outlet />
      </motion.div>
    </div>
  );
};

export default AuthLayout;
