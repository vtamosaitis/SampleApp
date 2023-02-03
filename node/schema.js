const { makeExecutableSchema } = require('graphql-tools');
const { resolvers } = require('./resolvers');

const typeDefs = `
    type Contact {
        id: ID
        name: String!
        phoneNumber: String
    }

    type Query {
        hello: String
        getContact(id: ID): Contact
        getContacts: [Contact!]
    }

    input ContactInput {
        id: ID
        name: String!
        phoneNumber: String
    }

    type Mutation {
        createContact(input: ContactInput): Contact
        updateContact(id: ID, input: ContactInput): Contact
        deleteContact(id: ID): Contact
    }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = { schema };