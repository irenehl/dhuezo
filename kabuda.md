# Kabuda plan

## Página principal (/)

- Solicitar un préstamo
- Aportar a un préstamo
- Calculadora 
- Gráfica con mis préstamos
- Gráfica con mis aportaciones
- Record crediticio

## Registro de usuarios

### Registro e inicio de sesión

Se realizarán por medio de OTP (One Time Password) o Google. Si es por medio de Google se obtienen datos como: 
- Nombre y apellido.
- Número de teléfono.

Si es por medio de OTP se deberán solicitar al usuario.

Datos para completar el registro que deben ser solicitados en ambos casos: 
- Subida de documento de identidad o pasaporte.

## Perfil de usuario (/profile)

- Formulario para llenar información básica
- Formulario para llenar información de ubicación
- Formulario para datos de empleo 

[Referencia](https://dribbble.com/shots/16282559--Daily-UI-User-profile-in-HRM-web-app?utm_source=Clipboard_Shot&utm_campaign=minhminhhang&utm_content=%5BDaily%20UI%5D%20User%20profile%20in%20HRM%20web%20app&utm_medium=Social_Share&utm_source=Clipboard_Shot&utm_campaign=minhminhhang&utm_content=%5BDaily%20UI%5D%20User%20profile%20in%20HRM%20web%20app&utm_medium=Social_Share)

## Solicitud de préstamos (/application/loan)

### Pasos

1. Condiciones generales (sugerencia: agregar hasta el final)
2. Detalles del préstamo.

    2.1. Monto a solicitar

    2.2 Plazo solicitado

    2.3 Cantidad de cuotas

    2.4 Destino del préstamos

3. Solicitud enviada -> Debe existir una pantalla de "Mis solicitudes"

## Estado de solicitudes (application/[id])

El usuario podrá ver el estado de su solicitud de préstamo pero no podrá cambiar ningún información. 

***Los pasos/estados serán determinados en el sitio de administración***

[Referencia](https://dribbble.com/shots/26376029-Stepper-Component-Visual-Progress-Tracker?utm_source=Clipboard_Shot&utm_campaign=fajaribagas&utm_content=Stepper%20Component%20%E2%80%93%20Visual%20Progress%20Tracker&utm_medium=Social_Share&utm_source=Clipboard_Shot&utm_campaign=fajaribagas&utm_content=Stepper%20Component%20%E2%80%93%20Visual%20Progress%20Tracker&utm_medium=Social_Share)

## Mis préstamos (/loans)

Si el usuario tiene más de un préstamos se le deberán mostrar listados en la página principal, sino por experiencia de usuario se deberá mostrar el detalle del único préstamo activo.  

[Referencia página principal](https://dribbble.com/shots/25445955-Financial-Solutions-Manage-Borrowing-Loan-Dashboard)

[Referencia detalle de un préstamo](https://dribbble.com/shots/25947801-Loan-Details-Modal)

Para hacer el pago de un préstamo se tendrá un botón que redirige a la pasarela de pago que se implemente.

## Invertir (/invest)

En la página principal se deben mostrar todas las inversiones que ha realizado el usuario y el estado de cada una.  

Información a resaltar: 
* Total invertido
* Retorno esperado
* Ganancia esperada
* Inversiones activas

Historial de Inversiones

| Proyecto | Monto | Interés | Plazo | Retorno Esperado | Estado | Fecha |
|----------|-------|---------|-------|------------------|--------|-------|
| Raw Materials for Artisan Leather Goods | $12 | 12% | 6m | $12.72 (+$0.72) | active | 1/3/2026 |

Para ver el detalle de una proyecto invertido la ruta deberá ser: /projects/[id]

## Proyectos (/projects)

En la página principal se deberán mostrar en cards los diferentes proyectos en los que se puede invertir con la siguiente información:

- Nombre
- País 
- Calificación (relacionada al record crediticio)
- % de financiamiento
- Número de inversionistas
- Días transcurridos 
- Destino de la inversión
- Candidad solicitada 

### Inversión en un proyecto (/projects/[id])

Se tendrá acceso a nombre de los inversionistas participantes en el proyecto y la cantidad invertida. 

#### Funcionalidad de "Invertir"

* Se solicita el monto a invertir.
* Se muestran los valores de Retorno Esperado.

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