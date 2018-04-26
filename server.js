/*
app_id = "516044"
key = "fd90abbb46df453ea077"
secret = "bf8220877d2d61bc5ff4"
cluster = "us2"
*/

// server.js
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const Pusher = require('pusher')

const APP_ID = "516044"
const APP_KEY = "fd90abbb46df453ea077"
const APP_SECRET = "bf8220877d2d61bc5ff4"
const YOUR_CLUSTER = "us2"

//initialize Pusher with your appId, key, secret and cluster
const pusher = new Pusher({
    appId: 'APP_ID',
    key: 'APP_KEY',
    secret: 'APP_SECRET',
    cluster: 'YOUR_CLUSTER',
    encrypted: true
})

// Body parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// CORS middleware
app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*')
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true)
    // Pass to next layer of middleware
    next()
})

// Set port to be used by Node.js
app.set('port', (5000))

app.get('/', (req, res) => {
    res.send('Welcome')
})

// API route in which the price information will be sent to from the clientside
app.post('/prices/new', (req, res) => {
    // Trigger the 'prices' event to the 'coin-prices' channel
    pusher.trigger( 'coin-prices', 'prices', {
        prices: req.body.prices
    });
    res.sendStatus(200);
})

app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'))
})
