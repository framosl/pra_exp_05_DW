````markdown
# Proyecto Backend: Unidad 4 - Seguridad y Despliegue

Este proyecto es una API RESTful desarrollada con **Node.js** y **Express**, conectada a una base de datos **MongoDB**. Implementa prácticas de seguridad modernas como autenticación mediante **JWT** y Login Social con **Google (OAuth 2.0)**.

## 📋 Características

* **CRUD Completo:** Creación, lectura, actualización y eliminación de usuarios.
* **Autenticación Local:** Registro e inicio de sesión con contraseñas encriptadas (bcryptjs).
* **Seguridad JWT:** Protección de rutas privadas mediante Json Web Tokens.
* **OAuth 2.0:** Inicio de sesión seguro utilizando cuentas de Google (Passport.js).
* **Base de Datos:** Conexión a MongoDB Atlas (Nube).

## 🛠️ Requisitos Previos

Para ejecutar este proyecto localmente necesitas:
* [Node.js](https://nodejs.org/) (v14 o superior).
* Una cuenta en [MongoDB Atlas](https://www.mongodb.com/atlas) (para la base de datos).
* Credenciales de Google Cloud Console (para OAuth).

## 🚀 Instalación y Configuración

Sigue estos pasos para poner en marcha el servidor:

### 1. Clonar el repositorio
```bash
git clone <PEGA_AQUI_TU_LINK_DEL_REPO>
cd nombre-de-la-carpeta
````

### 2\. Instalar dependencias

Ejecuta el siguiente comando para descargar las librerías necesarias (Express, Mongoose, Passport, etc.):

```bash
npm install
```

### 3\. Configuración de Variables de Entorno (.env)

Crea un archivo llamado `.env` en la raíz del proyecto y define las siguientes variables con tus propias credenciales:

```env
PORT=3000
MONGO_URI=mongodb+srv://<usuario>:<password>@cluster0.xxxx.mongodb.net/mi_base_de_datos
JWT_SECRET=palabra_super_secreta_para_firmar_tokens
SESSION_SECRET=palabra_secreta_para_la_sesion_de_express
GOOGLE_CLIENT_ID=tu_client_id_de_google_cloud
GOOGLE_CLIENT_SECRET=tu_client_secret_de_google_cloud
```

> **Nota:** Para que funcione el Login con Google, asegúrate de haber configurado en Google Cloud la URI de redirección: `http://localhost:3000/api/auth/google/callback`

## ▶️ Ejecución

Para iniciar el servidor en modo de desarrollo:

```bash
node server.js
```

Si todo es correcto, verás en la consola:

> Servidor corriendo en el puerto 3000
> MongoDB Conectado exitosamente

## 📡 Documentación de la API

### Rutas de Autenticación

| Método | Endpoint | Descripción | Header Requerido |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Registra un nuevo usuario. | Ninguno |
| `POST` | `/api/auth/login` | Inicia sesión y devuelve un **Token**. | Ninguno |
| `GET` | `/api/auth/google` | Redirige al login de Google. | Ninguno |

### Rutas de Usuarios (Protegidas)

Para acceder a estas rutas, debes enviar el token obtenido en el login dentro del Header `auth-token`.

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `GET` | `/api/users` | Obtiene la lista de todos los usuarios. |
| `POST` | `/api/users` | Crea un usuario (Admin). |
| `PUT` | `/api/users/:id` | Actualiza datos de un usuario por ID. |
| `DELETE` | `/api/users/:id` | Elimina un usuario por ID. |

## 👨‍💻 Autor

**Félix Alexander Ramos Liriano**
Estudiante de la Universidad Estatal de Milagro (UNEMI)
Asignatura: Desarrollo Web / Backend

```
