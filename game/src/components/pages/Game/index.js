import React from 'react';
import { connect } from 'react-redux';


function Game(props) {
	
	return (
		<h1>Game Play Area</h1>
	)
}

const mapStateToProps = state => ({
	name: state.name
  })

export default connect(mapStateToProps)(Game)