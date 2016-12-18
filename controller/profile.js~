/**
 * Created by YuAng on 2016-11-22.
 */

var mongoose = require('mongoose');
var Artists = require('../model/artists.js');
var Products = mongoose.model('Products');
var Reviews = mongoose.model('Reviews');
var fs = require('fs');

var shortid = require('shortid');
/**
 *
 * @param res : Object
 * @param status : int
 * @param content : String
 *
 * Helper function that setup the json response
 *
 */

var sendJsonRes = function(res, status, content){
    res.status(status);
    res.json(content);
};

/**
 *
 * @param req: Object
 * @param res : Object
 */

exports.editArtists = function(req, res) {

    var userName = req.query.username;

    if (userName != undefined) {
        Artists.findOne({ username: userName }, function(err, artist) {
            if (err){
                res.redirect('/artists',req.flash('info','Did not find user'));
            }
            if (artist != null) {

                res.render("edit", {person: artist});
                return 0;
            } else {
                res.render("fail_search");
                return -1;
            }
        });
    }
};

/**
 * Delete the artist as admin
 *
 * @param req: Object
 * @param res:Object
 */
exports.deleteArtist = function(req, res) {
    Artists.findOneAndRemove({ username: req.query.username }, function(err) {
        if (err) throw err;

        // we have deleted the user
        console.log('User deleted!');
    });
};

/**
 * Update the artist's info as admin
 *
 * @param req: Object
 * @param res:Object
 */
exports.updateArtist = function(req, res) {
    Artists.findOneAndUpdate({ username: req.query.username},
        { givenname: req.query.givenname, lastname: req.query.lastname,
            gender: req.query.gender, country: req.query.country,
            status: req.query.status, role: req.query.role,
            picture:req.query.picture
        }, function(err, user) {
            if (err) throw err;
        });
};

/**
 * Find all artists/ artist by username / by lastname /by country
 *
 * @param req: Object
 * @param res:Object
 */
exports.findArtists = function(req, res) {
    
    var userName = req.query.username;
    var targetfname = req.query.fname;
    var targetcountry = req.query.country;

    if (userName == undefined && targetfname == undefined && targetcountry == undefined) {
        Artists.find({}, function(err, allArtists) {
            if (err) throw err;
            res.render("search", {persons: allArtists});
        });
        return 0;
    }

    if (userName != undefined) {
        Artists.findOne({ username: userName }, function(err, artist) {
            if (artist != null) {
                if (err) throw err;
                var artists = new Array();
                artists.push(artist);
                res.render("search", {persons: artists});
                //res.send(artist);
                return 0;
            } else {
                res.render("fail_search");
                return -1;
            }
        });
    }

    if (targetfname != undefined) {
        Artists.find({ lastname: targetfname }, function(err, artists) {
            if (artists[0] != null) {
                if (err) throw err;
                res.render("search", {persons: artists});
                //res.send(artist);
                return 0;
            } else {
                res.render("fail_search");
                return -1;
            }
        });
    }

    if (targetcountry != undefined) {
        Artists.find({ country: targetcountry }, function(err, artists) {
            if (artists[0] != null) {
                if (err) throw err;
                res.render("search", {persons: artists});

                return 0;
            } else {
                res.render("fail_search");
                return -1;
            }
        });
    }

};

exports.user_search = function(req, res) {
    var user = req.query.user;
    var founduser;
    // find the user first
    Artists.findOne({ username: user }, function(err, artist) {
            if (artist != null) {
                if (err) throw err;
                founduser = artist;
                console.log(founduser);
            } else {
                res.render("user_search_fail", {person: founduser});
                return -1;
            }
        });
    
    var userName = req.query.username;
    var targetfname = req.query.fname;
    var targetcountry = req.query.country;

    if (userName == undefined && targetfname == undefined && targetcountry == undefined) {
        Artists.find({}, function(err, allArtists) {
            if (err) throw err;
            res.render("user_search", {persons: allArtists, person: founduser});
        });
        return 0;
    }

    if (userName != undefined) {
        Artists.findOne({ username: userName }, function(err, artist) {
            if (artist != null) {
                if (err) throw err;
                var artists = new Array();
                artists.push(artist);
                res.render("user_search", {persons: artists, person: founduser});
                //res.send(artist);
                return 0;
            } else {
                res.render("user_search_fail", {person: founduser});
                return -1;
            }
        });
    }

    if (targetfname != undefined) {
        Artists.find({ lastname: targetfname }, function(err, artists) {
            if (artists[0] != null) {
                if (err) throw err;
                res.render("user_search", {persons: artists, person: founduser});
                //res.send(artist);
                return 0;
            } else {
                res.render("user_search_fail", {person: founduser});
                return -1;
            }
        });
    }

    if (targetcountry != undefined) {
        Artists.find({ country: targetcountry }, function(err, artists) {
            if (artists[0] != null) {
                if (err) throw err;
                res.render("user_search", {persons: artists, person: founduser});

                return 0;
            } else {
                res.render("user_search_fail", {person: founduser});
                return -1;
            }
        });
    }

};

