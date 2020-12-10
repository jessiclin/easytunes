
import Homelayout from "../Layouts/Home/Homelayout";
import { homeObjOne } from "./Data";
import Navbar from '../Navbar/Navbar'
import React, { Component } from 'react'

class Home extends Component {
  state = {  }
  render() { 
    // if (this.props.username){
    //   this.props.history.push('/home')
    // }
    
    return (  
          <>
        <Navbar/>
      <Homelayout {...homeObjOne} />
    </>
    );
  }
}
 
export default Home;


// function Home() {

//   if (localStorage.getItem("username")){
//     console.log(this)
//   }
//   return (
//     <>
//         <Navbar/>
//       <Homelayout {...homeObjOne} />
//     </>
//   );
// }

// export default Home;
