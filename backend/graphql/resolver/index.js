import bcrypt from 'bcrypt'
import User from '../../models/user.model.js'
import jwt from 'jsonwebtoken'
import Playlist from '../../models/playlist.model.js';
import request from 'request';
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
            // console.log(user)
            if (user === null)
                throw new Error (`${username} not found`)
            
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
            // console.log(playlist)
            return {...playlist._doc}
        }
        catch (err){
            throw err
        }
    },
    searchPlaylists: async ({name}) => {

        try {
            const playlists = await Playlist.find({ name: { "$regex": name, "$options": "i" }, public : true})
            // console.log(playlists)
            return playlists.map(async playlist => {
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
            // console.log(song_id, index)
            result.songs.map((song, i) => {
  
                if (song._id.toString() === song_id && i === index){
                  
                    result.songs.splice(i, 1)
   
                }
            })
            result.total_duration -= song.duration
            result.save()
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
                artists: [],
                duration: songInput.duration
            }
            let artists = songInput.artists.split("\n")

            artists.map(artist => {
                song.artists.push(artist)
            })

            result.songs.push(song)
            result.total_duration += songInput.duration
   
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
    },
    addFollower: async ({username, request_id}) => {
        try{
            let result = await User.findOne({username: username})
            let requestee = await User.findOne({_id: request_id})
            
            // Remove from follow_requests 
            result.follow_requests.map((request,i) => {
                if (request.user_id.toString() === request_id){
                    result.follow_requests.splice(i, 1)
                }
                    
            })
            
            const date = new Date()
            // Add to followers
            result.followers.push({
                user_id: request_id,
                username: requestee.username,
                following_since: date
            })

            // Add to following 
            requestee.following.push({
                user_id: result._id,
                username: username,
                following_since: date 
            })
            result.save()
            requestee.save()
            return result
        }catch(error){}
    },
    removeFollower: async({username, follower_id}) =>{
        try{
            let result = await User.findOne({username: username})
            let follower = await User.findOne({_id: follower_id})
            
            // Remove from followers
            result.followers.map((follower,i) => {
                if (follower.user_id.toString() === follower_id){
                    result.followers.splice(i, 1)
                }
                    
            })
            
            // Remove from following
            follower.following.map((follow, i) => {
                if (follow.user_id.toString() === result._id.toString())
                    follower.following.splice(i, 1)
            })


            result.save()
            follower.save()
            return result
        }catch(error){}
    },
    unFollow: async({username, following_id}) =>{
        try{
            let result = await User.findOne({username: username})
            let following = await User.findOne({_id: following_id})
            
            // Remove from followers
            following.followers.map((follower,i) => {
                if (follower.user_id.toString() === result._id.toString())
                    following.followers.splice(i, 1)
            })
            
            // Remove from following
            result.following.map((follow, i) => {
                if (follow.user_id.toString() === following_id)
                    result.following.splice(i, 1)
            })

            result.save()
            following.save()

            return result
        }catch(error){}
    },
    addSavedPlaylist: async ({username, playlist_id, name}) => {
     
        try{
            let user = await User.findOne({username: username})

            let alreadyFavorited = false 
            await user.saved_playlists.map(playlist => {
                if (playlist.playlist_id.toString() === playlist_id)
                    alreadyFavorited = true
            })
            if (!alreadyFavorited){
                user.saved_playlists.push({playlist_id: playlist_id, name: name})
                user.save()
            }
            
            return await Playlist.findOne({_id: playlist_id})
        }catch(error){}
    },
    deleteFavorite: async ({username,playlist_id}) => {

        try{
            let user = await User.findOne({username : username})
     
            user.saved_playlists.map((playlist, i) => {
           
                if (playlist.playlist_id.toString() === playlist_id)
                    user.saved_playlists.splice(i, 1)
            })
            user.save()
            return user
        }
        catch{

        }
    },
    forkPlaylist: async ({username, user_id, name, songs}) => {
        const playlist = new Playlist({
            user_id: user_id,
            name: name, 
            username: username,
            date_created: new Date(),
            songs: songs
        })
        try {
            const result = await playlist.save()
            return { ...result._doc }
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    changePlaylistPrivacy: async ({id , privacy}) => {
        try {
            const playlist = await Playlist.findOne({_id: id})
            playlist.public = privacy
            playlist.save()
            return {...result._doc}
        } catch(error){

        }
    },
    changePlaylistName: async ({id , name}) => {
        try {
            const playlist = await Playlist.findOne({_id: id})
            playlist.name = name
            playlist.save()
            return {...result._doc}
        } catch(error){

        }
    },
    removeAllSongs: async ({id}) => {
        try {
            const playlist = await Playlist.findOne({_id : id})
            playlist.songs = []
            playlist.save() 
            return {...result._doc}
        } catch(error){
        }
    },
    moveSongUp: async({playlist_id, song_id, index}) => {
        try {
            let result = await Playlist.findOne({_id: playlist_id})

            let temp = result.songs[index]
            result.songs[index] = result.songs[index-1]
            result.songs[index-1] = temp

            result.save()
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    moveSongDown: async({playlist_id, song_id, index}) => {
        try {
            let result = await Playlist.findOne({_id: playlist_id})

            let temp = result.songs[index]
            result.songs[index] = result.songs[index+1]
            result.songs[index+1] = temp

            result.save()
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    addComment: async({playlist_id, username, comment}) => {
        console.log("HERE")
        try {
            let user = await User.findOne({username: username})
            let playlist = await Playlist.findOne({_id : playlist_id})

            playlist.comments.push({
                user_id: user._id,
                username: username,
                date: new Date(),
                message: comment,
                replies: []
            })
            playlist.save() 
            return {...playlist._doc}
        }
        catch(error){

        }
    }
}

export default resolver