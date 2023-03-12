const pwd = require("./local");
const express = require("express");
const graphqlHTTP = require("express-graphql").graphqlHTTP;
const mongoose = require("mongoose");

const schema = require("./schema/schema");
const testSchema = require("./schema/types_schema");
const url = require("url");

const port = process.env.PORT || 4000;

const index = express();

mongoose.connect(
    pwd.DB_URL,
    {useNewUrlParser: true}
);
mongoose.connection.once("open", () => {
    console.log("Yes! We are connected!");
});

index.use("/graphql", graphqlHTTP({
        graphiql: true,
        schema: schema,
    })
);

index.listen(port, () => { //localhost:4000
    //localhost:4000
    console.log("Listening for requests on my awesome port 4000");
});
