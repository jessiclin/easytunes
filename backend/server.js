import express from 'express'
import bodyParser from 'body-parser'
import graphqlHTTP from 'express-graphql'
import mongoose from 'mongoose'
import resolver from './graphql/resolver/index.js'
import schema from './graphql/schema/index.js'
import isAuth from './middleware/is-auth.js'
import SpotifyWebApi from 'spotify-web-api-node'
import dotenv from 'dotenv'

dotenv.config()

const app = express() ;


// Create the api object with the credentials
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});

// Retrieve an access token.
async function newToken() {
    await spotifyApi.clientCredentialsGrant().then(
        function(data) {
          console.log('The access token expires in ' + data.body['expires_in']);
          console.log('The access token is ' + data.body['access_token']);
      
          // Save the access token so that it's used in future calls
          spotifyApi.setAccessToken(data.body['access_token']);
        },
        function(err) {
          console.log('Something went wrong when retrieving an access token', err);
        }
      );
}

newToken()

// refresh when token expires 
setInterval(newToken, 1000 * 60 * 60);

// For querying MongoDB Database 
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


// Search for a track by artist or song name 
app.use('/v1/search?', async (req, res, next) =>  {
    let query = "" 

    if (req.body.artist) 
        query = "artist:" + req.body.artist 
        spotifyApi.searchArtists(query)
                .then(function(data) {
                    res.status(200).send(data.body);
                    next()
                 }, function(err) {
                    console.error(err);
                    res.status(400)
                });

    if (req.body.track){

        query = req.body.track 
        
        await spotifyApi.searchTracks(query)
                    .then(function(data) {
                        res.status(200).send(data.body)
                        next()
                    }, function(err) {
                        console.log('Something went wrong!', err);
                        res.status(400)
                    });
    }

})

app.use('/v1/tracks/', async(req, res, next) => {
    //await spotifyApi.getTracks([req.body.track])
    await spotifyApi.getAudioFeaturesForTrack(req.body.track)
    .then((data) =>{
      //  console.log(data.body)
        res.status(200).send(data.body)
        next()
    }
        
    )
    .catch(err => {
        console.log('Something went wrong!', err);
        res.status(400)
    })
})

// Query is fetch data. Mutation is changing data String! --> Cannot be null 
app.use(isAuth);

app.use('/graphql', graphqlHTTP.graphqlHTTP({
    schema: schema,
    rootValue:  resolver,
    graphiql: true
}))

const PORT = 5000

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@easytunes.q6gty.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on port: ${PORT}`)
    })
})
.catch(err => {
    console.log(err)
})