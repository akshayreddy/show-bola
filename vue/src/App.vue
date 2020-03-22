<template>
  <div id="app" class="card">
    <div class="arena">
      <div class="cardLayout">
        <div class="item_1">
          <div class="cardTitle">
            <h4>{{playerA.name}}</h4>
          </div>
          <div>
            <h4>
              <span>Score: {{playerA.rank}}</span> |
              <span>Cards: {{playerA.cards.length}}</span> |
              <span>Selected {{playerA.selectedCards.length}} cards 
                <button v-if="playerA.selectedCards.length > 0" 
                  @click=clearSelectedCards(playerA)
                  class="btn btn-primary btn-sm">clear
                </button>
              </span>
            </h4>
          </div>
          <div>
            <span>{{ playerA.message }}</span>
          </div>
        </div>
        <div class="item_2">
          <div class="playerCards"> 
            <div v-for="card in playerA.cards" :key="card.name" :card="card" 
            @click="cardSelect(card, playerA)"
            v-bind:class="[card.color === 'red' ? 'cardRed' : '']">
                <img width="150px" height="150px" viewBox="0 0 150 150" :src="'./media/svg/' + card.value + '_of_'+ card.suit + 's.svg'">
            </div>
          </div>
          <div class="playerActions">
            <div>
              <button type="button" v-if="playerA.hasTakenCards === false" class="btn btn-primary" @click="takeOpenCard(playerA)">Take open card</button>
            </div>
            <div>
              <button type="button" v-if="playerA.hasTakenCards === false" class="btn btn-primary" @click="takeCardFromDeck(playerA)">Take deck card</button>
            </div>
            <div>
              <button type="button" v-if="playerA.hasGivenCards === false" class="btn btn-primary" @click="giveCard(playerA)">Give Cards</button>
            </div>
            <div>
              <button type="button" class="btn btn-danger" @click="show()">Show</button>
            </div>
          </div>
        </div>
      </div>
      <div class="deck">
        <div class="deckHeader">
          <div class="cardTitle">
            <h4>The Deck</h4>
          </div>
          <div class="deckAction">
            <div>
              <button type="button" class="btn btn-primary" v-if="shouldGiveCards" @click="giveCards">Give cards</button>
            </div>
            <div>
              <button type="button" class="btn btn-primary" @click="shuffle">Shuffle</button>
            </div>
          </div>
        </div>
        <div class="deckTable">
          <div class="mainDeck">
            <div>
              <span>Main deck ({{standardDeck.deck.length}} cards)</span>
            </div>
            <div>
              <img width="150px" height="150px" viewBox="0 0 150 150" :src="'./media/svg/deck_card.svg'">
            </div>  
          </div>
          <div class="cardsByOpponent">
            <div class="item_1">
              <span>Open card <span v-if="isCardSelected">selected</span></span>
            </div>
            <div class="item_2">
            <div v-for="card in openCards" :key="card.name" :card="card"
            @click="selectOpenCard(card)"
            v-bind:class="[card.color === 'red' ? 'cardRed' : '']">
                <img width="150px" height="150px" viewBox="0 0 150 150" :src="'./media/svg/' + card.value + '_of_'+ card.suit + 's.svg'">
            </div>
            </div>
          </div>
          <div class="cardsBackToDeck">
            <div class="item_1">
              <span>Recent cards given back</span>
            </div>
            <div class="item_2">
              <div v-for="card in standardDeck.cardsGivenBack" :key="card.name" 
              :card="card"
              v-bind:class="[card.color === 'red' ? 'cardRed' : '']">
                <img width="150px" height="150px" viewBox="0 0 150 150" :src="'./media/svg/' + card.value + '_of_'+ card.suit + 's.svg'">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="cardLayout">
        <div class="item_1">
          <div class="cardTitle">
            <h4>{{playerB.name}}</h4>
          </div>
          <div>
            <h4>
              <span>Score: {{playerB.rank}}</span> |
              <span>Cards: {{playerB.cards.length}}</span> |
              <span>Selected {{playerB.selectedCards.length}} cards 
                <button v-if="playerB.selectedCards.length > 0" 
                  @click=clearSelectedCards(playerB)
                  class="btn btn-primary btn-sm">clear
                </button>
              </span>
            </h4>
          </div>
          <div>
            <span>{{ playerB.message }}</span>
          </div>
        </div>
        <div class="item_2">
          <div class="playerCards"> 
            <div v-for="card in playerB.cards" :key="card.name" :card="card" 
            @click="cardSelect(card, playerB)"
            v-bind:class="[card.color === 'red' ? 'cardRed' : '']">
                <img width="150px" height="150px" viewBox="0 0 150 150" :src="'./media/svg/' + card.value + '_of_'+ card.suit + 's.svg'">
            </div>
          </div>
          <div class="playerActions">
            <div>
              <button type="button" v-if="playerB.hasTakenCards === false" class="btn btn-primary" @click="takeOpenCard(playerB)">Take open card</button>
            </div>
            <div>
              <button type="button" v-if="playerB.hasTakenCards === false" class="btn btn-primary" @click="takeCardFromDeck(playerB)">Take deck card</button>
            </div>
            <div>
              <button type="button" v-if="playerB.hasGivenCards === false" class="btn btn-primary" @click="giveCard(playerB)">Give Cards</button>
            </div>
            <div>
              <button type="button" class="btn btn-danger" @click="show()">Show</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="leaderBoard">
      <span>Leader board</span>
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import Deck from './components/Deck.vue'
// import Player from './components/Player.vue'
// import Opponent from './components/Opponent.vue'
// import LeaderBoard from './components/LeaderBoard.vue'

