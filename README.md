# This is an example how to oAuth with github using Passport and Express

## What it uses

express, passport, react(Frontend), dotenv, react-router-dom and:
We are using mongoose synchronously to save users that are authenticated by github in our mongoDB database. If neither "mongoose" nor "mongoDB" mean anything to you, you can read up a lot in different places, e.g. https://www.mongodb.com/basics/get-started / https://mongoosejs.com/ .

## how to use it

1. fork it

2. use

```
npm i
```

to install all dependencies needed.

3. Create an oAuth App in github (https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)

4. create a ".env" file within your "api" folder
5. insert

```
GITHUB_CLIENT_SECRET=Your_secret_oAuth_App_Key_from_github
GITHUB_CLIENT_ID=Your_oAuth_App_Client_Id_from_github
PORT=3000
MONGO_DB_URL=mongodb://127.0.0.1:27017/oauthtest
```

into the .env file

6. Open two terminals - one to start the server.js using either nodemon or node

```
node server.js
```

and the other one to get the frontend going with

```
npm start
```

You should be all set up now!
