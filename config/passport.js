const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User'); // Tu modelo de usuario

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    // Verificar si el usuario ya existe en nuestra DB
    const existingUser = await User.findOne({ googleId: profile.id });
    
    if (existingUser) {
        return done(null, existingUser);
    }
    
    // Si no existe, creamos uno nuevo
    const newUser = await new User({
        googleId: profile.id,
        nombre: profile.displayName,
        email: profile.emails[0].value,
        password: 'google-login-no-password' // Contraseña dummy
    }).save();
    
    done(null, newUser);
  }
));