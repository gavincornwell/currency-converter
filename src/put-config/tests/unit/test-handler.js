'use strict';

const app = require('../../put-config.js');
const chai = require('chai');
const expect = chai.expect;
let context;

describe('Update config tests', function () {
    it('verifies valid body', async () => {
        let body = {
            from: "GBP",
            to: "EUR,USD"
        };
        const config = app.processBody(JSON.stringify(body));

        expect(config).to.be.an('object');
        expect(config).to.have.property("from");
        expect(config).to.have.property("to");
        expect(config.from).to.be.equal("GBP");
        expect(config.to).to.be.equal("EUR,USD");
    });
    
    it('verifies empty string fails', async () => {
        const config = app.processBody("");

        expect(config).to.be.an('object');
        expect(config).to.not.have.property("from");
        expect(config).to.not.have.property("to");
    });

    it('verifies empty body fails', async () => {
        const config = app.processBody("{}");

        expect(config).to.be.an('object');
        expect(config).to.not.have.property("from");
        expect(config).to.not.have.property("to");
    });

    it('verifies empty from property fails', async () => {
        let body = {
            from: ""
        };
        const config = app.processBody(JSON.stringify(body));

        expect(config).to.be.an('object');
        expect(config).to.not.have.property("from");
        expect(config).to.not.have.property("to");
    });

    it('verifies missing to property fails', async () => {
        let body = {
            from: "GBP"
        };
        const config = app.processBody(JSON.stringify(body));

        expect(config).to.be.an('object');
        expect(config).to.have.property("from");
        expect(config.from).to.be.equal("GBP");
        expect(config).to.not.have.property("to");
    });

    it('verifies empty to property fails', async () => {
        let body = {
            from: "GBP",
            to: ""
        };
        const config = app.processBody(JSON.stringify(body));

        expect(config).to.be.an('object');
        expect(config).to.have.property("from");
        expect(config.from).to.be.equal("GBP");
        expect(config).to.not.have.property("to");
    });

    it('verifies the to property has whitespace trimmed', async () => {
        let body = {
            from: "GBP",
            to: " EUR, USD ,AUD "
        };
        const config = app.processBody(JSON.stringify(body));

        expect(config).to.be.an('object');
        expect(config).to.have.property("from");
        expect(config).to.have.property("to");
        expect(config.from).to.be.equal("GBP");
        expect(config.to).to.be.equal("EUR,USD,AUD");
    });
});
