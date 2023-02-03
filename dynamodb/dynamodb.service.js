const aws = require('aws-sdk');

const CONSTANTS = require('./constants').CONSTANTS;

aws.config.update({
    region: CONSTANTS.REGION,
    accessKeyId: CONSTANTS.ACCESSKEYID,
    secretAccessKey: CONSTANTS.SECRETACCESSKEY,
    endpoint: CONSTANTS.ENDPOINT
});

const dClient = new aws.DynamoDB.DocumentClient();

// Returns all contacts if no args are provided,
// otherwise takes a key as an arg and returns
// the contact that matches the key
function getFromContacts(key=null) {
    if (key) {
        return new Promise((resolve, reject) => {
            const params = {
                TableName: CONSTANTS.TABLENAME,
                Key: key
            }
            dClient.get(params, (err, data) => {
                if (err) reject(err);
                else {
                    console.log(data.Item);
                    resolve(data.Item); 
                }
            })
        });
    }
    return new Promise((resolve, reject) => {
        dClient.scan({TableName: CONSTANTS.TABLENAME}, (err, data) => {
            if (err) reject(err);
            else {
                resolve(data.Items);
            }
        });
    });
}

function createToContacts(contact) {
    if (contact) {
        const params = {
            TableName: CONSTANTS.TABLENAME,
            Item: {
                "id": contact.id,
                "name": contact.name,
                "phoneNumber": contact.phoneNumber
            }
        };
        return new Promise((resolve, reject) => {
            dClient.put(params, (err, data) => {
                if (err) reject(err);
                else {
                    resolve(contact);
                }
            });
        });
    }
}

function updateToContacts(contact) {
    if (contact) {
        const attributeUpdates = {};
        if (contact.name) {
            attributeUpdates.name = {
                Action: 'PUT',
                Value: contact.name
            };
        }
        attributeUpdates.phoneNumber = {
            Action: 'DELETE',
        };
        if (contact.phoneNumber) {
            attributeUpdates.phoneNumber.Action = 'PUT';
            attributeUpdates.phoneNumber.Value = contact.phoneNumber;
        }
        const params = {
            TableName: CONSTANTS.TABLENAME,
            Key: {
                'id': contact.id
            },
            AttributeUpdates: attributeUpdates
        };
        return new Promise((resolve, reject) => {
            dClient.update(params, (err, data) => {
                if (err) reject(err);
                else {
                    resolve(contact);
                }
            });
        });
    }
}

function deleteFromContacts(key) {
    if (key) {    
        const params = {
            TableName: CONSTANTS.TABLENAME,
            Key: {
                id: key
            }
        }
        return new Promise((resolve, reject) => {
            dClient.delete(params, (err, data) => {
                if (err) reject(err);
                else {
                    resolve(data.Item);
                }
            });
        });
    }
}

module.exports = { getFromContacts, createToContacts, updateToContacts,
deleteFromContacts };