import React from 'react';
import './style.css';

function CrystalCards(props) {
	const card = props.data;
	return (
		<div>
			<div className='card-layout' id={card.color}>
				<div className='title'>{`I am a ${card.color} crystal`}</div>
				<div className='image-container'>
					<img src={card.image} alt={card.title} />
				</div>
			</div>
		</div>
	);
}

export default CrystalCards;
