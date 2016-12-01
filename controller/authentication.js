/**
 * Created by YuAng on 2016-11-22.
 */

var express = require('express');
var router = express.Router();

module.exports = function(passport) {


    router.post('/login', passport.authenticate('login', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    }));
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    }));


    //Facebook login
    router.get('/auth/facebook', passport.authenticate('facebook',
        { scope : 'email'
        }));

    // Facebook login callback
    router.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/artsts',
            failureRedirect : '/auth/failure'
        }));

    return router;
};