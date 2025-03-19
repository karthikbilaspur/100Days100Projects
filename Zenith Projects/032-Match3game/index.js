const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema.graphql')
const resolvers = require('./resolvers')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const app = express()

app.use(cors())

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: true
}))

app.listen(4000, () => {
  console.log('Server listening on port 4000')
})