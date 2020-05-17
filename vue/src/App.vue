<template>
  <div id="app">
    <div id="start" v-show="!game">
      <div class="startNavButtons">
        <button class="btn btn-primary" @click=btnCreateGameRoom()>Create room</button>
        <button class="btn btn-primary" @click=btnJoinGameRoom()>Join room</button>
      </div>
      <div v-if="showCreateGame" class="createGame">
        <div>
          <input placeholder="Your game name" class="form-control" v-model="playerName">
        </div>
        <div>
          <select class="custom-select" v-model="numberOfPlayers">
            <option value="null">Number of players</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
            <option value="2">Four</option>
            <option value="3">Five</option>
          </select>
        </div>
        <div>
          <select class="custom-select" v-model="deckType"> 
            <option value="null">Deck type</option>
            <option value="standard-single">Standard (52 cards)</option>
            <option value="standard-double">Standard (104 cards)</option>
          </select>
        </div>
        <div>
          <button class="btn btn-success" @click=createGameRoom()>Create</button>
        </div>
      </div>
      <div v-if="showJoinGame" class="joinGame">
        <div>
          <input placeholder="Your game name" class="form-control" v-model="playerName">
        </div>
        <div>
          <input placeholder="Enter the join code" class="form-control" v-model="roomJoinCode">
        </div>
        <div>
          <button class="btn btn-success" @click=joinGameRoom()>Join</button>
        </div>
      </div>
    </div>
    <div id="game" v-show="game">
      <div class="arena">
        <div class="players">
          <div class="playersCard" v-for="player in onlinePlayers" :key="player.playerId">
            <div class="playerTitle">
              <div class="playerName">
                {{ player.name }} has {{ player.cards.length }} cards
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
                v-if="waitingFor === 0 && room.hostId === playerId && shouldGiveCards" 
                @click="giveCards">Give cards</button>
              </div>
              <div>
                <button type="button" class="btn btn-primary" 
                v-if="waitingFor === 0 && room.hostId === playerId && shouldGiveCards" 
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
              <div v-for="card in standardDeck.openCards" :key="card.name" :card="card"
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
              <h4>{{player.name}}<span v-if="currentPlayer === playerId">, your turn</span> </h4>
            </div>
            <div>
              <h4>
                <span>Score: {{player.rank}}</span> |
                <span>Cards: {{player.cards.length}}</span> |
                <span>Selected {{player.selectedCards.length}} cards 
                  <button v-if="player.selectedCards.length > 0" 
                    @click=clearSelectedCards()
                    class="btn btn-primary btn-sm">clear
                  </button>
                </span>
              </h4>
            </div>
            <div>
              <span>{{ player.message }}</span>
            </div>
          </div>
          <div class="item_2">
            <div class="playerCards"> 
              <div v-for="card in player.cards" :key="card.name" :card="card" 
              @click="cardSelect(card)"
              v-bind:class="[card.color === 'red' ? 'cardRed' : '']">
                  <img width="150px" height="150px" viewBox="0 0 150 150" :src="'./media/svg/' + card.value + '_of_'+ card.suit + 's.svg'">
              </div>
            </div>
            <div class="playerActions" v-show="currentPlayer === playerId">
              <div>
                <button type="button" v-if="player.hasTakenCards === false" class="btn btn-primary" @click="takeOpenCard()">Take open card</button>
              </div>
              <div>
                <button type="button" v-if="player.hasTakenCards === false" class="btn btn-primary" @click="takeCardFromDeck()">Take deck card</button>
              </div>
              <div>
                <button type="button" v-if="player.showGiveCard === true" class="btn btn-primary" @click="giveCard()">Give Cards</button>
              </div>
              <div>
                <button type="button" class="btn btn-danger" @click="show()">Show</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="infoBoard">
        <div>
          <div class="infoBoardTitle">
            <h3>Rules</h3>
          </div>
          <div class="rules ml-2">
            <div>
              Player with the lowest score wins!
            </div>
            <div>
              A player can take a card from deck or open cards section.
            </div>
            <div>
                A player can skip taking a card when having 
                <ul>Cards with same number 11, 555.</ul>
                <ul>Cards with same color, same shape and in sequence. ex 1234, JQK.</ul>
                <ul>Card with matching number in open cards section</ul>
            </div>
          </div>
        </div>
        <div>
          <div class="infoBoardTitle">
            <h3>Room</h3>
          </div>
          <div class="roonInfo ml-2">
            <div>
              <span>Room Join Code: </span> <span class="text-danger font-weight-bold">{{ room.id }}</span>
            </div>
            <div>
              <span>Waiting for players: </span><span class="text-danger font-weight-bold">{{ waitingFor }}</span>
            </div>
