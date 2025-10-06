# Módulo 10: Mejoras de Paleta de Colores - Contraste y Historial

## Objetivo
Mejorar la funcionalidad de la paleta de colores con cálculos automáticos de contraste de texto para accesibilidad y agregar un sistema de historial interactivo con carrusel en la página `/color-palette`.

---

## Tarea 10.1: Crear utilidades de cálculo de contraste
**Objetivo**: Implementar funciones para calcular contraste según estándares WCAG 2.1

**Archivo**: `/lib/utils/contrast.ts` (nuevo)

### Funciones implementadas:
- `calculateLuminance(hex: string): number` - Calcula la luminancia relativa de un color
- `calculateContrastRatio(color1: string, color2: string): number` - Calcula el ratio de contraste entre dos colores (1-21)
- `getContrastColor(backgroundColor: string): string` - Devuelve `#000000` o `#ffffff` según el mejor contraste
- `adjustTextColorForContrast(background: string, text: string, minRatio: number): string` - Ajusta el color del texto si no cumple con el ratio mínimo
- `meetsWCAGStandards(ratio: number, level: 'AA' | 'AAA', textSize: 'normal' | 'large'): boolean` - Verifica si cumple estándares WCAG
- `getContrastLevel(ratio: number)` - Devuelve descripción del nivel de contraste

**Estándar aplicado**: WCAG 2.1 Level AA (ratio mínimo 4.5:1 para texto normal)

```typescript
import { calculateContrastRatio, getContrastColor, adjustTextColorForContrast } from '@/lib/utils/contrast'

// Ejemplo de uso
const bgColor = '#1a1a1a'
const textColor = '#333333'
const ratio = calculateContrastRatio(bgColor, textColor) // 1.5
const adjustedText = adjustTextColorForContrast(bgColor, textColor, 4.5) // '#ffffff'
```

---

## Tarea 10.2: Ajuste de contraste en servidor (AI Service)
**Objetivo**: Validar y ajustar paletas generadas por IA antes de enviarlas al cliente

**Archivo modificado**: `/lib/ai/openai-service.ts`

### Cambios realizados:
1. Importar utilidades de contraste
2. Crear función `applyContrastAdjustments(palette: ColorPaletteAI)` que:
   - Ajusta `text` color basado en `background` (ratio mínimo 4.5:1)
   - Verifica contraste de `muted` con `background` (mínimo 1.5:1)
   - Verifica contraste de `border` con `background` (mínimo 1.5:1)
3. Aplicar ajustes automáticamente después de recibir respuesta de OpenAI

```typescript
// La IA genera los colores
const palette = await generateColorPalette("feliz")

// Se aplican ajustes automáticos antes de devolver
const adjusted = applyContrastAdjustments(palette)
// adjusted.text será #ffffff si el background es oscuro
```

---

## Tarea 10.3: Ajuste de contraste en cliente (ThemeContext)
**Objetivo**: Aplicar ajustes de contraste adicionales en el cliente al momento de aplicar la paleta

**Archivo modificado**: `/lib/context/ThemeContext.tsx`

### Cambios realizados:
1. Importar utilidades de contraste
2. En `applyPalette()`:
   - Calcular `adjustedText` usando `adjustTextColorForContrast()`
   - Calcular foreground colors para `primary`, `secondary`, `accent` usando `getContrastColor()`
   - Calcular foreground para `muted`
   - Aplicar colores ajustados a CSS custom properties
   - Logging de ratios de contraste para debugging

```typescript
// Ejemplo de aplicación con ajustes
const adjustedText = adjustTextColorForContrast(colors.background, colors.text, 4.5)
root.style.setProperty('--foreground', hexToHsl(adjustedText))
root.style.setProperty('--primary-foreground', hexToHsl(getContrastColor(colors.primary)))
```

**Resultado**: Todos los textos tendrán contraste adecuado automáticamente sin importar los colores generados.

---

## Tarea 10.4: Servicio de almacenamiento local de paletas
**Objetivo**: Gestionar historial de paletas en localStorage para usuarios anónimos y autenticados

**Archivo**: `/lib/services/local-palette-service.ts` (nuevo)

### Funciones implementadas:
- `savePaletteToHistory(palette: ColorPalette): void` - Guarda paleta en localStorage (evita duplicados)
- `getRecentPalettes(limit: number): ColorPalette[]` - Obtiene las últimas N paletas
- `getAllLocalPalettes(): ColorPalette[]` - Obtiene todas las paletas guardadas localmente
- `clearLocalHistory(): void` - Limpia el historial local
- `getPalettesBySessionId(sessionId: string): ColorPalette[]` - Filtra por sesión anónima
- `mergePalettes(local: ColorPalette[], server: ColorPalette[]): ColorPalette[]` - Combina paletas locales y del servidor (sin duplicados)

**Límite de almacenamiento**: Máximo 50 paletas en localStorage

```typescript
import { localPaletteService } from '@/lib/services/local-palette-service'

// Guardar paleta
localPaletteService.savePaletteToHistory(palette)

// Obtener últimas 8 paletas
const recent = localPaletteService.getRecentPalettes(8)
```

