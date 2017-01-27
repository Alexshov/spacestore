var db = require('../ext/db'),
    crypt = require('crypto');

var schemaUser = new db.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    hash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    iteration: {
        type: Number,
        required: true
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

schemaUser.virtual('password')
    .set(function(data) {
        this.salt = String(Math.random());
        this.iteration = parseInt(Math.random() * 10 + 1);
        this.hash = this.getHash(data);
    })
    .get(function() {
        return this.hash;
    });

schemaUser.methods.getHash = function(password) {
    var c = crypt.createHmac('sha1', this.salt);
    for (var i = 0; i< this.iteration; i++) {
        c = c.update(password);
    };
    return c.digest('hex');
};

schemaUser.methods.checkPassword = function(data) {
    return this.getHash(data) === this.hash;
};

exports.User = db.model('User', schemaUser);