<!--             <div>
              <span>Players in room</span><br>
              <div class="text-success" v-for="player in room.playersInRoom" :key="player.playerId">{{ player.name }}</div>
            </div> -->
          </div>
        </div>
        <div>
          <div class="infoBoardTitle">
            <h3>Chat</h3>
          </div>
          <div class="chatModal">
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import io from 'socket.io-client';

const StandardDeck = require('./cardService/deck');
const Player = require('./game/player');

export default {
  name: 'App',
  data(){
    return {
      socket: {},
      room: {
        playersInRoom: [],
      },
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
      player: new Player({name: 'test'}),
      shouldGiveCards: true,
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

    this.socket.on('deck-updates', (data) => {
      this.standardDeck = data.deck;
    });

    this.socket.on('take-cards', (data) => {

      data.playersInRoom.forEach((player) => {
        if (player.playerId === this.playerId) {
          this.player.cards = player.cards;
          this.player.rankCount();
        }
      });
      this.shouldGiveCards = false;
    });

    this.socket.on('player-added', (player) => {
      this.player = new Player({name: player.name});
      this.playerId = player.playerId;
      console.log(player);
    });
  
    this.socket.on('join-room-error', (data) => {
      console.log(data);
    });

    this.socket.on('current-turn', (data) => {
      this.currentPlayer = data.playerId;
    });
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
        this.socket.emit('give-cards', {
          roomCode: this.room.id,
          deck: this.standardDeck, 
        });
      },

      selectOpenCard(card){
        this.openCardSelected = card;
        this.isCardSelected = true;
      },

      takeOpenCard(){
        if (this.isCardSelected === true) {
          this.player.cards.push(this.openCardSelected);
          this.standardDeck.openCards = [];
          this.isCardSelected = false;
          this.player.hasTakenCards = true;
          this.player.message = "Give card / cards now";
          this.player.rankCount();
          console.log("player.cards", this.player.cards);

          this.socket.emit('deck-updated', {
            roomCode: this.room.id,
            deck: this.standardDeck, 
          });

        } else if (this.isCardSelected === false) {
          this.player.message = "Select the open card";
        }
      },

      takeCardFromDeck(){
        let card = this.standardDeck.deck.pop()
        this.player.cards.push(card);
        this.player.hasTakenCards = true;
        this.player.message = "Give card / cards now";

        this.player.rankCount();
        console.log("player.cards", this.player.cards);

        this.socket.emit('deck-updated', {
          roomCode: this.room.id,
          deck: this.standardDeck, 
        });
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

      giveCard(){

        let selectedCardsNumber = this.player.selectedCards.length;

        //check if player has selected the cards
        if (selectedCardsNumber === 0) {
          this.player.message = "Select the cards";
          return;
        }

        // check if the player has taken the cards before
        // if player has not taken card, check if the turn can be skipped
        if (this.player.hasTakenCards === false) {
          if (this.canPlayerSkip(this.standardDeck.openCards, this.player.selectedCards) === false) {
            this.player.message = "No matching open cards. Cannot skip!";
            return;
          }
        }

        this.standardDeck.openCards = [];
        for (let iteration = 0; iteration < selectedCardsNumber; iteration++) {
          let card = this.player.selectedCards.pop();
          this.standardDeck.cardsGivenBack.push(card);
          this.standardDeck.openCards.push(card);
          this.player.cards.splice(this.player.cards.indexOf(card), 1);
        }

        this.player.rankCount();
        console.log('giveCard', this.player.cards);

        this.player.rankCount();
        this.player.hasTakenCards = false;
        this.player.message = "";

        this.socket.emit('deck-updated', {
          roomCode: this.room.id,
          deck: this.standardDeck, 
        });

        this.socket.emit('next-turn', {
          roomCode: this.room.id,
        });
      },

      cardSelect(card){
        if (!this.player.selectedCards.includes(card)) {
          this.player.selectedCards.push(card);
          this.player.runRules();
          if (this.player.isNumberInSequenceRule || this.player.isColorSuitAndOrderRule) {
            this.player.message = "You can put these cards";
            this.player.showGiveCard = true;
          } else {
            this.player.message = "You cannot put these cards";
            this.player.showGiveCard = false;
          }
        }
      },

      clearSelectedCards(){
        this.player.selectedCards = [];
        this.player.message = "";
        this.player.showGiveCard = true;
      },

      show(){        
      }
  },
  computed: {
    onlinePlayers: function(){
      return this.room.playersInRoom.filter((player) => { 
        if (player.playerId !== this.playerId) {
          return true;
        }
      });
    }
  }
}
</script>
