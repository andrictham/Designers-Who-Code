# Designers Who Code

A Twitter directory for exploring digital product designers who speak the native language of our medium.

Based on [Jules Forrest’s Women Who Design](https://css-tricks.com/building-directory-twitter-api/)

# Instructions

- Setup: Register for Firebase and Twitter, create an .env file and populate your private keys. Look at `.env_example` for an example format.
- Node server: Run `node app.js` to scrape Twitter accounts from `designers.json` and populate Firebase DB.
- Frontend Local Server: Run `yarn start` or `npm start`. Make sure node version is `>6.9.0`.
- Deploy: Install Heroku CLI and run `git push heroku master`.
