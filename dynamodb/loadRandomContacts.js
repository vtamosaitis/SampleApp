const casual = require('casual');
const aws = require('aws-sdk');
const CONSTANTS = require('./constants').CONSTANTS;

aws.config.update({
    region: CONSTANTS.REGION,
    accessKeyId: CONSTANTS.ACCESSKEYID,
    secretAccessKey: CONSTANTS.SECRETACCESSKEY,
    endpoint: CONSTANTS.ENDPOINT
});

const dClient = new aws.DynamoDB.DocumentClient();

const mockdb = new Map();

// initialize db with random data
for(let x=10; x--;) {
    let id = require('crypto').randomBytes(10).toString('hex');
    mockdb.set(id, {name: casual.full_name, phoneNumber: casual.phone});
}

mockdb.forEach((contact, id)=> {
    let params = {
        TableName: CONSTANTS.TABLENAME,
        Item: {
            "id": id,
            "name": contact.name,
            "phoneNumber": contact.phoneNumber
        }
    };

    dClient.put(params, (err, data) => {
        if (err) console.error(err, err.stack); // an error occurred
        else     console.log(`Item Added : ${id} : ${contact.name}`);           // successful response 
    });
});