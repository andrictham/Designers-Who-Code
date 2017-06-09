let dotenv = require('dotenv').config()
let Twitter = require('twitter')
let firebase = require('firebase')
let admin = require('firebase-admin')

const designers = require('./designers.json')

let twitterClient = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  bearer_token: process.env.TWITTER_BEARER_TOKEN
})

let firebaseServiceAccount = {
  "type": "service_account",
  "project_id": process.env.FIREBASE_PROJECT_ID,
  "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
  "private_key": process.env.FIREBASE_PRIVATE_KEY,
  "client_email": process.env.FIREBASE_CLIENT_EMAIL,
  "client_id": process.env.FIREBASE_CLIENT_ID,
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": process.env.FIREBASE_CLIENT_CERT_URL
}

let getProfileInfo = function(handle) {
  twitterClient.get('users/show', { 'screen_name': handle }, function (error, response) {
    if (!error) {
      console.log(response)
      // Do stuff here later!
    }
  })
}

for (var i = 0; i < designers.length; i++) {
  getProfileInfo(designers[i].handle);
}
