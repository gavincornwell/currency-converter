# Currency Converter

This repository contains a Serverless app to convert currencies.

## Prerequisites

* An AWS account
* [Install AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
* [Install SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
* [Install Node](https://nodejs.org/en/download/)

## Install Dependencies

Setup dependencies for the get currencies API by executing the following commands:

```bash
cd src/get-currencies
npm install
cd ..
```

Setup dependencies for the update config API by executing the following commands:

```bash
cd src/put-config
npm install
cd ..
```

Setup dependencies for the front end app by executing the following commands:

```bash
cd app
npm install
cd ..
```

## Deploy API

To deploy the back-end API execute the following commands:

```bash
sam build
sam deploy --guided
```

NOTE: If you want to deploy again just use `sam deploy`.

## Setup Configuration

Once the CloudFormation template has been deployed go to the [console](https://console.aws.amazon.com/cloudformation/home) and copy the value of `ApiUrl` output as shown in the screenshot below:

![api-url-output](/images/api-url-output.png)

Alternatively execute the following command to get the API URL, replacing `<stack-name>` with the name of the stack you provided during the `sam deploy` step.

```bash
aws cloudformation describe-stacks --stack-name <stack-name> --query 'Stacks[0].Outputs[?OutputKey==`ApiUrl`].OutputValue' --output text
```

Use curl to add the required configuration to the database by executing the following command, replacing `<api-url>` with the URL retrieved in the previous step.

```bash
curl --request PUT '<api-url>/config' --data-raw '{"from": "GBP","to": "EUR,USD"}'
```

Alternatively import `postman-collection.json` into Postman, setup an `apiUrl` [environment variable](https://learning.postman.com/docs/postman/variables-and-environments/variables/) and execute the "Update Config" request.

Edit `app/src/service/ApiService.js` and replace `<api-url>` with the URL retrieved in the previous step.

## Launch UI

To launch the front-end app execute the following commands:

```bash
cd app
npm start
```

If everything has worked correctly your browser should launch and show something similar to the screenshot below:

![app](/images/app.png)

## Running Unit Tests

Mocha is used for unit testing, to install execute `npm install -g mocha`.

To run the unit tests for the get currencies API execute the following commands:

```bash
cd src/get-currencies
npm run test
cd ..
```

To run the unit tests for the update config API execute the following commands:

```bash
cd src/put-config
npm run test
cd ..
```

## Running Integration Tests

Newman is used for integration testing, to install execute `npm install -g newman`.

To run the integration tests run the following command, replacing `<api-url>` with the URL retrieved previously.

```bash
newman run postman-collection.json --global-var apiUrl=<api-url>
```

## Cleanup

To delete the deployment run the following command, replacing `<stack-name>` with the name of the stack you provided during the `sam deploy` step.

```bash
aws cloudformation delete-stack --stack-name <stack-name>
```
