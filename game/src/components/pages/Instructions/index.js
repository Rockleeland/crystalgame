import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CrystalCard from '../../crystalCards'
import './style.css'


class Instructions extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			crystals: []
		}
	};
	componentWillMount() {
		this.getCrystal();
	}
	
	getCrystal = () => {
		fetch('/api/getCrystal')
		.then(res => res.json())
		.then(crystals => this.setState({crystals}))
	}
	
	render(){
		const crystals = this.state.crystals;
		return (
			<div>
				<h1>How To Play</h1>
				{crystals.length ? (
					<Container>
						<Row>
						{crystals.map((crystal) => {
							
							return(
									<Col  xs={12} md={6} key={crystals.indexOf(crystal)}>
										<CrystalCard data={crystal}/>
									</Col>
							)
						})}
						</Row>
					</Container>
				) : (
					null
					)}
			</div>

		)
	}
}


export default Instructions