/**
 * Add an artist / Register an account
 *
 * @param req: Object
 * @param res:Object
 */

exports.addArtist = function(req, res) {

    var username = req.body["email"];
    var email = req.body["email"];
    var givenname = req.body["givenname"];
    var lastname = req.body["lastname"];
    var gender = req.body["gender"];
    var pwd = req.body["password"];
    var id = shortid.generate();


    var target = '{ "username": "' + username +'", "pwd": "' + pwd +'", "givenname": "' +
        givenname + '", "lastname": "' + lastname + '", "gender": "' +
        gender + '", "email": "' + email + '", ' + '"country": "China",  "status": "", '+
        '"role": "", "products": [id]}' ;


    var newArtist = new Artists(JSON.parse(target));


    newArtist.save(function(err){
        if (err) throw err;
        res.render('login');
    });
};

exports.findGallery = function(req, res) {
    var userName = req.query.username;

    if (userName != undefined) {
        Artists.findOne({ username: userName }, function(err, artist) {
            if (artist != null) {
                if (err) throw err;
                var products = artist.products;

                res.render("gallery", {products: products, person: artist});
                return 0;
            } else {
                res.render("fail_search");
                return -1;
            }
        });
    }
};

exports.findHome = function(req, res) {
    var userName = req.query.username;
    if (userName != undefined) {
        Artists.findOne({ username: userName }, function(err, artist) {
            if (artist != null) {
                if (err) throw err;
                var products = artist.products;

                res.render("user_home", {products: products, person: artist});
                return 0;
            } else {
                res.render("fail_search");
                return -1;
            }
        });
    }
};


/**
 * Find artist personal profile
 *
 * @param req: Object
 * @param res:Object
 */
exports.findProfile = function(req, res) {
    var userName = req.query.username;

    if (userName != undefined) {
        Artists.findOne({ username: userName }, function(err, artist) {
            if (artist != null) {
                if (err) throw err;
                var products = artist.products;

                res.render("profile", {products: products, person: artist});
                return 0;
            } else {
                res.render("fail_search");
                return -1;
            }
        });
    }
};

/**
 * Find artist's username and then render to an add product page
 *
 * @param req: Object
 * @param res:Object
 */
exports.addproductpage = function(req, res) {
    var userName = req.query.username;

    if (userName != undefined) {
        Artists.findOne({ username: userName }, function(err, artist) {
            if (artist != null) {
                if (err) throw err;
                var products = artist.products;
                //res.render("gallery1", {products: products});
                res.render("add_product", {products: products, person: artist});
                return 0;
            } else {
                res.render("fail_search");
                return -1;
            }
        });
    }
};
//-----------------2016-11-24-------------------------------------------
//----------------Zili 11/24---------------------

/**
 * Get all artists' products / by product name
 *
 * @param req: Object
 * @param res:Object
 */

