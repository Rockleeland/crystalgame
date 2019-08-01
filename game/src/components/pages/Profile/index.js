import React from 'react';
import { connect } from 'react-redux';
import withAuth from '../../withAuth';

function Profile(props) {
	console.log(props)
	console.log()
	return (
		<h1>{props.currentUser.name}'s Profile Page</h1>

	)
}

const mapStateToProps = state => ({
	
	currentUser: state
  })

export default withAuth(connect(mapStateToProps)(Profile))