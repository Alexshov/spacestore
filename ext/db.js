var db = require('mongoose'),
    conf = require('../config');

db.connect(conf.get('db-con'));

module.exports = db;
