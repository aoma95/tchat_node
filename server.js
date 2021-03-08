const express = require('express');
const app = express();


app.set('views', __dirname + '/src/pages');
app.use(express.static(__dirname + '/src'));
app.use(express.static(__dirname + '/src'));

require('./router.js')(app);

app.listen(8080, () => {
    console.log('Example app listening on port 8080! Go to https://localhost:8080/')
});
