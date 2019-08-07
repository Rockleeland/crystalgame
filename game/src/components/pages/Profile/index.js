import React from 'react';
import { connect } from 'react-redux';
import withAuth from '../../withAuth';

function Profile(props) {
	return (
		<h1>{props.name}'s Profile Page</h1>
	)
}

const mapStateToProps = state => ({
	name: state.name,
	names: state.names,
})

export default withAuth(connect(mapStateToProps)(Profile))