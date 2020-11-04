import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    user_id: Number,
    username: String, 
    email: String, 
    password: String, 
    joined: {
        type: Date, 
        default: new Date()
    },
    url: String, 
    current_song_id: Number, 
    current_playlist_id: Number,
    saved_playlists: [
        {
            playlist_id: Number,
            name: String
        }
    ],
    following: [{
        user_id: Number,
        username: String, 
        following_since : {
            type: Date,
            default: new Date()
        }
    }],
    followers: [{
        user_id: Number,
        username: String, 
        following_since : {
            type: Date,
            default: new Date()
        }
    }],
    follow_requests: [{
        user_id: Number,
        username: String, 
        request_date : {
            type: Date,
            default: new Date()
        }
    }]
})

const User = mongoose.model('User',  userSchema);

export default User
