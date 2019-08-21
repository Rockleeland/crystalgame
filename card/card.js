module.exports = [
	{
		type: 'princess',
		title: 'Roll',
		count: 1,
		number: 8,
		abilityText:
			'When Roll is discarded. You are immediately knocked out of the round. If the Roll was discarded by a card effect, any remaining effects of that card do not apply (you do not draw a card from the Proto Man, for example). Effects tied to being knocked out the round still apply (eg. Constable, Jester), however.',
		flavor: `"I refuse to lose!"
		―Roll`,
		image: '/images/Roll.png',
	},
	{
		type: 'countess',
		title: 'Dr. Wily',
		count: 1,
		number: 7,
		abilityText:
			'If you ever have Dr. Wily and either the Dr. Light or Mega Man in your hand, you must discard the Dr. Wily. You do not have to reveal the other card in your hand. Of course, you can also discard Dr. Wily even if you do not have a Mega family member in your hand. The Dr. Wily likes to play mind games....',
		flavor: `"Silence! My plans have only just begun, you fool! And I won't stop until I see both of you kneeling before me in utter defeat!"
		―Dr. Wily`,
		image: '/images/Wily.png',
	},
	{
		type: 'king',
		title: 'Dr. Light',
		count: 1,
		number: 6,
		abilityText:
			'When you discard Dr. Light, trade the card in your hand with the card held by another player of your choice. You cannot trade with a player who is out of the round.',
		flavor: `"Humans and robots living together in harmony and equality. That was my ultimate wish."
		―Dr. Light`,
		image: '/images/DrLight.png',
	},
	{
		type: 'prince',
		title: 'Mega Man',
		count: 2,
		number: 5,
		abilityText:
			'When you discard Mega Man, choose one player still in the round (including yourself). That player discards his or her hand, and draws a new one. If the deck is empty, that player draws the card that was removed at the start of the round. If all other players are protected by Mega Man, you must choose yourself.',
		flavor: `"Superiority, is not the point." ―Mega Man`,
		image: '/images/Mega_Man.png',
	},
	{
		type: 'handmaid',
		title: 'Rush',
		count: 2,
		number: 4,
		abilityText:
			'When you discard Rush, you are immune to the effects of other players’ cards until the start of your next turn. If all players other than the player whose turn it is are protected by Rush, the player must choose him or herself for a card’s effects, if possible.',
		flavor: `"Time to go, Rush!" ―Mega Man`,
		image: '/images/Rush.png',
	},
	{
		type: 'baron',
		title: 'Proto Man',
		count: 2,
		number: 3,
		abilityText:
			'When you discard the Proto Man, choose another player still in the round. You and that player secretly compare your hands. The player with the lower number is knocked out of the round. In case of a tie, nothing happens.',
		flavor: `"Robots are machines that follow orders. I'm a machine that doesn't, so what does that make me?"
		―Proto Man`,
		image: '/images/Proto-man.png',
	},
	{
		type: 'priest',
		title: 'Cut Man',
		count: 2,
		number: 2,
		abilityText:
			'When you discard the Priest, you can look at another player’s hand. Do not reveal the hand to any other players.',
		flavor: `"I can't forgive you for what you did to my brothers. It's payback time, and I'm gonna cut you down to size!"
		―Cut Man`,
		image: '/images/Cutman.png',
	},
	{
		type: 'guard',
		title: 'Guts Man',
		count: 5,
		number: 1,
		abilityText:
			'When you discard the Guts Man, choose a player and name a number (other than 1). If that player has that number in their hand, that player is knocked out of the round. If all other players still in the round cannot be chosen (eg. due to Handmaid or Sycophant), this card is discarded without effect.',
		flavor: `"I've got guts!"
		―Guts Man`,
		image: '/images/Gutsman.png',
	},
];
