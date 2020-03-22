
class Card {
	constructor(cardArgs) {
		this.suit = cardArgs.suit;
		this.value = cardArgs.value;
		this.name = this.fullname();
		this.color = cardArgs.color;
		this.enum = cardArgs.enum;
		this.rank = parseInt(cardArgs.rank);
	}

	fullname(){
		return this.value + " of " + this.suit + "s";
	}
}

module.exports = Card;
