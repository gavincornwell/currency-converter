'use strict';

const app = require('../../get-currencies.js');
const chai = require('chai');
const expect = chai.expect;
let context;

describe('Get currencies tests', function () {
    it('verifies retrieving rates', async () => {
        const result = await app.retrieveRates("GBP", "EUR,USD")

        expect(result).to.be.an('object');
        
        expect(result.base).to.be.an('string');
        expect(result.base).to.be.equal("GBP");

        expect(result.rates).to.be.an('object');
        expect(result.rates).to.have.property("EUR");
        expect(result.rates).to.have.property("USD");
    });

    it('verifies generating response body', async () => {
        
        let ratesResult = {
            "base": "GBP",
            "rates": {
              "EUR": 2,
              "USD": 1.16
            },
            "date": "2020-03-19"
        };
        
        const result = app.generateResultBody(ratesResult, 10);

        expect(result).to.be.an('object');
        
        expect(result.from).to.be.an('object');
        expect(result.from.currency).to.be.equal("GBP");
        expect(result.from.amount).to.be.equal(10);
        
        expect(result.to).to.be.an("array");
        expect(result.to.length).to.eql(2);
        expect(result.to[0]).to.have.property("currency");
        expect(result.to[0]).to.have.property("rate");
        expect(result.to[0]).to.have.property("amount");
    });
});
