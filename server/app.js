const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;

const schema = require('./schema/schema')

const app = express();

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema
}));


app.listen(4000, () =>{ //localhost:4000
    console.log('Listening for requests on my awesomne port 4000');
})