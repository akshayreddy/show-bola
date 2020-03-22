
class Player {
	constructor(playerArgs){
		this.name = playerArgs.name;
		this.cards = [];
		this.rank = 0;
		this.selectedCards = [];
		this.message = '';
		this.hasTakenCards = false;
		this.hasGivenCards = false;
	}

	rankCount(){
		this.cards.forEach(card => {
			this.rank = this.rank + card.rank; 
		});
	}

	groupByColor(){

	}

	groupBySequence(){

	}
}

module.exports = Player;
