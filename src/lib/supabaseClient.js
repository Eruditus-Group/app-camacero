
import { createClient } from '@supabase/supabase-js'

// Configuración de Supabase usando variables de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Verificar que las variables de entorno estén configuradas
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase no configurado: Asegúrate de configurar VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en tu archivo .env');
}

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Función helper para verificar la conexión
export const checkSupabaseConnection = async () => {
  if (!supabase) {
    return { connected: false, error: 'Cliente de Supabase no inicializado' };
  }
  
  try {
    const { data, error } = await supabase.from('_health_check').select('*').limit(1);
    return { connected: !error, error: error?.message };
  } catch (err) {
    return { connected: false, error: err.message };
  }
};
