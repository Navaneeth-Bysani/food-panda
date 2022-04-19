const app = require('./app.js');
const connection = require('./db/connection');

app.listen(4000, async () => {
    console.log('Running on port 4000');
})