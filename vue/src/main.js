import Vue from 'vue'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

Vue.config.productionTip = false

const options = { name: 'show bola' };
Vue.use(new VueSocketIO({
    debug: true,
    connection: SocketIO('http://localhost:3000', options), //options object is Optional
  })
);

new Vue({
  render: h => h(App),
}).$mount('#app')
