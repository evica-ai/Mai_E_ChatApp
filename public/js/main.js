//import will always go at the top 
import ChatMsg from './components/ChatMessage.js';

const socket = io();

// utility functions for socket
function setUserID ({sID}) {
    // debugger;
    // save our unique ID generaed by Socket on the server side - this is how we track individual connects to the chat service
    console.log(sID);
    vm.socketID= sID;
}


function showDisconnectMessage() {
    console.log('a user disconnected');
}

function showConnectMessage() {
    console.log('a user connected');
}

function showNewMessage({message}) {
    vm.messages.push(message);
}

function handleUserTyping(user) {
    console.log('somebody is typing something');
}

const {createApp} = Vue

const vm = createApp({
    data() {
        return {
          socketID: '',
          message: '',
          messages: [],
          nickname: ''
        }
    },

    methods: {
        dispatchMessage() {
            socket.emit('chat_message', {
                content: this.message,
                name: this.nickname || 'anonymous',
                is: this.socketID
            })

            this.message = "";
        },

        catchTextFocus(){
            // emit a typing event and broadcast to the server
            socket.emit('user_typing', {
                name: this.nickname || 'anonymous'
            })
        }

    },

    components: {
        newmsg: ChatMsg
    }

}).mount('#app')

socket.addEventListener('connected', setUserID);
socket.addEventListener('new_message', showNewMessage);
socket.addEventListener('typing', handleUserTyping);
socket.addEventListener('new_message', showDisconnectMessage);
socket.addEventListener('new_message', showConnectMessage);