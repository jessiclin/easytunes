import express from 'express'
import bodyParser from 'body-parser'
import graphqlHTTP from 'express-graphql'
import mongoose from 'mongoose'

import resolver from './graphql/resolver/index.js'
import schema from './graphql/schema/index.js'
import isAuth from './middleware/is-auth.js'

const app = express() ;

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS'){
        return res.sendStatus(200);
    }
    next();
});

const saltRounds = 10;
// Query is fetch data. Mutation is changing data String! --> Cannot be null 

app.use(isAuth);

app.use('/graphql', graphqlHTTP.graphqlHTTP({
    schema: schema,
    rootValue:  resolver,
    graphiql: true
}))

const PORT = 5000
const MONGO_DB= "EasyTunes"
const MONGO_USER= "jessiclin"
const MONGO_PASSWORD="jessiclin"
mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@easytunes.q6gty.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on port: ${PORT}`)
    })
})
.catch(err => {
    console.log(err)
})