---

## Tarea 10.5: Componente de carrusel de paletas
**Objetivo**: Crear carrusel horizontal interactivo con las últimas 8 paletas generadas

**Archivo**: `/components/color-palette/PaletteCarousel.tsx` (nuevo)

### Características:
- **Responsive**: Muestra 1 card (mobile), 2 (tablet), 4 (desktop)
- **Navegación**: Botones prev/next con animación suave usando `framer-motion`
- **Fuente de datos**: Combina paletas de localStorage y servidor (usuario/anónimo)
- **Interacción**: Click en card aplica la paleta instantáneamente
- **Estado activo**: Indica visualmente qué paleta está aplicada actualmente
- **Actualización automática**: Escucha evento `paletteGenerated` para refrescar

### Vista de cada card:
- Tira de colores (5 colores en strip horizontal)
- Texto del prompt (truncado a 2 líneas)
- Botón "Aplicar" o "Activa" si ya está aplicada
- Hover effect con escala

```typescript
<PaletteCarousel />
```

**Estado vacío**: Muestra mensaje motivacional para generar primera paleta

---

## Tarea 10.6: Panel desplegable de historial completo
**Objetivo**: Crear sección expandible con todas las paletas del usuario

**Archivo**: `/components/color-palette/PaletteHistoryDropdown.tsx` (nuevo)

### Características:
- **Colapsible**: Botón "Ver Todo" / "Ocultar" con animación smooth
- **Búsqueda**: Input de búsqueda por texto del prompt
- **Grid completo**: Muestra todas las paletas en grid 3 columnas
- **Scroll interno**: Max height 600px con overflow-y-auto
- **Limpieza**: Botón para limpiar historial local (solo usuarios anónimos)
- **Información contextual**: Mensaje para usuarios anónimos sobre beneficios de login
- **Reutilización**: Usa componente `PaletteCard` existente

### Fuentes de datos:
- Usuario autenticado: paletas de base de datos
- Usuario anónimo: paletas de localStorage por sessionId
- Merge automático de ambas fuentes

```typescript
<PaletteHistoryDropdown />
```

**Lazy loading**: Solo carga paletas cuando se expande por primera vez

---

## Tarea 10.7: Integrar componentes en página principal
**Objetivo**: Agregar carrusel e historial a `/color-palette`

**Archivo modificado**: `/app/color-palette/page.tsx`

### Cambios realizados:
1. Importar `PaletteCarousel` y `PaletteHistoryDropdown`
2. Agregar nueva sección "Tus Paletas Recientes" después de ejemplos:
   - Título con icono Clock
   - Descripción
   - Componente `PaletteCarousel`
   - Componente `PaletteHistoryDropdown`

### Estructura de la página actualizada:
1. Hero section
2. "¿Cómo funciona?"
3. Input de generación
4. Preview de paleta actual
5. Ejemplos de prompts
6. **NUEVO**: Sección de historial con carrusel
7. **NUEVO**: Dropdown de historial completo

```typescript
{/* History Section */}
<div className="space-y-4">
  <h2>Tus Paletas Recientes</h2>
  <PaletteCarousel />
  <PaletteHistoryDropdown />
</div>
```

---

## Tarea 10.8: Sincronizar guardado con localStorage
**Objetivo**: Guardar automáticamente cada paleta generada en localStorage

**Archivo modificado**: `/components/color-palette/ColorPaletteInput.tsx`

### Cambios realizados:
1. Importar `localPaletteService`
2. Después de generar paleta exitosamente:
   - Llamar `localPaletteService.savePaletteToHistory(data.palette)`
   - Aplicar paleta con `applyPalette()`
   - Disparar evento custom `paletteGenerated` para notificar a otros componentes

```typescript
// Después de recibir respuesta del API
localPaletteService.savePaletteToHistory(data.palette)
applyPalette(data.palette)
window.dispatchEvent(new Event('paletteGenerated'))
```

**Resultado**: Carrusel se actualiza automáticamente sin necesidad de refresh

---

## Tarea 10.9: Mejorar PalettePreview con información de contraste
**Objetivo**: Mostrar badges y métricas de accesibilidad en la paleta actual

**Archivo modificado**: `/components/color-palette/PalettePreview.tsx`

### Cambios realizados:
1. Importar utilidades de contraste y Badge component
2. Calcular contrast ratio entre background y text
3. Obtener nivel de contraste con `getContrastLevel()`
4. Agregar Badge en header:
   - Verde/Success: "WCAG AAA compliant" (ratio ≥ 7)
   - Amarillo/Secondary: "WCAG AA compliant" (ratio ≥ 4.5)
   - Rojo/Destructive: "Does not meet WCAG" (ratio < 4.5)
   - Icono: CheckCircle o AlertCircle
5. Agregar sección informativa al final mostrando:
   - Ratio exacto de contraste (ej: "5.23:1")
   - Mensaje sobre ajuste automático según WCAG 2.1 AA

