const db = require('../models');

let allUsers = [];
let usersOnline = [];
module.exports = {
	//Get all Usernames to display
	getAllUsers: function(req, res) {
		data = allUsers;

		if (allUsers.length > 0) {
			res.json(data);
		} else {
			db.User.find({}).then(function(dbUser) {
				dbUser.map(x => {
					allUsers.push(x.username);
				});
				res.json(data);
			});
		}
	},

	isAuthenticated: function(req, res) {
		res.send('You are authenticated'); //Sending some response when authenticated
	},

	getUser: function(req, res) {
		db.User.findById(req.params.id)
			.then(data => {
				if (data) {
					res.json(data);
				} else {
					res.status(404).send({ success: false, message: 'No user found' });
				}
			})
			.catch(err => res.status(400).send(err));
	},
};
