/**
 * Created by YuAng on 2016-11-22.
 */


var mongoose = require('mongoose');
var Artists = require("../model/artists");

//get product by name (global search)
exports.getProducts = function(req, res) {

	var id = req.params.id;
    console.log(id);
    var productName = req.query.name;
    var productReleaseTime = req.query.rtime;
	console.log('in get products');
    if (productName == undefined && productReleaseTime == undefined) {
	    Artists.find({id:id}, function(err, allArtists) {
		if (err) throw err;
		console.log(allArtists+"/n");
		res.render("main",
			{
				products: allArtists.products});
	    });
    }

    else if (productName != undefined) {

		Artists.findOne({id:id}).findOne({ name: productName }, function(err, product) {
		if (err) throw err;

		res.send(product);
	    });
    }

    else if (productReleaseTime != undefined) {

	    Products.findOne({ releaseTime: productReleaseTime }, function(err, product) {
		if (err) throw err;

		res.send(product);
	    });
    }else{
        res.send(req.body);
    }

};

exports.deleteProduct = function(req, res) {
    var artistId = req.params.id;
    var productName = req.query.name;
    Artists.findOne({id: artistId}, function(err, artist) {
        if (err) throw err;

        artist.findOne({name: productName}, function(err, product) {
            if (err) throw err;

            delete product;
        })
    })
};

module.exports.removeReviewbyID = function(req, res) {
    var artid = req.params.id;
    var reviewid = req.query;

    Artists.findOne({ id: artid })
        .products
        .forEach(function(eachproduct){
            eachproduct.populate("reviews").findOne( { id: reviewid}, function(err, review){

                if (err) throw err;

                console.log("remove review by id successfully find review.");

                review.remove(function(err) {
                    if (err )throw err;
                    console.log("review successfully removed by id");
                })

            } )
        });
};