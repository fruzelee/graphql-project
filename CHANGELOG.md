# CHANGELOG

All notable changes to this project will be documented in this file.

# v1.0

- feat: add initial setup
- refactor: refactor the initial setup
- feat: install express
- feat: install NodeJS and Express
- feat: install GraphQL and Express
- feat: create schemas
- feat: add first GraphQL query and RootQueries
- refactor: update the resolve method to return data
- feat: add lodash dependency and update resolve method
- feat: add *profession* field to user type
- feat: add Hobby Type and update RootQuery
- feat: add Post Type and relationship with User Type
- feat: add relationship between User Type and Hobby Type
- feat: add Posts Query
- feat: add Hobbies Query
- feat!: BREAKING CHANGE: GraphQL basic boilerplate, server-side, and development environment setup done
- feat: add create user mutation
- feat: add create post mutation
- feat: add create hobby mutation
- feat: add root query to get all user data
- feat: add posts and hobbies queries
- feat!: BREAKING CHANGE: cover mutations
- feat: add types_schema
- feat: add Person Type with different GraphQL scalar types
- feat: add non-nullable types
- feat!: BREAKING CHANGE: cover GraphQL types
- feat: cover scalar types and object types
- feat: install Mongoose
  command: npm install mongoose --save
- feat: add .gitignore
- docs: create README.md
- docs: add CHANGELOG.md
- chore: update changelog with existing commits
- chore: exclude local.js file in .gitignore
- feat: add password security for MongoDB URL in app.js using local.js file
- docs: add instructions on how to run the server in README.md
- fix: resolve MongoDB Atlas connection error caused by un-whitelisted IP
- feat: Add useNewUrlParser option to resolve deprecation warning while connecting to Mongoose

This commit adds the useNewUrlParser option to the Mongoose connection code to resolve a deprecation warning that occurs
when connecting to the MongoDB database. The useNewUrlParser option is set to true to ensure that Mongoose uses the new
URL parser instead of the legacy parser, which is now deprecated.

The addition of this option improves the stability and reliability of the application, ensuring that it can continue to
connect to the database without encountering any issues related to the deprecated parser.

- feat: add User Model for MongoDB using Mongoose

This commit adds a new Mongoose User Model to the application, which provides a structured representation of the user
data in the database. The User Model is defined using the Mongoose Schema class and includes fields for the user's name,
age, profession, and any additional data required by the application.

The creation of this User Model is a significant enhancement to the application, as it provides a consistent and
reliable way to access and manipulate user data. By defining the User Model using Mongoose, we can take advantage of its
built-in validation and query capabilities, making it easier to maintain and update the application over time.

- feat: Add Hobby Model for MongoDB using Mongoose

This commit introduces a new Hobby Model for MongoDB, created using Mongoose. The Hobby Model is defined using the
Mongoose Schema class and includes fields for the hobby name, description, and any additional data required by the
application.

The addition of this Hobby Model is a significant enhancement to the application's data architecture, providing a
structured and organized way to store and retrieve hobby data. By defining the Hobby Model using Mongoose, we can take
advantage of its built-in validation and query capabilities, ensuring data consistency and reliability throughout the
application. This will also make it easier to maintain and update the application over time.

- feat: add Post Model for MongoDB using Mongoose

This commit adds a new Post Model for MongoDB, created using Mongoose. The Post Model is defined using the Mongoose
Schema class and includes fields for the post's comment, and any additional data required by the
application.

The addition of this Post Model is a significant improvement to the application's data architecture, providing a
structured and organized way to store and retrieve post data. By defining the Post Model using Mongoose, we can take
advantage of its built-in validation and query capabilities, ensuring data consistency and reliability throughout the
application. This will also make it easier to maintain and update the application over time.

- chore: Use graphql schema instead of test_schema in app.js

This commit updates the app.js file to use the graphql schema instead of the test_schema.

- feat(user): add mutation in graphql to update user type

This commit adds a new feature to the user module in GraphQL. Specifically, it adds a mutation and updates the user
type.

- feat(post): add mutation in graphql to update post type

This commit adds a new feature to the post module in GraphQL. Specifically, it adds a mutation and updates the post
type.

- feat(hobby): update create hobby mutation

This commit updates an existing feature in the hobby module. Specifically, it updates create hobby mutation.

- feat(hobby): add mutation to update hobby type

This commit adds a new feature to the hobby module in GraphQL. Specifically, it adds a mutation to update the hobby
type.

- refactor: rename mutation names

This commit refactors the codebase by renaming mutation names.

- feat: implement functionality to create and update MongoDB mutation data

- feat(user): add Remove User mutation

This commit adds a new Remove User mutation to the user feature. The mutation allows users to be removed from the
system.

- feat(post): add Remove Post mutation

This commit adds a new Remove Post mutation to the post feature. The mutation allows posts to be removed from the
system.

- feat(hobby): add Remove Hobby mutation

This commit adds a new Remove Hobby mutation to the hobby feature. The mutation allows hobbies to be removed from the
system.
