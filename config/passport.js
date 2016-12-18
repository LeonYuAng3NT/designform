/**
 * Created by YuAng on 2016-11-22.
 */
var mongoose = require('mongoose');
var passport = require('passport');

var FacebookStrategy = require('passport-facebook').Strategy;

var Artists = mongoose.model('Artists');


var flash = require('connect-flash');

var LocalStrategy = require('passport-local').Strategy;

var bCrypt = require('bcrypt-nodejs');

var FACEBOOK_CONSUMER_KEY = '1006730306139581', FACEBOOK_CONSUMER_SECRET = 'ef44eadbcb4598df5eccb8cbc2e7c5b5';

module.exports = function (passport) {

    passport.serializeUser(function(artist, done) {

        done(null, artist);
    });

    // used to deserialize the user
    passport.deserializeUser(function(artist,done){

            done(null, artist);
    });
// Local login
    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            username : 'username',
            password : 'password',
            passReqToCallback : true
        },
        function(req, username, password, done) {
            // asynchronous

            process.nextTick(function() {
                Artists.findOne({ 'username' :  username }, function(err, artist) {
                    // if there are any errors, return the error
                    console.log(artist);
                    if (err)
                        return done(err);

                    // if no user is found, return the message
                    if (!artist)
                        return done(null, false, req.flash('loginMessage', 'No user found.'));


                    if (!isValidPassword(artist,password))
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));


                    else

                        return done(null, {person : artist});
                });
            });
        }));

    // Local log in
    passport.use('local-signup', new LocalStrategy({
            username : 'username',
            password : 'password',
            givenname : 'givenname',
            lastname : 'lastname',
            gender : 'gender',
            email : 'email',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, userID, password, done) {
           console.log(req);
            process.nextTick(function() {
                if (!req.artist) {
                    // find a user in mongo with provided username
                    Artists.findOne({'username': userID}, function (err, artist) {

                        if (err) {
                            console.log('SignUp Error: ' + err);
                            return done(null, false);
                        }
                        //The artist already exists in the database
                        if (artist) {
                            return done(null, false)
                        } else {

                            var newArtist = new Artists();
                            newArtist.username = req.body.username;
                            newArtist.pwd = createHash(req.body.password);
                            newArtist.givenname = req.body.givenname;
                            newArtist.lastname = req.body.lastname;
                            newArtist.gender = req.body.gender;
                            newArtist.email = req.body.email;

                            // save the user
                            newArtist.save(function (err) {
                                if (err) {
                                    console.log('Error in Saving user: ' + err);
                                    throw err;
                                }
                                console.log(newArtist.username + ": " + newArtist.givenname + "  " + newArtist.familyName + ' Registration succesful');

                            });
                            return done(null, {person : newArtist});
                        }
                    });

                }});
            }
        ));

    passport.use('facebook',new FacebookStrategy({
            clientID: FACEBOOK_CONSUMER_KEY,
            clientSecret: FACEBOOK_CONSUMER_SECRET,
            callbackURL: "http://localhost:3000/auth/facebook/callback",
            profileFields: ['id', 'first_name', 'last_name', 'gender', 'email'],
            passReqToCallback: true

        },
        function (req, accessToken, refreshToken, profile, done) {


            Artists.findOrCreate({
                username: profile.name.givenName,
                pwd : "facebook"+profile.emails[0].value,
                givenname: profile.name.givenName,
                lastname: profile.name.familyName,
                gender: profile.gender,
                email: profile.emails[0].value

            }, function (err, artist) {
                if (err) {
                    console.log(err);
                    return done(null, false);
                }
                done(null, {person : artist});
            });
        }
    ));

    /**
     *  Check the validation of typed-int password
     */
    var isValidPassword = function (user, password) {
        return bCrypt.compareSync(password, user.pwd);
    };
    /**
     *  Hash the password using a salt, hashSync(data, salt).
     */
    var createHash = function (password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
    };
};

