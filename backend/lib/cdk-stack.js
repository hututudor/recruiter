const cdk = require('@aws-cdk/core');
const lambda = require('@aws-cdk/aws-lambda');
const apigw = require('@aws-cdk/aws-apigateway');
const dynamodb = require('@aws-cdk/aws-dynamodb');

class CdkStack extends cdk.Stack {
  // @ts-ignore
  constructor(scope, id, props) {
    super(scope, id, props);

    const daysTable = new dynamodb.Table(this, 'days', {
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING
      }
    });

    const func = new lambda.Function(this, 'create', {
      runtime: lambda.Runtime.NODEJS_8_10,
      code: lambda.Code.asset('lambda'),
      handler: 'index.handler',
      environment: {
        DAYS_TABLE_NAME: daysTable.tableName
      }
    });

    daysTable.grantReadWriteData(func);

    new apigw.LambdaRestApi(this, 'apigw', {
      handler: func,
    });
  }
}

module.exports = { CdkStack };
