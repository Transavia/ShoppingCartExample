'use strict'

const shoppingcartApiUrl = 'https://tst.api.transavia.com/shoppingcartapi/'
const shoppingcartApiKey = '### ENTER YOUR API KEY ###'
const shoppingcartUsername = '### ENTER YOUR USERNAME ###'
const flightOffersApiUrl = 'https://tst.api.transavia.com/v1'
const flightOffersApiKey = '### ENTER YOUR API KEY ###'

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fetch = require('node-fetch')

app.use(express.static('public'))

app.use(bodyParser.json({ type: 'application/json' }))

app.all('/shoppingcartAPI', (req, res) => {
  const url = shoppingcartApiUrl + req.query.path
  const config = {
    method: req.method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': shoppingcartApiKey,
      //'Ocp-Apim - Trace': true,
      'x-Username': shoppingcartUsername,
      shoppingCartId: req.headers.shoppingCartId,
    },
    body: JSON.stringify(req.body),
    cache: 'default',
  }

  return fetch(url, config)
    .then(response => response.json())
    .then(json => {
      res.send(json)
    })
    .catch(e => {
      console.log(e)
      res.status(200).send(JSON.stringify(e)) // proxy endpoint returns 200 but with error content in the body
    })
})

app.get('/flightOffers', (req, res) => {
  const url = flightOffersApiUrl + req.originalUrl
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      apiKey: flightOffersApiKey,
      //'Ocp-Apim - Trace': true
    },
    cache: 'default',
  }

  return fetch(url, config)
    .then(response => response.json())
    .then(json => {
      res.send(json)
    })
    .catch(e => {
      console.log(e)
      res.status(200).send(JSON.stringify(e)) // proxy endpoint returns 200 but with error content in the body
    })
})

app.set('port', process.env.PORT || 3001)

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port)
})
