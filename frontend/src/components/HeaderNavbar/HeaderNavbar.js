import React, { Component } from 'react'

import { NavLink, Link } from 'react-router-dom';
import {BsFillCaretDownFill} from 'react-icons/bs'
import {MdAccountCircle} from 'react-icons/md'
import {AiFillHome, AiOutlineConsoleSql} from 'react-icons/ai'
import {RiSearch2Line} from 'react-icons/ri'
import './HeaderNavbar.css'
import mockData from '../../mock_data.json'




class HeaderNavbar extends Component {
    constructor(props){
        super(props)
        this.onSearchResults = this.props.onSearchResults
    }
    container = React.createRef();
    state = {
        open: false,
    };
    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleClickOutside = event => {
        if (this.container.current && !this.container.current.contains(event.target)) {
            this.setState({
                open: false,
            });
        }
    };

    handleButtonClick = () => {
        this.setState(state => {
            return {
                open: !state.open,
            };
        });
    };


    render() { 
        function Search({props}) {
 
            const [visible, setVisibility] = React.useState(false);
            const [text, setText] = React.useState("All");
            const [keyword, searchText] = React.useState("Search")

            function toggleVisibility () {
                setVisibility(visible => !visible)
            }
            
            function toggleText(selected) {
                setText(selected)
            }

            function inputOnChange(event){
                searchText(event.target.value)
            }
            function Options() {
    
                return (
                    <ul className="search-options-ul">
                        <li>
                            <button onClick = {() => toggleText("All")}> All </button>
                        </li>
                        <li>
                            <button onClick = {() => toggleText("Artists")}> Artists </button>
                        </li>
                        <li> 
                            <button onClick = {() => toggleText("Songs")}> Songs </button>
                        </li>
                        <li>
                            <button onClick = {() => toggleText("Playlists")}> Playlists </button>
                        </li>
                        <li>
                            <button onClick = {() => toggleText("User")}> User </button>
                        </li>
                    </ul>
                )
            }

            async function toggleSearch(){
                let requestBody;
                let results = [];
                if (text === 'Artists'){
                    requestBody = { artist: keyword}
                    let result = await fetch('http://localhost:5000/v1/search?', {
                                        method: 'POST',
                                        body: JSON.stringify(requestBody),
                                        headers: {
                                            'content-type': 'application/json'
                                        }})
                                        .then(res => {
                                            if (res.status != 200 && res.status != 201)
                                                throw new Error ('Failed')

                                            return res.json()
                                        })
                                        .then(resData => {
                                            return resData
                                        })
                                        .catch(error => {
                                            console.log(error)
                                        })
                    results.push(result)
                }

                if (text == 'Songs'){
                    requestBody = {track: keyword}
                    let result = await fetch('http://localhost:5000/v1/search?', {
                                        method: 'POST',
                                        body: JSON.stringify(requestBody),
                                        headers: {
                                            'content-type': 'application/json'
                                        }})
                                        .then(res => {
                                            if (res.status != 200 && res.status != 201)
                                                throw new Error ('Failed')

                                            return res.json()
                                        })
                                        .then(resData => {
                                            return resData
                                        })
                                        .catch(error => {
                                            console.log(error)
                                        })
                    results.push(result)
                }
                    
                if (text == 'All'){
                    // Search Spotify API 
                    requestBody = {track : keyword}
                    let songResult = await fetch('http://localhost:5000/v1/search?', {
                                        method: 'POST',
                                        body: JSON.stringify(requestBody),
                                        headers: {
                                            'content-type': 'application/json'
                                        }})
                                        .then(res => {
                                            if (res.status != 200 && res.status != 201)
                                                throw new Error ('Failed')

                                            return res.json()
                                        })
                                        .then(resData => {
                                            return resData
                                        })
                                        .catch(error => {
                                            console.log(error)
                                        })
                    requestBody = {artist : keyword}
                    let artistResult = await fetch('http://localhost:5000/v1/search?', {
                        method: 'POST',
                        body: JSON.stringify(requestBody),
                        headers: {
                            'content-type': 'application/json'
                        }})
                        .then(res => {
                            if (res.status != 200 && res.status != 201)
                                throw new Error ('Failed')

                            return res.json()
                        })
                        .then(resData => {
                            return resData
                        })
                        .catch(error => {
                            console.log(error)
                        })
                    results.push(songResult)
                    results.push(artistResult)
                }

                const url = '/search'
                const {history} = props;
                props.onSearchResults(results)
                history.push(url)
            }

            return (
                <>
                    <input placeholder="Search" onChange={ inputOnChange }></input>
                    <div className="search-options">
                        <button onClick = {toggleVisibility}> {text} <BsFillCaretDownFill size = {10}/> </button>
                        {visible ? <Options/> : null }
                    </div>
                    <button className = "search-btn" onClick = {toggleSearch}>
                        <RiSearch2Line size ={18} style = {{color: "#faed36"}}/>
                    </button>
                </>
            )
        }
        

        
        function Playlist({props}){
      
            function togglePlaylist (){
                props.history.push("/" + mockData.users[0].username)
            }
            return (
                <button onClick = {togglePlaylist}>Playlist</button>
            )
        }

        function Followers({props}){
            function toggleFollower (){
                props.history.push("/" + mockData.users[0].username+ "/followers")
            }
            return (
                <button onClick = {toggleFollower}>Followers</button>
            )
        }

        function Following({props}){
            function toggleFollower (){
                props.history.push("/" + mockData.users[0].username+ "/followers")
            }
            return (
                <button onClick = {toggleFollower}>Following</button>
            )
        }

        function Settings({props}){
            function toggleSetting (){
                props.history.push("/" + mockData.users[0].username+ "/settings")
            }
            return (
                <button onClick = {toggleSetting}>Settings</button>
            )
        }

        function LogOut({props}){
            function toggleLogOut (){
                props.history.push("/")
            }
            return (
                <button onClick = {toggleLogOut}>Log Out</button>
            )
        }

        return ( 
            <div className="row home-navbar fixed-top">
                {/* Home button */}
                <div className="col">
                    <button className="home" onClick = {this.handleHome}>
                        <AiFillHome size={24}/>
                    </button>
                </div>
                
                {/* Search bar */}
                <div className="col search-bar">
                    
                    <Search props ={this.props.props}/>
                    
                </div>
                
                {/* Account button */}
                <div className="col text-right account-col">
                    <button className="account" onClick = {this.handleButtonClick}>
                        <MdAccountCircle size={24}/>
                    </button>

                    {this.state.open && (
                        <div className="container home-container">
                            <ul className = "account-options">
                                <li>
                                        <Playlist props = {this.props.props}/>
                                </li>
                                <li>
                                        <Followers props = {this.props.props}/>
                                </li>
                                <li>
                                        <Following props = {this.props.props}/>
                                </li>
                                <li>
                                    <Settings props = {this.props.props}/>
                                </li>
                                <li>
                                    <LogOut props = {this.props.props}/>
                                </li>
                            </ul>
                        </div>
                    )}
        
                </div>
            </div>
        );
    }
}
 
export default HeaderNavbar;