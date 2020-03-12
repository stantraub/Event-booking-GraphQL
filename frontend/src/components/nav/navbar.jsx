import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'
import AuthContext from '../../context/auth-context'
// import {
//   BrowserView,
//   MobileView,
//   isBrowser,
//   isMobile
// } from "react-device-detect";

const NavBar = props => (
  <AuthContext.Consumer>
  {(context) => {
    return (
      <div className="main-nav">
        <span>
          <Link to="/" className="main-logo">
            Coworking
          </Link>
        </span>
        <div className="action-buttons-wrapper">
          <div className="action-item">
            <Link to="/spaces" style={{ textDecoration: "none", color: "black" }}>Find a workspace</Link>
          </div>
          {!context.token && (
            <div className="action-item">
              <Link to="/auth" style={{ textDecoration: "none", color: "black" }}>Sign In/Signup</Link>
            </div>
          )}
          {context.token && (
            <div className="action-item">
              <span>List a workspace</span>
            </div>
          )}
          {context.token && (
            <div className="action-item">
              <span>Write a Review</span>
            </div>
          )}
          {context.token && (
            <React.Fragment>
              <div className="action-item">
                <Link to="/bookings" style={{ textDecoration: "none", color: "black" }}>Bookings</Link>
              </div>
              <div>
                <button onClick={context.logout}>Logout</button>
              </div>
            </React.Fragment>
          )}
          
        </div>
      </div>
    )
  }}

  </AuthContext.Consumer>

);

export default NavBar;


// class Navbar extends React.Component {
//     constructor(props) {
//         super(props);

//     }

//     render() {
//         if (isBrowser) {
//             return (
//             <div className="main-nav">
//                 <span>
//                     <Link to="/" className="main-logo">
//                     Coworking
//                     </Link>
//                 </span>
//                 <div className="action-buttons-wrapper">
//                     <div className="action-item">
//                     <span>List a workspace</span>
//                     </div>
//                     <div className="action-item">
//                     <Link
//                         style={{ textDecoration: "none", color: "black" }}
//                         to={"/spaces"}
//                     >
//                         <span>Find a workspace</span>
//                     </Link>
//                     </div>
//                     <div className="action-item">
//                     <span>Write a Review</span>
//                     </div>
//                 </div>
//             </div>
        
//             );
//         } else {
//             return (
//               <div className="main-nav-mobile">
//                 <div className="action-buttons-wrapper-mobile">
//                   <Link to="/" className="main-logo-mobile">
//                     Coworking
//                   </Link>
//                   <Link className="action-item-mobile"
//                       style={{ textDecoration: "none", color: "black" }}
//                       to={"/spaces"}
//                   >
//                       Find a workspace
//                   </Link>
//                 </div>
//               </div>
//             );
//         }
//     }
// }
