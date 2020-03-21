<template>
  <div id="app">
    <div class="arena">
      <div class="cardLayout">
        <div class="item_1">
          <h2>{{playerA.name}} has {{playerA.cards.length}} cards</h2>
          <h2>Score: {{playerA.rank}} | Selected {{playerA.selectedCards.length}} cards</h2>
        </div>
        <div class="item_2">
          <div class="playerCards"> 
            <div v-for="card in playerA.cards" :key="card.name" :card="card" 
            @click="cardSelect(card, playerA)"
            v-bind:class="[card.color === 'red' ? 'cardRed' : '']">
                <!-- <h5>{{card.name}}</h5> -->
                <img width="150px" height="150px" viewBox="0 0 150 150" :src="'./media/svg/' + card.value + '_of_'+ card.suit + 's.svg'">
            </div>
          </div>
          <div class="playerActions">
            <div>
              <button type="button" class="btn btn-lg btn-primary" @click="takeCard(playerA)">Take a card</button>
            </div>
            <div>
              <button type="button" class="btn btn-lg btn-primary" @click="giveCard(playerA)">Give Cards</button>
            </div>
            <div>
              <button type="button" class="btn btn-lg btn-danger" @click="show()">Show</button>
            </div>
          </div>
        </div>
      </div>
      <div class="deck">
        <div class="deckTitle">
          <h2>The Deck</h2>
        </div>
        <div class="deckAction">
          <button type="button" class="btn btn-lg btn-primary" @click="shuffle">Shuffle</button>
          <button type="button" class="btn btn-lg btn-primary" @click="giveCards">Give cards</button>
        </div>
        <div class="deckTable">
          <div class="mainDeck">
            <div>
              <span>Main deck (click to take a card) ({{standardDeck.deck.length}})</span>
            </div>
            <div>
<!--               <img width="150px" height="150px" viewBox="0 0 150 150" src="./media/svg/red_joker.svg"> -->
            </div>  
          </div>
          <div class="recentCards">
            <div class="item_1">
              <span>recent cards given by Santhu</span>
            </div>
            <div class="item_2">
<!--               <img width="150px" height="150px" viewBox="0 0 150 150" src="./media/svg/red_joker.svg"> -->
            </div>
          </div>
          <div class="cardsBackToDeck">
            <div class="item_1">
              <span>Cards given back to deck</span>
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
          <h2>{{playerB.name}} has {{playerB.cards.length}} cards</h2>
          <h2>Score: {{playerB.rank}} | Selected {{playerB.selectedCards.length}} cards</h2>
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
              <button type="button" class="btn btn-lg btn-primary" @click="takeCard(playerB)">Take a card</button>
            </div>
            <div>
              <button type="button" class="btn btn-lg btn-primary" @click="giveCard(playerB)">Give Cards</button>
            </div>
            <div>
              <button type="button" class="btn btn-lg btn-danger" @click="show()">Show</button>
            </div>
          </div>
        </div>
      </div>
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
