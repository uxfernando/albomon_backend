# Albomon Backend

Este servicio se encarga de gestionar la lógica del juego, la comunicación entre jugadores y la persistencia de datos, asegurando que cada enfrentamiento sea dinámico, justo y en tiempo real.

<img width="1525" height="786" alt="342af949-a57a-46bb-88e2-c01e557d83ce" src="https://github.com/user-attachments/assets/71b14de2-0b4d-4ec0-9299-df0b42c266de" />

---

## ✅ Requisitos Previos

| Herramienta | Versión |
| ----------- | ------- |
| Node.js     | 22.15.0 |
| npm         | 11.11.0 |
| MongoDB     | >= 6.x  |

> Verifica tus versiones con `node -v` y `npm -v`

---

## 🔐 Variables de Entorno

Crea el archivo `.env` en la raíz del proyecto copiando el ejemplo:

```bash
cp .env
```

Edita el archivo con tus valores:

```env
# Servidor
PORT=8080
NODE_ENV=development

# Logs
LOG_LEVEL=info

# Base de datos
MONGO_URI=XxXxXXxXxX

```

> ⚠️ El archivo `.env` está en `.gitignore` y **nunca debe subirse al repositorio**.

---

## 📦 Instalación

```bash
# 1. Clona el repositorio
git clone https://github.com/uxfernando/albomon_backend.git
cd albomon_backend

# 2. Instala las dependencias
npm install

# 3. Configura las variables de entorno
cp .env
```

---

## ▶️ Levantar en Local

Asegúrate de que **MongoDB esté corriendo** antes de iniciar el servidor.

```bash
# Iniciar MongoDB (Linux/macOS)
mongod

# Iniciar MongoDB como servicio (Windows)
net start MongoDB
```

Luego levanta el servidor:

```bash
npm run dev
```

---

## 📜 Scripts Disponibles

| Script          | Descripción                                          |
| --------------- | ---------------------------------------------------- |
| `npm run dev`   | Inicia el servidor en modo desarrollo con hot-reload |
| `npm run check` | Revisa si hay algún problema                         |
| `npm run build` | Construye tu distribución                            |
| `npm run start` | Inicia el servidor en modo producción                |
| `npm run test`  | Inicia las pruebas unitarias                         |

---

## 🐛 Problemas Comunes

**`EADDRINUSE: address already in use`**

> El puerto ya está en uso. Cambia el valor de `PORT` en el `.env` o detén el proceso que lo ocupa.

**`MongoServerError: connect ECONNREFUSED`**

> MongoDB no está corriendo. Ejecuta `mongod` en una terminal separada o verifica tu `MONGODB_URI`.
