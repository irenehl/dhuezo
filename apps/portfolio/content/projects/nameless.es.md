---
projectId: nameless-mindfulness-app
locale: es
orderIndex: 1
previewImageUrl: /og-image-nameless.webp
deployedUrl: https://nameless.dhuezo.dev/
repoUrl: https://github.com/irenehl/nameless
featured: true
title: Nameless - Actividades de Mindfulness y Calma
description: Una aplicación móvil React Native que ofrece actividades interactivas y suaves de mindfulness diseñadas para ayudar a los usuarios a encontrar calma a través de juegos meditativos y enfocados.
tags:
  - React Native
  - Expo
  - TypeScript
  - NativeWind
---

# Nameless - Actividades de Mindfulness y Calma

Una aplicación móvil React Native bellamente diseñada que proporciona actividades interactivas y relajantes para ayudar a los usuarios a encontrar calma y enfoque a través de juegos suaves y meditativos.

## Resumen

Nameless es una aplicación móvil de mindfulness construida con React Native y Expo, que ofrece una colección de actividades calmantes diseñadas para reducir el estrés y promover la concentración. La aplicación cuenta con una interfaz limpia y minimalista con temas y paletas de colores personalizables, creando una experiencia personalizada para cada usuario.

## El Desafío y la Solución

El desafío era crear una herramienta digital de mindfulness que se sienta genuinamente calmante en lugar de agregar estrés digital. La mayoría de las aplicaciones en este espacio son demasiado gamificadas (creando presión) o demasiado pasivas (perdiendo compromiso). Los usuarios necesitaban actividades que promuevan enfoque y calma sin sentirse como trabajo o competencia.

La solución fue diseñar actividades suaves e interactivas que requieren enfoque pero no tienen presión de tiempo o sistemas de puntuación. Actividades como "Counting Calm" y "Connect the Dots" involucran la mente de manera meditativa, similar a prácticas tradicionales de mindfulness como contar respiraciones o dibujar mandalas.

Los desafíos técnicos incluyeron crear animaciones fluidas que se sientan calmantes en lugar de bruscas, implementar retroalimentación háptica que mejore en lugar de distraer, y asegurar que la aplicación funcione bien para usuarios con sensibilidad al movimiento. La aplicación incluye características de accesibilidad como opciones de movimiento reducido y paletas de colores personalizables para acomodar diferentes necesidades.

La arquitectura prioriza el rendimiento y las interacciones fluidas, usando Lottie para animaciones y optimizando el renderizado para mantener 60fps incluso durante interacciones complejas. La gestión de estado asegura que las preferencias del usuario persistan entre sesiones, creando una experiencia personalizada que se adapta a las necesidades de cada usuario.

## Tecnologías Utilizadas

- **React Native 0.81.5** - Framework móvil multiplataforma
- **Expo ~54.0** - Plataforma de desarrollo y herramientas
- **TypeScript 5.3** - Desarrollo con seguridad de tipos
- **NativeWind 4.2** - Tailwind CSS para React Native
- **Lottie React Native** - Animaciones fluidas
- **Expo Haptics** - Retroalimentación táctil
- **React Native SVG** - Renderizado de gráficos vectoriales

## Características

### Actividades Principales

1. **Counting Calm (Conteo Calmante)**
   - Toca números, letras, pares e impares en orden secuencial
   - Múltiples rondas con dificultad variable
   - Pausas suaves de respiración entre rondas
   - Seguimiento visual del progreso

2. **Connect the Dots (Conectar los Puntos)**
   - Arrastra líneas entre puntos numerados para revelar patrones geométricos
   - Múltiples variaciones de patrones
   - Interacciones de dibujo fluidas con retroalimentación háptica
   - Tarjetas de vista previa de patrones

### Experiencia de Usuario

- **Temas Personalizables** - Soporte para modo claro y oscuro
- **Paletas de Colores** - Múltiples opciones de paleta (pastel, vibrante, etc.)
- **Accesibilidad** - Opción de movimiento reducido para usuarios con sensibilidad al movimiento
- **Retroalimentación Háptica** - Respuestas táctiles opcionales para interacciones
- **Interludios de Respiración** - Pausas guiadas de respiración entre actividades
- **Transiciones de Onda** - Transiciones visuales suaves entre estados del juego

### Aspectos Técnicos Destacados

- **Gestión de Estado** - Gestión personalizada de configuración y estado de la aplicación
- **Almacenamiento Persistente** - Preferencias del usuario guardadas con AsyncStorage
- **Diseño Responsivo** - Se adapta a diferentes tamaños de pantalla
- **Optimizado para Rendimiento** - Renderizado eficiente y manejo de animaciones
- **Seguridad de Tipos** - Cobertura completa de TypeScript

## Arquitectura

La aplicación sigue una arquitectura basada en características:

- **Features** - Módulos de actividad autocontenidos (counting, connect-dots, breathing, etc.)
- **Components** - Componentes de UI reutilizables (Button, Card, Modal, etc.)
- **Services** - Servicios transversales (haptics, audio)
- **State** - Gestión de estado global (configuración, banderas de aplicación, registros)
- **Theme** - Sistema de temas centralizado con tokens de color

## Filosofía de Diseño

Nameless enfatiza:
- **Interacciones Suaves** - Sin presión, sin prisa, muévete lentamente
- **Calma Visual** - Colores suaves, animaciones sutiles, distracciones mínimas
- **Enfoque y Flujo** - Actividades diseñadas para promover el mindfulness y la conciencia del momento presente
- **Personalización** - Los usuarios pueden personalizar su experiencia a través de la configuración

## Conclusión

Nameless demuestra cómo el diseño cuidadoso y la experiencia de usuario pueden crear herramientas digitales significativas para el bienestar mental. La aplicación combina prácticas modernas de desarrollo móvil con un enfoque en crear experiencias calmantes y meditativas que ayudan a los usuarios a encontrar paz en sus vidas diarias.
