const aws = require('aws-sdk');
const CONSTANTS = require('./constants').CONSTANTS;

aws.config.update({
    region: CONSTANTS.REGION,
    accessKeyId: CONSTANTS.ACCESSKEYID,
    secretAccessKey: CONSTANTS.SECRETACCESSKEY,
    endpoint: CONSTANTS.ENDPOINT
});

const dClient = new aws.DynamoDB.DocumentClient();

const params = {
    TableName: CONSTANTS.TABLENAME,
    // Key: {
    //     "id": "cbfdcc1257e3c651027a"
    // }
}

dClient.scan(params, (err, data) => {
    if (err) console.error(err, err.stack); // an error occurred
    else     console.log(JSON.stringify(data, null, 2));           // successful response 
});