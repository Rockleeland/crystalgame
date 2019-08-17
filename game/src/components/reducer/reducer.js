// import { socket } from '../../index';

function capitalize(x) {
	if(x){
		return x.charAt(0).toUpperCase() + x.slice(1)
	}
}
const reducer = (
	state = {
		currentUser: {},
		snackbarIsOpen: false,
		name: null,
		names: [],
		email: null,
	}, action
) => {
	
	switch(action.type) {
		case 'LOGIN_USER':
			const name = capitalize(action.payload.username)
			state = { 
				...state, 
				name: name, 
				email: action.payload.email
			};
			break;
		case 'NEW_FRIEND':
			state = {
				...state,
				names: action.payload
			};
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
