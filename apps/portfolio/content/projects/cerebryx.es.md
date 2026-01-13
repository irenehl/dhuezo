---
projectId: cerebryx
locale: es
orderIndex: 1
previewImageUrl: /og-image-cerebryx.webp
deployedUrl: https://cerebryx.vercel.app/
repoUrl: https://github.com/irenehl/cerebryx
featured: true
title: Cerebryx
description: Transforma tu lectura en comprensión duradera con sesiones de estudio potenciadas por IA, cuestionarios generados y retroalimentación instantánea.
tags:
  - Next.js
  - TypeScript
  - Tailwind CSS
  - shadcn/ui
  - OpenAI
  - Supabase
---

# Cerebryx

Cerebryx es una aplicación moderna de acompañamiento para el estudio que transforma la lectura en aprendizaje activo a través de sesiones de lectura cronometradas y cuestionarios de comprensión generados por IA. Construida con Next.js 15 y tecnologías web de vanguardia, ayuda a estudiantes y profesionales a mejorar su comprensión lectora y retención.

## Resumen

Cerebryx proporciona un entorno enfocado y libre de distracciones para estudiar contenido escrito. Los usuarios pueden subir documentos PDF o pegar texto, y la aplicación calcula un tiempo de lectura óptimo basado en la longitud del contenido. Durante la sesión de lectura, un temporizador de cuenta regresiva mantiene a los usuarios enfocados, y al finalizar, se genera un cuestionario potenciado por IA para evaluar la comprensión con tipos de preguntas mixtas y niveles de dificultad.

La aplicación cuenta con una hermosa interfaz en modo oscuro, seguimiento completo del historial de sesiones, y soporta tanto experiencias de usuario anónimas como autenticadas. Los usuarios registrados pueden guardar documentos, establecer objetivos de lectura y rastrear su progreso a lo largo del tiempo.

## Tecnologías Utilizadas

- **Next.js 15** - Framework moderno de React con App Router y componentes del servidor
- **TypeScript** - Desarrollo con seguridad de tipos y modo estricto habilitado
- **Tailwind CSS** - Framework CSS utility-first para diseño responsivo con enfoque en modo oscuro
- **shadcn/ui** - Biblioteca de componentes UI de alta calidad y accesibles
- **OpenAI API** - GPT-4o-mini para generación inteligente de preguntas de cuestionarios
- **PDF.js** - Análisis de PDF y extracción de texto del lado del cliente
- **Supabase** - Autenticación (Google OAuth, OTP) y backend de base de datos
- **Microsoft Clarity** - Análisis de comportamiento del usuario e insights
- **React Context** - Gestión de estado del lado del cliente
- **Lucide React** - Biblioteca moderna de iconos

## Características Principales

### Gestión de Sesiones de Lectura
- **Múltiples Métodos de Entrada**: Sube archivos PDF o pega texto directamente
- **Cálculo Inteligente del Tiempo de Lectura**: Estima automáticamente el tiempo de lectura basado en el conteo de palabras (200 palabras por minuto)
- **Temporizador Interactivo**: Temporizador de cuenta regresiva con controles de inicio/pausa que funciona en segundo plano
- **Gestión del Tiempo**: Notificación modal cuando el tiempo de lectura expira, con opción de continuar o proceder

### Generación de Cuestionarios Potenciados por IA
- **Generación Inteligente de Preguntas**: Utiliza GPT-4o-mini de OpenAI para crear preguntas contextualmente relevantes
- **Tipos de Preguntas Mixtas**: Preguntas de opción múltiple (4 opciones), verdadero/falso y preguntas de respuesta corta
- **Niveles de Dificultad**: Cada pregunta se categoriza como fácil, media o difícil
- **Conteo Adaptativo de Preguntas**: Genera 1 pregunta por ~100 palabras (mínimo 5, máximo 20 preguntas)
- **Rango Personalizable**: Los usuarios pueden configurar el número de preguntas dentro del rango adaptativo

### Sistema de Puntuación y Retroalimentación
- **Sistema de Puntuación Ponderado**: 
  - Preguntas fáciles = 1 punto
  - Preguntas medias = 2 puntos
  - Preguntas difíciles = 3 puntos
- **Resultados Integrales**: Muestra puntuación porcentual, puntos obtenidos vs. puntos totales, e indicadores de éxito
- **Análisis de Respuestas**: Muestra respuestas correctas, respuestas del usuario y explicaciones para respuestas incorrectas