exports.getArtistProducts = function(req, res) {


    var userName = req.query.username;
    var productName = req.query.name;
    if (productName != undefined) {
        var review = productName.indexOf('/');
    }


    console.log(productName);
    if (productName == undefined) {
        Artists.findOne({ username : userName })
            .exec(function(err, artistsProducts) {
                if (err) throw err;
                res.send(artistsProducts.products);
            });
    }

    else if (productName != undefined) {
        if (review == -1) {
            Artists.findOne({ username : userName }, function(err, artist) {
                if (err) throw err;
                if (!artist) {
                    return res.status(400).json("Error: no such artist");}

                for (index in artist._doc.products) {
                    if (artist._doc.products[index].name == productName) {

                        res.send(artist._doc.products[index]);
                        return;
                    }

                }
                return res.status(400).json("Error: no such product");
            });
        }
        else {
            Artists.findOne({ username : userName }, function(err, artist) {
                if (err) throw err;
                if (!artist) {
                    return res.status(400).json("Error: no such artist");}

                for (index in artist._doc.products) {
                    if (artist._doc.products[index].name == productName.substring(0, review)) {

                        res.send(artist._doc.products[index].reviews);
                        return;
                    }

                }
                return res.status(400).json("Error: no such product");
            });
        }
    }
};


/**
 * Get Product by its' name
 *
 * @param req: Object
 * @param res:Object
 */

exports.getProductByName = function(req, res) {
    var username = req.query.username;
    var founduser;
    // find the user first
    Artists.findOne({ username: username }, function(err, artist) {
            if (artist != null) {
                if (err) throw err;
                founduser = artist;
            } 
        }); 

    var productName = req.query.name;
    var a = [];

    if (productName != undefined) {
        var review = productName.indexOf('/');
    }
    Artists.find({})
        .exec(function(err, allArtists) {
            if (err) throw err;
            for (index in allArtists) {
                a = a.concat(allArtists[index]._doc.products);
            }

            for (ind in a) {
                if (a[ind].name == productName) {
                	res.render("product_reviews", {product: a[ind], person: founduser});
                }
            }
        });
};


/**
 * Get all products
 *
 * @param req: Object
 * @param res:Object
 */

exports.getAllProducts = function(req, res) {
    var name = req.query.name;
    var rtime = req.query.releaseTime;
    var a = [];

    var b = [];

    if (name == undefined && rtime == undefined) {
        Artists.find({})
            .exec(function(err, allArtists) {
                if (err) throw err;
                for (index in allArtists) {
                    a = a.concat(allArtists[index]._doc.products);

                }

                res.render('main',{
                    products:a
                })
            });
    }
    else if (name != undefined) {
        Artists.find({})
            .exec(function(err, allArtists) {
                if (err) throw err;
                for (index in allArtists) {
                    a = a.concat(allArtists[index]._doc.products);
                }
                for (ind in a) {
                    if (a[ind]._doc.name == name){
                        res.send(a[ind]);
                        return;
                    }
                }
                return res.status(400).json("Error: no such product");
            });
    }
    else if (rtime != undefined) {
        Artists.find({})
            .exec(function(err, allArtists) {
                if (err) throw err;
                for (index in allArtists) {
                    a = a.concat(allArtists[index]._doc.products);
                }
                for (ind in a) {
                    if (a[ind]._doc.releaseTime == rtime){
                        res.send(a[ind]);
                        return;
                    }
                }
                return res.status(400).json("Error: no such product");
            });
    }
};


/**
 * Explore  artist's product / The artist is only allowed to add his/her own work
 *
 * @param req: Object
 * @param res:Object
 */


exports.exploreProducts = function(req, res) {
    var username = req.query.username;
    var founduser;
    // find the user first
    Artists.findOne({ username: username }, function(err, artist) {
            if (artist != null) {
                if (err) throw err;
                founduser = artist;
                console.log(founduser);
            } else {
                res.render("user_search_fail", {person: founduser});
                return -1;
            }
        });

    var name = req.query.name;
    var rtime = req.query.releaseTime;
    var a = [];

    var b = [];

    if (name == undefined && rtime == undefined) {
        Artists.find({})
            .exec(function(err, allArtists) {
                if (err) throw err;
                for (index in allArtists) {
                    a = a.concat(allArtists[index]._doc.products);

                }

                res.render('explore',{
                    products:a, person: founduser
                })
            });
    }
    else if (name != undefined) {
        Artists.find({})
            .exec(function(err, allArtists) {
                if (err) throw err;
                for (index in allArtists) {
                    a = a.concat(allArtists[index]._doc.products);
                }
                for (ind in a) {
                    if (a[ind]._doc.name == name){
                        res.send(a[ind]);
                        return;
                    }
                }
                return res.status(400).json("Error: no such product");
            });
    }
    else if (rtime != undefined) {
        Artists.find({})
            .exec(function(err, allArtists) {
                if (err) throw err;
                for (index in allArtists) {
                    a = a.concat(allArtists[index]._doc.products);
                }
                for (ind in a) {
                    if (a[ind]._doc.releaseTime == rtime){
                        res.send(a[ind]);
                        return;
                    }
                }
                return res.status(400).json("Error: no such product");
            });
    }
};



