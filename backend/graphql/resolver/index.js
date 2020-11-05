import bcrypt from 'bcrypt'
import User from '../../models/user.model.js'
import jwt from 'jsonwebtoken'

const resolver = {
    // Gets Users 
    users: async () => {
        try {
            const users = await User.find().populate('user_id')
            return users.map(user => {
                return { ...user._doc, password: null, _id: result.id }
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
    getUser: async (username) => {
        const user = await User.findOne({username: username})
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
        return {userId: user._id, username: user.username, token: token, tokenExpiration: 1}
    }   
}

export default resolver