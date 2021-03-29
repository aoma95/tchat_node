const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'tchat';
let db
let user;

MongoClient.connect(url, function(err, client) {
    console.log("Connected successfully to server");
    db = client.db(dbName);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// utilisateur qui se connecte
io.on('connection', (socket) => {
    console.log('a user connected');
    db.collection("Message").find().toArray(function(err, result) {
        if (err) throw err;
        //for (let valeur of result) {
        //    io.emit('chat stockage', valeur)
        //}
        io.emit('chat stockage', result)

    });
    db.collection("User").find().count().then((resp) => {
        user = resp;
        db.collection("User").save({ "_id" : user+1});
        });

    io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });
    io.on('connection', (socket) => {
        socket.broadcast.emit('hi');
    });
    // utilisateur qui envoie message
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg)
        db.collection("Message").save({ "author" : user+1, "message" : msg});
    });
    // utilisateur qui se déconnecte
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});
