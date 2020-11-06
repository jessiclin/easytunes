import {buildSchema} from 'graphql'

const schema = buildSchema (`
type SongRef {
    _id: ID!
    name: String!
    artists: [String!]!
    uploaded: Boolean!
}
type ReplyRef {
    user_id: ID!
    username: String!
    date: String!
    message: String!
}
type CommentRef {
    user_id: ID!
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
    likes: Int!
    Comments: [CommentRef!]!
    Songs: [SongRef!]!
}


type UserRef {
    user_id: String!
    username: String!
    following_since: String!
}

type User {
    _id: ID!
    email: String
    password: String
    username: String!
    joined: String!
    url: String!
    current_song_id: String
    current_playlist_id: String 
    savedPlaylists: [Playlist!]! 
    following: [UserRef!]! 
    followers: [UserRef!]! 
    follow_requests: [UserRef!]! 
}

type User_Playlists {
    user: User!
    playlists: [Playlist!]! 
}
type AuthData {
    userId: ID!
    username: String!
    token: String!
    tokenExpiration: Int!
}

input UserInput {
    email: String!
    password: String!
    username: String!
    url: String!
}

type RootQuery {
    users(username: String!): [User_Playlists!]!
    getUser(username: String!) : User
    getUserByEmail(email: String) : User
    login(email: String!, password: String!) : AuthData!
}

type RootMutation {
    createUser(userInput: UserInput!): User
}

schema {
    query: RootQuery 
    mutation: RootMutation
}
`)

export default schema