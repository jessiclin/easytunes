/** NAVBAR
 * Component withing Home Page 
 * Handles redirecting to Sign in and sign up  
 */

import React, {Component } from "react";
import { Button } from "../Button/Button";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { BsMusicNoteList } from "react-icons/bs";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";


class Navbar extends Component {
  constructor(props){
    super(props)
    this.notAtHome = this.props.notAtHome

  }

  state = {click : false}

  handleClick = () => {
    this.state.setState({click : !this.state.click})

  }

  closeMobileMenu = () => {
    this.state.setState({click : false})
  }
  render() { 
    console.log(this.props)

    return (
      <>
        <IconContext.Provider value={{ color: "#fff" }}>
  
          <nav className="navbar top-nav">
  
            <div className="navbar-container container">
              <Link to="/" className="navbar-logo" onClick={this.closeMobileMenu}>
                <BsMusicNoteList className="navbar-icon" />
                Easy Tunes
              </Link>
  
              <div className="menu-icon" onClick={this.handleClick}>
                {this.state.click ? <FaTimes /> : <FaBars />}
              </div>
  
              <ul className={this.state.click ? "nav-menu active" : "nav-menu"}>
                <li className="nav-btn">
                    <Link to="/register" className="btn-link">
                    <Button onClick = {this.notAtHome}>
                      SIGN UP 
                    </Button>
                   </Link>
         
                  {/* {button ? (
                    <Link to="/register" className="btn-link">
                      <Button buttonStyle="btn--outline">SIGN UP</Button>
                    </Link>
                  ) : (
                    <Link to="/register" className="btn-link">
                      <Button
                        buttonStyle="btn--outline"
                        buttonSize="btn--mobile"
                        onClick={closeMobileMenu}
                      >
                        SIGN UP
                      </Button>
                    </Link>
                  )} */}
                </li>
                
                <li className="nav-btn">
                <Link to="/login" className="btn-link">
                <Button onClick = {this.notAtHome}>
                      SIGN IN
                    </Button>
                    </Link>
                  {/* {button ? (
                    <Link to="/login" className="btn-link">
                      <Button buttonStyle="btn--outline">LOG IN</Button>
                    </Link>
                  ) : (
                    <Link to="/login" className="btn-link">
                      <Button
                        buttonStyle="btn--outline"
                        buttonSize="btn--mobile"
                        onClick={closeMobileMenu}
                      >
                        LOG IN
                      </Button>
                    </Link>
                  )} */}
                </li>
                
              </ul>
            </div>
          </nav>
        </IconContext.Provider>
      </>
    );
  }
}
 
export default Navbar;
// function Navbar() {
//   const [click, setClick] = useState(false);
//   const [button, setButton] = useState(true);

//   const handleClick = () => setClick(!click);
//   const closeMobileMenu = () => setClick(false);

//   const showButton = () => {
//     if (window.innerWidth <= 960) {
//       setButton(false);
//     } else {
//       setButton(true);
//     }
//   };

//   useEffect(() => {
//     showButton();
//   }, []);

//   console.log(this)
//   return (
//     <>
//       <IconContext.Provider value={{ color: "#fff" }}>

//         <nav className="navbar top-nav">

//           <div className="navbar-container container">
//             <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
//               <BsMusicNoteList className="navbar-icon" />
//               Easy Tunes
//             </Link>

//             <div className="menu-icon" onClick={handleClick}>
//               {click ? <FaTimes /> : <FaBars />}
//             </div>

//             <ul className={click ? "nav-menu active" : "nav-menu"}>
//               <li className="nav-btn">
//                   <Button buttonStyle="btn--outline" onClick = {this.props.toLoginPage}>
//                     SIGN UP
//                   </Button>
//                 {/* {button ? (
//                   <Link to="/register" className="btn-link">
//                     <Button buttonStyle="btn--outline">SIGN UP</Button>
//                   </Link>
//                 ) : (
//                   <Link to="/register" className="btn-link">
//                     <Button
//                       buttonStyle="btn--outline"
//                       buttonSize="btn--mobile"
//                       onClick={closeMobileMenu}
//                     >
//                       SIGN UP
//                     </Button>
//                   </Link>
//                 )} */}
//               </li>
              
//               <li className="nav-btn">
//                 {button ? (
//                   <Link to="/login" className="btn-link">
//                     <Button buttonStyle="btn--outline">LOG IN</Button>
//                   </Link>
//                 ) : (
//                   <Link to="/login" className="btn-link">
//                     <Button
//                       buttonStyle="btn--outline"
//                       buttonSize="btn--mobile"
//                       onClick={closeMobileMenu}
//                     >
//                       LOG IN
//                     </Button>
//                   </Link>
//                 )}
//               </li>
              
//             </ul>
//           </div>
//         </nav>
//       </IconContext.Provider>
//     </>
//   );
// }

// export default Navbar;
