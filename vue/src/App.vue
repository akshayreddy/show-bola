<template>
  <div id="app">
    <div id="start" v-show="!game">
      <div class="startNavButtons">
        <button class="btn btn-primary" @click=btnCreateGame()>Create game</button>
        <button class="btn btn-primary" @click=btnJoinGame()>Join game</button>
      </div>
      <div v-if="showCreateGame" class="createGame">
        <input placeholder="Your game name" class="form-control">
        <select class="custom-select">
          <option value="null">Number of players</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
          <option value="2">Four</option>
          <option value="3">Five</option>
        </select>
        <select class="custom-select">
          <option value="null">Deck type</option>
          <option value="standard-single">Standard (52 cards)</option>
          <option value="standard-double">Standard (104 cards)</option>
        </select>
        <button class="btn btn-success" @click=createGame()>Start</button>
      </div>
      <div v-if="showJoinGame" class="joinGame">
        <input placeholder="Enter the join code" class="form-control">
        <input placeholder="Your game name" class="form-control">
        <button class="btn btn-success" @click=joinGame()>Join</button>
      </div>
    </div>
    <div id="game" v-show="game">
      <div class="arena">
        <div class="cardLayout">
          <div class="item_1">
            <div class="cardTitle">
              <h4>{{playerA.name}}<span v-if="currentPlayer === playerA">, your turn</span> </h4>
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
            <div class="playerActions" v-show="currentPlayer === playerA">
              <div>
                <button type="button" v-if="playerA.hasTakenCards === false" class="btn btn-primary" @click="takeOpenCard(playerA)">Take open card</button>
              </div>
              <div>
                <button type="button" v-if="playerA.hasTakenCards === false" class="btn btn-primary" @click="takeCardFromDeck(playerA)">Take deck card</button>
              </div>
              <div>
                <button type="button" v-if="playerA.showGiveCard === true" class="btn btn-primary" @click="giveCard(playerA)">Give Cards</button>
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
                <div v-for="card in standardDeck.cardsGivenBack.slice(-3)" :key="card.name" 
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
              <h4>{{playerB.name}}<span v-if="currentPlayer === playerB">, your turn</span></h4>
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
            <div class="playerActions" span v-show="currentPlayer === playerB">
              <div>
                <button type="button" v-if="playerB.hasTakenCards === false" class="btn btn-primary" @click="takeOpenCard(playerB)">Take open card</button>
              </div>
              <div>
                <button type="button" v-if="playerB.hasTakenCards === false" class="btn btn-primary" @click="takeCardFromDeck(playerB)">Take deck card</button>
              </div>
              <div>
                <button type="button" v-if="playerB.showGiveCard === true" class="btn btn-primary" @click="giveCard(playerB)">Give Cards</button>
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
  </div>
</template>

<script>

import io from 'socket.io-client';

const StandardDeck = require('./cardService/deck');
const Player = require('./game/player');

let standardDeck = new StandardDeck();
let playerA = new Player({name: 'Santhu'});
let playerB = new Player({name: 'Guru'});

export default {
  name: 'App',
  data(){
    return {
      socket: {},
      game: false,
      showCreateGame: true,
      showJoinGame: false,
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
  created(){
    this.socket = io('http://localhost:3000');
  },
  mounted(){
    this.socket.on('giveCards', (data) => {
      console.log(data);
    })
  },
  methods: {
      shuffle(){
        this.standardDeck.shuffle();
      },

      btnCreateGame(){
        this.showCreateGame = true;
        this.showJoinGame = false;
      },

      btnJoinGame(){
        this.showCreateGame = false;
        this.showJoinGame = true;
      },

      createGame(){
        this.game = true;
        this.game = true;
      },

      joinGame(){

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

        this.socket.emit('giveCards', playerA);
      },

      selectOpenCard(card){
        this.openCardSelected = card;
        this.isCardSelected = true;
      },

      takeOpenCard(player){
        if (this.isCardSelected === true) {
          player.cards.push(this.openCardSelected);
          this.openCards = [];
          this.isCardSelected = false;
          player.hasTakenCards = true;
          player.message = "Give card / cards now";
        } else if (this.isCardSelected === false) {
          player.message = "Select the open card";
        }
      },

      takeCardFromDeck(player){
        let card = standardDeck.deck.pop()
        player.cards.push(card);
        player.rank = player.rank + card.rank;
        player.hasTakenCards = true;
        player.message = "Give card / cards now";
      },

      canPlayerSkip(openCards, selectedCards){
        let result = false;
        openCards.some(openCard => {
          selectedCards.some(selectedCard => {
            if (openCard.value == selectedCard.value) {
              result = true;
            }
          });
        });
        return result;
      },

      giveCard(player){
        let selectedCardsNumber = player.selectedCards.length;

        //check if player has selected the cards
        if (selectedCardsNumber === 0) {
          player.message = "Select the cards";
          return;
        }

        // check if the player has taken the cards before
        // if player has not taken card, check if the turn can be skipped
        if (player.hasTakenCards === false) {
          if (this.canPlayerSkip(this.openCards, player.selectedCards) === false) {
            player.message = "No matching open cards. Cannot skip!";
            return;
          }
        }

        this.openCards = [];
        for (let iteration = 0; iteration < selectedCardsNumber; iteration++) {
          let card = player.selectedCards.pop();
          standardDeck.cardsGivenBack.push(card);
          this.openCards.push(card);
          player.cards.splice(player.cards.indexOf(card), 1);
          player.rank = player.rank - card.rank;
        }

        player.hasTakenCards = false;
        player.message = "";
        if (player === this.playerA) {
          this.currentPlayer = this.playerB;
        } else {
          this.currentPlayer = this.playerA;
        }
        
        this.socket.emit('playerGaveCard', player);
      },

      cardSelect(card, player){
        if (!player.selectedCards.includes(card)) {
          player.selectedCards.push(card);
          player.runRules();
          if (player.isNumberInSequenceRule || player.isColorSuitAndOrderRule) {
            player.message = "You can put these cards";
            player.showGiveCard = true;
          } else {
            player.message = "You cannot put these cards";
            player.showGiveCard = false;
          }
        }
      },

      clearSelectedCards(player){
        player.selectedCards = [];
        player.message = "";
        player.showGiveCard = true;
      },

      show(){
        let rankA = this.playerA.rank;
        let rankB = this.playerB.rank;
        if (rankA < rankB) {
          alert(this.playerA.name + " Won!!");
        } else {
          alert(this.playerB.name + " Won!!");
        }
        
      }
  }
}
</script>
