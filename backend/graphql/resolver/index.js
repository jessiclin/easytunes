import bcrypt from 'bcrypt'
import User from '../../models/user.model.js'
import jwt from 'jsonwebtoken'
import Playlist from '../../models/playlist.model.js';
const saltRounds = 10;
const resolver = {
    // Gets Users 
    users: async ({username}) => {
        try {
            const users = await User.find({ username: { "$regex": username, "$options": "i" }})
        
            return users.map(async user => {
                const playlists = await Playlist.find({user_id: user._id})
                return {user: { ...user._doc, password: null, _id: user.id}, playlists : playlists.map(playlist => {return {...playlist._doc}}) }
            })
        } catch (err) {
            throw err
        }
    },
    // Adds a user 
    createUser: async (args) => {
    
        const hashed = await bcrypt.hash(args.userInput.password, saltRounds)
        const user= new User({
            email: args.userInput.email,
            password: hashed,
            username: args.userInput.username,
            joined: new Date(),
            url: args.userInput.url
        })
        try {
            const result = await user.save()
            console.log(result)
            return { ...result._doc }
        } catch (error) {
            console.log(error)
            throw error
        }


    },
    // Get one User 
    getUserByUsername: async ({username}) => {
        console.log(username)
        try {
            const user = await User.findOne({ username: username})
            if (user === null)
                throw new Error ("User not found")
            
            const playlists = await Playlist.find({user_id: user._id})
            return {user: { ...user._doc, password: null, _id: user.id}, playlists : playlists.map(playlist => {return {...playlist._doc}}) }

        } catch (err) {
            console.log(err)
            throw err
        }
        
    },
    getUserByEmail: async ({email}) => {
        const user = await User.findOne({email : email})
        if (!user)
            throw new Error('Id not found')
        return {...user._doc}
    },
    login: async ({email, password}) => {
 
        const user = await User.findOne({email: email})

        if (!user)
            throw new Error('Email not found')
        
        const valid = await bcrypt.compare(password, user.password);
        if (!valid)
            throw new Error('Password does not match')

        // Generate token 
        const token = jwt.sign({userId: user._id, username: user.username}, 'somesupersecretkey',{
            expiresIn: '1h'
        });

        return {_id: user._id, username: user.username, token: token, token_expiration: 1}
    }   
}

export default resolver