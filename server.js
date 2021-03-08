//
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
//socket
io.on('connection', (socket) => {
    console.log('a user connected');
    // utilisateur qui envoie message
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });
    // utilisateur qui se déconnecte
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});
