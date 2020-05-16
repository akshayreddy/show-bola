(function(e){function t(t){for(var r,o,i=t[0],c=t[1],d=t[2],u=0,v=[];u<i.length;u++)o=i[u],Object.prototype.hasOwnProperty.call(s,o)&&s[o]&&v.push(s[o][0]),s[o]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);l&&l(t);while(v.length)v.shift()();return n.push.apply(n,d||[]),a()}function a(){for(var e,t=0;t<n.length;t++){for(var a=n[t],r=!0,i=1;i<a.length;i++){var c=a[i];0!==s[c]&&(r=!1)}r&&(n.splice(t--,1),e=o(o.s=a[0]))}return e}var r={},s={app:0},n=[];function o(t){if(r[t])return r[t].exports;var a=r[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=e,o.c=r,o.d=function(e,t,a){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(a,r,function(t){return e[t]}.bind(null,r));return a},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=t,i=i.slice();for(var d=0;d<i.length;d++)t(i[d]);var l=c;n.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},1:function(e,t){},"56d7":function(e,t,a){"use strict";a.r(t);a("e260"),a("e6cf"),a("cca6"),a("a79d");var r=a("2b0e"),s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[a("div",{directives:[{name:"show",rawName:"v-show",value:!e.game,expression:"!game"}],attrs:{id:"start"}},[a("div",{staticClass:"startNavButtons"},[a("button",{staticClass:"btn btn-primary",on:{click:function(t){return e.btnCreateGameRoom()}}},[e._v("Create room")]),a("button",{staticClass:"btn btn-primary",on:{click:function(t){return e.btnJoinGameRoom()}}},[e._v("Join room")])]),e.showCreateGame?a("div",{staticClass:"createGame"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.playerName,expression:"playerName"}],staticClass:"form-control",attrs:{placeholder:"Your game name"},domProps:{value:e.playerName},on:{input:function(t){t.target.composing||(e.playerName=t.target.value)}}}),a("select",{directives:[{name:"model",rawName:"v-model",value:e.numberOfPlayers,expression:"numberOfPlayers"}],staticClass:"custom-select",on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.numberOfPlayers=t.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"null"}},[e._v("Number of players")]),a("option",{attrs:{value:"2"}},[e._v("Two")]),a("option",{attrs:{value:"3"}},[e._v("Three")]),a("option",{attrs:{value:"2"}},[e._v("Four")]),a("option",{attrs:{value:"3"}},[e._v("Five")])]),a("select",{directives:[{name:"model",rawName:"v-model",value:e.deckType,expression:"deckType"}],staticClass:"custom-select",on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.deckType=t.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"null"}},[e._v("Deck type")]),a("option",{attrs:{value:"standard-single"}},[e._v("Standard (52 cards)")]),a("option",{attrs:{value:"standard-double"}},[e._v("Standard (104 cards)")])]),a("button",{staticClass:"btn btn-success",on:{click:function(t){return e.createGameRoom()}}},[e._v("Create")])]):e._e(),e.showJoinGame?a("div",{staticClass:"joinGame"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.playerName,expression:"playerName"}],staticClass:"form-control",attrs:{placeholder:"Your game name"},domProps:{value:e.playerName},on:{input:function(t){t.target.composing||(e.playerName=t.target.value)}}}),a("input",{directives:[{name:"model",rawName:"v-model",value:e.roomJoinCode,expression:"roomJoinCode"}],staticClass:"form-control",attrs:{placeholder:"Enter the join code"},domProps:{value:e.roomJoinCode},on:{input:function(t){t.target.composing||(e.roomJoinCode=t.target.value)}}}),a("button",{staticClass:"btn btn-success",on:{click:function(t){return e.joinGameRoom()}}},[e._v("Join")])]):e._e()]),a("div",{directives:[{name:"show",rawName:"v-show",value:e.game,expression:"game"}],attrs:{id:"game"}},[a("div",{staticClass:"arena"},[a("div",{staticClass:"cardLayout"},[a("div",{staticClass:"item_1"},[a("div",{staticClass:"cardTitle"},[a("h4",[e._v(e._s(e.playerB.name))])]),a("div",[a("h4",[a("span",[e._v("Score: "+e._s(e.playerB.rank))]),e._v(" | "),a("span",[e._v("Cards: "+e._s(e.playerB.cards.length))]),e._v(" | "),a("span",[e._v("Selected "+e._s(e.playerB.selectedCards.length)+" cards "),e.playerB.selectedCards.length>0?a("button",{staticClass:"btn btn-primary btn-sm",on:{click:function(t){return e.clearSelectedCards(e.playerB)}}},[e._v("clear ")]):e._e()])])]),a("div",[a("span",[e._v(e._s(e.playerB.message))])])]),a("div",{staticClass:"item_2"},[a("div",{staticClass:"playerCards"},e._l(e.playerB.cards,(function(t){return a("div",{key:t.name,class:["red"===t.color?"cardRed":""],attrs:{card:t},on:{click:function(a){return e.cardSelect(t,e.playerB)}}},[a("img",{attrs:{width:"150px",height:"150px",viewBox:"0 0 150 150",src:"./media/svg/"+t.value+"_of_"+t.suit+"s.svg"}})])})),0),a("div",{directives:[{name:"show",rawName:"v-show",value:null===e.currentPlayer,expression:"currentPlayer === null"}],staticClass:"playerActions",attrs:{span:""}},[a("div",[!1===e.playerB.hasTakenCards?a("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(t){return e.takeOpenCard(e.playerB)}}},[e._v("Take open card")]):e._e()]),a("div",[!1===e.playerB.hasTakenCards?a("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(t){return e.takeCardFromDeck(e.playerB)}}},[e._v("Take deck card")]):e._e()]),a("div",[!0===e.playerB.showGiveCard?a("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(t){return e.giveCard(e.playerB)}}},[e._v("Give Cards")]):e._e()]),a("div",[a("button",{staticClass:"btn btn-danger",attrs:{type:"button"},on:{click:function(t){return e.show()}}},[e._v("Show")])])])])]),a("div",{staticClass:"deck"},[a("div",{staticClass:"deckHeader"},[e._m(0),a("div",{staticClass:"deckAction"},[a("div",[0===e.waitingFor&&e.room.hostId===e.playerId&&e.shouldGiveCards?a("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:e.giveCards}},[e._v("Give cards")]):e._e()]),a("div",[0===e.waitingFor&&e.room.hostId===e.playerId&&e.shouldGiveCards?a("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:e.shuffle}},[e._v("Shuffle")]):e._e()])])]),a("div",{staticClass:"deckTable"},[a("div",{staticClass:"mainDeck"},[a("div",[a("span",[e._v("Main deck ("+e._s(e.standardDeck.deck.length)+" cards)")])]),a("div",[a("img",{attrs:{width:"150px",height:"150px",viewBox:"0 0 150 150",src:"./media/svg/deck_card.svg"}})])]),a("div",{staticClass:"cardsByOpponent"},[a("div",{staticClass:"item_1"},[a("span",[e._v("Open card "),e.isCardSelected?a("span",[e._v("selected")]):e._e()])]),a("div",{staticClass:"item_2"},e._l(e.standardDeck.openCards,(function(t){return a("div",{key:t.name,class:["red"===t.color?"cardRed":""],attrs:{card:t},on:{click:function(a){return e.selectOpenCard(t)}}},[a("img",{attrs:{width:"150px",height:"150px",viewBox:"0 0 150 150",src:"./media/svg/"+t.value+"_of_"+t.suit+"s.svg"}})])})),0)]),a("div",{staticClass:"cardsBackToDeck"},[e._m(1),a("div",{staticClass:"item_2"},e._l(e.standardDeck.cardsGivenBack.slice(-3),(function(e){return a("div",{key:e.name,class:["red"===e.color?"cardRed":""],attrs:{card:e}},[a("img",{attrs:{width:"150px",height:"150px",viewBox:"0 0 150 150",src:"./media/svg/"+e.value+"_of_"+e.suit+"s.svg"}})])})),0)])])]),a("div",{staticClass:"cardLayout"},[a("div",{staticClass:"item_1"},[a("div",{staticClass:"cardTitle"},[a("h4",[e._v(e._s(e.playerA.name)),e.currentPlayer===e.playerId?a("span",[e._v(", your turn")]):e._e()])]),a("div",[a("h4",[a("span",[e._v("Score: "+e._s(e.playerA.rank))]),e._v(" | "),a("span",[e._v("Cards: "+e._s(e.playerA.cards.length))]),e._v(" | "),a("span",[e._v("Selected "+e._s(e.playerA.selectedCards.length)+" cards "),e.playerA.selectedCards.length>0?a("button",{staticClass:"btn btn-primary btn-sm",on:{click:function(t){return e.clearSelectedCards(e.playerA)}}},[e._v("clear ")]):e._e()])])]),a("div",[a("span",[e._v(e._s(e.playerA.message))])])]),a("div",{staticClass:"item_2"},[a("div",{staticClass:"playerCards"},e._l(e.playerA.cards,(function(t){return a("div",{key:t.name,class:["red"===t.color?"cardRed":""],attrs:{card:t},on:{click:function(a){return e.cardSelect(t,e.playerA)}}},[a("img",{attrs:{width:"150px",height:"150px",viewBox:"0 0 150 150",src:"./media/svg/"+t.value+"_of_"+t.suit+"s.svg"}})])})),0),a("div",{directives:[{name:"show",rawName:"v-show",value:e.currentPlayer===e.playerId,expression:"currentPlayer === playerId"}],staticClass:"playerActions"},[a("div",[!1===e.playerA.hasTakenCards?a("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(t){return e.takeOpenCard(e.playerA)}}},[e._v("Take open card")]):e._e()]),a("div",[!1===e.playerA.hasTakenCards?a("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(t){return e.takeCardFromDeck(e.playerA)}}},[e._v("Take deck card")]):e._e()]),a("div",[!0===e.playerA.showGiveCard?a("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(t){return e.giveCard(e.playerA)}}},[e._v("Give Cards")]):e._e()]),a("div",[a("button",{staticClass:"btn btn-danger",attrs:{type:"button"},on:{click:function(t){return e.show()}}},[e._v("Show")])])])])])]),a("div",{staticClass:"leaderBoard"},[a("div",[a("span",[e._v("Room Join Code: ")]),e._v(" "),a("span",{staticClass:"text-success"},[e._v(e._s(e.room.id))])]),a("div",[a("span",[e._v("Waiting for players: ")]),e._v(" "),a("span",{staticClass:"text-success"},[e._v(e._s(e.waitingFor))])]),a("div",[a("span",[e._v("Players in room")]),a("br"),e._l(e.room.playersInRoom,(function(t){return a("div",{key:t.socketId,staticClass:"text-success"},[e._v(e._s(t.name))])}))],2)])])])},n=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"cardTitle"},[a("h4",[e._v("The Deck")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"item_1"},[a("span",[e._v("Recent cards given back")])])}],o=(a("4160"),a("caad"),a("c975"),a("45fc"),a("a434"),a("b0c0"),a("2532"),a("159b"),a("8055")),i=a.n(o),c=a("7b1a"),d=a("85ff"),l=new d({name:"Guru"}),u={name:"App",data:function(){return{socket:{},room:{},roomJoinCode:void 0,playerName:void 0,playerId:void 0,numberOfPlayers:void 0,deckType:void 0,waitingFor:void 0,game:!1,showCreateGame:!0,showJoinGame:!1,standardDeck:new c,playerA:new d({name:"test"}),playerB:l,shouldGiveCards:!0,currentPlayer:void 0,isCardSelected:!1,openCardSelected:{}}},created:function(){this.socket=i()("http://localhost:3000")},mounted:function(){var e=this;this.socket.on("giveCards",(function(e){console.log(e)})),this.socket.on("room-created",(function(t){e.room=t,"standard-double"===e.room.deckType?e.standardDeck=new c(2):e.standardDeck=new c,e.shuffle(),e.waitingFor=e.room.playersLimit-e.room.playersInRoom.length,console.log("room-created",t)})),this.socket.on("room-updates",(function(t){e.room=t,e.waitingFor=e.room.playersLimit-e.room.playersInRoom.length,console.log("room-updates",t)})),this.socket.on("deck-updates",(function(t){e.standardDeck=t.deck})),this.socket.on("take-cards",(function(t){t.playersInRoom.forEach((function(t){t.playerId===e.playerId&&(e.playerA.cards=t.cards,e.playerA.rankCount())})),e.shouldGiveCards=!1})),this.socket.on("player-added",(function(t){e.playerA=new d({name:t.name}),e.playerId=t.playerId,console.log(t)})),this.socket.on("join-room-error",(function(e){console.log(e)})),this.socket.on("current-turn",(function(t){e.currentPlayer=t.playerId}))},methods:{shuffle:function(){this.standardDeck.shuffle()},btnCreateGameRoom:function(){this.showCreateGame=!0,this.showJoinGame=!1},btnJoinGameRoom:function(){this.showCreateGame=!1,this.showJoinGame=!0},createGameRoom:function(){this.game=!0,this.socket.emit("create-room",{playerName:this.playerName,numberOfPlayers:this.numberOfPlayers,deckType:this.deckType})},joinGameRoom:function(){this.game=!0,this.socket.emit("join-room",{roomCode:this.roomJoinCode,playerName:this.playerName})},giveCards:function(){this.socket.emit("give-cards",{roomCode:this.room.id,deck:this.standardDeck})},selectOpenCard:function(e){this.openCardSelected=e,this.isCardSelected=!0},takeOpenCard:function(e){!0===this.isCardSelected?(e.cards.push(this.openCardSelected),this.standardDeck.openCards=[],this.isCardSelected=!1,e.hasTakenCards=!0,e.message="Give card / cards now",this.socket.emit("deck-updated",{roomCode:this.room.id,deck:this.standardDeck})):!1===this.isCardSelected&&(e.message="Select the open card")},takeCardFromDeck:function(e){var t=this.standardDeck.deck.pop();e.cards.push(t),e.rank=e.rank+t.rank,e.hasTakenCards=!0,e.message="Give card / cards now",this.socket.emit("deck-updated",{roomCode:this.room.id,deck:this.standardDeck})},canPlayerSkip:function(e,t){var a=!1;return e.some((function(e){t.some((function(t){e.value==t.value&&(a=!0)}))})),a},giveCard:function(e){var t=e.selectedCards.length;if(0!==t)if(!1!==e.hasTakenCards||!1!==this.canPlayerSkip(this.standardDeck.openCards,e.selectedCards)){this.standardDeck.openCards=[];for(var a=0;a<t;a++){var r=e.selectedCards.pop();this.standardDeck.cardsGivenBack.push(r),this.standardDeck.openCards.push(r),e.cards.splice(e.cards.indexOf(r),1),e.rank=e.rank-r.rank}e.hasTakenCards=!1,e.message="",this.socket.emit("deck-updated",{roomCode:this.room.id,deck:this.standardDeck}),this.socket.emit("next-turn",{roomCode:this.room.id})}else e.message="No matching open cards. Cannot skip!";else e.message="Select the cards"},cardSelect:function(e,t){t.selectedCards.includes(e)||(t.selectedCards.push(e),t.runRules(),t.isNumberInSequenceRule||t.isColorSuitAndOrderRule?(t.message="You can put these cards",t.showGiveCard=!0):(t.message="You cannot put these cards",t.showGiveCard=!1))},clearSelectedCards:function(e){e.selectedCards=[],e.message="",e.showGiveCard=!0},show:function(){var e=this.playerA.rank,t=this.playerB.rank;e<t?alert(this.playerA.name+" Won!!"):alert(this.playerB.name+" Won!!")}}},v=u,p=a("2877"),m=Object(p["a"])(v,s,n,!1,null,null,null),h=m.exports;r["a"].config.productionTip=!1,new r["a"]({render:function(e){return e(h)}}).$mount("#app")},"7b1a":function(e,t,a){a("99af"),a("4160"),a("d3b7"),a("159b"),a("ddb0");var r=a("970b"),s=a("5bc3"),n=a("d4ee"),o=function(){"use strict";function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;r(this,e),this.suits=["spade","diamond","club","heart"],this.values=["ace","2","3","4","5","6","7","8","9","10","jack","queen","king"],this.cardsGivenBack=[],this.openCards=[],this.deck=2===t?this.buildDeck().concat(this.buildDeck()):this.buildDeck()}return s(e,[{key:"buildDeck",value:function(){var e=this,t=[];return this.suits.forEach((function(a){e.values.forEach((function(r){var s={suit:a,value:r,rank:e.setRank(r),color:e.setColor(a),enum:e.setEnum(r)};t.push(new n(s))}))})),t}},{key:"setEnum",value:function(e){return"jack"===e?11:"queen"===e?12:"king"===e?13:"ace"===e?1:parseInt(e)}},{key:"setRank",value:function(e){return"jack"===e|"queen"===e|"king"===e?10:"ace"===e?1:e}},{key:"setColor",value:function(e){return"diamond"===e|"heart"===e?"red":"black"}},{key:"shuffle",value:function(){for(var e=this.deck.length,t=0;t<e/2;t++){var a=this.getRandomInt(0,e-1),r=this.getRandomInt(0,e-1);this.swap(a,r)}for(var s=0;s<e/2;s++){var n=s,o=this.getRandomInt(0,e-1);this.swap(n,o)}}},{key:"swap",value:function(e,t){var a=this.deck[e];this.deck[e]=this.deck[t],this.deck[t]=a}},{key:"getRandomInt",value:function(e,t){return Math.floor(Math.random()*(t-e+1)+e)}}]),e}();e.exports=o},"85ff":function(e,t,a){a("a623"),a("4160"),a("d81d"),a("b0c0"),a("159b");var r=a("970b"),s=a("5bc3"),n=function(){"use strict";function e(t){r(this,e),this.name=t.name,this.cards=[],this.rank=0,this.selectedCards=[],this.message="take open card / give card(s)",this.hasTakenCards=!1,this.showGiveCard=!0,this.isNumberInSequenceRule=!1,this.isColorSuitAndOrderRule=!1,this.canGiveCards=!1}return s(e,[{key:"rankCount",value:function(){var e=this;this.cards.forEach((function(t){e.rank=e.rank+t.rank}))}},{key:"runRules",value:function(){console.log("runRules"),this.isNumberInSequenceRule=this.sameNumberSequence(),this.isColorSuitAndOrderRule=this.sameColorSuitAndOrder()}},{key:"sameNumberSequence",value:function(){return this.selectedCards.every((function(e,t,a){return e.value===a[0].value}))}},{key:"sameColorSequence",value:function(){return this.selectedCards.every((function(e,t,a){return e.color===a[0].color}))}},{key:"sameSuitSequence",value:function(){return this.selectedCards.every((function(e,t,a){return e.suit===a[0].suit}))}},{key:"numbersInOrder",value:function(){for(var e=this.selectedCards.map((function(e){return e.enum})),t=!1,a=e.sort(),r=0;r<=a.length-2;r++)t=a[r]===a[r+1]-1;return t}},{key:"sameColorSuitAndOrder",value:function(){var e=this.sameColorSequence(),t=this.sameSuitSequence(),a=this.numbersInOrder();return e&&t&&a}}]),e}();e.exports=n},d4ee:function(e,t,a){a("b0c0");var r=a("970b"),s=a("5bc3"),n=function(){"use strict";function e(t){r(this,e),this.suit=t.suit,this.value=t.value,this.name=this.fullname(),this.color=t.color,this.enum=t.enum,this.rank=parseInt(t.rank)}return s(e,[{key:"fullname",value:function(){return this.value+" of "+this.suit+"s"}}]),e}();e.exports=n}});
//# sourceMappingURL=app.9b0519a5.js.map