import React from 'react';
import { connect } from 'react-redux';
import AuthService from '../../AuthService';
import withAuth from '../../withAuth';
import { socket } from '../../../index'
const Auth = new AuthService();

class Splash extends React.Component {
	handleLogout = () => {
		Auth.logout();
		this.props.history.replace('/signup');
	};

	goToEditProfile = () => {
		this.props.history.replace('/profile');
	};
	showAllUsers = data => {
		let result = data.filter(x => x.toLowerCase() !== this.props.name.toLowerCase());
		return result.map(x => <h2 key={x+Date.now()}>{x}</h2>);
	};
	render() {
		
		socket.on('visitor', data => {
			console.log(data);
		});

		let allUsers = this.props.usersArray;
		return (
			<div>
				<h1>Hello {this.props.name}, wanna play Crystal Madness!</h1>
				<div>{allUsers.length > 0 ? this.showAllUsers(allUsers) : null}</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	name: state.name,
	names: state.names,
	usersArray: state.allUsers,
});

export default withAuth(connect(mapStateToProps)(Splash));
