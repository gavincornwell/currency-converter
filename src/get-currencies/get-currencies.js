const axios = require('axios');

/**
 * Handles the GET /currencies API
 */
exports.handler = async (event, context) => {
    let response;
    
    try {
        console.debug("Received event", event);

        // retrieve the amount to convert from the path parameters
        
        // logger.info(`Trial '${trialId}' created for leadId '${leadId}' at '${now}'`);

        // retrieve configuration from the DB
        // NOTE: in a real app the userId would be determined during login

        // call the Rates API (https://ratesapi.io/documentation/) to retrieve symbols
        let url = "https://api.ratesapi.io/api/latest?base=USD&symbols=GBP";
        // const ret = await axios(url);

        // do the conversions

        // return the response
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'hello world',
                // location: ret.data.trim()
            })
        }
    } catch (err) {
        console.error(err);

        // return a 500 error response

        return err;
    }

    return response
};
