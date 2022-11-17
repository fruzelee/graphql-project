const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
} = graphql;

//Scalar Type
/*
    String = GraphQLString
    int 
    Float
    Boolean
    ID
*/

const Person = new GraphQLObjectType({
  name: "Person",
  description: "Represents a Person Type",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    isMarried: { type: GraphQLBoolean },
    gpa: {type: graphql.GraphQLFloat}
  }),
});

//RootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Description",
  fields: {},
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
