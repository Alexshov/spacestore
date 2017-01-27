var db = require('../ext/db');

var schemaGood = new db.Schema({
    name: {
        type: String,
        require: true,
        unique: false
    },
    description: {
        type: String
    },
    group: {
        type: Number
    },
    calories: {
        type: Number
    },
    vitamins: {
        type: String
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number
    },
    image: {
        type: String
    }
});

exports.Good = db.model('Good', schemaGood);
