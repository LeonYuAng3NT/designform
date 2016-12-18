/**
 * Created by YuAng on 2016-11-22.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//var crypto = require('crypto');
var Product = new Schema({
    name: { type: String, required: true},
    description: { type: String, required: true},
    releaseTime: {type: Date, "default": Date.now},
    onSaleStatus:{type: Boolean, "default": false}
    },
    {
        collection: 'products'
    }
);



var Artist = new Schema(
    {
        id: {
            type: String, required: true,unique: true
        },
        pwd: {
            type: String, required: true,unique: true
        },
        givenname: {
            type: String, requried: true
        },
        lastname: {
            type: String, required: true, unique: true
        },
        gender: {
            type: String, required: true,
        },
        email: {
            type: String, required: true,unique: true
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

        products: [Product]},
        //picture: [Picture]},

    {
        collection: 'artists'
    }
);


mongoose.connect('mongodb://localhost/artistsdb');


module.exports = mongoose.model('Artists', Artist);
 
