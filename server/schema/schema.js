const graphql = require("graphql");
var _ = require("lodash");

//dummy data

var usersData = [
  { id: "1", name: "Fazle", age: 30 },
  { id: "13", name: "Rabbi", age: 30 },
  { id: "211", name: "Antu", age: 30 },
  { id: "234", name: "Tamim", age: 30 },
  { id: "2323", name: "Mishu", age: 30 },
];

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
} = graphql;

//Create types
const UserType = new GraphQLObjectType({
  name: "User",
  description: "Documentation for user...",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

//RootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Description",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },

      resolve(parent, args) {
        return _.find(usersData, { id: args.id });

        //we resolve with data
        //get and return data from a datasource
      },
    },
  },
});

/*
    {
        user(id: "1") }
            name
    }
*/

module.exports = new GraphQLSchema({
  query: RootQuery,
});
