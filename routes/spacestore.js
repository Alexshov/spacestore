var express = require('express'),
    Good = require('../schema/goods').Good;

var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('spacestore', {title: 'The Earth Assistant Store'});
});

router.get('/goods', function(req, res, next) {
    Good.find({}, function(err, goods) {
        if (err) next(err);
        res.json(goods);
    });
});

router.get('/goods/:id', function(req, res, next) {
    var good = req.params.id;
    Good.find({group: good}, function(err, goods) {
        if (err) next(err);
        res.json(goods);
    })
});

router.post('/goods', function(req, res, next) {
    var good = req.body.group;
    Good.find({group: good}, function(err, goods) {
        if (err) next(err);
        res.json(goods);
    })
});

// router.get('/sets/:setid', function(req, res, next) {
//     var setid = req.params.setid;
//
//     console.log('Params: ' + req.body.store);
//     res.send({store: 'It\'s a new Store #' + req.body.store});
// });

module.exports = router;
