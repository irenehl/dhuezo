# Plan Completo de Desarrollo - Kabuda

## Índice

### Sección 1: Aplicación Pública (Frontend)
1. [Página Principal](#página-principal)
2. [Registro y Autenticación](#registro-y-autenticación)
3. [Perfil de Usuario](#perfil-de-usuario)
4. [Sistema de Préstamos](#sistema-de-préstamos)
5. [Sistema de Inversiones](#sistema-de-inversiones)

### Sección 2: Sitio de Administración (Admin)
6. [Dashboard de Administración](#dashboard-de-administración)
7. [Gestión de Solicitudes de Préstamos](#gestión-de-solicitudes-de-préstamos)
8. [Gestión de Préstamos Activos](#gestión-de-préstamos-activos)
9. [Gestión de Proyectos](#gestión-de-proyectos)
10. [Gestión de Usuarios](#gestión-de-usuarios)
11. [Configuración de Estados](#configuración-de-estados)
12. [Reportes y Analytics](#reportes-y-analytics)
13. [Configuración General](#configuración-general)

### Sección 3: Plan de Implementación
14. [Fases de Desarrollo](#fases-de-desarrollo)
15. [Resumen de Fases y Priorización](#resumen-de-fases-y-priorización)

---

# Sección 1: Aplicación Pública (Frontend)

## Página Principal (/)

La página principal debe incluir:

- Solicitar un préstamo (CTA principal)
- Aportar a un préstamo / Invertir en proyectos
- Calculadora de préstamos
- Gráfica con mis préstamos (si el usuario está autenticado)
- Gráfica con mis aportaciones/inversiones (si el usuario está autenticado)
- Record crediticio (si el usuario está autenticado)

---

## Registro y Autenticación

### Registro e Inicio de Sesión

Se realizarán por medio de **OTP (One Time Password)** o **Google OAuth**.

**Si es por medio de Google:**
- Se obtienen automáticamente: nombre, apellido, número de teléfono

**Si es por medio de OTP:**
- Se deben solicitar al usuario: nombre, apellido, número de teléfono

**Datos para completar el registro (en ambos casos):**
- Subida de documento de identidad o pasaporte

**Referencias de diseño:**
- Considerar flujos de autenticación modernos y seguros

---

## Perfil de Usuario (/profile)

El perfil de usuario debe incluir tres secciones principales:

1. **Formulario de información básica**
   - Datos personales
   - Información de contacto

2. **Formulario de información de ubicación**
   - Dirección
   - Ciudad
   - País
   - Código postal

3. **Formulario de datos de empleo**
   - Empresa/Empleador
   - Cargo/Posición
   - Ingresos
   - Tiempo en el empleo

[Referencia de diseño](https://dribbble.com/shots/16282559--Daily-UI-User-profile-in-HRM-web-app)

---

## Sistema de Préstamos

### Solicitud de Préstamos (/application/loan)

**Pasos del proceso:**

1. **Condiciones generales**
   - Términos y condiciones
   - Política de privacidad
   - (Sugerencia: agregar hasta el final del flujo)

2. **Detalles del préstamo:**
   - 2.1. Monto a solicitar
   - 2.2. Plazo solicitado
   - 2.3. Cantidad de cuotas
   - 2.4. Destino del préstamo

3. **Solicitud enviada**
   - Confirmación de envío
   - Debe existir una pantalla de "Mis solicitudes"

### Estado de Solicitudes (/application/[id])

El usuario podrá ver el estado de su solicitud de préstamo pero **no podrá cambiar ningún información**.

- Visualización del estado actual
- Historial de cambios de estado
- Información sobre próximos pasos

**Nota importante:** Los pasos/estados serán determinados en el sitio de administración.

[Referencia de diseño - Stepper Component](https://dribbble.com/shots/26376029-Stepper-Component-Visual-Progress-Tracker)

### Mis Préstamos (/loans)

**Comportamiento dinámico:**

- Si el usuario tiene **más de un préstamo**: mostrar listado en la página principal
- Si el usuario tiene **un solo préstamo activo**: mostrar directamente el detalle del préstamo (mejor UX)

**Funcionalidad:**
- Vista del préstamo activo
- Calendario de pagos
- Historial de pagos
- Botón para realizar pago que redirige a la pasarela de pago implementada

**Referencias de diseño:**
- [Página principal de préstamos](https://dribbble.com/shots/25445955-Financial-Solutions-Manage-Borrowing-Loan-Dashboard)
- [Detalle de un préstamo](https://dribbble.com/shots/25947801-Loan-Details-Modal)

---

## Sistema de Inversiones

### Invertir - Página Principal (/invest)

**Información a mostrar:**

- Total invertido
- Retorno esperado
- Ganancia esperada
- Inversiones activas

**Historial de Inversiones:**

Tabla con la siguiente información:

| Proyecto | Monto | Interés | Plazo | Retorno Esperado | Estado | Fecha |
|----------|-------|---------|-------|------------------|--------|-------|
| Raw Materials for Artisan Leather Goods | $12 | 12% | 6m | $12.72 (+$0.72) | active | 1/3/2026 |

**Ruta de detalle:** Para ver el detalle de un proyecto invertido: `/projects/[id]`

### Proyectos Disponibles (/projects)

En la página principal se mostrarán en **cards** los diferentes proyectos en los que se puede invertir con:

- Nombre del proyecto
- País
- Calificación (relacionada al record crediticio)
- % de financiamiento
- Número de inversionistas
- Días transcurridos
- Destino de la inversión
- Cantidad solicitada

### Inversión en un Proyecto (/projects/[id])

**Información disponible:**

- Detalles completos del proyecto
- Lista de inversionistas participantes:
  - Nombre
  - Cantidad invertida

#### Funcionalidad de "Invertir"

- Se solicita el monto a invertir
- Se muestran los valores de Retorno Esperado

##### Modal de Inversión

| Elemento | Descripción | Valor/Estado |
|----------|-------------|--------------|
| **Título** | Título del modal | "Invertir en Raw Materials for Artisan Leather Goods" |
| **Descripción** | Texto informativo | "Ingresa el monto que deseas invertir. Esta es una transacción simulada." |
| **Campo de Entrada** | Monto de Inversión (USD) | $121 (ejemplo) |
| **Máximo Permitido** | Límite de inversión | $5,389 |
| **Retornos Esperados** | Sección con cálculos | En caja verde con icono de gráfica |
| **Tu Inversión** | Monto ingresado | $121 |
| **Interés** | Tasa y período | 12% por 6 meses |
| **Interés Calculado** | Valor del interés | +$7.26 |
| **Retorno Total** | Inversión + Interés | $128.26 |
| **Botón Cancelar** | Acción secundaria | "Cancelar" (fondo blanco, borde gris) |
| **Botón Confirmar** | Acción principal | "Confirmar Inversión" (fondo azul, texto blanco) |

---

# Sección 2: Sitio de Administración (Admin)

## Dashboard de Administración (/admin/dashboard)

### Métricas Principales

- Total de préstamos activos
- Total de préstamos pendientes de revisión
- Total de inversiones activas
- Monto total prestado
- Monto total invertido
- Ingresos por intereses (mensual/anual)
- Usuarios registrados (nuevos este mes)
- Tasa de aprobación de préstamos
- Proyectos en financiamiento

### Gráficas

- Evolución de préstamos e inversiones (línea de tiempo)
- Distribución por estados de préstamos (gráfica de pastel)
- Top 10 proyectos más financiados
- Distribución geográfica de usuarios y préstamos

---

## Gestión de Solicitudes de Préstamos (/admin/loans/applications)

### Lista de Solicitudes

**Filtros disponibles:**

- Estado (Pendiente, En revisión, Aprobada, Rechazada, Cancelada)
- Rango de fechas
- Monto (rango)
- Usuario
- Búsqueda por nombre, email o ID de solicitud

**Columnas visibles:**

- ID de solicitud
- Usuario (nombre, email)
- Monto solicitado
- Plazo solicitado
- Cuotas
- Destino del préstamo
- Fecha de solicitud
- Estado actual
- Acciones

### Detalle de Solicitud (/admin/loans/applications/[id])

**Información del usuario:**

- Perfil completo
- Documento de identidad (vista y descarga)
- Información de empleo
- Record crediticio/historial
- Historial de préstamos previos

**Detalles del préstamo solicitado**

**Workflow de aprobación/rechazo con estados:**

- Pendiente
- En revisión documental
- Verificación de identidad
- Evaluación crediticia
- Análisis de capacidad de pago
- Aprobada
- Rechazada
- Cancelada

**Funcionalidades adicionales:**

- Comentarios y notas internas
- Historial de cambios de estado
- Acciones: Aprobar, Rechazar, Solicitar más información, Cambiar estado

---

## Gestión de Préstamos Activos (/admin/loans/active)

### Lista de Préstamos Activos

**Filtros:**

- Usuario
- Monto
- Estado de pago
- Fecha de vencimiento

**Información mostrada:**

- Usuario
- Monto total
- Cuotas pagadas/pendientes
- Próximo pago
- Estado de pagos
- Días en mora (si aplica)
- Acciones

### Detalle de Préstamo (/admin/loans/active/[id])

- Información completa del préstamo
- Calendario de pagos (tabla)
- Historial de pagos
- Estado de cada cuota (Pagada, Pendiente, Vencida, En mora)

**Opciones disponibles:**

- Registrar pago manual
- Marcar como pagado
- Generar recibo
- Enviar recordatorio

---

## Gestión de Proyectos (/admin/projects)

### Lista de Proyectos

**Filtros:**

- Estado (Activo, Completado, Cancelado)
- País
- Rango de financiamiento

**Acciones:**

- Crear nuevo proyecto
- Editar proyecto existente
- Ver detalles
- Activar/Desactivar

### Crear/Editar Proyecto (/admin/projects/new o /admin/projects/[id]/edit)

**Formulario:**

- Nombre del proyecto
- Descripción
- País
- Destino de la inversión
- Monto solicitado
- Tasa de interés (%)
- Plazo (meses)
- Calificación crediticia (select)
- Estado (Borrador, Activo, Completado, Cancelado)
- Fecha de inicio
- Fecha límite de financiamiento
- Imágenes/documentos (opcional)

### Detalle de Proyecto (/admin/projects/[id])

**Información:**

- Información completa del proyecto

**Lista de inversores:**

- Nombre
- Monto invertido
- Fecha de inversión
- Estado

**Visualizaciones:**

- Gráfica de progreso de financiamiento

**Acciones:**

- Editar proyecto
- Activar/Desactivar
- Ver reporte financiero

---

## Gestión de Usuarios (/admin/users)

### Lista de Usuarios

**Búsqueda y filtros:**

- Estado (Activo, Suspendido, Verificación pendiente)
- Rango de fechas de registro
- País
- Búsqueda por nombre, email, teléfono

**Columnas:**

- Nombre
- Email
- Teléfono
- Estado de verificación
- Fecha de registro
- Total de préstamos
- Total de inversiones
- Record crediticio
- Acciones

### Detalle de Usuario (/admin/users/[id])

**Información completa:**

- Perfil básico
- Información de ubicación
- Información de empleo
- Documento de identidad (vista y descarga)

**Historiales:**

- Historial de préstamos
- Historial de inversiones
- Record crediticio y calificación

**Acciones:**

- Suspender usuario
- Verificar/Rechazar documento
- Editar información
- Ver actividad completa

---

## Configuración de Estados (/admin/settings/loan-statuses)

### Gestión de Workflow

**Funcionalidades:**

- Crear/editar/eliminar estados
- Orden de estados (drag & drop)

**Configuración por estado:**

- Nombre del estado
- Descripción
- Color/icono
- Si permite cambio de estado manual
- Estados siguientes permitidos
- Si requiere comentarios obligatorios
- Si envía notificación al usuario

---

## Reportes y Analytics (/admin/reports)

### Reportes Disponibles

- Reporte de préstamos (por período, estado, monto)
- Reporte de inversiones
- Reporte de usuarios (nuevos, activos, suspendidos)
- Reporte financiero (ingresos, egresos, ganancias)
- Reporte de morosidad

**Exportación:**

- Exportación a Excel
- Exportación a PDF

---

## Configuración General (/admin/settings)

### Ajustes del Sistema

- **Tasas de interés:**
  - Por tipo de préstamo
  - Por calificación crediticia

- **Límites:**
  - Límites de préstamos (mínimo, máximo)
  - Límites de inversión

- **Configuración de pagos:**
  - Pasarelas de pago
  - Métodos de pago disponibles

- **Notificaciones:**
  - Templates de emails
  - Templates de SMS

- **Documentos legales:**
  - Términos y condiciones
  - Políticas de privacidad

- **Configuración de calificaciones crediticias**

---

# Sección 3: Plan de Implementación

## Fases de Desarrollo

### Fase 0: Setup y Configuración Base

**Objetivo:** Configurar el entorno de desarrollo y la infraestructura base.

**Tareas:**

1. Configurar proyecto Next.js 15 con TypeScript
2. Configurar Tailwind CSS y shadcn/ui
3. Configurar Supabase (proyecto, base de datos, autenticación)
4. Configurar estructura de carpetas según convenciones
5. Configurar variables de entorno
6. Configurar i18n (si aplica)
7. Setup de dark mode con next-themes
8. Configurar middleware de autenticación

**Entregables:**

- Proyecto base funcional
- Configuración de Supabase completa
- Sistema de autenticación básico funcionando



---

### Fase 1: Autenticación y Gestión de Usuarios

**Objetivo:** Implementar el sistema de registro, autenticación y perfiles de usuario.

**Tareas:**

1. **Autenticación:**
   - Implementar OTP (One Time Password)
   - Implementar Google OAuth
   - Flujo de registro completo
   - Subida de documento de identidad

2. **Perfil de Usuario:**
   - Formulario de información básica
   - Formulario de información de ubicación
   - Formulario de datos de empleo
   - Vista de perfil completo

3. **Base de datos:**
   - Diseñar schema de usuarios
   - Tabla de perfiles
   - Tabla de documentos
   - Row Level Security (RLS) policies

**Entregables:**

- Sistema de autenticación completo (OTP + Google)
- Perfil de usuario funcional
- Base de datos de usuarios configurada

---

### Fase 2: Sistema de Préstamos (Frontend)

**Objetivo:** Implementar el flujo completo de solicitud de préstamos desde el frontend.

**Tareas:**

1. **Página Principal:**
   - Dashboard con métricas básicas
   - Calculadora de préstamos
   - CTAs principales

2. **Solicitud de Préstamos:**
   - Flujo multi-paso (/application/loan)
   - Formulario de detalles del préstamo
   - Validaciones
   - Envío de solicitud

3. **Visualización de Estado:**
   - Página de estado de solicitud (/application/[id])
   - Componente stepper para mostrar progreso
   - Vista de solo lectura

4. **Mis Préstamos (UI básica):**
   - Lista de préstamos (/loans)
   - Detalle de préstamo activo
   - Calendario de pagos (estructura, sin procesamiento)
   - Botón de pago (placeholders - funcionalidad en Fase 3)

**Entregables:**

- Flujo completo de solicitud de préstamos funcional
- Visualización de estados de préstamos
- Vista de préstamos activos (UI completa, pagos en siguiente fase)

---

### Fase 3: Pasarela de Pagos

**Objetivo:** Integrar y configurar la pasarela de pagos para habilitar transacciones reales de préstamos e inversiones.

**Justificación:** Esta fase es crítica porque sin pagos funcionales, ninguna de las funcionalidades de préstamos o inversiones puede considerarse completa. Debe implementarse antes de continuar con inversiones.

**Tareas:**

1. **Selección e Integración de Pasarela:**
   - Evaluación y selección de pasarela de pago (Stripe, Wompi, etc.)
   - Configuración de cuenta y credenciales
   - Integración del SDK/cliente de la pasarela
   - Configuración de ambientes (sandbox/producción)

2. **Backend de Pagos:**
   - API routes para procesamiento de pagos
   - Manejo de intenciones de pago (payment intents)
   - Webhooks de la pasarela
   - Validación y seguridad de webhooks
   - Procesamiento asíncrono de pagos

3. **Integración con Préstamos:**
   - Botón de pago funcional en /loans
   - Flujo de pago de cuotas
   - Confirmación de pagos
   - Actualización de estado de préstamos tras pago
   - Manejo de pagos fallidos

4. **Base de Datos para Pagos:**
   - Schema de transacciones
   - Registro de pagos
   - Estados de transacciones
   - Historial de pagos
   - Relación con préstamos e inversiones

5. **Manejo de Errores:**
   - Reintentos automáticos
   - Manejo de pagos fallidos
   - Notificaciones de errores
   - Logging y auditoría

**Entregables:**

- Pasarela de pagos completamente integrada
- Sistema de procesamiento de pagos funcional
- Webhooks configurados y funcionando
- Pagos de préstamos completamente funcionales
- Base de datos de transacciones configurada

**Nota:** Esta fase debe completarse antes de considerar las fases 2 y 4 como terminadas, ya que son dependientes de esta funcionalidad.

---

### Fase 4: Sistema de Inversiones (Frontend + Pagos)

**Objetivo:** Implementar el sistema de inversión en proyectos desde el frontend.

**Tareas:**

1. **Página de Inversiones:**
   - Dashboard de inversiones (/invest)
   - Métricas de inversión
   - Historial de inversiones (tabla)

2. **Catálogo de Proyectos:**
   - Lista de proyectos disponibles (/projects)
   - Cards con información de proyectos
   - Filtros y búsqueda

3. **Detalle de Proyecto:**
   - Página de detalle (/projects/[id])
   - Lista de inversionistas
   - Información completa del proyecto

4. **Modal de Inversión:**
   - Formulario de inversión
   - Cálculo de retornos esperados
   - Confirmación de inversión
   - **Integración con pasarela de pago (Fase 3)** para procesar inversiones
   - Procesamiento de pago de inversión
   - Confirmación y registro de inversión

**Entregables:**

- Sistema de inversión completo funcional
- Catálogo de proyectos
- Proceso de inversión end-to-end con pagos funcionales
---

### Fase 4: Administración Básica (Admin Core)

**Objetivo:** Implementar las funcionalidades básicas del panel de administración.

**Tareas:**

1. **Autenticación Admin:**
   - Sistema de roles (Admin, Moderador)
   - Protección de rutas /admin
   - Dashboard básico

2. **Gestión de Solicitudes:**
   - Lista de solicitudes (/admin/loans/applications)
   - Detalle de solicitud
   - Cambio de estados básico
   - Visualización de documentos

3. **Gestión de Préstamos Activos:**
   - Lista de préstamos activos
   - Detalle de préstamo
   - Registro de pagos manuales
   - Calendario de pagos

4. **Gestión de Proyectos:**
   - CRUD de proyectos
   - Lista de proyectos
   - Crear/editar proyectos
   - Vista de inversores por proyecto

5. **Gestión de Usuarios:**
   - Lista de usuarios
   - Detalle de usuario
   - Verificación de documentos
   - Suspender usuarios

**Entregables:**

- Panel de administración funcional
- Gestión completa de solicitudes de préstamos
- Gestión de proyectos y usuarios



---

### Fase 6: Configuración y Estados (Admin Avanzado)

**Objetivo:** Implementar la configuración del sistema y gestión avanzada de estados.

**Tareas:**

1. **Configuración de Estados:**
   - Gestión de workflow de estados (/admin/settings/loan-statuses)
   - Crear/editar/eliminar estados
   - Configuración de transiciones permitidas
   - Ordenamiento de estados (drag & drop)

2. **Configuración General:**
   - Tasas de interés configurables
   - Límites de préstamos e inversiones
   - Configuración de pagos
   - Templates de notificaciones
   - Documentos legales (términos, políticas)

**Entregables:**

- Sistema de configuración completo
- Gestión flexible de estados de préstamos
- Configuración de parámetros del sistema



---

### Fase 7: Analytics y Reportes (Admin Avanzado)

**Objetivo:** Implementar sistema de reportes y analytics para toma de decisiones.

**Tareas:**

1. **Dashboard Avanzado:**
   - Métricas en tiempo real
   - Gráficas interactivas
   - Widgets personalizables

2. **Reportes:**
   - Reporte de préstamos
   - Reporte de inversiones
   - Reporte de usuarios
   - Reporte financiero
   - Reporte de morosidad
   - Exportación (Excel, PDF)

3. **Analytics:**
   - Evolución temporal de métricas
   - Distribuciones y análisis estadísticos
   - Alertas y notificaciones importantes

**Entregables:**

- Sistema completo de reportes
- Dashboard con analytics avanzados
- Exportación de datos funcional



---

### Fase 8: Notificaciones y Comunicaciones

**Objetivo:** Implementar sistema de notificaciones para mantener informados a usuarios y administradores.

**Tareas:**

1. **Notificaciones:**
   - Sistema de emails (templates)
   - Sistema de SMS (si aplica)
   - Notificaciones push (opcional)
   - Notificaciones de cambios de estado
   - Recordatorios de pagos
   - Confirmaciones de transacciones

2. **Integraciones Adicionales:**
   - Verificación de documentos (si aplica)
   - Servicios de scoring crediticio (si aplica)

**Entregables:**

- Sistema de notificaciones automáticas completo
- Templates de emails y SMS configurados
- Integraciones adicionales implementadas



---

### Fase 9: Optimización y Mejoras

**Objetivo:** Optimizar rendimiento, seguridad y experiencia de usuario.

**Tareas:**

1. **Rendimiento:**
   - Optimización de queries
   - Caching estratégico
   - Optimización de imágenes
   - Lazy loading

2. **Seguridad:**
   - Auditoría de seguridad
   - Hardening de RLS policies
   - Validaciones adicionales
   - Rate limiting

3. **UX/UI:**
   - Mejoras basadas en feedback
   - Accesibilidad (a11y)
   - Responsive design refinado
   - Animaciones y transiciones

4. **Testing:**
   - Tests unitarios críticos
   - Tests de integración
   - Tests E2E de flujos principales

**Entregables:**

- Aplicación optimizada y segura
- Mejoras de UX implementadas
- Testing básico implementado
