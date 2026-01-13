---
projectId: food-dice
locale: es
orderIndex: 1
previewImage: /og-image-food-dice.webp
deployedUrl: https://food-dice.dhuezo.dev
repoUrl: https://github.com/irenehl/nameless
featured: true
title: Food Dice
description: Una aplicación móvil que te ayuda a descubrir restaurantes aleatoriamente basándose en tus preferencias de comida y ubicación usando Google Maps Places API.
tags:
  - React Native
  - Expo
  - TypeScript
  - NativeWind
  - Google Maps API
---

# Food Dice

Una aplicación móvil desarrollada con Expo que te ayuda a encontrar restaurantes aleatoriamente basándose en tus preferencias de comida y ubicación. ¡Deja que la app elija tu próximo lugar para comer!

## Resumen

Food Dice es una aplicación móvil desarrollada con React Native que resuelve el dilema de "¿dónde deberíamos comer?" seleccionando aleatoriamente restaurantes basados en las preferencias del usuario. Los usuarios pueden ingresar múltiples tipos de comida que les gustaría probar, establecer un radio de búsqueda en kilómetros, y usar su ubicación actual o ingresar una dirección manualmente. La aplicación luego busca restaurantes usando Google Maps Places API y selecciona aleatoriamente uno de los resultados.

## Tecnologías Utilizadas

- **Expo** (~51.0.0) - Framework para desarrollo móvil
- **React Native** (0.74.5) - Framework de UI
- **TypeScript** (~5.3.3) - Seguridad de tipos y mejor experiencia de desarrollo
- **NativeWind** (^4.0.0) - Tailwind CSS para React Native
- **Google Maps Places API (New)** - Búsqueda de restaurantes y servicios de ubicación
- **expo-location** (~17.0.1) - Acceso a ubicación GPS
- **react-native-maps** (1.14.0) - Visualización interactiva de mapas
- **i18next** (^23.7.16) - Framework de internacionalización
- **expo-localization** (~15.0.2) - Detección de idioma del sistema
- **axios** (^1.6.5) - Cliente HTTP para solicitudes API

## Características

- **Búsqueda multi-tipo de comida**: Ingresa múltiples preferencias de comida (ej: Pizza, Pollo, Hamburguesas) y busca todas simultáneamente
- **Radio de búsqueda personalizable**: Establece la distancia en kilómetros para descubrir restaurantes
- **Flexibilidad de ubicación**: Usa ubicación GPS o ingresa una dirección manualmente
- **Selección aleatoria de restaurantes**: La app selecciona aleatoriamente un restaurante de los resultados, haciendo las decisiones divertidas y espontáneas
- **Detalles completos del restaurante**: Visualiza nombre, dirección, distancia, calificación y ubicación en un mapa interactivo
- **Integración con Google Maps**: Abre restaurantes seleccionados directamente en la app de Google Maps
- **Internacionalización**: Soporte completo para inglés y español con detección automática de idioma basada en la configuración del sistema
- **UI moderna**: Interfaz hermosa con tema oscuro construida con NativeWind (Tailwind CSS)
- **Manejo de errores**: Mensajes de error comprensivos y validación para una mejor experiencia de usuario

## Arquitectura

La aplicación sigue una arquitectura limpia basada en componentes:

- **Screens**: Pantallas principales de la aplicación (HomeScreen)
- **Components**: Componentes UI reutilizables (FoodInputFields, DistanceInput, LocationInput, SearchButton, ResultDisplay)
- **Services**: Lógica de negocio e integración API (places.ts, location.ts)
- **i18n**: Configuración de internacionalización y archivos de traducción
- **Types**: Definiciones de tipos TypeScript para seguridad de tipos

## Detalles Clave de Implementación

### Integración con Google Maps Places API

La aplicación usa la moderna **Places API (New)** con el endpoint `searchText`, que proporciona mejores resultados y datos de ubicación más precisos comparado con la API legacy. La implementación:

- Busca cada tipo de comida por separado y combina los resultados
- Filtra restaurantes por radio para asegurar precisión
- Maneja errores de API elegantemente con mensajes amigables para el usuario
- Soporta múltiples idiomas para mejor localización

### Servicios de Ubicación

- Intenta automáticamente obtener la ubicación actual del usuario al cargar la app
- Recurre a entrada manual de dirección si GPS no está disponible
- Usa Geocoding API para convertir direcciones a coordenadas
- Calcula distancias entre la ubicación del usuario y los restaurantes

### Algoritmo de Selección Aleatoria

Selección aleatoria simple pero efectiva de resultados filtrados asegura variedad en las sugerencias de restaurantes mientras respeta las preferencias del usuario.

## Experiencia de Usuario

La aplicación proporciona una experiencia fluida e intuitiva:

1. Los usuarios agregan tipos de comida que les interesan
2. Establecen su radio de búsqueda preferido
3. Configuran la ubicación (automática o manual)
4. Tapan buscar para encontrar restaurantes
5. Visualizan el restaurante seleccionado aleatoriamente con todos los detalles
6. Opción de abrir en Google Maps o intentar de nuevo para un resultado diferente

## Configuración de Desarrollo

El proyecto incluye instrucciones completas de configuración en el README, cubriendo:

- Configuración de API de Google Cloud Platform
- Configuración de variables de entorno
- Instrucciones de instalación y ejecución
- Solución de problemas comunes
- Soporte multi-plataforma (iOS, Android, Web)

## Conclusión

Food Dice demuestra prácticas modernas de desarrollo de aplicaciones móviles con React Native y Expo, mostrando integración con APIs externas, servicios de ubicación, internacionalización y una interfaz de usuario pulida. La aplicación resuelve un problema del mundo real (fatiga de decisión al elegir dónde comer) con una solución elegante y fácil de usar.

