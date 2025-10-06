# Portfolio - Paginita v2

Un portfolio moderno construido con Next.js 15, TypeScript, Tailwind CSS y Supabase.

## 🚀 Características

- **Framework**: Next.js 15 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS con shadcn/ui
- **Autenticación**: Supabase Auth (Google OAuth, Magic Link, OTP)
- **Animaciones**: Framer Motion
- **Base de datos**: Supabase
- **Modo oscuro**: Implementado por defecto

## 📁 Estructura del Proyecto

```
├── app/                    # App Router de Next.js
│   ├── auth/              # Rutas de autenticación
│   ├── experience/        # Página de experiencia
│   ├── color-palette/     # Página de paleta de colores
│   ├── gallery/           # Galería de imágenes
│   └── events/            # Página de eventos
├── components/            # Componentes React
│   ├── ui/               # Componentes de shadcn/ui
│   ├── layout/           # Componentes de layout
│   ├── auth/             # Componentes de autenticación
│   └── experience/       # Componentes de experiencia
├── lib/                  # Utilidades y servicios
│   ├── supabase/         # Cliente de Supabase
│   ├── auth/             # Servicios de autenticación
│   └── services/         # Otros servicios
├── types/                # Tipos TypeScript
└── public/               # Archivos estáticos
```

## 🛠️ Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd paginita-v2
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp env.example .env.local
   ```
   
   Editar `.env.local` con tus credenciales:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=tu_proyecto_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
   SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   OPENAI_API_KEY=tu_openai_key
   ```

4. **Configurar Supabase**
   - Crear un proyecto en [Supabase](https://supabase.com)
   - Ejecutar el SQL de configuración (ver sección de Base de Datos)
   - Configurar Google OAuth en Authentication > Providers

5. **Ejecutar el proyecto**
   ```bash
   npm run dev
   ```

## 🗄️ Base de Datos

### Tabla de Experiencias
```sql
CREATE TABLE IF NOT EXISTS experiences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  technologies TEXT[] DEFAULT '{}',
  start_date DATE NOT NULL,
  end_date DATE,
  image_url TEXT,
  company_logo TEXT,
  location TEXT,
  type TEXT,
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Tabla de Perfiles
```sql
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🎨 Componentes Principales

### Header
- Logo animado con gradiente
- Navegación responsive
- Botón CTA para agendar reunión
- Menú móvil con animaciones
- Efecto glassmorphism al hacer scroll

### Footer
- Información de contacto
- Links de redes sociales
- Navegación rápida
- CTA para agendar reunión
- Línea decorativa con gradiente

### Autenticación
- Google OAuth
- Magic Link por email
- OTP por SMS
- Avatar de usuario con dropdown

### Experiencia
- Tarjetas flotantes con animaciones
- Modal de detalles
- Filtros por tecnología
- Imágenes optimizadas

## 🚀 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Construir para producción
npm run start    # Servidor de producción
npm run lint     # Linter ESLint
```

## 📱 Responsive Design

El proyecto está optimizado para:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1280px+)

## 🎯 Próximas Características

- [ ] Página de paleta de colores con IA
- [ ] Galería de imágenes compartidas
- [ ] Página de eventos
- [ ] Historial de colores
- [ ] Dashboard de administración
- [ ] Sistema de comentarios

## 🤝 Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

- Email: tu@email.com
- LinkedIn: [tu-linkedin](https://linkedin.com/in/tuusuario)
- GitHub: [tu-github](https://github.com/tuusuario)

---

Hecho con ❤️ y Next.js
