
class Player {
	constructor(playerArgs){
		this.name = playerArgs.name;
		this.cards = [];
		this.rank = 0;
		this.selectedCards = [];
		this.discardedCards = [];
		this.message = 'take open card / give card(s)';
		this.hasToTakeCards = false;
		this.showGiveCard = true;
		this.isNumberInSequenceRule = false;
		this.isColorSuitAndOrderRule = false;
		this.canGiveCards = false;
	}

	rankCount(){
		this.rank = 0;
		this.cards.forEach(card => {
			this.rank = this.rank + card.rank;
		});
	}

	runRules(){
		this.isNumberInSequenceRule = this.sameNumberSequence();
		this.isColorSuitAndOrderRule = this.sameColorSuitAndOrder();
	}

	sameNumberSequence(){
		return this.selectedCards.every( (val, i, arr) => val.enum === arr[0].enum);
	}

	sameColorSequence(){
		return this.selectedCards.every( (val, i, arr) => val.color === arr[0].color);
	}

	sameSuitSequence(){
		return this.selectedCards.every( (val, i, arr) => val.suit === arr[0].suit);
	}

	numbersInOrder(){
		let enums = this.selectedCards.map(card => card.enum);
		let inOrder = false;
		let sortedEnums = enums.sort((a,b) => a - b);
		for (let i = 0; i <= sortedEnums.length - 2; i++) {
			if(sortedEnums[i] === (sortedEnums[i+1] - 1)){
				inOrder = true;
			}else{
				inOrder = false;
			}
		}
		return inOrder;
	}

	sameColorSuitAndOrder(){
		let sameColor = this.sameColorSequence();
		let sameSuit = this.sameSuitSequence();
		let inOrder = this.numbersInOrder();

		return (sameColor && sameSuit && inOrder)
	}

}

module.exports = Player;
