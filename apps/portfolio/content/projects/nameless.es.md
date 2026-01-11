---
projectId: nameless-mindfulness-app
locale: es
orderIndex: 1
previewImageUrl: /projects/nameless.jpg
deployedUrl: https://github.com/irenehl/nameless
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
