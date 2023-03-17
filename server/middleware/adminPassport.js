const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const Admin = require('../module/admin/admin');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ADMIN_JWT_SECRET,
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const admin = await Admin.findById(jwt_payload.id);
      if (!admin) {
        return done(new Error('ไม่พบ admin ผู้ใช้ในระบบ'), null);
      }
      return done(null, admin);
    } catch (error) {
      done(error);
    }
  })
);

module.exports.isAdminLogin = passport.authenticate('jwt', {session: false});
