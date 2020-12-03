import {buildSchema} from 'graphql'

const schema = buildSchema (`
type SongRef {
    song_id: String!
    name: String!
    artists: [String!]!
    uploaded: Boolean!
    duration: Int!
}
type ReplyRef {
    _id: ID!
    username: String!
    date: String!
    message: String!
}
type CommentRef {
    _id: ID!
    username: String!
    date: String!
    message: String!
    replies:  [ReplyRef!]!
}
type Playlist {
    _id: ID!
    username: String!
    name: String!
    img: String!
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
    following_since: String!
}

type Saved {
    playlist_id: ID!
    username: String!
    name: String!
    img: String!
    date_created: String!
    total_duration: Int!
    likes: Int!
    songs: [SongRef!]!
}
type User {
    _id: ID!
    email: String
    password: String
    username: String!
    joined: String!
    url: String!
    default_public: Boolean!
    current_song_id: String
    current_playlist_id: String 
    saved_playlists: [Saved!]! 
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
    name: String!
    artists: String!
    uploaded: Boolean!
    duration: Int!
}

input PlaylistInput{
    name: String!
    img: String!
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
    addRequest(id: ID!, requested_username: String!): User
    addFollower(username: String!, request_id: ID!): User
    removeFollower(username: String!, follower_id: ID!): User
    unFollow(username: String!, following_id: ID!): User
    addSavedPlaylist(username: String!, playlist_id: ID!, name: String!): Playlist
    deleteFavorite (username: String!, playlist_id : ID!): User
    forkPlaylist(username: String!, user_id: ID!, name: String!, playlist: PlaylistInput!): Playlist
    changePlaylistPrivacy(id: ID!, privacy: Boolean!): Playlist 
    changePlaylistName(id: ID!, name: String!): Playlist 
    removeAllSongs(id: ID!): Playlist
    moveSongUp(id: ID!, index: Int!): Playlist
    moveSongDown(id: ID!, index: Int!): Playlist
}

schema {
    query: RootQuery 
    mutation: RootMutation
}
`)

export default schema