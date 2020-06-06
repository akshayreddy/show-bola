<template>
  <div id="app">
    <div id="start" v-show="!game">
      <div class="startNavButtons">
        <button class="btn btn-primary" @click=btnCreateGameRoom()>Create room</button>
        <button class="btn btn-primary" @click=btnJoinGameRoom()>Join room</button>
      </div>
      <div v-if="showCreateGame" class="createGame">
        <div>
          <input placeholder="Your game name" class="form-control" v-model="playerName" maxlength="8">
        </div>
        <div>
          <select class="form-control" v-model="numberOfPlayers">
            <option value="">Number of players</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
            <option value="2">Four</option>
            <option value="3">Five</option>
          </select>
        </div>
        <div>
          <select class="form-control" v-model="deckType"> 
            <option value="">Deck type</option>
            <option value="standard-single">Standard (52 cards)</option>
            <option value="standard-double">Standard (104 cards)</option>
          </select>
        </div>
        <div>
          <button class="btn btn-success" v-show="playerName && numberOfPlayers && deckType" @click=createGameRoom()>Create</button>
        </div>
      </div>
      <div v-if="showJoinGame" class="joinGame">
        <div>
          <input placeholder="Your game name" class="form-control" v-model="playerName" maxlength="8">
        </div>
        <div>
          <input placeholder="Enter the join code" class="form-control" v-model="roomJoinCode">
        </div>
        <div>
          <button class="btn btn-success" @click=joinGameRoom() v-show="playerName && roomJoinCode">Join</button>
        </div>
      </div>
    </div>
    <div id="game" v-show="game">
      <div class="arena">
        <div class="players">
          <div v-for="player in onlinePlayers" :key="player.playerId" 
              v-bind:class="[currentPlayer == player.playerId ? 'playerCardOnline' : 'playerCardOffline', 'playersCard']">
            <div class="playerTitle">
              <div class="playerName">
                <h4>{{ player.name }} has <span class="text-danger">{{ player.cardCount }}</span> cards</h4>
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
              <h4>{{player.name}}<span v-if="currentPlayer === playerId" class="text-danger">, your turn</span> </h4>
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
              <h4 class="text-danger">{{ player.message }}</h4>
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
            <div class="playerActions" v-show="currentPlayer === playerId && shouldGiveCards === false">
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
            <h3>Room</h3>
          </div>
          <div class="roonInfo ml-2">
            <div>
              <span>Room Join Code: </span> <span class="text-danger font-weight-bold">{{ room.id }}</span>
            </div>
          <div>
            <span>Waiting for players: </span><span class="text-danger font-weight-bold">{{ waitingFor }}</span>
          </div>
          </div>
        </div>
        <div>
          <div class="infoBoardTitle">
            <h3>Rules</h3>
          </div>
          <div class="rules ml-2">
            <div>
              Player with the <span class="text-danger">lowest score</span> wins!
            </div>
            <div>
              A player can take a card from main deck or open cards section.
            </div>
            <div>
                A player can <span class="text-danger">skip</span> taking a card when having 
                any one card with <span class="text-danger">matching number</span> in open cards section
            </div>
              <div>
                A player can give <span class="text-danger">multiple cards</span> when
                <ul>Cards have same number ex 11, 555.</ul>
                <ul>Cards with same color and same shape and are in sequence. ex 1234, JQK.</ul>
            </div>
          </div>
        </div>
        <div class="chat">
          <div class="infoBoardTitle">
            <h3>Chat</h3>
          </div>
          <div class="chatMessages">
            <div v-for="message in latestMessages" :key="message.playerId" class="messageBox">
              <div class="messageBy text-left ml-2">
                {{ message.playerName }}:  
              </div>
              <div class="text-left ml-2">
                {{ message.text }}
              </div>
            </div>
          </div>
          <div class="sendMessage ml-2">
            <div>
              <input v-model="message" class="form-control" placeholder="Enter message" maxlength="18">
            </div>
            <div>
              <button class="btn btn-success btn-small" @click="sendMessage()">Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal v-model="resultModalShow" hide-footer>
      <div class="d-block text-center">
        <h3 class="resultTitle">
            <span>{{showRequestedBy}} show bola and {{result}} it!!</span>
            <span>Winner is {{ winner }}</span>
        </h3>
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click="playAgain">Play Again</b-button>
      <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close</b-button>
    </b-modal>
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
        messages: [],
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
      resultModalShow: false,
      showRequestedBy: undefined,
      result: undefined,
      winner: undefined,
      message: undefined,
    };
  },
  created(){
    this.socket = io(process.env.IP);
  },
  mounted(){

    this.socket.on('room-created', (room) => {
      this.room = room;
      if (this.room.deckType === 'standard-double') {
        this.standardDeck = new StandardDeck(2);

      } else {
        this.standardDeck = new StandardDeck();
      }

      this.shuffle();
      this.waitingFor = this.room.playersLimit - this.room.playersInRoom.length;
    });

    this.socket.on('room-updates', (room) => {
      this.room = room;
      this.waitingFor = this.room.playersLimit - this.room.playersInRoom.length;
      if (this.waitingFor === 0 && this.currentPlayer === this.playerId) {
        this.player.message = 'Shuffle and give cards';
      }
    });

    this.socket.on('deck-updates', (data) => {
      this.standardDeck = data.deck;
    });

    this.socket.on('take-cards', (data) => {

      data.playersInRoom.forEach((player) => {
        if (player.playerId === this.playerId) {
          this.player.cards = player.cards;
          this.player.rankCount();
          this.socket.emit('rank', {
            roomCode: this.room.id,
            playerId: this.playerId,
            rank: this.player.rank,
          });
        }
      });
      this.shouldGiveCards = false;
    });

    this.socket.on('player-added', (player) => {
      this.player = new Player({name: player.name});
      this.playerId = player.playerId;
    });
  
    // this.socket.on('join-room-error', (data) => {
    // });

    this.socket.on('current-turn', (data) => {
      this.currentPlayer = data.playerId;
    });

    this.socket.on('card-updates', (data) => {
      this.room.playersInRoom.forEach((player) => {
        data.forEach((obj) => {
          if (player.playerId === obj.playerId) {
            player.cardCount = obj.cardCount;
          }
        })
      })
    });

    this.socket.on('result', (data) => {

      let ranksSorted = data.players.sort((playerA, playerB) => (playerA.rank > playerB.rank) ? 1 : -1);

      this.room.playersInRoom.forEach((player) => {
        if (player.playerId === data.playerRequested) {
          this.showRequestedBy = player.name;
          if (player.playerId === ranksSorted[0].playerId) {
            this.result = "won";
          } else {
            this.result = "lost";
          }
        }
      });
      this.winner = ranksSorted[0].name;
      this.showModal();
    });

    this.socket.on('messages', (data) => {
      this.room.messages.unshift(data);
    });

    this.socket.on('play-again', (data) => {
      this.room = data;
      this.player.cards = [];
      if (this.room.deckType === 'standard-double') {
        this.standardDeck = new StandardDeck(2);

      } else {
        this.standardDeck = new StandardDeck();
      }

      this.shuffle();
      this.shouldGiveCards = true;
      this.resultModalShow = false;
      this.player.message = "Select the cards";

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
        this.player.message = '';
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

        this.socket.emit('rank', {
          roomCode: this.room.id,
          playerId: this.playerId,
          rank: this.player.rank,
        });

        this.socket.emit('card-updates', {
          roomCode: this.room.id,
          playerId: this.playerId,
          cardCount: this.player.cards.length,
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
        this.socket.emit('show', {
          roomCode: this.room.id,
          playerId: this.playerId,
        });
      },

      showModal() {
        this.resultModalShow = true;
      },

      hideModal() {
        this.resultModalShow = false;
      },

      sendMessage() {
        if (this.message) {
          this.socket.emit('send-message', {
            roomCode: this.room.id,
            playerId: this.playerId,
            playerName: this.playerName,
            message: this.message,
          });

          this.message = '';
        }
      },

      playAgain(){
        this.socket.emit('play-again', {
          roomCode: this.room.id,
          playerId: this.playerId,
        });
      }
  },
  computed: {
    onlinePlayers: function() {
      return this.room.playersInRoom.filter((player) => { 
        if (player.playerId !== this.playerId) {
          return true;
        }
      });
    },
    latestMessages: function() {
      return this.room.messages.slice(0, 8).reverse();
    },
  }
}
</script>
