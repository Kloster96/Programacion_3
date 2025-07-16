# Sistema de Gestión de Veterinaria

Este proyecto es un sistema de gestión integral para una clínica veterinaria, desarrollado con una arquitectura de microservicios utilizando Node.js (Express) para el backend, React para el frontend y PostgreSQL como base de datos, todo orquestado con Docker Compose.

## Características

- **Gestión de Dueños:** CRUD completo para la información de los dueños de mascotas.
- **Gestión de Mascotas:** CRUD completo para las mascotas, incluyendo la asociación con sus dueños.
- **Autenticación de Usuarios:** Sistema de registro e inicio de sesión con roles (usuario y administrador).
- **Autorización Basada en Roles:** Protección de rutas y funcionalidades según el rol del usuario.
- **Contenedorización con Docker:** Todos los servicios se ejecutan en contenedores Docker para un entorno de desarrollo y producción consistente.
- **Base de Datos PostgreSQL:** Almacenamiento robusto y relacional para los datos de la veterinaria.
- **Frontend React:** Interfaz de usuario moderna y reactiva.
- **Backend Node.js (Express):** API RESTful para la comunicación entre el frontend y la base de datos.

## Estructura del Proyecto

.├── backend/│ ├── config/ # Configuración de la base de datos│ ├── controllers/ # Lógica de negocio para las rutas│ ├── middleware/ # Middleware de autenticación y autorización│ ├── models/ # Definiciones de modelos de Sequelize y lógica de base de datos│ ├── routes/ # Definición de rutas de la API│ ├── services/ # Lógica de negocio y servicios│ ├── app.js # Archivo principal de la aplicación Express│ └── package.json # Dependencias y scripts del backend├── frontend/│ ├── public/ # Archivos estáticos│ ├── src/│ │ ├── components/ # Componentes reutilizables de React│ │ ├── context/ # Contextos de React (ej. AuthContext)│ │ ├── pages/ # Páginas principales de la aplicación│ │ ├── App.js # Componente principal de React│ │ └── index.js # Punto de entrada de la aplicación React│ └── package.json # Dependencias y scripts del frontend├── docker-compose.yml # Definición de servicios Docker├── .env.example # Ejemplo de variables de entorno└── README.md # Este archivo

## Requisitos

- Docker Desktop (incluye Docker Engine y Docker Compose)
- Git

## Configuración del Entorno

1.  **Clonar el repositorio:**
    Si aún no lo has hecho, clona el repositorio del proyecto:

    ```bash
    git clone <URL_DE_TU_REPOSITORIO>
    cd sistema-veterinaria
    ```

2.  **Configurar variables de entorno:**
    Crea un archivo `.env` en la raíz del proyecto (al mismo nivel que `docker-compose.yml`). Este archivo contendrá las variables de entorno necesarias para que todos los servicios funcionen correctamente.

    Copia el siguiente contenido en tu archivo `.env`:

    ```env
    # Variables para la Base de Datos PostgreSQL
    POSTGRES_DB=mascotas_db
    POSTGRES_USER=admin
    POSTGRES_PASSWORD=admin123

    # Variables para el Backend
    PORT=3001
    DATABASE_URL=postgres://admin:admin123@db:5432/mascotas_db
    CORS_ORIGIN=http://localhost:3000
    REDIS_HOST=redis
    REDIS_PORT=6379
    JWT_SECRET=supersecretjwtkey

    # Variables para pgAdmin (opcional)
    PGADMIN_DEFAULT_EMAIL=admin@admin.com
    PGADMIN_DEFAULT_PASSWORD=admin123
    ```

    **Nota:** Asegúrate de que `CORS_ORIGIN` apunte a la URL donde se ejecutará tu frontend.

## Ejecución del Proyecto