const StandardDeck = require('./cardService/deck');
const Player = require('./game/player');

let standardDeck = new StandardDeck();
let playerA = new Player({name: 'Santhu'});
let playerB = new Player({name: 'Guru'});

console.log(new StandardDeck());

export default {
  name: 'App',
  components: {
    // HelloWorld,
    // Deck,
    // Player,
    // Opponent,
    // LeaderBoard
  },
  data(){
    return {
      standardDeck: standardDeck,
      playerA: playerA,
      playerB: playerB,
      cardSelectedByPlayerA: playerA.selectedCards,
      cardSelectedByPlayerB: playerB.selectedCards,
      shouldGiveCards: true,
      openCards: [],
      currentPlayer: playerA,
      isCardSelected: false,
      openCardSelected: {},
    };
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
        this.openCards.push(standardDeck.deck.pop());
        this.shouldGiveCards = false;
      },
      selectOpenCard(card){
        this.openCardSelected = card;
        this.isCardSelected = true;
      },
      takeOpenCard(player){
        if(this.isCardSelected === true){
          player.cards.push(this.openCardSelected);
          this.openCards = [];
          this.isCardSelected = false;
          player.hasTakenCards = true;
          player.message = "Give card / cards now";
        } else if(this.isCardSelected === false){
          player.message = "Select the open card";
        }
      },
      groupByColor(){

      },
      groupBySequence(){

      },
      takeCardFromDeck(player){
        let card = standardDeck.deck.pop()
        player.cards.push(card);
        player.rank = player.rank + card.rank;
        player.hasTakenCards = true;
        player.message = "Give card / cards now";
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
        if(!player.selectedCards.includes(card)){
          player.selectedCards.push(card);
          player.runRules();
          console.log("isNumberInSequenceRule", player.isNumberInSequenceRule);
          console.log("isColorSuitAndOrderRule", player.isColorSuitAndOrderRule);
          console.log("passedAllRules", player.passedAllRules);
        }
      },
      clearSelectedCards(player){
        player.selectedCards = [];
      },
      show(){
        let rankA = this.playerA.rank;
        let rankB = this.playerB.rank;
        if(rankA < rankB){
          alert(this.playerA.name + " Won!!");
        }else{
          alert(this.playerB.name + " Won!!");
        }
        
      }
    }
}
</script>
