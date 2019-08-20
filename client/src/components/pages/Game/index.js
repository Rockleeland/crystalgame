import React from 'react';
import { connect } from 'react-redux';
import withAuth from '../../withAuth';
import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import io from 'socket.io-client';
// import API from '../../utils/API';
import Chat from '../../chat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './style.css'

class Game extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: this.props.name,
			message: '',
			messages: [],
			users: [],
		};

		this.socket = io('localhost:5000');

		this.handleCreate = data => {
			let name = this.state.username
			if (name !== null) {
				this.socket.emit('CREATE', {name: name});
			}
		}
		
		this.handleJoin = data => {
			let name = this.state.username
			let roomID = document.getElementById('room').value;
			
			if (name === null || !roomID) {
				console.log('enter roomID')
			} else {
				this.socket.emit('JOIN_GAME', {name: name, room: roomID});
			}
		}
		this.socket.on('err', data => {
			console.log(data)
		});
		this.socket.on('player2', data => {
			console.log(data)
		});

		
	}

	render() {
		return(
			<div>
				<Container>
					<h1>Game Room</h1>
					<button className='btn create' onClick={this.handleCreate}>Create Game</button>
					<input type='text' name='room' id='room' placeholder='Enter Room #'></input>
					<button className='btn join' onClick={this.handleJoin}>Join Game</button>
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

export default withAuth(connect(mapStateToProps)(Game));
