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
    userId: "1",
  },
  {
    id: "2",
    title: "Android Developer",
    description: "Sweat and feel better before eating donouts",
    userId: "1",
  },
  {
    id: "3",
    title: "Python Developer",
    description: "Get in the water and learn to become the water",
    userId: "2",
  },
  {
    id: "4",
    title: "React Developer",
    description: "A hobby for fency people",
    userId: "3",
  },
  {
    id: "5",
    title: "Magento Developer",
    description: "Wear hiking boots and explore the world",
    userId: "1",
  },
];

var postsData = [
  { id: "1", comment: "Building a Mind", userId: "1" },
  { id: "2", comment: "GraphQL is Amazing", userId: "1" },
  { id: "3", comment: "How to Change the World", userId: "2" },
  { id: "4", comment: "How to Change the World", userId: "3" },
  { id: "5", comment: "How to Change the World", userId: "1" },
];

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
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

    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return _.filter(postsData, { userId: parent.id });
      },
    },

    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve(parent, args) {
        return _.filter(hobbiesData, { userId: parent.id });
      },
    },
  }),
});

const HobbyType = new GraphQLObjectType({
  name: "Hobby",
  description: "Hobby description",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return _.find(usersData, { id: parent.userId });
      },
    },
  }),
});

const PostType = new GraphQLObjectType({
  name: "Post",
  description: "Post description",
  fields: () => ({
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return _.find(usersData, { id: parent.userId });
      },
    },
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

    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return usersData;
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

    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve(parent, args) {
        return hobbiesData;
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

    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return postsData;
      },
    },
  },
});

//Mutations

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    //create user mutation
    createUser: {
      type: UserType,
      args: {
        // id: {type: GraphQLID}
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        profession: { type: GraphQLString },
      },

      resolve(parent, args) {
        let user = {
          name: args.name,
          age: args.age,
          profession: args.profession,
        };
        return user;
      },
    },

    //create post mutatoin
    createPost: {
      type: PostType,
      args: {
        // id: {type: GraphQLID}
        comment: { type: GraphQLString },
        userId: { type: GraphQLID },
      },

      resolve(parent, args) {
        let post = {
          comment: args.comment,
          userId: args.userId,
        };
        return post;
      },
    },

    //crate hobby mutation
    createHobby: {
      type: HobbyType,
      args: {
        // id: {type: GraphQLID}
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        userId: { type: GraphQLID },
      },

      resolve(parent, args) {
        let hobby = {
          title: args.title,
          description: args.description,
          userId: args.userId,
        };
        return hobby;
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
  mutation: Mutation,
});
