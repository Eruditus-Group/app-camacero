import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Send, Users, PlugZap, Mail, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/campaigns', icon: Send, label: 'Campañas' },
  { to: '/contacts', icon: Users, label: 'Contactos' },
  { to: '/templates', icon: Mail, label: 'Plantillas' },
  { to: '/connections', icon: PlugZap, label: 'Conexiones' },
];

const Sidebar = ({ sidebarOpen }) => {
  const sidebarVariants = {
    open: { width: '16rem' },
    closed: { width: '5rem' },
  };

  return (
    <motion.div
      animate={sidebarOpen ? 'open' : 'closed'}
      variants={sidebarVariants}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed left-0 top-0 h-full bg-gray-800/80 backdrop-blur-lg border-r border-gray-700 z-50 flex-col hidden lg:flex"
    >
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <Send className="h-8 w-8 text-purple-400" />
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: sidebarOpen ? 1 : 0, transition: { delay: 0.1 } }}
          className={cn("text-xl font-bold text-white ml-2", !sidebarOpen && "hidden")}
        >
          MailFlow
        </motion.h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex items-center p-3 rounded-lg transition-colors duration-200',
                'hover:bg-purple-500/20',
                isActive ? 'bg-purple-600/30 text-white' : 'text-gray-300'
              )
            }
          >
            <item.icon className="h-6 w-6 flex-shrink-0" />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: sidebarOpen ? 1 : 0, transition: { delay: 0.1 } }}
              className={cn("ml-4 font-medium", !sidebarOpen && "hidden")}
            >
              {item.label}
            </motion.span>
          </NavLink>
        ))}
      </nav>
    </motion.div>
  );
};

export default Sidebar;