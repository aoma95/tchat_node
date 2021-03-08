//
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
// utilisateur qui se connecte
io.on('connection', (socket) => {
    console.log('a user connected');
    io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });
    io.on('connection', (socket) => {
        socket.broadcast.emit('hi');
    });
    // utilisateur qui envoie message
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg)
    });
    // utilisateur qui se déconnecte
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});
