/* eslint-disable no-unused-expressions */
import React from 'react';
import { connect } from 'react-redux';
import withAuth from '../withAuth';
import io from 'socket.io-client';
import API from '../utils/API';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './style.css';
import { userSwitch } from '../actions/index';

class Chat extends React.Component {
	componentWillUnmount() {
		this.props.userSwitch();
		console.log(this.props.isUser);
	}
	constructor(props) {
		super(props);

		this.state = {
			username: this.props.name,
			message: '',
			messages: [],
			users: [],
			room: '',
		};

		this.socket = io('localhost:5000');

		if (this.props.name !== null) {
			this.socket.emit('NEW_VISITOR', {
				user: this.props.name,
			});
		}

		this.socket.on('visitors', data => {
			const filtered = data.filter(function(value, index, arr) {
				return value !== null;
			});
			this.setState({ users: [this.state.users, filtered] });
		});

		this.socket.on('RECEIVE_MESSAGE', function(data) {
			addMessage(data);
		});

		const addMessage = data => {
			this.setState({ messages: [...this.state.messages, data] });
			console.log(this.state.messages);
		};

		this.sendMessage = ev => {
			ev.preventDefault();
			let data = {
				username: this.state.username,
				message: this.state.message,
			};

			this.socket.emit('SEND_MESSAGE', {
				author: this.state.username,
				message: this.state.message,
			});
			this.setState({ message: '' });
			API.saveMessages(data).then(data => console.log(data));
		};
		this.socket.on('GAME_CREATED', data => {
			console.log(data);
			addMessage(data);
		});
		let key = 10000;
		this.handleKey = data => {
			key++;
			return data + key;
		};
	}

	render() {
		return (
			<div className='chat-wrapper'>
				<div className='card'>
					<div className='card-body'>
						<Container>
							<Row>
								<div className='card-title' xs={12}>
									Chat
								</div>
							</Row>
							<Row>
								{this.state.users.map(x =>
									x.map(y => (
										<Col
											className='names'
											style={{ color: 'yellow' }}
											key={this.handleKey(y.user)}
											xs={2}>
											{y.user}
										</Col>
									))
								)}
							</Row>
						</Container>
						<hr />
						<div className='messages'>
							{this.state.messages.map(message => {
								return (
									<div key={this.handleKey(message)}>
										{message.author} : {message.message}
									</div>
								);
							})}
						</div>
					</div>
					<div className='card-footer'>
						<input
							type='text'
							placeholder='Message'
							className='form-control'
							value={this.state.message}
							onChange={ev => this.setState({ message: ev.target.value })}
						/>
						<br />
						<button
							onClick={this.sendMessage}
							className='btn btn-primary form-control'>
							Send
						</button>
					</div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		userSwitch: () => dispatch(userSwitch()),
	};
};

const mapStateToProps = state => ({
	name: state.name,
	isUser: state.isUser,
});

export default withAuth(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Chat)
);
