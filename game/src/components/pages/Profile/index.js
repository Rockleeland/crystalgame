import React from 'react';
import { connect } from 'react-redux';


function Profile(props) {
	
	return (
		<h1>{props.name}'s Profile Page</h1>

	)
}

const mapStateToProps = state => ({
	name: state.name
  })

export default connect(mapStateToProps)(Profile)