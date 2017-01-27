var express = require('express'),
    mongoose = require('mongoose'),
    conf = require('../config'),
    User = require('../schema/user').User;

var router = express.Router();

// var admin = new User({
//     name: 'root3',
//     password: 'passw@rd1'
// });
//
// admin.save(function(err) {
//     if (err) console.log('ERROR');
// });
//
// res.send('Created');

router.get('/users', function(req, res, next) {
    User.find({}, function(err, users) {
        if (err) next(err);
        res.json(users);
    });

});

router.get('/users/:id', function(req, res, next) {
    User.findById(req.params.id, function(err, users) {
        if (err) next(err);
        res.json(users);
    });

});

router.post('/users/:id', function(req, res, next) {
    var login = req.body.login;
    var pass = req.body.password;

    User.findOne({name: login}, function(err, curUser) {
        if (err) next(err);
        if (curUser) {
            if (curUser.checkPassword(pass)) {
                res.json(curUser);
            }else {
                next(err);
            };
        }else {
            next(err);
        };
    });
});

module.exports = router;
