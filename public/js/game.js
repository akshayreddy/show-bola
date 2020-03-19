consolee.log('Hello game');
import {StandardDeck} from "./deck.js";
import {Player} from "./player.js";

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
