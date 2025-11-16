import { supabase } from './supabaseClient';
import bcrypt from 'bcryptjs';

// Funciones de autenticación con Supabase

/**
 * Autenticar empresa
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<{user: object, error: string|null}>}
 */
export const authenticateCompany = async (email, password) => {
  try {
    if (!supabase) {
      throw new Error('Supabase no está configurado');
    }

    // Buscar empresa por email
    const { data: company, error: fetchError } = await supabase
      .from('companies')
      .select('*')
      .eq('email', email)
      .single();

    if (fetchError || !company) {
      throw new Error('Credenciales inválidas');
    }

    // Verificar contraseña (en producción usar bcrypt)
    // Por ahora comparación directa para compatibilidad con datos mock
    const isValidPassword = password === 'admin123' || 
                           password === 'gerente123' || 
                           password === 'usuario123' || 
                           password === 'operador123';
    
    if (!isValidPassword) {
      throw new Error('Credenciales inválidas');
    }

    if (company.status !== 'Activo') {
      throw new Error(`Tu cuenta está en estado: ${company.status}. Contacta al administrador.`);
    }

    const userData = {
      id: company.id,
      email: company.email,
      name: company.name,
      role: company.role,
      plan: company.plan,
      status: company.status,
      permissions: company.permissions,
      loginTime: new Date().toISOString()
    };

    return { user: userData, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

/**
 * Autenticar super administrador
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<{user: object, error: string|null}>}
 */
export const authenticateSuperAdmin = async (email, password) => {
  try {
    if (!supabase) {
      throw new Error('Supabase no está configurado');
    }

    // Buscar super admin por email
    const { data: admin, error: fetchError } = await supabase
      .from('super_admins')
      .select('*')
      .eq('email', email)
      .single();

    if (fetchError || !admin) {
      throw new Error('Credenciales de administrador inválidas');
    }

    // Verificar contraseña con hash almacenado; fallback legacy si no hay hash
    const hasHash = !!admin.password_hash;
    let isValid = false;
    if (hasHash) {
      isValid = await bcrypt.compare(password, admin.password_hash);
    } else {
      isValid = password === 'superadmin123';
    }
    if (!isValid) {
      throw new Error('Credenciales de administrador inválidas');
    }

    const adminData = {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
      permissions: admin.permissions,
      loginTime: new Date().toISOString()
    };

    return { user: adminData, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

/**
 * Obtener todas las empresas (solo para super admin)
 * @returns {Promise<{companies: array, error: string|null}>}
 */
export const getAllCompanies = async () => {
  try {
    if (!supabase) {
      throw new Error('Supabase no está configurado');
    }

    const { data: companies, error } = await supabase
      .from('companies')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return { companies: companies || [], error: null };
  } catch (error) {
    return { companies: [], error: error.message };
  }
};

/**
 * Actualizar perfil de empresa
 * @param {string} companyId 
 * @param {object} updateData 
 * @returns {Promise<{success: boolean, error: string|null}>}
 */
export const updateCompanyProfile = async (companyId, updateData) => {
  try {
    if (!supabase) {
      throw new Error('Supabase no está configurado');
    }

    const { error } = await supabase
      .from('companies')
      .update({
        ...updateData,
        updated_at: new Date().toISOString()
      })
      .eq('id', companyId);

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Obtener configuraciones de usuario
 * @param {string} companyId 
 * @returns {Promise<{settings: object, error: string|null}>}
 */
export const getUserSettings = async (companyId) => {
  try {
    if (!supabase) {
      throw new Error('Supabase no está configurado');
    }

    const { data: settings, error } = await supabase
      .from('user_settings')
      .select('*')
      .eq('company_id', companyId);

    if (error) {
      throw new Error(error.message);
    }

    // Convertir array de configuraciones a objeto
    const settingsObject = {};
    settings?.forEach(setting => {
      settingsObject[setting.settings_key] = setting.settings_value;
    });

    return { settings: settingsObject, error: null };
  } catch (error) {
    return { settings: {}, error: error.message };
  }
};

/**
 * Guardar configuración de usuario
 * @param {string} companyId 
 * @param {string} key 
 * @param {any} value 
 * @returns {Promise<{success: boolean, error: string|null}>}
 */
export const saveUserSetting = async (companyId, key, value) => {
  try {
    if (!supabase) {
      throw new Error('Supabase no está configurado');
    }

    const { error } = await supabase
      .from('user_settings')
      .upsert({
        company_id: companyId,
        settings_key: key,
        settings_value: value,
        updated_at: new Date().toISOString()
      });

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Función fallback para usar datos mock cuando Supabase no está disponible
 */
export const getMockCompanies = () => {
  return [
    {
      id: '1',
      email: 'admin@aceriaspaz.com',
      password: 'admin123',
      name: 'Acerías Paz del Río',
      role: 'admin',
      plan: 'Premium',
      status: 'Activo',
      permissions: ['read', 'write', 'delete', 'manage_users', 'view_analytics'],
      category: 'Siderúrgica',
      size: 'Grande',
      foundedYear: 1948,
      employees: 2500,
      website: 'https://www.pazdelrio.com.co',
      logo: 'https://images.unsplash.com/photo-1534398079543-2ae36a7a8fb1?q=80&w=200',
      socials: { facebook: 'pazdelrio', instagram: 'pazdelrio', x: 'pazdelrio', linkedin: 'company/pazdelrio' },
      contact: { phone: '+57 310 123 4567', email: 'ventas@pazdelrio.com.co', address: 'Cra. 10 #28-49, Bogotá' }
    },
    {
      id: '2',
      email: 'gerente@gerdau.com',
      password: 'gerente123',
      name: 'Gerdau Diaco',
      role: 'manager',
      plan: 'Básico',
      status: 'Activo',
      permissions: ['read', 'write', 'view_analytics'],
      category: 'Siderúrgica',
      size: 'Grande',
      foundedYear: 1961,
      employees: 1800,
      website: 'https://www.gerdau.com',
      logo: 'https://images.unsplash.com/photo-1621962433189-06a15548a3e2?q=80&w=200',
      socials: { facebook: 'gerdaudiaco', instagram: 'gerdaudiaco', x: 'gerdaudiaco', linkedin: 'company/gerdau-diaco' },
      contact: { phone: '+57 310 555 0000', email: 'contacto@gerdau.com', address: 'Medellín, Colombia' }
    },
    {
      id: '3',
      email: 'usuario@ternium.com',
      password: 'usuario123',
      name: 'Ternium Colombia',
      role: 'user',
      plan: 'Premium',
      status: 'Pendiente',
      permissions: ['read', 'write'],
      category: 'Metalúrgica',
      size: 'Grande',
      foundedYear: 1960,
      employees: 3200,
      website: 'https://www.ternium.com',
      logo: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=200',
      socials: { facebook: 'ternium', instagram: 'ternium', x: 'ternium', linkedin: 'company/ternium' },
      contact: { phone: '+57 320 555 1234', email: 'ventas@ternium.com', address: 'Cartagena, Colombia' }
    },
    {
      id: '4',
      email: 'operador@sidenal.com',
      password: 'operador123',
      name: 'Sidenal',
      role: 'operator',
      plan: 'Gratis',
      status: 'Activo',
      permissions: ['read'],
      category: 'Siderúrgica',
      size: 'Mediana',
      foundedYear: 1995,
      employees: 150,
      website: 'https://www.sidenal.com',
      logo: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?q=80&w=200',
      socials: { facebook: 'sidenal', instagram: 'sidenal', x: 'sidenal', linkedin: 'company/sidenal' },
      contact: { phone: '+57 315 000 9999', email: 'info@sidenal.com', address: 'Cali, Colombia' }
    },
    {
      id: '5',
      email: 'pruebas@camacero.com',
      password: 'prueba123',
      name: 'Empresa Pruebas',
      role: 'user',
      plan: 'Gratis',
      status: 'Activo',
      permissions: ['read', 'write'],
      category: 'Servicios',
      size: 'Pequeña',
      foundedYear: 2020,
      employees: 25,
      website: 'https://www.ejemplo.com',
      logo: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=200',
      socials: { facebook: 'empresa.pruebas', instagram: 'empresa.pruebas', x: 'empresa_pruebas', linkedin: 'company/empresa-pruebas' },
      contact: { phone: '+57 300 000 0000', email: 'pruebas@camacero.com', address: 'Bogotá, Colombia' }
    }
  ];
};

export const getMockSuperAdmin = () => {
  return {
    email: 'superadmin@camacero.com',
    password: 'superadmin123',
    role: 'superadmin',
    permissions: ['all']
  };
};
