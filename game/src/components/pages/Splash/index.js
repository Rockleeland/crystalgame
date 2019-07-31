import React from 'react';
import { connect } from 'react-redux';



function Splash(props) {
	
	return (
	
			<h1>Hello {props.name} wanna play Love Letter!</h1>
			
		
		)
}

const mapStateToProps = state => ({
	name: state.name
  })

export default connect(mapStateToProps)(Splash)