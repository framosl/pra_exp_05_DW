const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// --- REGISTRO LOCAL ---
router.post('/register', async (req, res) => {
    // --- ZONA DE DEBUG ---
    console.log("---- INTENTO DE REGISTRO ----");
    console.log("Headers recibidos:", req.headers['content-type']);
    console.log("Cuerpo (body) recibido:", req.body);
    // --------------------

    // Verificar si body existe
    if (!req.body || !req.body.email) {
        return res.status(400).json({ 
            msg: "El servidor no recibió los datos. Revisa que Postman envíe JSON.",
            recibido: req.body 
        });
    }

    // Validar si email ya existe
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('El email ya existe');

    // Hash contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Crear usuario
    const user = new User({
        nombre: req.body.nombre,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const savedUser = await user.save();
        res.send({ user: savedUser._id });
    } catch (err) { res.status(400).send(err); }
});

// ... (Deja el resto del código igual: login, google, etc.)
// Copia aquí abajo el resto de tus rutas de login y google...
// O si prefieres, solo reemplaza la parte de router.post('/register'...)

// LOGIN LOCAL
router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email no encontrado');

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Contraseña incorrecta');

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.header('auth-token', token).send({ token });
});

// GOOGLE
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        const token = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET);
        res.redirect(`http://localhost:3000/?token=${token}`);
    }
);

module.exports = router;