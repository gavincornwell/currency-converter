# Currency Converter

This repository contains a Serverless app to convert currencies.

## Prerequisites

* An AWS account
* Install AWS CLI
* Install SAM CLI
* Install NPM
* Install Mocha (npm install -g mocha)

## Build & Setup

* cd src/get-currencies
* npm install
* cd ..

* cd src/put-config
* npm install
* cd ..

* sam build
* sam deploy --guided
* curl to update configuration

* cd app
* npm install
* grab the API URL output
* update ListCurrenciesComponent.jsx with URL
* npm start

## Running Unit Tests

* cd src/get-currencies
* npm run test

* cd src/put-config
* npm run test

## Running Integration Tests

* npm install -g newman
* newman ...