
function capitalize(x) {
	if (x) {
		return x.charAt(0).toUpperCase() + x.slice(1);
	}
}
const reducer = (
	state = {
		onlineUsers: [],
		allUsers: [],
		snackbarIsOpen: false,
		player1: null,
		player2: null,
		opponent: null,
		name: null,
		email: null,
		message: '',
		messages: [],
	},
	action
) => {
	console.log(action.type)
	switch (action.type) {
		case 'OPPONENT_JOINED':
			console.log(action.payload)
			state = {
				...state,
				opponent: action.payload,
			};
			break;
		case 'ONLINE_USERS':
			state = {
				...state,
				onlineUsers: action.payload,
			};
			break;
		case 'ALL_USERS':
			state = {
				...state,
				allUsers: action.payload,
			};
			break;
		case 'LOGIN_USER':
			const name = capitalize(action.payload.username);
			state = {
				...state,
				loggedIn: true,
				name: name,
				email: action.payload.email,
			};
			break;
		case 'NEW_FRIEND':
			state = {
				...state,
				names: action.payload,
			};
			break;
		case 'message':
			state = {
				...state,
				message: action.data,
			};
			break;
		case 'new-user':
			state = {
				...state,
				id: action.data,
			};
			break;
		default:
			break;
	}
	return state;
};

export default reducer;
