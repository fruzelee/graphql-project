const graphql = require("graphql");

const {
  GraphQLObjectType,
} = graphql;

//RootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Description",
  fields: {

  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
