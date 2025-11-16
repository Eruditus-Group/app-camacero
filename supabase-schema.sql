-- Esquema de base de datos para Marketplace Camacero
-- Ejecuta este script en tu proyecto de Supabase

-- Habilitar Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Tabla de empresas
CREATE TABLE IF NOT EXISTS companies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('admin', 'manager', 'user', 'operator')),
  plan VARCHAR(50) DEFAULT 'Gratis' CHECK (plan IN ('Gratis', 'Básico', 'Premium')),
  status VARCHAR(50) DEFAULT 'Pendiente' CHECK (status IN ('Activo', 'Pendiente', 'Suspendido')),
  permissions JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de super administradores
CREATE TABLE IF NOT EXISTS super_admins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) DEFAULT 'Super Administrador',
  role VARCHAR(50) DEFAULT 'superadmin',
  permissions JSONB DEFAULT '["all"]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de productos
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  category VARCHAR(100),
  stock INTEGER DEFAULT 0,
  sku VARCHAR(100),
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'draft')),
  images JSONB DEFAULT '[]'::jsonb,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de servicios
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  category VARCHAR(100),
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'draft')),
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de noticias
CREATE TABLE IF NOT EXISTS news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  excerpt TEXT,
  featured_image VARCHAR(500),
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('published', 'draft', 'archived')),
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de configuraciones de usuario
CREATE TABLE IF NOT EXISTS user_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  settings_key VARCHAR(100) NOT NULL,
  settings_value JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(company_id, settings_key)
);

-- Índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_companies_email ON companies(email);
CREATE INDEX IF NOT EXISTS idx_companies_status ON companies(status);
CREATE INDEX IF NOT EXISTS idx_products_company_id ON products(company_id);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_services_company_id ON services(company_id);
CREATE INDEX IF NOT EXISTS idx_news_company_id ON news(company_id);
CREATE INDEX IF NOT EXISTS idx_news_status ON news(status);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para actualizar updated_at
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON news FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_settings_updated_at BEFORE UPDATE ON user_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insertar datos de ejemplo (empresas)
INSERT INTO companies (email, password_hash, name, role, plan, status, permissions) VALUES
('admin@aceriaspaz.com', '$2b$10$example_hash_1', 'Acerías Paz del Río', 'admin', 'Premium', 'Activo', '["read", "write", "delete", "manage_users", "view_analytics"]'::jsonb),
('gerente@gerdau.com', '$2b$10$example_hash_2', 'Gerdau Diaco', 'manager', 'Básico', 'Activo', '["read", "write", "view_analytics"]'::jsonb),
('usuario@ternium.com', '$2b$10$example_hash_3', 'Ternium Colombia', 'user', 'Premium', 'Pendiente', '["read", "write"]'::jsonb),
('operador@sidenal.com', '$2b$10$example_hash_4', 'Sidenal', 'operator', 'Gratis', 'Activo', '["read"]'::jsonb)
ON CONFLICT (email) DO NOTHING;

-- Insertar super administrador
INSERT INTO super_admins (email, password_hash, name, role, permissions) VALUES
('superadmin@camacero.com', '$2b$10$example_superadmin_hash', 'Super Administrador', 'superadmin', '["all"]'::jsonb)
ON CONFLICT (email) DO NOTHING;

-- Habilitar Row Level Security
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad básicas
-- Las empresas solo pueden ver y modificar sus propios datos
CREATE POLICY "Companies can view own data" ON companies FOR SELECT USING (auth.uid()::text = id::text);
CREATE POLICY "Companies can update own data" ON companies FOR UPDATE USING (auth.uid()::text = id::text);

CREATE POLICY "Companies can view own products" ON products FOR SELECT USING (auth.uid()::text = company_id::text);
CREATE POLICY "Companies can manage own products" ON products FOR ALL USING (auth.uid()::text = company_id::text);

CREATE POLICY "Companies can view own services" ON services FOR SELECT USING (auth.uid()::text = company_id::text);
CREATE POLICY "Companies can manage own services" ON services FOR ALL USING (auth.uid()::text = company_id::text);

CREATE POLICY "Companies can view own news" ON news FOR SELECT USING (auth.uid()::text = company_id::text);
CREATE POLICY "Companies can manage own news" ON news FOR ALL USING (auth.uid()::text = company_id::text);

CREATE POLICY "Companies can view own settings" ON user_settings FOR SELECT USING (auth.uid()::text = company_id::text);
CREATE POLICY "Companies can manage own settings" ON user_settings FOR ALL USING (auth.uid()::text = company_id::text);