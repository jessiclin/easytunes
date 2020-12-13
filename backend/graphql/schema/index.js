import {buildSchema} from 'graphql'

const schema = buildSchema (`
type SongRef {
    song_id: String!
    song_uri: String!
    song_img: String!
    name: String!
    artists: [String!]!
    uploaded: Boolean!
    duration: Int!
}
type ReplyRef {
    _id: ID!
    username: String!
    profile_img: String!
    date: String!
    message: String!
}
type CommentRef {
    _id: ID!
    username: String!
    profile_img: String!
    date: String!
    message: String!
    replies:  [ReplyRef!]!
}
type Playlist {
    _id: ID!
    username: String!
    name: String!
    playlist_img: String!
    date_created: String!
    public: Boolean!
    total_duration: Int!
    likes: Int!
    comments: [CommentRef!]!
    songs: [SongRef!]!
}


type UserRef {
    user_id: ID!
    username: String!
    profile_img: String!
    following_since: String!
}

type Saved {
    playlist_id: ID!
    username: String!
    name: String!
    playlist_img: String!
    date_created: String!
    total_duration: Int!
    likes: Int!
    songs: [SongRef!]!
}

type LikedPlaylists {
    playlist_id: ID!
    name: String!
}
type User {
    _id: ID!
    email: String
    password: String
    username: String!
    profile_img: String!
    joined: String!
    url: String!
    default_public_saved_playlist: Boolean!
    default_public_playlist: Boolean!
    verify_requests: Boolean!
    current_song_id: String
    current_playlist_id: String 
    saved_playlists: [Saved!]! 
    liked_playlists: [LikedPlaylists]!
    following: [UserRef!]! 
    followers: [UserRef!]! 
    follow_requests: [UserRef!]! 
}

type User_Playlists {
    user: User!
    playlists: [Playlist!]! 
}
type AuthData {
    _id: ID!
    username: String!
    token: String!
    token_expiration: Int!
}

input UserInput {
    email: String!
    password: String!
    username: String!
    url: String!
}

input SongInput {
    _id: String!
    uri: String!
    img: String!
    name: String!
    artists: String!
    uploaded: Boolean!
    duration: Int!
}

input PlaylistInput{
    name: String!
    playlist_img: String!
    public: Boolean!
    total_duration: Int!
    likes: Int!
    songs: [String]!
}

type RootQuery {
    searchUsers(username: String!): [User_Playlists!]!
    searchPlaylists(name: String!): [Playlist!]!
    getUserByUsername(username: String!): User_Playlists!
    getUserByEmail(email: String!) : User_Playlists!
    login(email: String!, password: String!) : AuthData!
    getUserPlaylists(username: String!) : [Playlist!]!
    getPlaylistByID(id : ID!) : Playlist
}

type RootMutation {
    createUser(userInput: UserInput!): User
    createPlaylist(username: String!, user_id: ID!,  name: String!): Playlist
    deletePlaylist(id: ID!): Playlist
    deleteSong(playlist_id: ID!, song_id: ID!, index: Int!): SongRef
    addSong(songInput: SongInput!, playlist_id: ID!): Playlist
    updatePlaylist(id: ID!, playlist: PlaylistInput!): Playlist
    addRequest(id: ID!, requested_username: String!, profile_img: String!): User
    addFollower(username: String!, request_id: ID!, profile_img: String!): User
    removeFollower(username: String!, follower_id: ID!): User
    unFollow(username: String!, following_id: ID!): User
    addSavedPlaylist(username: String!, playlist_id: ID!, name: String!): Playlist
    deleteFavorite (username: String!, playlist_id : ID!): User
    forkPlaylist(username: String!, playlist_id: ID!, name: String!): Playlist
    changePlaylistPrivacy(id: ID!, privacy: Boolean!): Playlist 
    changePlaylistName(id: ID!, name: String!): Playlist 
    removeAllSongs(id: ID!): Playlist
    moveSongUp(playlist_id: ID!, song_id: ID!, index: Int!): Playlist
    moveSongDown(playlist_id: ID!, song_id: ID!, index: Int!): Playlist
    addComment(playlist_id: ID!, username: String!, comment: String!): Playlist
    updateEmail(email:String!, new_email:String!): User
    changeUsername(username: String!, new_username:String!): User
    changePassword(username: String!, new_password:String!): User
    deleteComment(playlist_id: ID!, username: String!, index: Int!): Playlist
    changeSavedPlaylistPrivacyDef(_id: ID!, def: Boolean!): User 
    changePlaylistPrivacyDef(_id: ID!, def: Boolean!): User 
    changeVerifyFollowDef(_id: ID!, def: Boolean!): User 
    like_unlikePlaylist(username: String!, playlist_id: ID!, playlist_name: String!): User
    resetPassword(email: String!, new_password: String!): User
    addReply(username: String!, message: String!, playlist_id: ID!, comment_index: Int!): Playlist
    editComment(username: String!, message: String!, playlist_id: ID!, comment_index: Int!): Playlist
}

schema {
    query: RootQuery 
    mutation: RootMutation
}
`)

export default schema