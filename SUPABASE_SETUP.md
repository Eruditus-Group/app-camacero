# 🚀 Configuración de Supabase para Marketplace Camacero

Esta guía te ayudará a conectar tu aplicación con Supabase para tener una base de datos real en lugar de datos simulados.

## 📋 Requisitos Previos

- Cuenta en [Supabase](https://supabase.com)
- Node.js instalado
- Proyecto clonado y funcionando

## 🔧 Pasos de Configuración

### 1. Crear Proyecto en Supabase

1. Ve a [Supabase Dashboard](https://app.supabase.com)
2. Haz clic en "New Project"
3. Selecciona tu organización
4. Completa los datos:
   - **Name**: `marketplace-camacero`
   - **Database Password**: Crea una contraseña segura
   - **Region**: Selecciona la más cercana a tu ubicación
5. Haz clic en "Create new project"
6. Espera a que el proyecto se inicialice (2-3 minutos)

### 2. Obtener Credenciales

1. En el dashboard de tu proyecto, ve a **Settings** → **API**
2. Copia los siguientes valores:
   - **Project URL** (algo como: `https://xxxxx.supabase.co`)
   - **anon public** key (clave pública anónima)

### 3. Configurar Variables de Entorno

1. En la raíz de tu proyecto, ya tienes un archivo `.env`
2. Reemplaza los valores placeholder con tus credenciales reales:

```env
# Configuración de Supabase
VITE_SUPABASE_URL=https://tu-proyecto-id.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anonima-aqui
```

⚠️ **Importante**: 
- NO compartas estas credenciales públicamente
- Asegúrate de que `.env` esté en tu `.gitignore`
- Las variables deben empezar con `VITE_` para ser accesibles en el frontend

### 4. Ejecutar el Esquema de Base de Datos

1. En el dashboard de Supabase, ve a **SQL Editor**
2. Haz clic en "New query"
3. Copia y pega el contenido completo del archivo `supabase-schema.sql`
4. Haz clic en "Run" para ejecutar el script
5. Verifica que las tablas se crearon correctamente en **Table Editor**

### 5. Verificar la Conexión

1. Reinicia tu servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Ve a la página de **Configuraciones** en tu aplicación
3. Deberías ver el componente "Estado de Supabase" mostrando:
   - ✅ **Conectado** si todo está bien
   - ❌ **Desconectado** si hay algún problema

4. Si está conectado, ve a **Productos** y verifica que muestre:
   - 🔗 **Conectado a Supabase** (en lugar de 📱 Datos Locales)

## 📊 Estructura de la Base de Datos

El esquema incluye las siguientes tablas:

### `companies` - Empresas
- Información de empresas registradas
- Datos de contacto y ubicación
- Estado de verificación

### `super_admins` - Super Administradores
- Usuarios con acceso completo al sistema
- Credenciales de autenticación

### `products` - Productos
- Catálogo de productos siderúrgicos
- Precios, stock y especificaciones
- Relación con empresas

### `services` - Servicios
- Servicios ofrecidos por las empresas
- Categorización y precios

### `news` - Noticias
- Artículos y noticias del sector
- Sistema de publicación

### `user_settings` - Configuraciones
- Preferencias de usuario
- Configuraciones de la aplicación

## 🔒 Seguridad

El esquema incluye:
- **Row Level Security (RLS)** habilitado en todas las tablas
- **Políticas básicas** para lectura pública
- **Triggers** para actualización automática de timestamps
- **Índices** para optimizar consultas

## 🚨 Solución de Problemas

### Error: "Cliente de Supabase no inicializado"
- Verifica que las variables de entorno estén correctamente configuradas
- Asegúrate de que empiecen con `VITE_`
- Reinicia el servidor de desarrollo

### Error: "No se pudo establecer conexión"
- Verifica que las credenciales sean correctas
- Comprueba que el proyecto de Supabase esté activo
- Revisa la consola del navegador para errores específicos

### Los datos no se muestran
- Verifica que el esquema SQL se haya ejecutado correctamente
- Comprueba que las tablas existan en el Table Editor
- Revisa que los datos de ejemplo se hayan insertado

## 🔄 Modo Híbrido

La aplicación funciona en **modo híbrido**:
- **Con Supabase**: Usa datos reales de la base de datos
- **Sin Supabase**: Usa datos simulados (mock) automáticamente

Esto significa que la aplicación siempre funcionará, incluso si Supabase no está configurado.

## 📝 Próximos Pasos

Una vez configurado Supabase:

1. **Autenticación Real**: Implementar registro y login de usuarios
2. **Gestión de Archivos**: Usar Supabase Storage para imágenes
3. **Tiempo Real**: Implementar actualizaciones en tiempo real
4. **Backup**: Configurar respaldos automáticos
5. **Monitoreo**: Configurar alertas y métricas

## 🆘 Soporte

Si tienes problemas:
1. Revisa la consola del navegador para errores
2. Verifica el estado en la página de Configuraciones
3. Consulta la [documentación de Supabase](https://supabase.com/docs)
4. Revisa que todas las variables de entorno estén configuradas

---

✅ **¡Listo!** Tu aplicación ahora está conectada a una base de datos real con Supabase.