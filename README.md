# 💼 Prueba Técnica – Control de Gastos Personales

**Angular & ASP .NET Core**

Aplicación web desarrollada como prueba técnica para un proceso de selección, cuyo objetivo es el control de ingresos, egresos y presupuestos personales por fondo monetario y tipo de gasto.

El proyecto fue desarrollado de forma individual y cubre tanto frontend como backend, incluyendo lógica de negocio, validaciones y persistencia de datos.

## 🛠️ Tecnologías utilizadas

### Frontend
- Angular
- Angular Material
- TypeScript

### Backend
- ASP .NET Core
- Entity Framework Core
- JWT Authentication

### Base de Datos
- Microsoft SQL Server

## 📋 Alcance funcional del proyecto

La aplicación permite:

### Mantenimientos
- Tipos de gasto
- Fondos monetarios (cuentas o caja menuda)

### Movimientos
- Presupuesto por tipo de gasto y mes
- Registro de gastos (encabezado y detalle)
- Registro de depósitos

### Consultas y reportes
- Consulta de movimientos por rango de fechas
- Comparativo entre presupuesto y ejecución por tipo de gasto

### Incluye validaciones como:
- Manejo transaccional entre encabezado y detalle de gastos
- Validación de sobregiro de presupuesto con alertas al usuario

## 📁 Estructura del proyecto

```
/presupuesto-front     → Frontend Angular
/PresuspuestoBack      → API REST en ASP .NET Core
/DataBase              → Script SQL (esquemas y tablas)
/.gitignore
```

## 🔐 Seguridad y configuración

Por buenas prácticas de seguridad:
- ❌ No se incluyen credenciales reales
- ❌ No se sube el archivo `appsettings.json`
- ✔️ Se incluye `appsettings.example.json` como referencia
- ✔️ El script SQL solo crea esquemas y tablas, sin datos sensibles

## ▶️ Ejecución local

### Backend
1. Clonar el repositorio
2. Crear `appsettings.json` a partir de `appsettings.example.json`
3. Ejecutar el script SQL ubicado en `/DataBase`
4. Ejecutar la API desde Visual Studio o con `dotnet run`

### Frontend
1. Entrar a la carpeta `presupuesto-front`
2. Ejecutar `npm install`
3. Ejecutar `ng serve`
4. Acceder desde `http://localhost:4200`

## 🧠 Observaciones importantes

Este proyecto fue desarrollado bajo un tiempo limitado, priorizando el cumplimiento funcional del enunciado.

Si bien cumple los requerimientos principales, presenta oportunidades de mejora, especialmente en:
- Organización de la arquitectura
- Separación de responsabilidades en frontend y backend

Actualmente me encuentro reforzando estos aspectos en proyectos posteriores, aplicando:
- Arquitectura por capas
- Principios de código limpio
- Mejor estructuración del frontend

Este repositorio forma parte de mi proceso de aprendizaje y evolución profesional.

---

📎 **Proyecto incluido como parte de portafolio personal.**
