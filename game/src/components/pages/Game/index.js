import React from 'react';
import { connect } from 'react-redux';
import withAuth from '../../withAuth';
import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import Chat from '../../chat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './style.css'

class Game extends React.Component {

	render() {
		return(
			<div>
				<Container>
					<h1>Game Room</h1>
					<FontAwesomeIcon icon='comments' />
					
					<Chat />
				</Container>
			</div>
		)
	}
}


const mapStateToProps = state => ({
	name: state.name,
});

export default connect(mapStateToProps)(withAuth(Game));
