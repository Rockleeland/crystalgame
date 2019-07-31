import React from 'react';
import { connect } from 'react-redux';
import {Navbar} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import './style.css'

function Nav(props) {
	return (
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
	    			<Navbar.Text>
	     				Signed in as: <NavLink to='/profile'>{props.name}</NavLink>
	    			</Navbar.Text>
	  			</Navbar.Collapse>
			</Navbar>
		</div>
	)
}

const mapStateToProps = state => ({
	name: state.name
  })

export default connect(mapStateToProps)(Nav)