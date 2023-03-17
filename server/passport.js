const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('./module/auth/user');

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// Configure Passport
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({
        google_id: profile.id,
        email: profile.emails[0].value,
      });
      // create new user
      if (!user) {
        user = await User.create({
          google_id: profile.id,
          email: profile.emails[0].value,
          username: profile.displayName,
          image: profile.photos[0].value,
        });
      }

      done(null, user);
    }
  )
);
