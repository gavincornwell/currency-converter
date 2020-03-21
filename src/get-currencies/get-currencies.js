"use strict"

const axios = require("axios");
const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = process.env.TABLE_NAME;

/**
 * Handles the GET /currencies API
 */
exports.handler = async (event, context) => {
    let response;
    
    try {
        console.debug("Received event", event);

        // retrieve the amount to convert from the queryStringParameters
        let amount = null;
        if (event.queryStringParameters) {
            amount = event.queryStringParameters.amount;
            console.log(`Received amount: ${amount}`);
        }

        // if amount is not valid return a 400 response
        if (amount === null || isNaN(amount)) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: "Invalid or missing amount"
                })
            };
        }

        // retrieve configuration from the DB
        let config = await this.retrieveConfig();
        let from = config.from;
        let to = config.to;

        // get the current rates
        let ratesResult = await this.retrieveRates(from, to);

        // generate the result body
        let body = this.generateResultBody(ratesResult, amount);

        // return the response
        return {
            statusCode: 200,
            body: JSON.stringify(body),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,OPTIONS"
            }
        };
    } catch (err) {
        console.error(err);

        // return a 500 error response
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: err.message
            }),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,OPTIONS"
            }
        };
    }
};

/**
 * Retrieve the configuration from DynamoDB
 */
exports.retrieveConfig = async () => {

    // NOTE: in a real app the userId would be determined during login
    let userId = "0d5367b6-6a1c-11ea-bc55-0242ac130003";

    // set defaults
    let from = "GBP";
    let to = "EUR,USD";

    // lookup config in database
    var params = {
        TableName : TABLE_NAME,
        Key: {
          userId: userId
        }
    };
    try {
        console.debug("Calling get with params: " + JSON.stringify(params, null, 2));
        let response = await documentClient.get(params).promise();
        console.debug("get response: " + JSON.stringify(response, null, 2));

        // extract config values from response
        from = response.Item.from;
        to = response.Item.to;
    } catch (err) {
        console.error(err);
        console.warn(`An error occurred retrieving configuration for user ${userId} therefore returning defaults`);
    }

    return {
        from: from,
        to: to
    };
}

/**
 * Retrieves the currency rates
 */
exports.retrieveRates = async (from, to) => {
    
    // use the Rates API (https://ratesapi.io/documentation/) to retrieve symbols
    let url = `https://api.ratesapi.io/api/latest?base=${from}&symbols=${to}`;
    
    try {
        console.log("Calling url: " + url);
        const response = await axios(url);
        console.log("Response status: " + response.status);
        console.log("Response data: " + JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (err) {
        console.error(err);
        throw new Error("Failed to retrieve currency rates");
    }
}

exports.generateResultBody = (ratesResult, amount) => {
    
    var body = {
        from: {
            currency: ratesResult.base,
            amount: amount
        },
        to: []
    };

    // do the conversions
    for (const symbol in ratesResult.rates) {
        let to = {
            currency: symbol,
            rate: ratesResult.rates[symbol],
            amount: ratesResult.rates[symbol] * amount
        }
        body.to.push(to);
    }

    return body;
};