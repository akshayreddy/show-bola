const Card = require('./card');

class StandardDeck {
	constructor() {
		this.suits = ["spade", "diamond", "club", "heart"];
		this.values = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];
		this.deck = this.buildDeck();
		this.cardsGivenBack = [];
	}

	buildDeck(){
		let deck = [];
		this.suits.forEach(suit => {
			this.values.forEach(value => {
				let cardArgs = {
					suit: suit,
					value: value,
					rank: this.setRank(value),
					color: this.setColor(suit),
				}
				deck.push(new Card(cardArgs));
			})
		});
		return deck;
	}

	setRank(value){
		if(value === 'jack' | value === 'queen' | value === 'king'){
			return 10;
		} else if(value === 'ace'){
			return 1;
		} else {
			return value;
		}
	}

	setColor(suit){
		if(suit === 'diamond' | suit === 'heart'){
			return 'red';
		} else {
			return 'black';
		}
	}

	shuffle(){
		let numberOfCards = this.deck.length;
		for (let iteration = 0; iteration < (numberOfCards/2); iteration++) {
			let indexA = this.getRandomInt(0, numberOfCards - 1);
			let indexB = this.getRandomInt(0, numberOfCards - 1);
			this.swap(indexA, indexB);
		}

		for (let iteration = 0; iteration < (numberOfCards/2); iteration++) {
			let indexA = iteration;
			let indexB = this.getRandomInt(0, numberOfCards - 1);
			this.swap(indexA, indexB);
		}
	}

	swap(indexA, indexB){
		let temp = this.deck[indexA];
		this.deck[indexA] = this.deck[indexB];
		this.deck[indexB] = temp;
	}

	getRandomInt(min, max) {
	  return Math.floor(Math.random() * (max - min + 1) + min);
	}
}

module.exports = StandardDeck;
