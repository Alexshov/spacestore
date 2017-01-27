var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var toRender = {
        title: "Elevator",
        description: "The Elevator",
        keywords: "elevator, lits, test case"
    };
    res.render('elevator', toRender);
})

module.exports = router;
