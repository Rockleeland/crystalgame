const db = require('../models');

module.exports = {
	getUser: function(req, res) {
		console.log('getid');
		console.log(req.params);
		db.User.findById(req.params.id)
			.then(data => {
				if (data) {
					console.log(data);
					res.json(data);
				} else {
					res.status(404).send({ success: false, message: 'No user found' });
				}
			})
			.catch(err => res.status(400).send(err));
	},

	//Get all Usernames to display
	getAllUsers: function(req, res) {
		allUsers = [];
		if (allUsers.length > 0) {
			res.json(allUsers);
		} else {
			db.User.find({}).then(function(dbUser) {
				dbUser.map(x => {
					allUsers.push(x.username);
				});
				res.json(allUsers);
			});
		}
	},
};
