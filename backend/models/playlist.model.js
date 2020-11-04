import mongoose from 'mongoose'
const Schema = mongoose.Schema; 

const playlistSchema = new Schema({
   playlist_id: Number,
   user_id: Number,
   username: String,
   name: String, 
   img: String, 
   date_created : {
       type: Date,
       default: new Date()
   },
   public : Boolean,
   likes: {
       type: Number, 
       default: 0
   },
   comments: [
       {
           username: String, 
           date : {
               type: Date,
               default: new Date()
           },
           message: String, 
           replies: [
               {
                   username: String, 
                   date : {
                    type: Date,
                    default: new Date()
                    },
                    message: String, 
               }
           ]
       }
   ],
   songs : [
       {
           song_id : String,
           name: String, 
           artist: String, 
           uploaded: false  
       }
   ]
})


const Playlist = mongoose.model('Playlist', playlistSchema)
export default Playlist