1.  **Construir y levantar los servicios de Docker:**
    Desde la raíz del proyecto (donde se encuentra `docker-compose.yml`), ejecuta el siguiente comando:

    ```bash
    docker-compose up --build
    ```

    Este comando realizará las siguientes acciones:

    - Construirá las imágenes de Docker para el backend y el frontend (si no existen o si hay cambios en los Dockerfiles).
    - Creará y levantará los contenedores para la base de datos PostgreSQL (`db`), el backend (`backend`), el frontend (`frontend`), Redis (`redis`) y pgAdmin (`pgadmin`).
    - Las dependencias entre servicios (ej. `frontend` depende de `backend`) se manejarán automáticamente.

2.  **Acceder a las aplicaciones:**
    Una vez que los contenedores estén en funcionamiento, podrás acceder a las diferentes partes de la aplicación a través de tu navegador:

    - **Frontend (Aplicación Principal):** `http://localhost:3000`
    - **Backend API:** `http://localhost:3001`
    - **pgAdmin (Interfaz de Gestión de PostgreSQL):** `http://localhost:5050`
      - **Credenciales de pgAdmin:**
        - **Email:** `admin@admin.com` (definido en `PGADMIN_DEFAULT_EMAIL` en `.env`)
        - **Contraseña:** `admin123` (definida en `PGADMIN_DEFAULT_PASSWORD` en `.env`)
      - Una vez en pgAdmin, puedes configurar una nueva conexión de servidor utilizando los detalles de tu base de datos PostgreSQL (Host: `db`, Puerto: `5432`, Base de Datos: `mascotas_db`, Usuario: `admin`, Contraseña: `admin123`).

## Creación de Usuario Administrador

Para acceder a las funcionalidades de administración, puedes crear un usuario con rol `admin` de dos maneras:

### Opción 1: Modificar un usuario existente con pgAdmin (Recomendado para el primer admin)

Este método es útil si tu interfaz de registro de usuario en el frontend solo permite crear usuarios con rol `user` por defecto.

1.  **Registra un usuario normal:**

    - Abre tu navegador y ve a la página de registro del frontend: `http://localhost:3000/register`.
    - Completa el formulario y crea una nueva cuenta de usuario (ej. `usuario_normal@example.com` con contraseña `password123`). Este usuario se registrará con el rol `user` por defecto.

2.  **Accede a pgAdmin y conéctate a la base de datos:**

    - Abre `http://localhost:5050` en tu navegador e inicia sesión con las credenciales de pgAdmin configuradas en tu archivo `.env`.
    - Si aún no lo has hecho, configura una conexión al servidor de PostgreSQL:
      - En el panel izquierdo, haz clic derecho en "Servers" (Servidores) y selecciona "Create" (Crear) > "Server..." (Servidor...).
      - **General:** Dale un nombre a la conexión (ej. "Mascotas DB").
      - **Connection:**
        - **Host name/address:** `db` (importante: usa el nombre del servicio Docker, no `localhost`)
        - **Port:** `5432`
        - **Maintenance database:** `mascotas_db`
        - **Username:** `admin`
        - **Password:** `admin123`
      - Haz clic en "Save" (Guardar).

3.  **Edita el rol del usuario en la base de datos:**
    - Una vez conectado al servidor "Mascotas DB", expande el árbol de navegación:
      - "Databases" (Bases de Datos)
      - `mascotas_db`
      - "Schemas" (Esquemas)
      - "public"
      - "Tables" (Tablas)
    - Haz clic derecho en la tabla `users` (usuarios) y selecciona "View/Edit Data" (Ver/Editar Datos) > "All Rows" (Todas las filas).
    - Busca la fila correspondiente al usuario que registraste en el paso 1.
    - Haz doble clic en la celda de la columna `role` para ese usuario.
    - Cambia el valor de `user` a `admin`.
    - Haz clic en el botón "Save Data Changes" (Guardar cambios de datos), que generalmente es un icono de disquete en la barra de herramientas superior.

Ahora, el usuario `usuario_normal@example.com` tiene el rol de `admin` y puede iniciar sesión para acceder a las funcionalidades de administración.

### Opción 2: Registrar un usuario directamente como admin (Requiere herramienta API)

Si estás utilizando una herramienta como Postman o Insomnia para interactuar directamente con la API del backend, puedes registrar un usuario con el rol `admin` desde el principio.

