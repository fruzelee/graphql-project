const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;

const app = express();

app.use('/graphql', graphqlHTTP({
    graphiql: true
}));


app.listen(4000, () =>{ //localhost:4000
    console.log('Listening for requests on my awesomne port 4000');
})