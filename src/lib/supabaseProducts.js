import { supabase } from './supabaseClient';

// Función para obtener todos los productos
export const getAllProducts = async () => {
  try {
    if (!supabase) {
      // Fallback a datos mock si Supabase no está disponible
      return {
        products: getMockProducts(),
        error: null
      };
    }

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Error al obtener productos de Supabase, usando datos mock:', error);
      return {
        products: getMockProducts(),
        error: null
      };
    }

    return {
      products: data || [],
      error: null
    };
  } catch (err) {
    console.warn('Error de conexión con Supabase, usando datos mock:', err);
    return {
      products: getMockProducts(),
      error: null
    };
  }
};

// Función para crear un nuevo producto
export const createProduct = async (productData) => {
  try {
    if (!supabase) {
      // Simular creación exitosa con datos mock
      const newProduct = {
        id: Date.now(),
        ...productData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      return {
        product: newProduct,
        error: null
      };
    }

    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select()
      .single();

    if (error) {
      return {
        product: null,
        error: error.message
      };
    }

    return {
      product: data,
      error: null
    };
  } catch (err) {
    return {
      product: null,
      error: err.message
    };
  }
};

// Función para actualizar un producto
export const updateProduct = async (id, productData) => {
  try {
    if (!supabase) {
      // Simular actualización exitosa
      return {
        product: { id, ...productData, updated_at: new Date().toISOString() },
        error: null
      };
    }

    const { data, error } = await supabase
      .from('products')
      .update({ ...productData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return {
        product: null,
        error: error.message
      };
    }

    return {
      product: data,
      error: null
    };
  } catch (err) {
    return {
      product: null,
      error: err.message
    };
  }
};

// Función para eliminar un producto
export const deleteProduct = async (id) => {
  try {
    if (!supabase) {
      // Simular eliminación exitosa
      return {
        success: true,
        error: null
      };
    }

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      return {
        success: false,
        error: error.message
      };
    }

    return {
      success: true,
      error: null
    };
  } catch (err) {
    return {
      success: false,
      error: err.message
    };
  }
};

// Función para obtener productos por empresa
export const getProductsByCompany = async (companyId) => {
  try {
    if (!supabase) {
      return {
        products: getMockProducts().filter(p => p.company_id === companyId),
        error: null
      };
    }

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('company_id', companyId)
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Error al obtener productos por empresa, usando datos mock:', error);
      return {
        products: getMockProducts().filter(p => p.company_id === companyId),
        error: null
      };
    }

    return {
      products: data || [],
      error: null
    };
  } catch (err) {
    console.warn('Error de conexión, usando datos mock:', err);
    return {
      products: getMockProducts().filter(p => p.company_id === companyId),
      error: null
    };
  }
};

// Datos mock para fallback
const getMockProducts = () => [
  {
    id: 1,
    name: 'Acero Estructural A36',
    description: 'Acero estructural de alta calidad para construcción',
    price: 850.00,
    category: 'Aceros Estructurales',
    stock: 500,
    unit: 'toneladas',
    company_id: 1,
    image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    specifications: {
      grade: 'A36',
      yield_strength: '250 MPa',
      tensile_strength: '400-550 MPa'
    },
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    name: 'Varillas Corrugadas #4',
    description: 'Varillas de acero corrugado para refuerzo de concreto',
    price: 720.00,
    category: 'Varillas',
    stock: 1000,
    unit: 'toneladas',
    company_id: 1,
    image_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400',
    specifications: {
      diameter: '12.7 mm',
      grade: 'Grado 60',
      length: '12 metros'
    },
    created_at: '2024-01-16T14:30:00Z',
    updated_at: '2024-01-16T14:30:00Z'
  },
  {
    id: 3,
    name: 'Láminas Galvanizadas',
    description: 'Láminas de acero galvanizado para techos y fachadas',
    price: 45.00,
    category: 'Láminas',
    stock: 2000,
    unit: 'metros cuadrados',
    company_id: 2,
    image_url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400',
    specifications: {
      thickness: '0.5 mm',
      coating: 'Galvanizado Z275',
      width: '1.22 metros'
    },
    created_at: '2024-01-17T09:15:00Z',
    updated_at: '2024-01-17T09:15:00Z'
  },
  {
    id: 4,
    name: 'Tubería de Acero Negro',
    description: 'Tubería de acero al carbón para aplicaciones industriales',
    price: 95.00,
    category: 'Tuberías',
    stock: 800,
    unit: 'metros lineales',
    company_id: 2,
    image_url: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400',
    specifications: {
      diameter: '4 pulgadas',
      schedule: 'SCH 40',
      material: 'ASTM A53'
    },
    created_at: '2024-01-18T16:45:00Z',
    updated_at: '2024-01-18T16:45:00Z'
  }
];