### Vista mejorada:
```
┌─────────────────────────────────┐
│ Paleta Actual    [✓ WCAG AA]   │ <- Badge de accesibilidad
│ Prompt: "feliz"                 │
├─────────────────────────────────┤
│ [Colores]                       │
│                                 │
│ ℹ️ Contraste Background/Text:   │
│    4.82:1 — WCAG AA compliant  │
│    Ajustado automáticamente    │
└─────────────────────────────────┘
```

---

## Funcionalidades completadas

### ✅ Contraste automático (dual: server + client)
- Validación en servidor al generar con IA
- Validación adicional en cliente al aplicar
- Garantiza WCAG 2.1 Level AA (4.5:1 mínimo)
- Logging de ratios para debugging

### ✅ Historial de paletas (funciona sin login)
- Almacenamiento en localStorage para anónimos
- Sincronización con base de datos para usuarios autenticados
- Merge inteligente sin duplicados
- Límite de 50 paletas en local storage
- Event-driven updates (sin polling)

### ✅ Carrusel interactivo
- Responsive (1/2/4 cards según viewport)
- Navegación fluida con framer-motion
- Click-to-apply instantáneo
- Indicador de paleta activa
- Estado vacío con mensaje

### ✅ Dropdown de historial completo
- Expandible/colapsible con animación
- Búsqueda en tiempo real
- Grid de 3 columnas
- Scroll interno limitado
- Opción de limpiar historial local

### ✅ UI mejorada
- Badges de accesibilidad
- Métricas de contraste visibles
- Información educativa sobre WCAG
- Iconografía consistente

---

## Archivos creados/modificados

### Nuevos archivos:
1. `/lib/utils/contrast.ts` - Utilidades de contraste WCAG
2. `/lib/services/local-palette-service.ts` - Servicio de localStorage
3. `/components/color-palette/PaletteCarousel.tsx` - Carrusel de paletas
4. `/components/color-palette/PaletteHistoryDropdown.tsx` - Dropdown de historial

### Archivos modificados:
1. `/lib/ai/openai-service.ts` - Ajustes de contraste server-side
2. `/lib/context/ThemeContext.tsx` - Ajustes de contraste client-side
3. `/components/color-palette/ColorPaletteInput.tsx` - Guardado en localStorage
4. `/app/color-palette/page.tsx` - Integración de nuevos componentes
5. `/components/color-palette/PalettePreview.tsx` - Badges y métricas de contraste

---

## Tecnologías utilizadas

- **Framer Motion**: Animaciones del carrusel y dropdown
- **WCAG 2.1**: Estándares de accesibilidad
- **localStorage API**: Persistencia local de historial
- **Custom Events**: Comunicación entre componentes
- **TypeScript**: Type safety completo
- **Tailwind CSS**: Estilos responsive
- **shadcn/ui**: Componentes UI (Badge, Card, Button, etc.)

---

## Testing sugerido

1. **Contraste**:
   - Generar paleta con background muy claro → texto debe ser negro
   - Generar paleta con background muy oscuro → texto debe ser blanco
   - Verificar ratio en console.log
   - Verificar badge en PalettePreview

2. **Historial (usuario anónimo)**:
   - Generar 3 paletas
   - Verificar que aparecen en carrusel
   - Hacer click en paleta del carrusel → debe aplicarse
   - Expandir historial completo → deben aparecer las 3
   - Buscar por prompt → debe filtrar
   - Limpiar historial → debe vaciarse

3. **Historial (usuario autenticado)**:
   - Login
   - Generar paleta → debe guardarse en BD
   - Logout y volver a login → paletas deben persistir
   - Verificar merge con paletas locales previas

4. **Responsiveness**:
   - Mobile: 1 card visible en carrusel
   - Tablet: 2 cards visibles
   - Desktop: 4 cards visibles
   - Navegación debe funcionar en todos los tamaños

5. **Edge cases**:
   - Generar más de 50 paletas → debe mantener solo las últimas 50
   - Generar paleta duplicada → no debe duplicarse en historial
   - Abrir dropdown sin paletas → debe mostrar mensaje vacío

---

## Próximas mejoras sugeridas

1. **Exportar paleta**: Botón para descargar paleta como CSS/JSON/Tailwind config
2. **Compartir paleta**: Generar link único para compartir
3. **Favoritos**: Marcar paletas favoritas con estrella
4. **Tags/Categorías**: Organizar paletas por mood/categoría
5. **Comparación**: Vista side-by-side de 2 paletas
6. **Paletas populares**: Sección con paletas más usadas por la comunidad
7. **Accessibility report**: Informe completo de todos los ratios de contraste
8. **Color blindness simulator**: Preview de cómo se ve la paleta con diferentes tipos de daltonismo

---

## Referencias

- [WCAG 2.1 Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [shadcn/ui Components](https://ui.shadcn.com/)

---

**Módulo completado** ✅

Este módulo mejora significativamente la experiencia del usuario al garantizar accesibilidad automática y proporcionar un historial interactivo de paletas, todo funcionando tanto para usuarios autenticados como anónimos.

