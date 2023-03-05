const pwd = require("./local");
const express = require("express");
const graphqlHTTP = require("express-graphql").graphqlHTTP;
const mongoose = require("mongoose");

const schema = require("./schema/schema");
const testSchema = require("./schema/types_schema");

const app = express();

/*
mongodb+srv://fr:<password>@cluster0.qfcnchr.mongodb.net/test
*/

mongoose.connect(
  "mongodb://fr:" + pwd.pwd + ">@cluster0.qfcnchr.mongodb.net/test"
);
mongoose.connection.once("open", () => {
  console.log("Yes! We are connected!");
});

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema: testSchema,
  })
);

app.listen(4000, () => {
  //localhost:4000
  console.log("Listening for requests on my awesomne port 4000");
});
