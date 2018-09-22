const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');

const schema = require('./schema/schema');

const app = express();

mongoose.connect('mongodb://localhost/graphql-playlist', { useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log('Connected to database');
})

app.use('/', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(8081, () => {
  console.log('Listening on port 8081');
});
