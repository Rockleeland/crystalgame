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
	return (
	
			<h1>Hello {this.props.name} wanna play Love Letter!</h1>
			
		
		)
	}
}

const mapStateToProps = state => ({
	name: state.name
  })

export default connect(mapStateToProps)(withAuth(Splash))