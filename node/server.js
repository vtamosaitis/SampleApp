const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');

const { schema } = require('./schema');
const { mockdb, Contact } = require('./resolvers');

const app = express();
const port = 3000;

app.use(cors());

// remove for testing later
app.use(bodyParser.json());

app.use('/graphql', graphqlHTTP ({
    schema: schema,
    graphiql: true
}));

app.get('/hello', (req, res) => {
    res.send("helloworld");
});

app.get('/contacts', (req, res) => {
    res.json(mockdb);
});

app.post('/contacts', (req, res) => {
    let input = req.body;
    let id = require('crypto').randomBytes(10).toString('hex');
    mockdb[id] = input;
    res.json(new Contact(id, input));
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});