exports.addArtistProduct = function(req, res) {


    var date = Date.now();
    var name = req.query.username;

    var product = new Products({
        _id: shortid.generate(),
        name: req.body.prodname,
        description: req.body.proddes,
        releaseTime: date,
        onSaleStatus:req.body.salest,
        picture:req.body.pic
    });


    Artists.update(
        { username: name },
        { $push: { products: product } },function(err){
            if(err) {
                console.log(err);
                res.send({
                    message :'something went wrong/ The user might exists already'
                });
            }
        }

    );

    return res.redirect("/user_home?username="+name);

};
/**
 * Add a review for specific product
 *
 * @param req: Object
 * @param res:Object
 */
exports.addProductReview = function(req, res) {

    var date = Date.now();
    var userName = req.params.username;
    var name = req.params.name;
    var review = new Reviews({

        _id: shortid.generate(),
        reviewID: shortid.generate(),
        rate: req.query.rate,
        author: req.query.author,
        releaseTime: req.query.releaseTime,
        text: req.query.text
    });
    Artists.update(
        {
            username:userName,
            "products.name": name },
        { $push: { 'products.$.reviews': review } },function(err){
            if(err) {
                console.log(err);
                res.send({
                    message :'something went wrong/ The user might exists already'
                });
            }
        }

    );
};
/**
 *  Delete a product/ The artist are only allowed to delete their own works
 * @param req
 * @param res
 */
exports.deleteProduct = function(req, res) {
    var userName = req.params.username;
    var productName = req.query.name;
    Artists.update(
        { username: userName},
        { $pull: { products : { name : productName } } },
        { safe: true },
        function removeConnectionsCB(err,obj) {
            if(err){
                sendJsonRes(res, 404, err);
                return;
            }
            
            console.log(obj);
        }
    );

    return res.redirect("/user_home?username="+ userName);

};
/**
 * Delete a review
 *
 * @param req: Object
 * @param res:Object
 */
exports.deleteProductReview = function(req, res) {

    var userName = req.params.username;
    var pName = req.params.name;
    var reviewID = req.query.reviewID;

    Artists.collection.update(
        {"username":userName,"products.name":pName},
        { $pull: {"products.$.reviews":{reviewID: reviewID}}},
        { multi : true },
        function removeConnectionsCB(err,obj) {
            if(err){
                sendJsonRes(res, 404, err);
                return;
            }
            res.send({
                message :'Successfully deleted the specified review'
            });
            console.log(obj);

        }
    );
};



exports.addOneReview = function (req, res) {
    //console.log(req.body);
    var productName = req.body["productName"];
    var rate = parseInt(req.body["reviewRating"]);
    var comment = req.body["comment"];
    var author = req.body["reviewerName"];
    var artist = req.body["artist"];
    var id = parseInt(Math.random() * 10000000 );
    var time = Date.now;
    //var artistarray = [];
    console.log(typeof comment);

    var review = new Reviews({
        _id: shortid.generate(),
        rating: rate,
        releaseTime: time,
        text: comment,
        author: author,
        reviewID: id
        
        
       
                
    });


    console.log("outside" + review);

    Artists.findOne({username: artist}, function(err, artist2) {
        if (err) throw err;

        var len = artist2.products.length;
        for (var i = 0; i < len; i++) {
            if (artist2.products[i].name == productName) {
                artist2.products[i].reviews.push(review);
                console.log(artist2.products[i].name);
                console.log(artist2.products[i].reviews);

            }
        }
    
        artist2.save(function(err) {
            if (err) throw err;

            console.log("ooooooooo");
   
        });

    })
    res.send("success");




}
