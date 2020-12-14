import express from 'express'
import bodyParser from 'body-parser'
import graphqlHTTP from 'express-graphql'
import mongoose from 'mongoose'
import resolver from './graphql/resolver/index.js'
import schema from './graphql/schema/index.js'
import isAuth from './middleware/is-auth.js'
import SpotifyWebApi from 'spotify-web-api-node'
import dotenv from 'dotenv'
import path, { resolve } from 'path'
import multer from 'multer'
import cors from 'cors'
import GridFsStorage from 'multer-gridfs-storage'
import Grid from 'gridfs-stream'
import crypto from 'crypto'

dotenv.config()

const app = express() ;

// Create the api object with the credentials
// const spotifyApi = new SpotifyWebApi({
//   clientId: process.env.CLIENT_ID,
//   clientSecret: process.env.CLIENT_SECRET
// });


// // Retrieve an access token.
// async function newToken() {
//     await spotifyApi.clientCredentialsGrant().then(
//         function(data) {
//           console.log('The access token expires in ' + data.body['expires_in']);
//           console.log('The access token is ' + data.body['access_token']);
      
//           // Save the access token so that it's used in future calls
//           spotifyApi.setAccessToken(data.body['access_token']);
//         },
//         function(err) {
//           console.log('Something went wrong when retrieving an access token', err);
//         }
//       );
// }


// newToken()

// // refresh when token expires 
// setInterval(newToken, 1000 * 60 * 60);

let scopes = ['user-read-private', 'user-read-email', 'streaming', 'user-read-playback-state', 'user-modify-playback-state' ]

  var credentials = {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: 'http://localhost:5000/callback',
  };
   
// Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
let spotifyApi = new SpotifyWebApi(credentials);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS'){
        return res.sendStatus(200);
    }
    next();
});

app.use('/authorization', function(req, res) {
    // Create the authorization URL
    var authorizeURL = spotifyApi.createAuthorizeURL(scopes);
    
    // https://accounts.spotify.com:443/authorize?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https://example.com/callback&scope=user-read-private%20user-read-email&state=some-state-of-my-choice
    console.log(authorizeURL);
    res.status(200).send(JSON.stringify(authorizeURL));
 
})


/* Handle authorization callback from Spotify */
app.get('/callback', function(req, res) {
    console.log("Callback")
    /* Read query parameters */
    var code  = req.query.code; // Read the authorization code from the query parameters
    var state = req.query.state; // (Optional) Read the state from the query parameter
  
    /* Get the access token! */
    spotifyApi.authorizationCodeGrant(code).then(
        function(data) {
          console.log('The token expires in ' + data.body['expires_in']);
          console.log('The access token is ' + data.body['access_token']);
          console.log('The refresh token is ' + data.body['refresh_token']);
       
          // Set the access token on the API object to use it in later calls
          spotifyApi.setAccessToken(data.body['access_token']);
          spotifyApi.setRefreshToken(data.body['refresh_token']);
         
          //localStorage.setItem("access-token", data.body['access_token'])
          res.redirect("http://localhost:3000/home")
        },
        function(err) {
          console.log('Something went wrong!', err);
        }
      );
  });

app.use('/access-token', function(req, res) {
    if (spotifyApi.getAccessToken())
        res.status(200).send(JSON.stringify(spotifyApi.getAccessToken()))
    else 
        res.status(200).send(JSON.stringify(null))
})
async function newToken() {
    await spotifyApi.refreshAccessToken().then(
            function(data) {
              console.log('The access token has been refreshed!');
          
              // Save the access token so that it's used in future calls
              spotifyApi.setAccessToken(data.body['access_token']);
            },
            function(err) {
              console.log('Could not refresh access token', err);
            }
          );
        }

// refresh when token expires 
setInterval(newToken, 1000 * 60 * 60);

// For querying MongoDB Database 
app.use(bodyParser.json());
app.use(cors())



// Search for an artist or song name 
app.use('/v1/search?', async (req, res, next) =>  {
    let query = "" 

    // Search Artists only 
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

    // Search Tracks only 
    if (req.body.track){
        query = "track:" + req.body.track 
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

app.use('/v1/artist-tracks/', async(req, res, next) => {
    let query = "artist:" + req.body.artist

    await spotifyApi.searchTracks(query)
                    .then(function(data) {
                        res.status(200).send(data.body)
                        next()
                    }, function(err) {
                        console.log('Something went wrong!', err);
                        res.status(400)
                    });
})


// Query is fetch data. Mutation is changing data String! --> Cannot be null 
app.use(isAuth);


app.use('/graphql', graphqlHTTP.graphqlHTTP({
    schema: schema,
    rootValue:  resolver,
    graphiql: true
}))

const PORT = 5000

const conn = mongoose.createConnection(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@easytunes.q6gty.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@easytunes.q6gty.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on port: ${PORT}`)
    })
})
.catch(err => {
    console.log(err)
})

let gfs;

conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection();
});

// Create storage engine
const storage = new GridFsStorage({
  url: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@easytunes.q6gty.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = file.originalname;
        const fileInfo = {
          filename: filename
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });

app.post("/", upload.single("img"), (req, res, err) => {
  res.send(req.files);
});

app.get("/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists"
      });
    }
    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);
  });
});