### Experiencia de Usuario
- **Solo Modo Oscuro**: Hermosa interfaz con gradiente oscuro (zinc-950 a neutral-950) diseñada para sesiones de estudio enfocadas
- **Diseño Responsivo**: Diseño completamente responsivo que funciona perfectamente en escritorio, tablet y dispositivos móviles
- **Accesibilidad**: Navegación completa por teclado, etiquetas ARIA apropiadas y altas proporciones de contraste
- **Historial de Sesiones**: Rastrea sesiones de estudio pasadas con marcas de tiempo, fuentes, puntuaciones y resultados
- **Panel de Control**: Resumen de sesiones recientes, estadísticas y seguimiento del progreso

### Autenticación y Gestión de Datos
- **Operación en Modo Dual**: Funciona de forma anónima o con cuentas de usuario
- **Autenticación con Supabase**: Inicio de sesión seguro con Google OAuth y OTP (teléfono/correo)
- **Documentos Guardados**: Los usuarios registrados pueden guardar documentos con etiquetas para lectura posterior
- **Objetivos de Lectura**: Establece y rastrea objetivos de lectura basados en tiempo, documentos y por documento
- **Búsqueda y Filtrado**: Encuentra documentos guardados rápidamente con etiquetas y funcionalidad de búsqueda

### Análisis e Insights
- **Integración con Microsoft Clarity**: Seguimiento integral del comportamiento del usuario y análisis
- **Seguimiento de Sesiones**: Monitorea patrones de lectura, rendimiento en cuestionarios y métricas de participación

## Aspectos Destacados de la Arquitectura

- **Componentes del Servidor por Defecto**: Aprovecha Next.js 15 App Router para un rendimiento óptimo
- **Procesamiento del Lado del Cliente**: El análisis de PDF y la generación de cuestionarios ocurren completamente en el navegador
- **No Requiere Backend (Modo Anónimo)**: La funcionalidad principal funciona sin infraestructura de servidor
- **Seguridad de Tipos**: La configuración estricta de TypeScript asegura código robusto y mantenible
- **Diseño Basado en Componentes**: Componentes modulares y reutilizables siguiendo las convenciones de shadcn/ui
- **Gestión de Estado**: API de React Context para manejo eficiente del estado del lado del cliente

## Implementación Técnica

### Procesamiento de PDF
- Utiliza PDF.js para extracción de texto de PDF del lado del cliente
- Maneja varios formatos de PDF y casos límite con elegancia
- Proporciona retroalimentación al usuario para fallos en el análisis

### Integración con IA
- Análisis robusto de JSON con eliminación de cercas de código markdown
- Manejo de errores para fallos de API con mecanismos de reintento
- Ingeniería de prompts estricta para calidad consistente de preguntas

### Sistema de Temporizador
- Cuenta regresiva precisa con `useEffect` y `setInterval`
- Limpieza adecuada para prevenir fugas de memoria
- Operación en segundo plano que continúa incluso cuando la pestaña está inactiva

### Persistencia de Datos
- Almacenamiento solo de sesión para usuarios anónimos
- Supabase PostgreSQL para datos de usuarios autenticados
- Políticas de Row Level Security (RLS) para protección de datos

## Filosofía de Diseño

Cerebryx está construido con un enfoque en:
- **Simplicidad**: Interfaz limpia y sin desorden que no distrae del estudio
- **Rendimiento**: Interacciones rápidas y responsivas con tiempos de carga mínimos
- **Accesibilidad**: Diseño inclusivo que funciona para todos los usuarios
- **Privacidad**: Los datos del usuario se manejan de forma segura, con almacenamiento de clave API solo de sesión
- **Control del Usuario**: Opciones flexibles para tiempo de lectura, número de preguntas y preferencias de estudio

## Mejoras Futuras

- Extensión de navegador para selección rápida de texto y práctica
- Retroalimentación mejorada de cuestionarios con explicaciones detalladas
- Análisis avanzados y visualización del progreso
- Soporte multiidioma (i18n)
- Características de estudio colaborativo
- Capacidades de exportación para informes de estudio

## Conclusión

Cerebryx demuestra cómo las tecnologías web modernas pueden combinarse para crear una herramienta de estudio poderosa y fácil de usar. Al aprovechar la IA para la generación inteligente de cuestionarios, proporcionar métodos de entrada flexibles y mantener un enfoque en la experiencia del usuario, transforma la lectura pasiva en aprendizaje activo. La aplicación muestra las mejores prácticas en el desarrollo de Next.js 15, seguridad de tipos de TypeScript y diseño de UI accesible.

