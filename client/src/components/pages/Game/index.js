import React from 'react';
import { connect } from 'react-redux';
import { createGameRoom, joinGameRoom, oppJoined, leaveGameRoom } from '../../actions';
import withAuth from '../../withAuth';
import Container from 'react-bootstrap/Container';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';
import {socket} from '../../../index'


class Game extends React.Component {
	constructor(props) {
		super(props);
		const { dispatch } = this.props;
		socket.on('err', data => {
			console.log(data);
		});
		socket.on('GAME_CREATED', data => {
			console.log(data)
		})
		socket.on('player2', data => {
			console.log(data)
			dispatch(oppJoined(data));
		});
	}
	componentWillUnmount() {
		if (this.props.room !== null){
			this.handleLeave()
		}
	}
	
	handleLeave = () => {
		const { dispatch } = this.props;
		let name = this.props.name;
		let roomID = this.props.room;
		dispatch(leaveGameRoom(socket, name, roomID));
	}
	handleCreate = data => {
		const { dispatch } = this.props;
		let name = this.props.name;
		if (name !== null) {
			dispatch(createGameRoom(socket, name));
		}
	};

	handleJoin = data => {
		const { dispatch } = this.props;
		let name = this.props.name;
		let roomID = document.getElementById('room').value;

		if (name === null || !roomID) {
			console.log('enter roomID');
		} else {
			dispatch(joinGameRoom(socket, name, roomID));
		}
	};

	render() {
		let opp = this.props.opponent
		return (
			<div>
				<Container>
					<h1>Game Lobby</h1>
					{/* eslint-disable-next-line array-callback-return */}
					{opp ? (opp.map(x => {
						if (x.player === 'player2' && x.name !== this.props.name)
							return <h2 className='new-player' key={x.name + Date.now()}>{`${x.name} has joined!`}</h2>
						})):(null)}
					<button className='btn create' onClick={this.handleCreate}>
						Create Game
					</button>
					<input type='text' name='room' id='room' placeholder='Enter Room #' />
					<button className='btn join' onClick={this.handleJoin}>
						Join Game
					</button>
				</Container>
			</div>
		);
	}
}

const mapStateToProps = (state = {}) => {
	return { ...state };
};

export default withAuth(connect(mapStateToProps)(Game));
