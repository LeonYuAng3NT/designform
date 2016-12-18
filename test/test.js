/**
 * Created by YuAng on 2016-11-22.
 */

var should = require('should');
var mongoose = require('mongoose');
var app = require('../index');
var Artists = require('../model/artists.js');
var request = require('supertest');
var server = request.agent(app);
var Product = mongoose.model('Products');

var controller = require("../controller/profile.js");


var firstResponse = {
    viewName: "profile"
    , data : {

    }
    , render: function(view, viewData) {
        this.viewName = view;
        this.data = viewData;
    }
};
var secondResponse = {
    viewName: ""
    , data : {}
    , render: function(view, viewData) {
        this.viewName = view;
        this.data = viewData;
    }
};
before(function(done){
    new Artists({
        "username": "MockName",
        "pwd": "1234567",
        "firstname":"YuAng",
        "lastname":"Zhang",
        "gender": "male",
        "email":"leonzhang1996@hotmail.com",
        "status": "Undergraduate",
        "country": "China"

    }).save(function(err, doc){
        testUser = doc;
        new Product({
            "name": "MockProduct",
            "Description": "abcdefg",
            "releaseTime":Date.now,
            "onSaleStatus":true
        }).save(function(err, doc){
            testProject = doc;
        });
    });
    done();
});

it('Search ', function(done){
    server
        .get('/artists?username=MockName')
        .expect(200)
        .end(function(err, res){
            res.status.should.equal(200);
            this.timeout(150);
            setTimeout(done, 150);
        });
});

it('Check create Artist', function(done){
    var mockUser = {
        "username": "MockAlice",
        "Pwd": "AliceMock",
        "NickName": "XianYu"

    };
    server
        .post('/add_product')
        .send(mockUser)
        .expect(200)
        .end(function(err, res){
            res.status.should.equal(200);
            res.text.should.containEql('Success');

            done();
        });
});


it('delete artist', function(done){
    server
        .delete('/artists?username=MockName')
        .expect(404)
        .end(function(err, res){
            res.status.should.equal(404);
            res.text.should.containEql('Success');
            done();
        });
    done();
});

it('Get all products from main', function(done){
    server
        .get('/main' )
        .expect(200)
        .end(function(err, res){
            res.status.should.equal(200);

            done();
        });
});

it('Getting all artists', function(done){
    server
        .get('/artists' )
        .expect(200)
        .end(function(err, res){
            res.status.should.equal(200);
       //     res.body.should.be.an.Array();
            done();
        });
});

it('Get all products', function(done){
    server
        .get('/product' )
        .expect(404)
        .end(function(err, res){
            res.status.should.equal(404);

            done();
        });
});
