// imports will always go at the top
import ChatMsg from './components/ChatMessage.js';
import ChatStat from './components/ChatStatus.js';

const socket = io();

// utility functions for socket
function setUserID({ sID }) {
    // save our unique ID generated by Socket on the server side - this is how we track individual connections to the chat service
    vm.socketID = sID;
}

function showNewMessage({ message }) {
    // debugger;
    vm.messages.push(message);
}

function handleUserTyping(user) {
    console.log('somebody is typing something');
}

const { createApp } = Vue 

const vm = createApp({
    data() {
      return {
        socketID: '',
        message: '',
        messages: [],
        nickname: '',
        nicknames: [],
      }
    },

    methods: {
        dispatchMessage() {
            socket.emit('chat_message', {
                content: this.message,
                name: this.nickname || 'anonymous',
                id: this.socketID
            })

            this.message = "";

            // socket.on('user connected', (userId) => {
            //     new Vue({
            //       data: {
            //         users: []
            //       },
            //       created() {
            //         this.users.push({ id: userId, name: 'Anonymous', typing: false, online: true });
            //       }
            //     }).$mount().$appendTo('#app');
            //   })
              
            //   socket.on('user disconnected', (socketId) => {
            //     new Vue({
            //       data: {
            //         users: []
            //       },
            //       created() {
            //         const user = this.users.find((user) => user.id === socketId);
            //         if (user) user.online = false;
            //       }
            //     }).$mount().$appendTo('#app');
            //   })
              
        },

        catchTextFocus() {
            // emit a custom typing event and broadcast it to the server
            socket.emit('user_typing', {
                name: this.nickname || 'anonymous'
            })
        },

        handleFocus() {
            socket.on('user connected', (userId) => {
                const userElem = document.createElement('li');
                userElem.setAttribute('id', userId);
                userElem.innerText = `User ${userId} is online`;
                document.getElementById('user-list').appendChild(userElem);
              })
        },

        handleBlur() {
            socket.on('user disconnected', (userId) => {
                const userElem = document.getElementById(userId);
                if (userElem) {
                    userElem.innerText = `User ${userId} is offline`;
                }
            }) 

            window.addEventListener('beforeunload', () => {
                socket.emit('disconnect');
            })
        },


    
     },

    components: {
        newmsg: ChatMsg,
        newstat: ChatStat
    }
  }).mount('#app')

  socket.addEventListener('connected', setUserID);
  socket.addEventListener('new_message', showNewMessage);
  socket.addEventListener('typing', handleUserTyping);
  socket.addEventListener('focus', handleFocus);
  socket.addEventListener('blur', handleBlur);



