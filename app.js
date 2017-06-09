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
