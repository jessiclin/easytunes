import mongoose from 'mongoose'

const Schema = mongoose.Schema

const PlaylistSchema = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'User', required:true},
    username: {type: String, required: true},
    name: {type:String, required:true},
    img: {type:String, default: ""},
    date_created: {type: Date, required:true},
    public: {type: Boolean, default: false},
    likes: {type: Number, default: 0},
    comments: [
        {
            user_id: {type: Schema.Types.ObjectId, ref: 'User', required:true},
            username: {type: String, required: true},
            date: {type: Date, required: true},
            message: {type: String, required: true},
            replies: [
                {
                    user_id: {type: Schema.Types.ObjectId, ref: 'User', required:true},
                    username: {type: String, required: true},
                    date: {type: Date, required: true},
                    message: {type: String, required: true},
                }
            ]
        }
    ],
    songs: [
        {
            song_id : {type: String, required: true},
            name: {type: String, required: true},
            artists: [{type: String, required: true}],
            uploaded: {type: Boolean, required: true}
        }
    ]
})

const Playlist = mongoose.model('Playlist', PlaylistSchema);
export default Playlist