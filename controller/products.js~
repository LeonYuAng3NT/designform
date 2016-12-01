/**
 * Created by YuAng on 2016-11-22.
 */



var Products = require('../model/products.js');

//get product by name (global search)
exports.getProducts = function(req, res) {

    var productName = req.query.name;
    var productReleaseTime = req.query.rtime;

    if (productName == undefined && productReleaseTime == undefined) {
	    Products.find({}, function(err, allProducts) {
		if (err) throw err;
		//console.log(allBooks)
		res.send(allProducts);
	    });
    }

    else if (productName != undefined) {

	    Products.findOne({ name: productName }, function(err, product) {
		if (err) throw err;

		res.send(product);
	    });
    }

    else if (productReleaseTime != undefined) {

	    Products.findOne({ releaseTime: productReleaseTime }, function(err, product) {
		if (err) throw err;

		res.send(product);
	    });
    }

};


