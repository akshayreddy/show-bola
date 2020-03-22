<template>
  <div id="app" class="card">
    <div class="arena">
      <div class="cardLayout">
        <div class="item_1">
          <div>
            <h4>{{playerA.name}}</h4>
          </div>
          <div>
            <h4>Score: {{playerA.rank}} | Cards: {{playerA.cards.length}} | Selected {{playerA.selectedCards.length}} cards</h4>
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
              <button type="button" class="btn btn-primary" @click="takeOpenCard(playerB)">Take open card</button>
            </div>
            <div>
              <button type="button" class="btn btn-primary" @click="takeCard(playerA)">Take deck card</button>
            </div>
            <div>
              <button type="button" class="btn btn-primary" @click="giveCard(playerA)">Give Cards</button>
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
              <span>Open card <span v-if="openCardSelected">selected</span></span>
            </div>
            <div class="item_2">
            <div v-for="card in openCards" :key="card.name" :card="card"
            @click="selectOpenCard"
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
            <h4>Score: {{playerB.rank}} | cards: {{playerB.cards.length}} | Selected {{playerB.selectedCards.length}} cards</h4>
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
              <button type="button" class="btn btn-primary" @click="takeOpenCard(playerB)">Take open card</button>
            </div>
            <div>
              <button type="button" class="btn btn-primary" @click="takeCard(playerB)">Take deck card</button>
            </div>
            <div>
              <button type="button" class="btn btn-primary" @click="giveCard(playerB)">Give Cards</button>
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
      cardSelectedByPlayerB: playerA.selectedCards,
      shouldGiveCards: true,
      openCards: [],
      currentPlayer: playerA,
      openCardSelected: false,
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
      },
      takeOpenCard(){
        if(this.openCards > 1){
          console.log('')
        }
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
      show(){
        let rankA = this.playerA.rank;
        let rankB = this.playerB.rank;
        if(rankA < rankB){
          alert(this.playerA.name + "Won!!");
        }else{
          alert(this.playerB.name + "Won!!");
        }
        
      }
    }
}
</script>
