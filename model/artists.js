/**
 * Created by YuAng on 2016-11-22.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bCrypt = require('bcrypt-nodejs');
var findOrCreate = require('mongoose-findorcreate');

var Reviews = new  Schema({
    reviewID: {type: Number, required: true, sparse: true},
    rating: {type: Number, "default": 0, min: 0, max: 5, required: true},
    author: {type: String, required: true},
    releaseTime: {type: Date, "default": Date.now},
    text: {type: String, required: true}
});
var Product = new Schema({
        name: { type: String, required: true, unique: true, sparse: true},
        description: { type: String, required: true},
        releaseTime: {type: Date, "default": Date.now},
        onSaleStatus:{type: Boolean, "default": false},
        reviews:[Reviews],
        picture: {type: String}},
    {
        collection: 'products'
    }
);



var Artist = new Schema(
    {
        username: {
            type: String, required: true, unique : true
        },
        pwd: {
            type: String, required: true
        },
        givenname: {
            type: String, requried: true
        },
        lastname: {
            type: String, required: true
        },
        gender: {
            type: String, required: true
        },
        email: {
            type: String,required: true,unique : true
        },
        country: {
            type: String
        },
        status: {
            type: String
        },
        role: {
            type: String
        },
        loggedin: {
            type: Boolean, "default": false
        },
        products: [Product],
        picture: {type: String}
    },

    {
        collection: 'artists'
    }
);

Artist.methods.createHash = function(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
};

// checking if password is valid
Artist.methods.validPassword = function(password) {
    return bCrypt.compareSync(password, this.password);
};

var dbURI = 'mongodb://localhost/designform';


mongoose.connect(dbURI);


mongoose.connection.on('connected', function(){
    console.log('Mongoose is now connecting to ' + dbURI);
});

mongoose.connection.on('error', function(err){
    console.log('Mongoose connection error :' + err);
});

mongoose.connection.on('disconnected', function(){
    console.log('Mongoose disconnected');
});


Artist.plugin(findOrCreate);
module.exports = mongoose.model('Products', Product);
module.exports = mongoose.model('Reviews', Reviews);


module.exports = mongoose.model('Artists', Artist);
