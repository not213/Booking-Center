const passport = require('passport');
const router = require('express').Router();

const jwt = require('jsonwebtoken');

const User = require('./user');

// middleware

const requireAuth = require('../../middleware/requireAuth');

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    // successRedirect: process.env.SUCCCESS_REDIRECT,
    failureRedirect: process.env.FAILED_REDIRECT,
  }),
  (req, res) => {
    const {user} = req;

    const payload = {id: user._id};
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {expiresIn: '1h'} // Optional: set token expiration time
    );

    // Add the token to the response cookie
    res.cookie('jwt', token);

    // res.set('Location', process.env.SUCCCESS_REDIRECT);
    // res.status(302).send({token});

    res.redirect(process.env.SUCCCESS_REDIRECT);
  }
);

router.post('/api/user', async (req, res) => {
  const {id} = req.body;

  const data = await User.findById(id, {username: 1, email: 1, image: 1});

  res.send({data});
});
router.get('/api/logout', (req, res) => {
  req.logout();
  res.send({message: 'Logout successfully'});
  // res.redirect(process.env.FRONTEND_DOMAIN);
});

module.exports = router;
