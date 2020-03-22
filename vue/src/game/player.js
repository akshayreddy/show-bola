
class Player {
	constructor(playerArgs){
		this.name = playerArgs.name;
		this.cards = [];
		this.rank = 0;
		this.selectedCards = [];
		this.message = '';
		this.hasTakenCards = false;
		this.hasGivenCards = false;
		this.isNumberInSequenceRule = false;
		this.isColorSuitAndOrderRule = false;
		this.passedAllRules = this.passedAllRules();
	}

	rankCount(){
		this.cards.forEach(card => {
			this.rank = this.rank + card.rank; 
		});
	}

	passedAllRules(){
		return (this.isNumberInSequenceRule || this.isColorSuitAndOrderRule);
	}

	runRules(){
		this.isNumberInSequenceRule = this.sameNumberSequence();
		this.isColorSuitAndOrderRule = this.sameColorSuitAndOrder();
	}

	sameNumberSequence(){
		return this.selectedCards.every( (val, i, arr) => val.value === arr[0].value);
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
		let sortedEnums = enums.sort();
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

		console.log('sameColor', sameColor);
		console.log('sameSuit', sameSuit);
		console.log('inOrder', inOrder);
		
		return (sameColor && sameSuit && inOrder)
	}

}

module.exports = Player;
