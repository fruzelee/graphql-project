const graphql = require("graphql");
var _ = require("lodash");

//dummy data

var usersData = [
  { id: "1", name: "Fazle", age: 30, profession: "Android Engineer" },
  { id: "2", name: "Rabbi", age: 31, profession: "Android Developer" },
  { id: "3", name: "Antu", age: 32, profession: "Python Developer" },
  { id: "4", name: "Tamim", age: 33, profession: "React Developer" },
  { id: "5", name: "Mishu", age: 34, profession: "Magento Developer" },
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
    profession: { type: GraphQLString },
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
