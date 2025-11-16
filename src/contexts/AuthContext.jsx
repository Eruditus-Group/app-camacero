import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { 
  authenticateCompany, 
  authenticateSuperAdmin, 
  getAllCompanies,
  updateCompanyProfile,
  getUserSettings,
  saveUserSetting,
  getMockCompanies,
  getMockSuperAdmin
} from '@/lib/supabaseAuth';
import { supabase } from '@/lib/supabaseClient';

const AuthContext = createContext();



// Obtener datos mock como fallback
const mockCompanies = getMockCompanies();
const superAdmin = getMockSuperAdmin();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Verificar si hay una sesión activa al cargar
    const checkAuthStatus = () => {
      const companyAuth = localStorage.getItem('companyAuthenticated');
      const adminAuth = localStorage.getItem('superAdminAuthenticated');
      const userData = localStorage.getItem('userData');

      if (companyAuth && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        } catch (error) {
          console.error('Error parsing user data:', error);
          logout();
        }
      } else if (adminAuth) {
        setUser({ ...superAdmin, name: 'Super Administrador' });
      }
      
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const loginCompany = async (email, password) => {
    try {
      // Simular delay de autenticación
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let userData = null;
      
      // Intentar autenticación con Supabase primero
      if (supabase) {
        const { user: supabaseUser, error } = await authenticateCompany(email, password);
        if (!error && supabaseUser) {
          userData = supabaseUser;
          toast({
            title: '✅ Sesión Iniciada (Supabase)',
            description: `Bienvenido ${supabaseUser.name}`,
          });
        }
      }
      
      // Fallback a datos mock si Supabase falla
      if (!userData) {
        const company = mockCompanies.find(
          c => c.email === email && c.password === password
        );

        if (!company) {
          throw new Error('Credenciales inválidas');
        }

        if (company.status !== 'Activo') {
          throw new Error(`Tu cuenta está en estado: ${company.status}. Contacta al administrador.`);
        }

        const {
          id: companyId,
          email: companyEmail,
          name: companyName,
          role,
          plan,
          status,
          permissions,
          website,
          logo,
          socials,
          contact,
          category,
          size,
          employees,
          foundedYear,
        } = company;

        userData = {
          id: companyId,
          email: companyEmail,
          name: companyName,
          role,
          plan,
          status,
          permissions,
          website,
          logo,
          socials,
          contact,
          category,
          size,
          employees,
          foundedYear,
          loginTime: new Date().toISOString()
        };
        
        toast({
          title: '✅ Sesión Iniciada (Local)',
          description: `Bienvenido ${companyName}`,
        });
      }

      localStorage.setItem('companyAuthenticated', 'true');
      localStorage.setItem('userData', JSON.stringify(userData));
      setUser(userData);

      return userData;
    } catch (error) {
      toast({
        title: '❌ Error de Autenticación',
        description: error.message,
        variant: 'destructive'
      });
      throw error;
    }
  };

  const loginAdmin = async (email, password) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let adminData = null;
      
      // Intentar autenticación con Supabase primero
      if (supabase) {
        const { user: supabaseAdmin, error } = await authenticateSuperAdmin(email, password);
        if (!error && supabaseAdmin) {
          adminData = supabaseAdmin;
          toast({
            title: '👑 Sesión de Administrador (Supabase)',
            description: 'Acceso completo al sistema',
          });
        }
      }
      
      // Fallback a datos mock si Supabase falla
      if (!adminData) {
        if (email !== superAdmin.email || password !== superAdmin.password) {
          throw new Error('Credenciales de administrador inválidas');
        }

        adminData = {
          ...superAdmin,
          name: 'Super Administrador',
          loginTime: new Date().toISOString()
        };
        
        toast({
          title: '👑 Sesión de Administrador (Local)',
          description: 'Acceso completo al sistema',
        });
      }

      localStorage.setItem('superAdminAuthenticated', 'true');
      localStorage.setItem('userData', JSON.stringify(adminData));
      setUser(adminData);

      return adminData;
    } catch (error) {
      toast({
        title: '❌ Error de Autenticación',
        description: error.message,
        variant: 'destructive'
      });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('companyAuthenticated');
    localStorage.removeItem('superAdminAuthenticated');
    localStorage.removeItem('userData');
    setUser(null);
    
    toast({
      title: '👋 Sesión Cerrada',
      description: 'Has cerrado sesión correctamente',
    });
    
    navigate('/');
  };

  const hasPermission = (permission) => {
    if (!user) return false;
    if (user.permissions.includes('all')) return true;
    return user.permissions.includes(permission);
  };

  const isAdmin = () => {
    return user?.role === 'superadmin';
  };

  const isCompanyUser = () => {
    return user && user.role !== 'superadmin';
  };

  const canAccess = (requiredRole) => {
    if (!user) return false;
    
    const roleHierarchy = {
      'operator': 1,
      'user': 2,
      'manager': 3,
      'admin': 4,
      'superadmin': 5
    };
    
    const userLevel = roleHierarchy[user.role] || 0;
    const requiredLevel = roleHierarchy[requiredRole] || 0;
    
    return userLevel >= requiredLevel;
  };

  const updateUserProfile = async (updatedData) => {
    try {
      const newUserData = { ...user, ...updatedData };
      
      // Intentar actualizar en Supabase si está disponible
      if (supabase && user?.id) {
        const { success, error } = await updateCompanyProfile(user.id, updatedData);
        if (error) {
          console.warn('Error actualizando en Supabase:', error);
        }
      }
      
      // Actualizar localmente
      setUser(newUserData);
      localStorage.setItem('userData', JSON.stringify(newUserData));
      
      toast({
        title: '✅ Perfil Actualizado',
        description: 'Los cambios han sido guardados',
      });
    } catch (error) {
      toast({
        title: '❌ Error',
        description: 'No se pudo actualizar el perfil',
        variant: 'destructive'
      });
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user || !!localStorage.getItem('companyAuthenticated') || !!localStorage.getItem('superAdminAuthenticated'),
    loginCompany,
    loginAdmin,
    loginSuperAdmin: loginAdmin, // Alias para compatibilidad
    logout,
    hasPermission,
    isAdmin,
    isCompanyUser,
    canAccess,
    updateUserProfile,
    mockCompanies // Para desarrollo/testing
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export { AuthContext };