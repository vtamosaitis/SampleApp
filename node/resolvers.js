const ddbService = require('../dynamodb/dynamodb.service');

class Contact {
    constructor(id, {name, phoneNumber}) {
        this.id = id;
        this.name = name;
        this.phoneNumber = phoneNumber;
    }
}

const resolvers = {
    Query: {
        hello: () => "hello from graphql",
        getContact: (_, {id}) => {
            const key = 
            {
                "id": id
            };
            return ddbService.getFromContacts(key);
        },
        getContacts: () => {
            return ddbService.getFromContacts();
        }
    },
    Mutation: {
        createContact: (_, {input}) => {
            let id = require('crypto').randomBytes(10).toString('hex');
            const contact = new Contact(id, input);
            return ddbService.createToContacts(contact);
        },
        updateContact: (_, {id, input}) => {
            const contact = new Contact(id, input);
            return ddbService.updateToContacts(contact);
        },
        deleteContact: (_, {id}) => {
            return ddbService.deleteFromContacts(id);
        }
    }
};

module.exports = { resolvers, Contact }