# Proyecto de Gestión de Eventos y Menú Predictivo

Este proyecto es una aplicación de gestión de eventos desarrollada con una arquitectura full-stack que integra NestJS en el backend y React con Next.js en el frontend. La aplicación permite a los administradores crear, editar, eliminar y ver eventos, generar menús para esos eventos, confirmar menús generados y ver reportes detallados de los platos y alérgenos más comunes.

## Tecnologías Utilizadas

- **Backend**: NestJS
- **Frontend**: React + Next.js
- **Base de Datos**: Prisma ORM
- **Servidor de Autenticación**: JWT (JSON Web Tokens)
- **Despliegue**: Azure

## Características del Proyecto

### Gestión de Eventos
- Los administradores pueden crear, editar y eliminar eventos, así como ver detalles de eventos existentes.
- Cada evento tiene propiedades como: nombre, fecha, ubicación, presupuesto, duración, y descripción opcional.

### Gestión de Menús
- Se puede generar un menú predictivo para cada evento basado en los países de origen de los asistentes, sus alergias y el presupuesto disponible.
- Al generar el menú, se incluye un análisis que permite determinar qué platos se pueden servir en varias rondas y el costo asociado para respetar el presupuesto del evento.
- Los administradores también pueden confirmar menús una vez generados, permitiendo el registro definitivo de los platos seleccionados para el evento.

### Gestión de Platos
- Los administradores pueden crear nuevos platos que luego serán utilizados en la generación de los menús para los eventos.
- Los platos tienen atributos como: nombre, precio, si son veganos, si son libres de gluten, y su país de origen.

### Reportes
- **Platos Más Repetidos**: Los administradores pueden ver un reporte con los platos que más se repiten en los menús confirmados.
- **Alérgenos Más Comunes**: Un reporte que muestra cuáles son los alérgenos más comunes entre los asistentes registrados.

## Arquitectura del Proyecto

### Backend
- El backend fue desarrollado con **NestJS**, un framework que utiliza TypeScript y permite una arquitectura basada en controladores y servicios.
- Prisma ORM se usa para gestionar las entidades y la base de datos.
- Se implementó una estructura basada en DTOs (Data Transfer Objects) para la validación y el traspaso de datos.
- **Endpoints disponibles**:
  - `/events` (POST, GET, PUT, DELETE): Gestión de eventos.
  - `/events/:id/generate-menu` (POST): Generar menú para un evento.
  - `/events/:eventId/confirm-menu/:menuId` (POST): Confirmar un menú para un evento.
  - `/events/reportes/platos` (GET): Obtener reporte de los platos más repetidos.
  - `/events/reportes/alergenos` (GET): Obtener reporte de los alérgenos más comunes.
  - `/platos` (POST, GET): Gestión de platos.

### Frontend
- El frontend fue desarrollado con **React** y **Next.js**, utilizando `useState`, `useEffect`, y `axios` para la gestión del estado y la comunicación con el backend.
- **Páginas disponibles**:
  - **Gestión de Eventos**: Permite ver, crear, editar y eliminar eventos. También permite generar y confirmar menús para un evento seleccionado.
  - **Reportes**: Vista que muestra los reportes de platos y alérgenos más comunes.
  - **Gestión de Platos**: Permite crear nuevos platos para ser utilizados en los menús de eventos.

## Despliegue
- La aplicación está desplegada en **Azure**, utilizando una configuración de contenedores que permite que tanto el frontend como el backend estén disponibles.
- **Azure SQL Database** se utiliza como la base de datos en la nube.

## Instalación y Ejecución Local

### Requisitos Previos
- Node.js
- Prisma CLI
- NestJS CLI
- Azure CLI (para despliegue)

### Pasos para Ejecutar Localmente
1. Clona el repositorio del proyecto.
   ```bash
   git clone <URL_del_repositorio>
   cd backend
2. Instala las dependencias para el backend
   ```bash
    cd backend
    npm install
4. Configura la base de datos en prisma/schema.prisma y ejecuta las migraciones.
   ```bash
   npx prisma migrate dev
6. Levanta el servidor de NestJS.
   ```bash
   npm run start:dev
8. Instala las dependencias para el frontend
   ```bash
   cd ../frontend
   npm install
10. Levanta el servidor de desarrollo de Next.js.
    ```bash
    npm run dev


