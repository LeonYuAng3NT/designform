var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var ctrlArtist = require('./controller/profile');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var path = require('path');


var session = require('express-session');
var flash = require('connect-flash');

var fs = require('fs');



var app = express();
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'views')));

//authentication initialization
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());


var secret = 'secretkeydesignform';



app.use(function(req,res,next){
   res.locals.person = req.artist;
    next();
});
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));

app.use(session({ cookie: { maxAge: 60000 },
    secret: secret,
    resave: false,
    saveUninitialized: false}));

app.use(cookieParser());
// A middleware that just simplifies things a bit.
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use(flash());
// Get the index page:
app.get('/', function(req, res) {
    res.render('login.ejs',{
        message: req.flash('info',"Please Sign in")
    });
});
app.engine('.html', require('ejs').__express);

// go to a user's home page, profile and gallery
app.get('/gallery',ctrlArtist.findGallery);
app.get('/user_home', ctrlArtist.findHome);
app.get('/profile', ctrlArtist.findProfile);
app.get('/addproduct', ctrlArtist.addproductpage);
app.get('/explore', ctrlArtist.exploreProducts);
app.get('/user_search', ctrlArtist.user_search);


app.get('/artists',ctrlArtist.findArtists);

app.get('/main',ctrlArtist.getAllProducts);


app.get('/artists/:username', ctrlArtist.findArtists);


app.delete('/artists/:username/product/:name/review', ctrlArtist.deleteProductReview);
app.post('/artists/:username/product',ctrlArtist.deleteProduct);

app.post('/add_product',ctrlArtist.addArtistProduct);
app.post('/addOneReview', ctrlArtist.addOneReview);



app.post('/artist', ctrlArtist.addArtist);

app.delete('/artists',ctrlArtist.deleteArtist);
app.get('/edit_artist',ctrlArtist.editArtists);
app.get('/updateartists',ctrlArtist.updateArtist);


app.get("/products", ctrlArtist.getArtistProducts);
app.get("/productbyname", ctrlArtist.getProductByName);


app.get('/add_review', function(req,res) {
    res.render('add_review');
});



//Authentication
app.get('/login', function(req,res) {
    res.render('login',{ message: req.flash('loginMessage','Hello') });
});


app.post('/login', function(req, res, next) {
    passport.authenticate('local-login', function(err, artist, info) {
        if (err) { return next(err); }
        if (!artist) { return res.render('login.ejs',{ message: 'username/password incorrect'}); }
        req.logIn(artist, function(err) {
            if (err) {

                return next(err);
            }

        });
        if(artist.person.email =='leonzhang1996@hotmail.com' && artist.person.username == 'admin'){
            return res.render('admin_home');
        }
        return res.redirect('/user_home?username=' + artist.person.username);
    })(req, res, next);
});


app.get('/register', function(req, res) {
    res.render('register.ejs',{ message: req.flash('signupMessage') });
});

app.post('/register', function(req, res, next) {
    passport.authenticate('local-signup', function (err, artist, info) {

        if (err) {

            return next(err);
        }
        if (!artist || artist == false) {
            return res.render('login.ejs', {message:  'Duplicated User'});
        }
        req.logIn(artist, function (err) {
            console.log(artist);
            if (err) {
                return next(err);
            }
        });
        if(artist.person.email =='leonzhang1996@hotmail.com' && artist.person.username == 'admin'){
            return res.redirect('/admin_home');
        }
        return res.redirect('/user_home?username=' + artist.person.username);
    })(req, res, next);
});



//Facebook login
app.get('/auth/facebook', passport.authenticate('facebook',
    {
        authType: 'rerequest',
        scope : 'email'

    }));

// Facebook login callback
app.get('/auth/facebook/callback', function(req, res, next) {
    passport.authenticate('facebook', function (err, artist, info) {
        if (err) {

            return next(err);
        }
        if (!artist || artist ==false) {
            return res.render('login.ejs',{ message: 'Duplicate User'});
        }
        req.logIn(artist, function (err) {
            console.log(artist);
            if (err) {
                return next(err);
            }
            return res.redirect('/user_home?username=' + artist.person.username);
        });
    })(req, res, next);
});



app.get('/profile', function(req,res){
    res.render('profile');
});
app.get('/admin_home', function(req,res){
    res.render('admin_home');
});
app.get('/edit', function(req,res){
    res.render('edit');
});

app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/main");
});



// Start the server
app.set('port', (process.env.PORT || 3000));
var server = app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
module.exports = server;
