//configurar Passport con las estrategias de Google y GitHub.
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback'
},
async (accessToken, refreshToken, profile, done) => {
  try {
    let usuario = await User.findOne({ where: { oauth_id: profile.id, oauth_provider: 'google' } });

    if (!usuario) {
      usuario = await User.create({
        nombre: profile.displayName,
        email: profile.emails[0].value,
        oauth_provider: 'google',
        oauth_id: profile.id,
      });
    }

    return done(null, usuario);
  } catch (error) {
    return done(error, null);
  }
}));

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: '/api/auth/github/callback'
},
async (accessToken, refreshToken, profile, done) => {
  try {
    let usuario = await User.findOne({ where: { oauth_id: profile.id.toString(), oauth_provider: 'github' } });

    if (!usuario) {
      usuario = await User.create({
        nombre: profile.displayName || profile.username,
        email: profile.emails ? profile.emails[0].value : `${profile.username}@github.com`,
        oauth_provider: 'github',
        oauth_id: profile.id.toString(),
      });
    }

    return done(null, usuario);
  } catch (error) {
    return done(error, null);
  }
}));

module.exports = passport;