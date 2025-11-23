const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Buscar el token en el header 'auth-token'
    const token = req.header('auth-token');
    if (!token) return res.status(401).json({ msg: 'Acceso denegado. Falta token.' });

    try {
        // Verificar si el token es válido
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Guardamos los datos del usuario en la petición
        next(); // Continuar a la ruta
    } catch (err) {
        res.status(400).json({ msg: 'Token inválido' });
    }
};

module.exports = verifyToken;