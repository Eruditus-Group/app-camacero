
import React from 'react';
import EmpresaForm from '@/pages/EmpresaForm';
import { useAuth } from '@/contexts/AuthContext';

const PortalPerfil = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gestionar mi Perfil de Empresa</h1>
      <EmpresaForm id={user?.id} returnPath="/portal/perfil" prefillFromUser />
    </div>
  );
};

export default PortalPerfil;
