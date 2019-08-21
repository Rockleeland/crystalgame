const db = require('../models');
const jwt = require('jsonwebtoken');

module.exports = {
    signUp: function(req, res) {
        console.log(req.body);
        db.User.create(req.body)
		.then(data => res.json(data))
        .catch(err => res.status(400).json(err));
    }
}