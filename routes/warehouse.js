var express = require('express'),
    Good = require('../schema/goods').Good,
    User = require('../schema/user').User;

var router = express.Router();

router.get('/goods', function(req, res, next) {
    res.render('warehouse', {title: 'Goods', h1: 'Goods'});
});

router.post('/goods/store', function(req, res, next) {
    var good = new Good ({
        name: req.body.name,
        description: req.body.description,
        group: req.body.group,
        calories: req.body.calories,
        vitamins: req.body.vitamins,
        price: req.body.price,
        quantity: req.body.quantity,
        image: req.body.image
    });
    good.save(function(err) {
        if (err) next(err);
    });
    res.end();
});

router.get('/users', function(req, res, next) {
    res.render('warehouse', {title: 'Users', h1: 'Users'});
});


module.exports = router;
