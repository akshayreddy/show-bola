export default class Player {
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
