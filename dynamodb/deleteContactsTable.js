const aws = require('aws-sdk');
const tableName = require('./constants').CONSTANTS.TABLENAME;

aws.config.update({
    region: "us-west-1",
    accessKeyId: 'xxxx',
    secretAccessKey: 'xxxx',
    endpoint: "http://localhost:8000"
});

const dynamodb = new aws.DynamoDB();

dynamodb.deleteTable({TableName: tableName}, (err, data) => {
    if (err) console.error(err, err.stack); // an error occurred
    else console.log(data); // successful response
})