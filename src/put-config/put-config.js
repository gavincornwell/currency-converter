"use strict"

const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = process.env.TABLE_NAME;

/**
 * Handles the PUT /config API
 */
exports.handler = async (event, context) => {
    let response;
    
    try {
        console.debug("Received event", event);

        // retrieve the from and to data from the body
        var config = this.processBody(event.body);

        // if from is missing return a 400 response
        if (!config.from) {
            return this.generateResponse(400, "from property is invalid or missing");
        }

        // if from is missing return a 400 response
        if (!config.to) {
            return this.generateResponse(400, "to property is invalid or missing");
        }

        // update the config
        await this.updateConfig(config.from, config.to);

        // return the response
        return this.generateResponse(200, "Updated successfully");
    } catch (err) {
        console.error(err);

        // return a 500 error response
        return this.generateResponse(500, err.message);
    }
};

/**
 * Process the provided body and return valid configuration
 */
exports.processBody = (bodyString) => {
    
    let result = {};

    if (bodyString && bodyString != "") {
        try {
            let body = JSON.parse(bodyString);

            if (body.from && typeof body.from == "string") {
                result.from = body.from;
            }

            if (body.to && typeof body.to == "string") {
                // remove any spaces
                const regex = /\s/gi;
                result.to = body.to.replace(regex, "");
            }

        } catch (err) {
            console.error(err);
        }
    }

    return result;
}

exports.generateResponse = (statusCode, message) => {
    return {
        statusCode: statusCode,
        body: JSON.stringify({
            message: message
        }),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "PUT,OPTIONS"
        }
    };
}

/**
 * Updates the configuration in DynamoDB
 */
exports.updateConfig = async (from, to) => {

    // NOTE: in a real app the userId would be determined during login
    let userId = "0d5367b6-6a1c-11ea-bc55-0242ac130003";

    // lookup config in database
    var params = {
        TableName : TABLE_NAME,
        Item: {
          userId: userId,
          from: from,
          to: to
        }
    };
    
    console.debug("Calling put with params: " + JSON.stringify(params, null, 2));
    let response = await documentClient.put(params).promise();
    console.debug("put response: " + JSON.stringify(response, null, 2));
}