# Transavia Shopping Cart - Demo Application
This repository contains a sample project that you can use to create a front-end Application for booking Transavia flights. This project is a showcase for the ShoppingCart API that Transavia provides. This API is the only API you have to use to create bookings for your users.

This sample application is minimalistic, it is HTML, CSS and JavaScript. This application doesn’t use SASS, LESS, TypeScript or something else. This was done intentionally to show you how simple it should be to implement the API. This is also the reason that there are no validations build in.

When you integrate the API in your application you should build validations, but you can also choose your own programming language, framework and way of working.

This sample application uses besides the ShoppingCart API the FlightOffers API. The FlightOffers API can be used to search and find Transavia flights. You can put multiple filters on your search and it is possible to search for a route but also on specific dates and duration at place of destination.

## Developer portals
Transavia provides two developer portals for API management. In the developer portal you can find every API you have access to with the definition and possibility to download API definitions (in Open API and WADL format). You can subscribe to products to get your own API key (that you must use in every request) and you can try API’s through a test GUI.

We have a [dev / test portal](https://tst.developer.transavia.com/) and a [production portal](https://developer.transavia.com/). You can use the [dev / test portal](https://tst.developer.transavia.com/) when you are developing your application or testing it. When put your application into production you should use the [production portal](https://developer.transavia.com/). For both portals you must create an account and get API keys. The information is not shared between the environments.

### General API information
Currently the following API’s are offered as public API’s: Airports API, Flight Offers API and Routes API. These API’s you can use without any contract with Transavia, you only need to sign up at the developer portals.

Transavia offers other API’s that contain more information than the public API’s or do other things. The ShoppingCart API is also one of these API’s. Please sign up for a developer account and then contact us to get more information and a valid subscription to the API. You can find the contact information in the developer portal.

If you don’t want to implement the ShoppingCart API you can also use the Flight Offers API. The Flight Offers API has an affiliate program with which you can earn money for every flight booked via your website. Please, see the developer portal for more information.

Common properties in the API’s are Origin, Destination, Dates and Flight Id. Origin and Destination are airports and are composed out of three letters, like ‘AMS’ for Schiphol Amsterdam (IATA airport code). Dates are in the following format: yyyymmdd, that is year, month and day. An example of a Flight Id is: AMSBCN20181225HV1324, the format is ‘Origin’’Destination’’FlightDate’’CarrierCode’’FlightKey’.

## Shopping Cart flow
In the "Search and Select" phase you have the possibility to update your party, add and remove filghts and start the checkout phase. In the “Checkout” phase you can add and update passenger details, add and update booking contact, add and remove payment. We currently only allow the payment method "payment link". There is no need to handle payments yourself. And, finally, you can finalize the checkout which creates the booking in our systems.

You should always check if a call to a resource is allowed in the current state of the shopping cart. The action links that are returned in every call show you all the actions that are allowed in the current shopping cart context. Warnings shows issues in the current shopping cart context and are used to help you solve problems. Notes are used as information that do not require an action.

The shopping cart expires after a period. After that you cannot use the shopping cart anymore. The fares are always updated in the “Search and Select” phase, in the “Checkout” phase fares are not updated anymore and should be the final fare. Display terms and conditions link when the commit action is available. For now, the only payment method that allowed is, is “paymentlink”. The ShoppingCart API will provide a hyperlink after finalizing the checkout. It will link to the booking based login. Also, a PayLater email is send to the booker contact during the finalizing of the checkout.

PassengerId is starting with index 1.

## Prerequisites
The demo application will be hosted in [Node.js](https://nodejs.org/) and uses the related package ecosystem [npm](https://docs.npmjs.com/getting-started/installing-node).  
Both can be installed from this [site](https://docs.npmjs.com/getting-started/installing-node).

## Installation
1. Open a command prompt in the root folder of the project.
2. To install the required npm packages run the command:  
    `npm install`
3. Start the node.js server locally with the command:  
    `npm start`  

The demo application is now running on the [local host](http://localhost:3001/)

## Project setup

### Client
The code for the client is located in the `public` folder. It consists of HTML, CSS and JavaScript. The (client side) JavaScript gets data from and posts data to the FlightOffers and ShoppingCart API. It doesn't call the API’s directly but sends a request to the proxy endpoint that is also part of this sample project.

### Middleware
The `server.js` file in the root folder contains the code for the middleware of the application. It does two things: it serves the 'public content' to the broswer and it implements two proxy endpoints: `/flightOffers` and `/shoppingcartAPI`. These endpoints simply pass the calls from the client side to the API endpoints, only adding the `API key` to the request headers. In this way the API key isn't exposed in the client side Javascript. For simplicity we didn't implement other security measures in the project. The website should be further protected with an [anti-forgery token](https://github.com/expressjs/csurf).
 

### Configuration
The 'package.json' file in the root folder contains the configuration for the Node.js project, including the packages (`dependencies`) being used and the starting point (`server.js`) of the application.

## Feedback & Contact Us
If you have any feedback or want to contact us, please visit one of the developer portal for contact information. You can help us with contributing and log issues but also with sharing the amazing applications you create.

We'd love to hear from you!

## License
Copyright 2018, Transavia Airlines C.V.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.