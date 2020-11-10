import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    joined: {type: Date, required: true},
    url: {type: String, required: true, unique:true},
    current_song_id: {type: String, default: null},
    current_playlist_id: {type: String, default: null},
    default_public: {type: Boolean, default: false},
    saved_playlists : [
        {
            playlist_id: {type: Schema.Types.ObjectId, ref: 'Playlist', required: true},
            name: {type: String, required: true},
        }
    ],
    following : [
        {
            user_id: {type:Schema.Types.ObjectId, ref: 'User',  required: true},
            username: {type:String, required: true},
            following_since: {type:Date, required: true},
        }
    ],
    followers : [
        {
            user_id: {type:Schema.Types.ObjectId, ref: 'User', required: true},   
            username: {type:String, required: true},
            following_since: {type:Date, required: true},
        }
    ],   
    follow_requests : [
        {
            user_id: {type:Schema.Types.ObjectId, ref: 'User',required: true},
            username: {type:String, required: true},
            request_date: {type:Date, required: true},
        }
    ], 
});

const User = mongoose.model('User', UserSchema);
export default User 