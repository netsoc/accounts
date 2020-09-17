const app = require('express')();
const portNum = 80;

//TODO read token from file + watch

app.get('/', (req, res) => {
    res.sendFile('page.html', {root: __dirname + '/../client/'});
});

app.listen(portNum, () => {
    console.log(`Server running on port ${portNum}...`);
});
