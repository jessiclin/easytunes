import bcrypt from 'bcrypt'
import User from '../../models/user.model.js'
import jwt from 'jsonwebtoken'
import Playlist from '../../models/playlist.model.js';
const saltRounds = 10;
const resolver = {
    // Gets Users 
    searchUsers: async ({username}) => {
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
            return { ...result._doc }
        } catch (error) {
            console.log(error)
            console.log(error.keyPattern)
            throw error.keyPattern
        }


    },
    // Get one User 
    getUserByUsername: async ({username}) => {
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
    },
    createPlaylist: async ({username, user_id, name}) => {
        const playlist = new Playlist({
            user_id: user_id,
            name: name, 
            username: username,
            date_created: new Date()
        })

        try {
            const result = await playlist.save()
            return { ...result._doc }
        } catch (error) {
            console.log(error)
            throw error
        }

    },
    getUserPlaylists: async ({username}) => {

        try {
            const playlists = await Playlist.find({username: username})
            return playlists.map(playlist => {
                return {...playlist._doc}
            })

        } catch (err) {
            throw err
        }
    },
    getPlaylistByID: async ({id}) => {
        try{
            const playlist = await Playlist.findOne({_id : id})
            console.log(playlist)
            return {...playlist._doc}
        }
        catch (err){
            throw err
        }
    },
    searchPlaylists: async ({name}) => {
        try {
            const playlists = await Playlist.find({ name: { "$regex": name, "$options": "i" }, public : true})
        
            return playlists.map(async user => {
                return {...playlist._doc}
            })
        } catch (err) {
            throw err
        }
    }, 
    deletePlaylist: async ({id}) => {
        try {
            const result = await Playlist.findByIdAndRemove(id)
            return {...result._doc}
        } catch(err) {
            throw err
        }
    },
    deleteSong: async ({playlist_id, song_id, index}) => {
        try {
            const result = await Playlist.findOne({_id: playlist_id})
            console.log(song_id, index)
            result.songs.map((song, i) => {
  
                if (song._id.toString() === song_id && i === index){
                    console.log("HRE")
                    result.songs.splice(i, 1)
                    console.log(result.songs)
                }
            })
            console.log(result)
            result.save()
            // const result = await Playlist.findByIdAndRemove(id)
            // return {...result._doc}
        } catch(err) {
            throw err
        }
    },
    addSong: async ({songInput, playlist_id}) => {
   
        try{
            let result = await Playlist.findOne({_id: playlist_id})
            let song = {
                song_id : songInput._id,
                name: songInput.name,
                uploaded: songInput.uploaded,
                artists: []
            }
            let artists = songInput.artists.split("\n")

            artists.map(artist => {
                song.artists.push(artist)
            })

            result.songs.push(song)

   
            result.save()
        }catch(err){
            throw err
        }
    },
    updatePlaylist: async ({playlist_id, name, songs}) => {
        try{
            let result = await Playlist.findOne({_id: playlist_id})
            console.log(songs)
        }catch(error){}
    },
    addRequest: async ({id, requested_username}) => {
        try{
            // Add request here 
            let result = await User.findOne({_id: id})
            // Get user id of the requestee 
            let req = await User.findOne({username: requested_username})

            const request = {
                user_id: req._id,
                username: requested_username,
                request_date: new Date()
            }
            result.follow_requests.push(request)
  
            result.save()
            return result
        }catch(error){}
    }
}

export default resolver