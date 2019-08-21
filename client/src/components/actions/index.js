import AuthService from '../AuthService';

export const getProfileFetch = () => {
	let id = getID();
	return dispatch => {
		const token = localStorage.id_token;
		if (token) {
			return fetch(`/api/user/${id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
				.then(res => res.json())
				.then(data => {
					if (data.message) {
						// Here you should have logic to handle invalid creation of a user.
						// This assumes your Rails API will return a JSON object with a key of
						// 'message' if there is an error with creating the user, i.e. invalid username
					} else {
						localStorage.setItem('token', data.jwt);
						dispatch(loginUser(data));
					}
				});
		}
	};
};

export const getOnlineUsers = userObj => ({
	type: 'ONLINE_USERS',
	payload: userObj
});

export const getAllUsers = () => {
return dispatch => {
	return fetch('/api/all-users', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
					Accept: 'application/json',
		},
	})
	.then(res => res.json())
	.then(data => {
		console.log('users');
		dispatch(allUsers(data))
	})}
}
const allUsers = userObj => ({
	type: 'ALL_USERS',
	payload: userObj
})
const getID = () => {
	const Auth = new AuthService();
	let currentProfile = Auth.getProfile();
	return currentProfile.id;
};

const loginUser = userObj => ({
	type: 'LOGIN_USER',
	payload: userObj,
});

export const newFriend = userObj => ({
	type: 'NEW_FRIEND',
	payload: userObj,
});

export const userSwitch = () => ({
	type: 'IS_USER_SWITCH',
})

