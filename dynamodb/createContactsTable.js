const aws = require('aws-sdk');
const CONSTANTS = require('./constants').CONSTANTS;

aws.config.update({
    region: CONSTANTS.REGION,
    accessKeyId: CONSTANTS.ACCESSKEYID,
    secretAccessKey: CONSTANTS.SECRETACCESSKEY,
    endpoint: CONSTANTS.ENDPOINT
});

const dynamodb = new aws.DynamoDB();

dynamodb.deleteTable({TableName: CONSTANTS.TABLENAME}, (err, data) => {
    if (err) console.error(err, err.stack); // an error occurred
    else console.log(data); // successful response
})

const params = {
    AttributeDefinitions: [
        {
            AttributeName: "id", 
            AttributeType: "S"
        }
    ], 
    KeySchema: [
        {
            AttributeName: "id", 
            KeyType: "HASH"
        }
    ], 
    // LocalSecondaryIndexes: [
    //     {
    //         IndexName: "idx_name_phoneNumber",
    //         KeySchema: [
    //             {
    //                 AttributeName: "name",
    //                 KeyType: "RANGE"
    //             },
    //             {
    //                 AttributeName: "phoneNumber",
    //                 KeyType: "RANGE"
    //             }
    //         ],
    //         Projection: {
    //             ProjectionType: "ALL"
    //         }
    //     }
    // ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5, 
        WriteCapacityUnits: 5
    }, 
    TableName: CONSTANTS.TABLENAME
   };

 dynamodb.createTable(params, (err, data) => {
    if (err) console.error(err, err.stack); // an error occurred
    //else     console.log(JSON.stringify(data, null, 2));           // successful response 
 });