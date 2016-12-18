/**
 * Created by YuAng on 2016-11-22.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
mongoose.connect('mongodb://localhost/productsdb');

//mongoose.model('Products', Product);
module.exports = mongoose.model('Products', Product);
