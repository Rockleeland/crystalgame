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
	render(){	
		console.log(this.props)
	return (
	
			<h1>Hello {this.props.currentUser} wanna play Love Letter!</h1>
			
		
		)
	}
}

const mapStateToProps = state => ({
	currentUser: state.name
  })

export default withAuth(connect(mapStateToProps)(Splash))