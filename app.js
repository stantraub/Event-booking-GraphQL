const express = require('express')
const bodyParser = require('body-parser')
const graphqlHttp = require('express-graphql')
const mongoose = require('mongoose')

const graphQlSchema = require('./graphql/schema/index')
const graphQlResolvers = require('./graphql/resolvers/index')
const isAuth = require('./middleware/is-auth')

const app = express()

app.use(bodyParser.json()) 

app.user((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*') // '*' means every host and client can send requests to this server
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS') //browser sends OPTIONS first

})

app.use(isAuth) //will run isAuth on every request

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-9taoe.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => 
    app.listen(8000)
    )
  .catch(err => console.log(err)
);



