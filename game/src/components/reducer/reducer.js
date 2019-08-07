// import { socket } from '../../index';

function capitalize(x) {
	if(x){
		return x.charAt(0).toUpperCase() + x.slice(1)
	}
}
const reducer = (
	state = {
		// name: 'Adam',
		currentUser: {},
		pot: 0,
		snackbarIsOpen: false,
		name: null,
		names: [],
		mode: null,
		whoDidIt: null,
		email: null
	}, action
) => {
	switch(action.type) {
		case 'LOGIN_USER':
			const name = capitalize(action.payload.username)
			state = { 
				...state, 
				name: name, 
				names: name, 
				email: action.payload.email
			};
			console.log(state)
			break;
		case 'ASSIGNED_USERNAME':
		  // put the assigned client's username to the pot
			state = { ...state, name: action.name };
			break;
		case 'PUT_ALL_NAMES_TO_REDUCER':
		  // put all of the active clients name to the reducer
			state = { ...state, names: action.names };
			break;
			default:
			break;
		}
		return state;
}


export default reducer
