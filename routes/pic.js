const express = require('express');
const router = express.Router();


router.get('/', isLoggedIn, function(req, res, next){
  res.render('pics');
});

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();
  res.redirect('/');
}
