import React from 'react';
import { connect } from 'react-redux';
import AuthService from '../../AuthService';
import withAuth from '../../withAuth';
const Auth = new AuthService();

class Splash extends React.Component {

	componentWillMount(props) {
		// const id = this.props.user.id;
		
		// fetch(`/api/user/${id}`)
		// .then(res => res.json())
		// .then(res => {
			
		// 	const { dispatch } = this.props;
		// 	let name = res.username;
		// 	dispatch({ type: 'ASSIGNED_USERNAME', name });
		// })
	}

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
	name: state.name,
	names: state.names,
  })

export default withAuth(connect(mapStateToProps)(Splash))