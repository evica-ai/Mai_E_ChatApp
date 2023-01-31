const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);


const port = process.env.PORT || 3000;

//tell express where to find static web files
app.use(express.static('public'));

//app.get is a route handler the / is the route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

server.listen(port, () => {
  console.log(`listening on ${port}`);
});

// spcket.io stuff 
// whenever smeone connects, goes to socket
io.on('connection', (socket) => {
  console.log('a user connected', socket);
  socket.emit('connected', {sID: socket.id, message: 'new connection'});


  // liste for incimng message from anyone connected to the chat service and then see what the message is
  socket.on('chat_message', function(msg) {
    console.log(msg);

    // step 2 - show everype what was sent though (send the message to everyone connected to the service)
   io.emit('new_message', {message: msg})
  })
});