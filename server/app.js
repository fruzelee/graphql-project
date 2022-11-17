const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;

/*
mongodb+srv://fr:<password>@cluster0.qfcnchr.mongodb.net/test
*/

const schema = require('./schema/schema')
const testSchema = require('./schema/types_schema')

const app = express();

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: testSchema
}));


app.listen(4000, () =>{ //localhost:4000
    console.log('Listening for requests on my awesomne port 4000');
})