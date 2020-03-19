console.log("Show Bolla");


class Card {
	constructor(cardArgs) {
		this.suit = cardArgs.suit;
		this.value = cardArgs.value;
		this.name = this.fullname();
		this.color = cardArgs.color;
		this.rank = parseInt(cardArgs.rank);
	}

	fullname(){
		return this.value + " of " + this.suit + "s";
	}
}

class StandardDeck {
	constructor(args) {
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

class Player{
	constructor(playerArgs){
		this.name = playerArgs.name;
		this.cards = [];
		this.rank = 0;
		this.selectedCards = [];
	}

	rankCount(){
		let rankCount = 0;
		this.cards.forEach(card => {
			this.rank = this.rank + card.rank; 
		});
	}

	groupByColor(){

	}

	groupBySequence(){

	}
}

let standardDeck = new StandardDeck();
let playerA = new Player({name: 'Santhu'});
let playerB = new Player({name: 'Guru'});

new Vue({
	el: '#app',
	data: {
		standardDeck: standardDeck,
		playerA: playerA,
		playerB: playerB,
		cardSelectedByPlayerA: playerA.selectedCards,
		cardSelectedByPlayerB: playerA.selectedCards,
	},
	methods: {
		shuffle(){
			this.standardDeck.shuffle();
		},
		giveCards(){
			let cardsToGive = 5;
			for (let interation = 0; interation < cardsToGive; interation++) {
				playerA.cards.push(standardDeck.deck.pop());
				playerB.cards.push(standardDeck.deck.pop());
			}
			playerA.rankCount();
			playerB.rankCount();
		},
		groupByColor(){

		},
		groupBySequence(){

		},
		takeCard(player){
			let card = standardDeck.deck.pop()
			player.cards.push(card);
			player.rank = player.rank + card.rank;
		},
		giveCard(player){
			let selectedCardsNumber = player.selectedCards.length;
			for (let iteration = 0; iteration < selectedCardsNumber; iteration++) {
				let card = player.selectedCards.pop();
				standardDeck.cardsGivenBack.push(card);
				player.cards.splice(player.cards.indexOf(card), 1);
				player.rank = player.rank - card.rank;
			}
		},
		cardSelect(card, player){
			player.selectedCards.push(card);
		},
		show(player){
			let rankA = this.playerA.rank;
			let rankB = this.playerB.rank;
			if(rankA < rankB){
				alert(this.playerA.name + "Won!!");
			}else{
				alert(this.playerB.name + "Won!!");
			}
			
		}
	}
});
