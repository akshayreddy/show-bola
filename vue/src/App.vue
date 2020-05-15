<template>
  <div id="app">
    <div id="start" v-show="!game">
      <div class="startNavButtons">
        <button class="btn btn-primary" @click=btnCreateGameRoom()>Create room</button>
        <button class="btn btn-primary" @click=btnJoinGameRoom()>Join room</button>
      </div>
      <div v-if="showCreateGame" class="createGame">
        <input placeholder="Your game name" class="form-control" v-model="playerName">
        <select class="custom-select" v-model="numberOfPlayers">
          <option value="null">Number of players</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
          <option value="2">Four</option>
          <option value="3">Five</option>
        </select>
        <select class="custom-select" v-model="deckType"> 
          <option value="null">Deck type</option>
          <option value="standard-single">Standard (52 cards)</option>
          <option value="standard-double">Standard (104 cards)</option>
        </select>
        <button class="btn btn-success" @click=createGameRoom()>Create</button>
      </div>
      <div v-if="showJoinGame" class="joinGame">
        <input placeholder="Your game name" class="form-control" v-model="playerName">
        <input placeholder="Enter the join code" class="form-control" v-model="roomJoinCode">
        <button class="btn btn-success" @click=joinGameRoom()>Join</button>
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
                <button type="button" class="btn btn-primary" 
                v-if="waitingFor === 0 && room.hostId === playerId" 
                @click="giveCards">Give cards</button>
              </div>
              <div>
                <button type="button" class="btn btn-primary" 
                v-if="waitingFor === 0 && room.hostId === playerId" 
                @click="shuffle">Shuffle</button>
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
        <div>
          <span>Room Join Code: </span> <span class="text-success">{{ room.id }}</span>
        </div>
        <div>
          <span>Waiting for players: </span> <span class="text-success">{{ waitingFor }}</span>
        </div>
        <div>
          <span>Players in room</span><br>
          <div class="text-success" v-for="player in room.playersInRoom" :key="player.socketId">{{ player.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import io from 'socket.io-client';

const StandardDeck = require('./cardService/deck');
const Player = require('./game/player');

let playerB = new Player({name: 'Guru'});

export default {
  name: 'App',
  data(){
    return {
      socket: {},
      room: {},
      roomJoinCode: undefined,
      playerName: undefined,
      playerId: undefined,
      numberOfPlayers: undefined,
      deckType: undefined,
      waitingFor: undefined,
      game: false,
      showCreateGame: true,
      showJoinGame: false,
      standardDeck: new StandardDeck(),
      playerA: new Player({name: 'test'}),
      playerB: playerB,
      shouldGiveCards: true,
      openCards: [],
      currentPlayer: undefined,
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
    });

    this.socket.on('room-created', (room) => {
      this.room = room;
      if (this.room.deckType === 'standard-double') {
        this.standardDeck = new StandardDeck(2);

      } else {
        this.standardDeck = new StandardDeck();
      }

      this.shuffle();
      this.waitingFor = this.room.playersLimit - this.room.playersInRoom.length;
      console.log('room-created', room);
    });

    this.socket.on('room-updates', (room) => {
      this.room = room;
      this.waitingFor = this.room.playersLimit - this.room.playersInRoom.length;
      console.log('room-updates', room);
    });

    this.socket.on('player-added', (player) => {
      this.playerA = new Player({name: player.name});
      this.currentPlayer = this.playerA;
      this.playerId = player.playerId;
    })
  
    this.socket.on('join-room-error', (data) => {
      console.log(data);
    })

  },
  methods: {
      shuffle(){
        this.standardDeck.shuffle();
      },

      btnCreateGameRoom(){
        this.showCreateGame = true;
        this.showJoinGame = false;
      },

      btnJoinGameRoom(){
        this.showCreateGame = false;
        this.showJoinGame = true;
      },

      createGameRoom(){
        this.game = true;

        this.socket.emit('create-room', { 
          playerName: this.playerName, 
          numberOfPlayers: this.numberOfPlayers, 
          deckType: this.deckType
        });
      },

      joinGameRoom(){
        this.game = true;
        this.socket.emit('join-room', {
          roomCode: this.roomJoinCode, 
          playerName: this.playerName,
        });
      },

      giveCards(){
        let cardsToGive = 5;
        for (let interation = 0; interation < cardsToGive; interation++) {
          this.playerA.cards.push(this.standardDeck.deck.pop());
          this.playerB.cards.push(this.standardDeck.deck.pop());
        }
        this.playerA.rankCount();
        this.playerB.rankCount();
        this.openCards.push(this.standardDeck.deck.pop());
        this.shouldGiveCards = false;
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
        let card = this.standardDeck.deck.pop()
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
          this.standardDeck.cardsGivenBack.push(card);
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
