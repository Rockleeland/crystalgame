import React from 'react';
import { connect } from 'react-redux';
import { leaveGameRoom } from '../../actions';
import withAuth from '../../withAuth';
import Container from 'react-bootstrap/Container';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {socket} from '../../../index'


class Game extends React.Component {
	constructor(props) {
		super(props);
		const { dispatch } = this.props;
		
	}
   
	render() {
        console.log(this.props)
		return (
			<div>
				<Container>
					<h1>Crystal Madness</h1>
                    <button className='btn create' onClick={this.handleLeave}>
						Leave Game
					</button>
					{/* <h2>{`Player 1: ${this.props.opponent[0].name}`}</h2>
                    <h2>{`Player 2: ${this.props.opponent[1].name}`}</h2> */}
				</Container>
			</div>
		);
	}
}

const mapStateToProps = (state = {}) => {
	return { ...state };
};

export default withAuth(connect(mapStateToProps)(Game));
