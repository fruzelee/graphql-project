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

var hobbiesData = [
  {
    id: "1",
    title: "Android Engineer",
    description: "Using computers to make the workd a better place",
  },
  {
    id: "2",
    title: "Android Developer",
    description: "Sweat and feel better before eating donouts",
  },
  {
    id: "3",
    title: "Python Developer",
    description: "Get in the water and learn to become the water",
  },
  {
    id: "4",
    title: "React Developer",
    description: "A hobby for fency people",
  },
  {
    id: "5",
    title: "Magento Developer",
    description: "Wear hiking boots and explore the world",
  },
];

var postsData = [
  { id: "1", comment: "Building a Mind" },
  { id: "2", comment: "GraphQL is Amazing" },
  { id: "3", comment: "How to Change the World" },
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
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    profession: { type: GraphQLString },
  }),
});

const HobbyType = new GraphQLObjectType({
  name: "Hobby",
  description: "Hobby description",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
  }),
});

const PostType = new GraphQLObjectType({
  name: "Post",
  description: "Post description",
  fields: () => ({
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
  }),
});

//RootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Description",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },

      resolve(parent, args) {
        return _.find(usersData, { id: args.id });

        //we resolve with data
        //get and return data from a datasource
      },
    },

    hobby: {
      type: HobbyType,
      args: { id: { type: GraphQLID } },

      resolve(parent, args) {
        return _.find(hobbiesData, { id: args.id });

        //we resolve with data
        //get and return data from a datasource
      },
    },

    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },

      resolve(parent, args) {
        //return data (post data)
        return _.find(postsData, { id: args.id });
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
