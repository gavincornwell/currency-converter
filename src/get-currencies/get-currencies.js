const axios = require('axios');

/**
 * Handles the GET /currencies API
 */
exports.handler = async (event, context) => {
    let response;
    
    try {
        //console.debug("Received event", event);

        // retrieve the amount to convert from the queryStringParameters
        let amount = event.queryStringParameters.amount;
        console.log(`Received amount: ${amount}`);

        // if amount is not valid return a 404 response
        if (!amount || isNaN(amount)) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: "Invalid or missing amount"
                })
            };
        }

        // retrieve configuration from the DB
        // NOTE: in a real app the userId would be determined during login
        let userId = "0d5367b6-6a1c-11ea-bc55-0242ac130003";
        
        let base = "GBP";
        let symbols = "EUR,USD";

        // get the current rates
        let ratesResult = await this.retrieveRates(base, symbols);

        // generate the result body
        let body = this.generateResultBody(ratesResult, amount);

        // return the response
        return {
            statusCode: 200,
            body: JSON.stringify(body)
        };
    } catch (err) {
        console.error(err);

        // return a 500 error response
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: err.message
            })
        };
    }
};

/**
 * Retrieves the currency rates
 */
exports.retrieveRates = async (from, to) => {
    
    // use the Rates API (https://ratesapi.io/documentation/) to retrieve symbols
    let url = `https://api.ratesapi.io/api/latest?base=${from}&symbols=${to}`;
    
    console.log("Calling url: " + url);
    const response = await axios(url);
    console.log("Response status: " + response.status);
    console.log("Response data: " + JSON.stringify(response.data, null, 2));

    return response.data;
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