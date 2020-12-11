/** HOME LAYOUT
 * Handles displaying the home page prior to logging in 
 */
import React, { Component } from 'react';
import "./Homelayout.css";
import { Button } from "../../Button/Button";
import { Link } from "react-router-dom";

class Homelayout extends Component {
  state = {  }

  render() { 
    return (  
      <>
      <div className={this.props.lightBg ? "home__hero-section" : "home__hero-section darkBg"}>
        <div className="container home-container">
          <div className="row home__hero-row home-row"
            style={{
              display: "flex",
              flexDirection: this.props.imgStart === "start" ? "row-reverse" : "row",
            }}>

            <div className="col home-col">
              <div className="home__hero-text-wrapper">
                <div className="top-line">{this.props.topLine}</div>
                <h1 className={this.props.lightText ? "heading" : "heading dark"}>
                  {this.props.headline}
                </h1>
                <p className={this.props.lightTextDesc ? "home__hero-subtitle" : "home__hero-subtitle dark"}>
                  {this.props.description}
                </p>
                <Link to="/register">
                  <Button buttonSize="btn--wide" buttonColor="blue">
                    {this.props.buttonLabel}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    );
  }
}
 
export default Homelayout;
// function Homelayout({
//   lightBg,
//   topLine,
//   lightText,
//   lightTextDesc,
//   headline,
//   description,
//   buttonLabel,
//   imgStart,
// }) {
//   return (
//     <>
//       <div className={lightBg ? "home__hero-section" : "home__hero-section darkBg"}>
//         <div className="container home-container">
//           <div className="row home__hero-row home-row"
//             style={{
//               display: "flex",
//               flexDirection: imgStart === "start" ? "row-reverse" : "row",
//             }}>

//             <div className="col home-col">
//               <div className="home__hero-text-wrapper">
//                 <div className="top-line">{topLine}</div>
//                 <h1 className={lightText ? "heading" : "heading dark"}>
//                   {headline}
//                 </h1>
//                 <p className={lightTextDesc ? "home__hero-subtitle" : "home__hero-subtitle dark"}>
//                   {description}
//                 </p>
//                 <Link to="/register">
//                   <Button buttonSize="btn--wide" buttonColor="blue">
//                     {buttonLabel}
//                   </Button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Homelayout;
