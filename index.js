var express = require('express');
var bodyParser = require('body-parser');

var ctrlArtist = require('./controller/profile');
var ctrlProduct = require('./controller/products');
var passport = require('passport');
var expressValidator = require('express-validator');
var logger = require('morgan');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var flash    = require('connect-flash');
//authentication section

 var initPassport = require('./config/passport');


require('./config/passport')(passport);
var app = express();
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'view')));

app.use(passport.initialize());
app.use(passport.session());

var secret = 'secretkeyDesignform';
//var hash = bcrypt.hashSync();


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));

// The request body is received on GET or POST.
// A middleware that just simplifies things a bit.
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// Get the index page:
app.get('/', function(req, res) {
    res.render('login');
});
app.engine('.html', require('ejs').__express);


app.get('/artists', ctrlArtist.findArtists);

app.get('/main', ctrlArtist.getAllProducts);
app.put('/artists/:id/product:name/review', ctrlArtist.UpdateReview);

app.get('/artists',ctrlArtist.findArtists);
app.get('/artists/:id', ctrlArtist.findArtists);


app.delete('/artists/:id/product/:name/review', ctrlArtist.deleteProductReview);
app.delete('/artists/:id/product', ctrlArtist.deleteProduct);
app.post('/artist/:id/product', ctrlArtist.addArtistProduct);
app.post('/artist/:id/product/:name/review', ctrlArtist.addProductReview);
app.post('/artist', ctrlArtist.addArtist);




app.get('/register', function(req,res){
	res.render('register');
});


app.get('/login', function(req,res) {
    res.render('login.ejs', { message: req.flash('loginMessage')
    })
});

app.post('/login', passport.authenticate('login', {
    successRedirect: '/auth/success',
    failureRedirect: '/auth/failure'
}));
app.post('/signup', passport.authenticate('signup', {
    successRedirect: '/auth/success',
    failureRedirect: '/auth/failure'
}));


//Facebook login
app.get('/auth/facebook', passport.authenticate('facebook',
    { scope : 'email'

    }));

// Facebook login callback
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect : '/artsts',
        failureRedirect : '/auth/failure'
    }));


//Already logged in

app.get('/connect/local', function(req, res) {
    res.render('connect-local.ejs', { message: req.flash('loginMessage') });
});
app.post('/connect/local', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

// facebook -------------------------------

// send to facebook to do the authentication
app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

// handle the callback after facebook has authorized the user
app.get('/connect/facebook/callback',
    passport.authorize('facebook', {
        successRedirect : '/profile',
        failureRedirect : '/'
    }));


// Start the server
app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
