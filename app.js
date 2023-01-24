const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

// if port does not exist, it will default to host 3000
const port = process.env.PORT || 3000;

// app.get is a route handler
// reference in socket.io, get started serving html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

// an example of a route eg localhost:3000/contact , localhost:3000/brodie
app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/contact.html');
});



server.listen(port, () => {
  console.log(`listening on ${port}`);
});