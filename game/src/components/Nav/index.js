import React from 'react';
import { connect } from 'react-redux';
import {Navbar} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import AuthService from '../AuthService';
import './style.css'
class Nav extends React.Component {
 
	constructor() {
        super();
        this.Auth = new AuthService();
	}
	
	authNav = () => {
		if (this.Auth.loggedIn()) {
			return(
				<div>
					<Navbar>
	  					<Navbar.Brand >
							<NavLink className='navLinks' to='/'> Home</NavLink>
							<NavLink className='navLinks' to='/profile'> | Profile</NavLink>
							<NavLink className='navLinks' to='/score'> | Score Board</NavLink>
							<NavLink className='navLinks' to='/instructions'> | How to play</NavLink>
							<NavLink className='navLinks' to='/game'> | New Game</NavLink>
						</Navbar.Brand>
	  					<Navbar.Toggle />
	  					<Navbar.Collapse className="justify-content-end">
						 
           		            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
           		            <a className="nav-link" href="/" onClick={() => this.Auth.logout()}>Logout</a>
           		       
	    					<Navbar.Text>
	     						Signed in as: <NavLink to='/profile'>{this.props.name}</NavLink>
								 
	    					</Navbar.Text>
	  					</Navbar.Collapse>
					</Navbar>
				</div>
			)
		} else {
			return (
				<div>
					<Navbar>
						<Navbar.Brand>
							<NavLink className='navLinks' to='/'> Home</NavLink>
							<NavLink className='navLinks' to='/instructions'> | How to play</NavLink>
						</Navbar.Brand>
							<Navbar.Text>
								Log In
							</Navbar.Text>
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