1.  Realiza una solicitud `POST` a `http://localhost:3001/api/auth/register` con el siguiente cuerpo JSON:

    ```json
    {
      "username": "tu_admin_username",
      "email": "tu_admin_email@example.com",
      "password": "tu_admin_password",
      "role": "admin"
    }
    ```

    Asegúrate de que el campo `"role": "admin"` esté presente.

## Rutas de la API (Backend)

Aquí se detallan las principales rutas de la API expuestas por el servicio `backend`:

### Autenticación

- `POST /api/auth/register`: Registrar un nuevo usuario.
  - **Body:** `{ "username": "...", "email": "...", "password": "...", "role": "user" }` (el rol puede ser "user" o "admin")
- `POST /api/auth/login`: Iniciar sesión.
  - **Body:** `{ "identifier": "...", "password": "..." }` (el identificador puede ser `username` o `email`)

### Dueños

- `GET /api/duenos`: Obtener todos los dueños.
- `POST /api/duenos`: Crear un nuevo dueño.
  - **Body:** `{ "nombre": "...", "apellido": "...", "telefono": "...", "email": "...", "direccion": "..." }`
- `GET /api/duenos/:id`: Obtener un dueño por ID.
- `PUT /api/duenos/:id`: Actualizar un dueño por ID.
  - **Body:** `{ "nombre": "...", "apellido": "...", "telefono": "...", "email": "...", "direccion": "..." }` (campos opcionales)
- `DELETE /api/duenos/:id`: Eliminar un dueño por ID.

### Mascotas

- `GET /api/mascotas`: Obtener todas las mascotas.
- `POST /api/mascotas`: Crear una nueva mascota.
  - **Body:** `{ "nombre": "...", "especie": "...", "raza": "...", "fechaNacimiento": "YYYY-MM-DD", "duenoId": N, "observaciones": "..." }`
- `GET /api/mascotas/:id`: Obtener una mascota por ID.
- `PUT /api/mascotas/:id`: Actualizar una mascota por ID.
  - **Body:** `{ "nombre": "...", "especie": "...", "raza": "...", "fechaNacimiento": "YYYY-MM-DD", "duenoId": N, "observaciones": "..." }` (campos opcionales)
- `DELETE /api/mascotas/:id`: Eliminar una mascota por ID.

### Usuarios (Requiere rol 'admin')

Estas rutas están protegidas y solo son accesibles por usuarios con el rol `admin`.

- `GET /api/users`: Obtener todos los usuarios.
- `GET /api/users/:id`: Obtener un usuario por ID.
- `PUT /api/users/:id`: Actualizar perfil de usuario.
  - **Body:** `{ "username": "...", "email": "...", "role": "...", "password": "..." }` (solo admin puede cambiar roles; la contraseña se hashea si se proporciona)
- `DELETE /api/users/:id`: Eliminar un usuario.

## Notas Adicionales

- **Disponibilidad de Puertos:** Asegúrate de que los puertos `3000` (frontend), `3001` (backend), `5432` (PostgreSQL), `6379` (Redis) y `5050` (pgAdmin) estén disponibles en tu sistema antes de iniciar Docker Compose. Si tienes conflictos, puedes modificar las asignaciones de puertos en el archivo `docker-compose.yml`.
- **Recarga Automática:** Si realizas cambios en el código fuente del backend o frontend, Docker Compose debería detectarlos automáticamente y recargar los servicios dentro de los contenedores (gracias a los volúmenes configurados en `docker-compose.yml`). Si en algún momento un cambio no se refleja, puedes reconstruir y reiniciar un servicio específico con `docker-compose up --build <nombre_del_servicio>` (ej. `docker-compose up --build backend`).
- **Persistencia de Datos:** Los volúmenes (`db_data`, `redis_data`, `pgadmin_data`) están configurados en `docker-compose.yml` para asegurar la persistencia de los datos de la base de datos, Redis y la configuración de pgAdmin entre reinicios de los contenedores.
