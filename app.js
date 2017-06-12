let dotenv = require('dotenv').config()
let Twitter = require('twitter')
let firebase = require('firebase')
let admin = require('firebase-admin')
let Autolinker = require('autolinker')

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

admin.initializeApp({
  credential: admin.credential.cert(firebaseServiceAccount),
  databaseURL: "https://designers-who-code.firebaseio.com"
})

let getProfileInfo = function(handle) {
  twitterClient.get('users/show', { 'screen_name': handle }, function (error, response) {

    if (!error) {

      let { name, screen_name, description, profile_image_url_https, location, profile_link_color, entities } = response

      const handle = screen_name.toLowerCase()
      const imageUrl = profile_image_url_https.replace("_normal", "_400x400")

      // Replace t.co URLs with the actual URLs
      let descriptionUrls = entities.description.urls
      if (descriptionUrls.length != 0) {
        for (var i = 0; i < descriptionUrls.length; i++) {
          description = description.replace(descriptionUrls[i].url, `${descriptionUrls[i].expanded_url}`)
        }
      }

      description = Autolinker.link( description, {
        mention: 'twitter', // Process @ links into Twitter mention links
        hashtag: 'twitter' // Process # links into Twitter hashtag links
      })

      //console.log(name + "\n" + description + "\n \n ————————————— \n")

      // assemble object to be sent to Firebase
      let designerProfile = new Object();
      designerProfile.name = name
      designerProfile.handle = handle
      designerProfile.description = description
      designerProfile.imageUrl = imageUrl
      designerProfile.profileColor = profile_link_color

      console.log(designerProfile)

      function writeToFirebase(handle, designerProfile) {
        admin.database().ref('display/' + handle).set({
          designerProfile
        })
        console.log(`${handle} has been written to Firebase`)
      }

      writeToFirebase(handle, designerProfile)

    }
  })
}

for (var i = 0; i < designers.length; i++) {
  getProfileInfo(designers[i].handle);
}
