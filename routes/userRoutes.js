const express = require('express');
const router = express.Router();
const User = require('../models/User');
const verifyToken = require('../middleware/verifyToken');
const bcrypt = require('bcryptjs');

// OBTENER TODOS (Protegido: Solo usuarios logueados pueden ver esto)
router.get('/', verifyToken, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) { res.status(500).json({ msg: err.message }); }
});

// CREAR USUARIO (Para administradores o registro interno)
router.post('/', verifyToken, async (req, res) => {
    try {
        // Encriptar contraseña antes de crear
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            ...req.body,
            password: hashedPassword
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) { res.status(500).json(err); }
});

// ACTUALIZAR (Protegido)
router.put('/:id', verifyToken, async (req, res) => {
    try {
        // Si intenta actualizar password, hay que encriptarlo de nuevo
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedUser);
    } catch (err) { res.status(500).json(err); }
});

// ELIMINAR (Protegido)
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Usuario eliminado' });
    } catch (err) { res.status(500).json(err); }
});

module.exports = router;