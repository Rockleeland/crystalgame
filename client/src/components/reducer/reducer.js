// import { socket } from '../../index';
import io from 'socket.io-client';

function capitalize(x) {
	if(x){
		return x.charAt(0).toUpperCase() + x.slice(1)
	}
}
const reducer = (
	state = {
		socket: io('http://localhost:5000'),
		onlineUsers: [],
		allUsers: [],
		snackbarIsOpen: false,
		name: null,
		email: null,
		message: '',
		messages: [],
	}, action
) => {
	switch(action.type) {
		case 'ONLINE_USERS' :
			state = {
				...state,
				onlineUsers: action.payload,
			}
			break;
		case 'ALL_USERS' :
			state = { 
				...state, 
				allUsers: action.payload, 
			};
			break;
		case 'LOGIN_USER':
			const name = capitalize(action.payload.username)
			state = { 
				...state, 
				loggedIn: true,
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
		case 'message':
			console.log('message');
			state = { 
				...state, 
				message: action.data
			};
			break;
		case 'new-user':
			console.log('new-user')
			state = { 
				...state, 
				message: action.data
			};
			break;
			default:
			break;
				
		}
		return state;
}


export default reducer
