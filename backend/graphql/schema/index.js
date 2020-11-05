import {buildSchema} from 'graphql'

const schema = buildSchema (`
type PlaylistRef {
    playlist_id: String!
    name: String
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
    savedPlaylists: [PlaylistRef!]! 
    following: [UserRef!]! 
    followers: [UserRef!]! 
    follow_requests: [UserRef!]! 
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
    users: [User!]!
    getUser(username: String!) : User
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