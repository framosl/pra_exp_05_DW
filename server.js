require('dotenv').config(); // Cargar variables de entorno
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');

// Importar configuraciones y rutas
const connectDB = require('./config/db');
require('./config/passport'); // Configuración de Google

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userRoutes');

// Inicializar Express
const app = express();

// 1. Conectar a Base de Datos
connectDB();

// 2. MIDDLEWARES (¡El orden importa mucho!)
app.use(cors()); 

// --- ESTA LÍNEA ES LA SOLUCIÓN A TU ERROR ---
// Debe ir ANTES de las rutas para que req.body funcione
app.use(express.json()); 
// ---------------------------------------------

// 3. Configuración de Sesión (Requerido para Google Auth)
app.use(session({
    secret: process.env.SESSION_SECRET || 'secreto_super_seguro',
    resave: false,
    saveUninitialized: false
}));

// 4. Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

// 5. RUTAS
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API Backend funcionando 🚀');
});

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error en el servidor');
});

// 6. Arrancar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});