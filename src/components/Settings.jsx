import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Settings as SettingsIcon, User, Bell, Key, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';

const Settings = () => {
  const [activeTab, setActiveTab] = React.useState('profile');
  
  const renderTabContent = () => {
    switch(activeTab) {
      case 'profile':
        return <ProfileSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'billing':
        return <BillingSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
       <h2 className="text-2xl font-bold text-white flex items-center">
          <SettingsIcon className="mr-3 h-7 w-7" />
          Configuración
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-1"
          >
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 space-y-2">
              <SettingsTabButton id="profile" label="Perfil" icon={User} activeTab={activeTab} setActiveTab={setActiveTab} />
              <SettingsTabButton id="notifications" label="Notificaciones" icon={Bell} activeTab={activeTab} setActiveTab={setActiveTab} />
              <SettingsTabButton id="security" label="Seguridad" icon={Key} activeTab={activeTab} setActiveTab={setActiveTab} />
              <SettingsTabButton id="billing" label="Facturación" icon={CreditCard} activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
          >
            {renderTabContent()}
          </motion.div>
        </div>
    </div>
  );
};

const SettingsTabButton = ({ id, label, icon: Icon, activeTab, setActiveTab }) => (
  <button
    onClick={() => setActiveTab(id)}
    className={cn(
      "w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-left",
      activeTab === id
        ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-white'
        : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
    )}
  >
    <Icon className="h-5 w-5" />
    <span className="font-medium">{label}</span>
  </button>
);

const ProfileSettings = () => (
  <div className="space-y-6">
    <h3 className="text-xl font-semibold text-white">Perfil Público</h3>
    <div className="space-y-4">
      <InputField label="Nombre de Usuario" defaultValue="johndoe" />
      <InputField label="Email" type="email" defaultValue="john.doe@example.com" />
      <InputField label="Biografía" type="textarea" defaultValue="Desarrollador Full Stack apasionado por React y las nuevas tecnologías." />
    </div>
    <Button onClick={() => toast({ title: "✅ Perfil actualizado" })} className="bg-gradient-to-r from-blue-500 to-purple-600">Guardar Cambios</Button>
  </div>
);

const NotificationSettings = () => (
   <div className="space-y-6">
    <h3 className="text-xl font-semibold text-white">Preferencias de Notificación</h3>
    <div className="space-y-4">
      <CheckboxField label="Notificaciones por email" description="Recibir resúmenes de actividad y alertas importantes por email." defaultChecked />
      <CheckboxField label="Notificaciones push" description="Recibir alertas en tiempo real en tus dispositivos." />
      <CheckboxField label="Despliegues exitosos" description="Recibir una notificación cada vez que un despliegue tenga éxito." defaultChecked />
      <CheckboxField label="Despliegues fallidos" description="Recibir una notificación inmediata si un despliegue falla." defaultChecked />
    </div>
     <Button onClick={() => toast({ title: "✅ Preferencias guardadas" })} className="bg-gradient-to-r from-blue-500 to-purple-600">Guardar Cambios</Button>
  </div>
);

const SecuritySettings = () => (
  <div className="space-y-6">
    <h3 className="text-xl font-semibold text-white">Seguridad de la Cuenta</h3>
    <div className="space-y-4">
       <InputField label="Contraseña Actual" type="password" />
       <InputField label="Nueva Contraseña" type="password" />
       <InputField label="Confirmar Nueva Contraseña" type="password" />
    </div>
    <Button onClick={() => toast({ title: "✅ Contraseña cambiada" })} className="bg-gradient-to-r from-blue-500 to-purple-600">Cambiar Contraseña</Button>
    <div className="border-t border-gray-700 pt-6">
      <h4 className="text-lg font-semibold text-white">Autenticación de Dos Factores (2FA)</h4>
      <p className="text-gray-400 mt-2 mb-4">Añade una capa extra de seguridad a tu cuenta.</p>
      <Button onClick={() => toast({ title: "🚧 Esta funcionalidad no está implementada aún." })} variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">Habilitar 2FA</Button>
    </div>
  </div>
);

const BillingSettings = () => (
  <div className="space-y-6">
    <h3 className="text-xl font-semibold text-white">Facturación y Suscripción</h3>
    <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4">
      <p className="text-gray-300">Plan Actual: <span className="font-bold text-white">Pro</span></p>
      <p className="text-gray-300">Precio: <span className="font-bold text-white">$25/mes</span></p>
      <p className="text-gray-400 text-sm mt-2">Tu plan se renueva el 1 de Septiembre, 2025.</p>
    </div>
    <Button onClick={() => toast({ title: "🚧 Esta funcionalidad no está implementada aún." })} className="bg-gradient-to-r from-blue-500 to-purple-600">Gestionar Suscripción</Button>
  </div>
);


const InputField = ({ label, type = 'text', ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
    {type === 'textarea' ? (
      <textarea className="w-full bg-gray-700/50 border border-gray-600 rounded-lg text-white p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" rows="3" {...props}></textarea>
    ) : (
      <input type={type} className="w-full bg-gray-700/50 border border-gray-600 rounded-lg text-white p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" {...props} />
    )}
  </div>
);

const CheckboxField = ({ label, description, ...props }) => (
  <div className="flex items-start space-x-3">
    <input id={label} type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500" {...props} />
    <div>
      <label htmlFor={label} className="font-medium text-white">{label}</label>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  </div>
);

export default Settings;