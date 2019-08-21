import React from 'react';
import { connect } from 'react-redux';
import AuthService from '../../AuthService';
import withAuth from '../../withAuth';

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
		let result = data.filter(x => x !== this.props.name);
		return result.map(x => <h2 key={x}>{x}</h2>);
	};
	render() {
		let socket = this.props.socket;
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
	socket: state.socket,
});

export default withAuth(connect(mapStateToProps)(Splash));
