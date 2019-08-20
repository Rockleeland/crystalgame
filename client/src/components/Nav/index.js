import React from 'react';
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar'
import {NavLink} from 'react-router-dom';
import AuthService from '../AuthService';
import './style.css';

class Nav extends React.Component {
 
	constructor() {
        super();
        this.Auth = new AuthService();
	}
	
	authNav = () => {
		if (this.Auth.loggedIn()) {
			return(
				<div>
					<Navbar className='nav-container' expand="lg">
						<Navbar.Brand >Crystal Madness (Welcome: {this.props.name})</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav"/>
						<Navbar.Collapse id="basic-navbar-nav">
							<div className='mr-auto navbar-nav'>
								<NavLink className='navLinks' to='/'>Home</NavLink>
								<NavLink className='navLinks' to='/profile'>Profile</NavLink>
								<NavLink className='navLinks' to='/score'>Score Board</NavLink>
								<NavLink className='navLinks' to='/instructions'>How to play</NavLink>
								<NavLink className='navLinks' to='/game'>New Game</NavLink>
							</div>
							   {/* this is not using the Link component to logout or user and then refresh the application to the start */}
							<div >
								<Navbar.Text>Signed in as: <NavLink to='/profile'>{this.props.name}</NavLink></Navbar.Text>
								<Navbar.Text><a className="nav-link" href="/" onClick={() => this.Auth.logout()}>Logout</a></Navbar.Text>
							</div>
						</Navbar.Collapse>
					</Navbar>
				</div>
			)
		} else {
			return (
				<div>
					<Navbar className='nav-container' expand='lg'>
						<Navbar.Brand>Mega Letters</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav"/>
						<Navbar.Collapse id="basic-navbar-nav">
						<div className='mr-auto navbar-nav'>
							<NavLink className='navLinks' to='/'>Home</NavLink>
							<NavLink className='navLinks' to='/instructions'>How to play</NavLink>
							</div>
							<Navbar.Text>
								<NavLink to="/login">Log In</NavLink>
							</Navbar.Text>
							</Navbar.Collapse>
					</Navbar>
				</div>
			)
		}
	}
	render() {
	return (
		<div>
			{this.authNav()}
		</div>
	)
}
}

const mapStateToProps = state => ({
	name: state.name
	
  })

export default connect(mapStateToProps)(Nav)