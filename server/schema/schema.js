const graphql = require("graphql");
var _ = require("lodash");
const {GraphQLNonNull, execute} = require("graphql");

const User = require('../model/User')
const Hobby = require('../model/Hobby')
const Post = require('../model/Post')

//dummy data while we don't set up a database

var usersData = [
    {id: "1", name: "Fazle", age: 30, profession: "Android Engineer"},
    {id: "2", name: "Rabbi", age: 31, profession: "Android Developer"},
    {id: "3", name: "Antu", age: 32, profession: "Python Developer"},
    {id: "4", name: "Tamim", age: 33, profession: "React Developer"},
    {id: "5", name: "Mishu", age: 34, profession: "Magento Developer"},
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
    {id: "1", comment: "Building a Mind", userId: "1"},
    {id: "2", comment: "GraphQL is Amazing", userId: "1"},
    {id: "3", comment: "How to Change the World", userId: "2"},
    {id: "4", comment: "How to Change the World", userId: "3"},
    {id: "5", comment: "How to Change the World", userId: "1"},
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
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        profession: {type: GraphQLString},
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent) {
                // return _.filter(postsData, {userId: parent.id});
                return Post.find({userId: parent.id});
            },
        },

        hobbies: {
            type: new GraphQLList(HobbyType),
            resolve(parent) {
                // return _.filter(hobbiesData, {userId: parent.id});
                return Hobby.find({userId: parent.id});
            },
        },
    }),
});

const HobbyType = new GraphQLObjectType({
    name: "Hobby",
    description: "Hobby description",
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent) {
                return User.findById({id: parent.userId});
            },
        },
    }),
});

const PostType = new GraphQLObjectType({
    name: "Post",
    description: "Post description",
    fields: () => ({
        id: {type: GraphQLID},
        comment: {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args) {
                // return _.find(usersData, {id: parent.userId});
                return User.findById({id: parent.userId});
            },
        },
    }),
});

//RootQuery

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    description: "The RootQuery",
    fields: {
        user: {
            type: UserType,
            args: {id: {type: GraphQLID}},

            resolve(parent, args) {
                // return _.find(usersData, {id: args.id});
                return User.findById({id: args.id});

                //we resolve with data
                //get and return data from a datasource
            },
        },

        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                // return usersData;
                return User.find({});
            },
        },

        hobby: {
            type: HobbyType,
            args: {id: {type: GraphQLID}},

            resolve(parent, args) {
                // return _.find(hobbiesData, {id: args.id});
                return Hobby.findById(args.id)

                //we resolve with data
                //get and return data from a datasource
            },
        },

        hobbies: {
            type: new GraphQLList(HobbyType),
            resolve(parent, args) {
                // return hobbiesData;
                return Hobby.find({})
            },
        },

        post: {
            type: PostType,
            args: {id: {type: GraphQLID}},

            resolve(parent, args) {
                //return data (post data)
                // return _.find(postsData, {id: args.id});
                return Post.findById(args.id)
            },
        },

        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                // return postsData;
                return Post.find({})
            },
        },
    },
});

//Mutations

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        //create user mutation
        CreateUser: {
            type: UserType,
            args: {
                // id: {type: GraphQLID}
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)},
                profession: {type: GraphQLString},
            },

            resolve(parent, args) {
                let user = new User({
                    name: args.name,
                    age: args.age,
                    profession: args.profession,
                });
                //save to our db
                return user.save();
            },
        },

        //Update User
        UpdateUser: {
            type: UserType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)},
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: GraphQLInt},
                profession: {type: GraphQLString},
            },
            resolve(parent, args) {
                let updatedUser = User.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            name: args.name,
                            age: args.age,
                            profession: args.profession
                        }
                    },
                    {new: true} //send back the updated objectType
                );
                return updatedUser;
            }
        },

        //Remove User
        RemoveUser: {
            type: UserType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)}

            },
            resolve(parent, args) {
                let removedUser = User.findByIdAndRemove(
                    args.id
                ).exec();

                if (!removedUser) {
                    throw new Error("Error");
                }

                return removedUser;
            }
        },

        //create post mutation
        CreatePost: {
            type: PostType,
            args: {
                // id: {type: GraphQLID}
                comment: {type: GraphQLString},
                userId: {type: GraphQLID},
            },
            resolve(parent, args) {
                let post = new Post({
                    comment: args.comment,
                    userId: args.userId,
                });
                return post.save();
            },
        },

        //update post
        UpdatePost: {
            type: PostType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)},
                comment: {type: new GraphQLNonNull(GraphQLString)},
                // userId: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args) {
                return updatedPost = Post.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            comment: args.comment,
                        }
                    },
                    {new: true}
                )
            }
        },

        //Remove a Post
        RemovePost: {
            type: PostType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)}
            },

            resolve(parent, args) {

                let removedPost = Post.findByIdAndRemove(
                    args.id
                ).exec();

                if (!removedPost) {
                    throw new Error("Error");
                }

                return removedPost;


            }
        },

        //create hobby mutation
        CreateHobby: {
            type: HobbyType,
            args: {
                // id: {type: GraphQLID}
                title: {type: GraphQLString},
                description: {type: GraphQLString},
                userId: {type: GraphQLID},
            },

            resolve(parent, args) {
                let hobby = new Hobby({
                    title: args.title,
                    description: args.description,
                    userId: args.userId,
                });
                return hobby.save();
            },
        },

        //update hobby
        UpdateHobby: {
            type: HobbyType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)},
                title: {type: GraphQLString},
                description: {type: GraphQLString},
                // userId: {type: GraphQLID},
            },
            resolve(parent, args) {
                return updateHobby = Hobby.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            title: args.title,
                            description: args.description
                        }
                    },
                    {new: true}
                )
            }
        },

        //Remove a Hobby
        RemoveHobby: {
            type: HobbyType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)}
            },

            resolve(parent, args) {

                let removedHobby = Hobby.findByIdAndRemove(
                    args.id
                ).exec();

                if (!removedHobby) {
                    throw new Error("Error");
                }

                return removedHobby;


            }
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
