# Propuesta de Sitio de Administración para Kabuda

## Rutas Principales (/admin)

### 1. Dashboard (/admin/dashboard)

**Métricas principales:**
- Total de préstamos activos
- Total de préstamos pendientes de revisión
- Total de inversiones activas
- Monto total prestado
- Monto total invertido
- Ingresos por intereses (mensual/anual)
- Usuarios registrados (nuevos este mes)
- Tasa de aprobación de préstamos
- Proyectos en financiamiento

**Gráficas:**
- Evolución de préstamos e inversiones (línea de tiempo)
- Distribución por estados de préstamos (gráfica de pastel)
- Top 10 proyectos más financiados
- Distribución geográfica de usuarios y préstamos

---

### 2. Gestión de Solicitudes de Préstamos (/admin/loans/applications)

**Lista de solicitudes:**
- Tabla con filtros:
  - Estado (Pendiente, En revisión, Aprobada, Rechazada, Cancelada)
  - Rango de fechas
  - Monto (rango)
  - Usuario
  - Búsqueda por nombre, email o ID de solicitud
- Columnas visibles:
  - ID de solicitud
  - Usuario (nombre, email)
  - Monto solicitado
  - Plazo solicitado
  - Cuotas
  - Destino del préstamo
  - Fecha de solicitud
  - Estado actual
  - Acciones

**Detalle de solicitud (/admin/loans/applications/[id]):**
- Información completa del usuario:
  - Perfil completo
  - Documento de identidad (vista y descarga)
  - Información de empleo
  - Record crediticio/historial
  - Historial de préstamos previos
- Detalles del préstamo solicitado
- Workflow de aprobación/rechazo con estados:
  - Pendiente
  - En revisión documental
  - Verificación de identidad
  - Evaluación crediticia
  - Análisis de capacidad de pago
  - Aprobada
  - Rechazada
  - Cancelada
- Comentarios y notas internas
- Historial de cambios de estado
- Acciones: Aprobar, Rechazar, Solicitar más información, Cambiar estado

---

### 3. Gestión de Préstamos Activos (/admin/loans/active)

**Lista de préstamos activos:**
- Filtros: Usuario, Monto, Estado de pago, Fecha de vencimiento
- Información:
  - Usuario
  - Monto total
  - Cuotas pagadas/pendientes
  - Próximo pago
  - Estado de pagos
  - Días en mora (si aplica)
  - Acciones

**Detalle de préstamo (/admin/loans/active/[id]):**
- Información completa del préstamo
- Calendario de pagos (tabla)
- Historial de pagos
- Estado de cada cuota (Pagada, Pendiente, Vencida, En mora)
- Opciones: Registrar pago manual, Marcar como pagado, Generar recibo, Enviar recordatorio

---

### 4. Gestión de Proyectos (/admin/projects)

**Lista de proyectos:**
- Todos los proyectos (activos, completados, cancelados)
- Filtros: Estado, País, Rango de financiamiento
- Acciones: Crear nuevo proyecto, Editar, Ver detalles, Activar/Desactivar


**Detalle de proyecto (/admin/projects/[id]):**
- Información completa
- Lista de inversores:
  - Nombre
  - Monto invertido
  - Fecha de inversión
  - Estado
- Gráfica de progreso de financiamiento
- Acciones: Editar, Activar/Desactivar, Ver reporte financiero

---

### 5. Gestión de Usuarios (/admin/users)

**Lista de usuarios:**
- Tabla con búsqueda y filtros:
  - Estado (Activo, Suspendido, Verificación pendiente)
  - Rango de fechas de registro
  - País
  - Búsqueda por nombre, email, teléfono
- Columnas:
  - Nombre
  - Email
  - Teléfono
  - Estado de verificación
  - Fecha de registro
  - Total de préstamos
  - Total de inversiones
  - Record crediticio
  - Acciones

**Detalle de usuario (/admin/users/[id]):**
- Información completa:
  - Perfil básico
  - Información de ubicación
  - Información de empleo
  - Documento de identidad
- Historial de préstamos
- Historial de inversiones
- Record crediticio y calificación
- Acciones: Suspender usuario, Verificar/Rechazar documento, Editar información, Ver actividad completa

---

### 6. Configuración de Estados de Préstamos (/admin/settings/loan-statuses)

**Gestión de workflow:**
- Crear/editar/eliminar estados
- Orden de estados (drag & drop)
- Configuración por estado:
  - Nombre del estado
  - Descripción
  - Color/icono
  - Si permite cambio de estado manual
  - Estados siguientes permitidos
  - Si requiere comentarios obligatorios
  - Si envía notificación al usuario

---

### 7. Reportes y Analytics (/admin/reports)

**Reportes disponibles:**
- Reporte de préstamos (por período, estado, monto)
- Reporte de inversiones
- Reporte de usuarios (nuevos, activos, suspendidos)
- Reporte financiero (ingresos, egresos, ganancias)
- Reporte de morosidad
- Exportación a Excel/PDF

---

### 8. Configuración General (/admin/settings)

**Ajustes del sistema:**
- Tasas de interés (por tipo de préstamo, por calificación)
- Límites de préstamos (mínimo, máximo)
- Límites de inversión
- Configuración de pagos (pasarelas, métodos)
- Notificaciones (templates de emails, SMS)
- Términos y condiciones
- Políticas de privacidad
- Configuración de calificaciones crediticias
