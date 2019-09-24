const express = require('express');
const router = express.Router();
const passport = require('passport');
const isLoggedIn = require('../lib/isLoggedIn');

router.get('/', isLoggedIn, function(req, res) {
    res.render('create.ejs', {
        title:'123456'
    });
});

module.exports = router;
