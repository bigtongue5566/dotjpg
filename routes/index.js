const express = require('express');
const router = express.Router();
const passport = require('passport');

//const Pic = require('../models/pic');

// Index route
router.get('/', function(req, res, next) {
    res.render('index', {
        title: '點JPG'
    });
    // if (req.isAuthenticated()){
    //   res.redirect('/pics');
    // }else{
    //   res.render('index', {
    //       title: 'Express'
    //   });
    // }
});

router.get('/login', function(req, res, next) {
    res.render('login.ejs', {
        message: req.flash('loginMessage')
    });
});

router.get('/signup', function(req, res) {
    res.render('signup.ejs', {
        message: req.flash('signupMessage')
    });
});

router.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
        user: req.user
    });
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// router.post('/signup', passport.authenticate('local-signup', {
//   successRedirect: '/pics',
//   failureRedirect: '/signup',
//   failureFlash: true,
// }));

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/pics',
    failureRedirect: '/login',
    failureFlash: true,
}));




module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}
