/**
 * Created by YuAng on 2016-11-22.
 */
var mongoose = require('mongoose');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var Artists = mongoose.model('Artists');



var LocalStrategy = require('passport-local').Strategy;

var bCrypt = require('bcrypt-nodejs');

var FACEBOOK_CONSUMER_KEY = '1006730306139581', FACEBOOK_CONSUMER_SECRET = 'ef44eadbcb4598df5eccb8cbc2e7c5b5';

module.exports = function (passport) {
// Local login
    passport.use('local-signup', new LocalStrategy({
            passReqToCallback: true
        }, function (req, err, id,password, done) {

            Artists.findOne({'id':id,'pwd': password},
                function (err, user) {
                    // error case
                    if (err)
                        return done(err);
                    // Username does not exist, log the error and redirect back
                    if (!id) {
                        console.log('User Not Found with Artist \'s name with ' + name);
                        return done(null, false);
                    }
                    //  wrong password
                    if (isValidPassword(id, password)) {
                        console.log('Invalid Password');
                        return done(null, false); // redirect back to login page
                    }

                    return done(null, name);
                }
            );
        }
    ));
    passport.use('signup', new LocalStrategy({
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, userID, password, done) {

            // find a user in mongo with provided username
            Artists.findOne({'id': userID}, function (err, user) {

                if (err) {
                    console.log('SignUp Error: ' + err);
                    return done(err);
                }
                //The artist already exists in the database
                if (user) {
                    console.log('Artist already exists with username: ' + userID);
                    return done(null, false);
                } else {
                    // if there is no user, create the user
                    var newArtist = new Artist();
                    console.log(req.body);
                    // Set credentials
                    newArtist.id = req.body.artist.id;
                    newArtist.pwd = createHash(req.body.artist.pwd);
                    newArtist.givenName = req.body.user.givenName;
                    newArtist.familyName = req.body.user.familyName;
                    newArtist.email = req.body.user.email;

                    // save the user
                    newArtist.save(function (err) {
                        if (err) {
                            console.log('Error in Saving user: ' + err);
                            throw err;
                        }
                        console.log(newArtist.id + ": " + newArtist.givenname + "  " + newArtist.familyName + ' Registration succesful');
                        return done(null, newArtist);
                    });
                }
            });
        })
    );

    passport.use(new FacebookStrategy({
            clientID: FACEBOOK_CONSUMER_KEY,
            clientSecret: FACEBOOK_CONSUMER_SECRET,
            callbackURL: "http://localhost:3000/auth/facebook/callback",
            profileFields: ['id', 'first_name', 'last_name', 'gender', 'email'],
            passReqToCallback: true
            // haven't decided the picture
        },
        function (req, accessToken, refreshToken, profile, done) {
            Artists.findOrCreate({
                id: profile.id,
                givenName: profile.first_name,
                familyName: profile.last_name,
                gender: profile.gender,
                email: profile.email

            }, function (err, user) {
                if (err) {
                    return done(err);
                }
                done(null, user);
            });
        }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
    var isValidPassword = function (user, password) {
        return bCrypt.compareSync(password, user.pwd);
    };
    // Generates hash using bCrypt
    var createHash = function (password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
    };
};

