/**
 * Created by YuAng on 2016-11-22.
 */

//------------------Ziyao 2016-11-24----------------------------

var Artists = require('../model/artists.js');

exports.findArtists = function(req, res) {

    var targetid = req.query.id;
    var targetfname = req.query.fname;
    var targetcountry = req.query.country;
    console.log(targetid);
    console.log('findAll');

    if (targetid == undefined && targetfname == undefined && targetcountry == undefined) {

	    Artists.find({}, function(err, allArtists) {
		if (err) throw err;
		//console.log(allBooks)
		res.send(allArtists);
	    });
    }

    else if (targetid != undefined) {
	Artists.findOne({ id: targetid }, function(err, artist) {
 		if (err) throw err;

  		res.send(artist);
	});
    }

    else if (targetfname != undefined) {
	Artists.findOne({ familyname: targetfname }, function(err, artist) {
 		if (err) throw err;

  		res.send(artist);
	});

    }

    else if (targetcountry != undefined) {
	Artists.find({ country: targetcountry }, function(err, artist) {
 		if (err) throw err;

  		res.send(artist);
	});

    }
};



exports.addArtist = function(req, res) {
	var newArtist = new Artists(req.body);

	newArtist.save(function(err){
		if (err) throw err;
	});
};



//-----------------2016-11-24-------------------------------------------


//----------------Zili 11/24---------------------

exports.getArtistProduct = function(req, res) {
	var targetid = req.params.id;

	Artists.findOne({ id: targetid })
               .populate("products")
               .exec(function(err, artistProducts) {
 		if (err) throw err;
                res.send(artistProducts);
	});

};


exports.addArtistProduct = function(req, res) {
	var targetid = req.params.id;
	var product = new Products(req.body);

	Artists.update(
        	{ _id: targetid }, 
        	{ $push: { products: product } },
        	done
        );
};




