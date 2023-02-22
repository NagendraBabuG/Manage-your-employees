import React, { useState, useContext, Fragment, Link } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {useCookies} from 'react-cookie'
import "./navBar.scss"
import { useEffect } from "react";

import { UserContext } from "../../contexts/userContext"
import { signOutUser } from "../../utils/firebase"
import { Navigate, useNavigate } from "react-router-dom";
const Navigation = () =>{
  const [click, setClick] = useState(false);
  const [isLoginned , setLogin] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["nbk"]);
  const handleClick = () => setClick(!click);
  const navigate = useNavigate()
  const {currentUser, setCurrentUser} = useContext(UserContext)
  useEffect(() => {
    if(cookies['nbk']) setLogin(true);
    else setLogin(false)
  
  
  }, [cookies])
  
    console.log(currentUser)
    const signOutHandler = async ()=> {
        await signOutUser();
      //  removeCookie(["user"])
        removeCookie('nbk')
        console.log('navigting')
        setCurrentUser(null);
        navigate("/signin")
         //<Navigate to='/signin'/>
         
    }
  return (
    
      
        <Fragment>
        <div className="nav-container">
          <NavLink  to="/" className="nav-logo">
            EMS
            <i className="fas fa-code"></i>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              {!isLoginned? <NavLink
                
                to="/"
                
                className="nav-links"
              >
                Home
              </NavLink> : <NavLink to='/dashboard' className='nav-links'>Dashboard</NavLink>}
            </li>
            <li className="nav-item">
              {!isLoginned &&<NavLink
                
                to="/signup"
                
                className="nav-links"
              >
                Signup
              </NavLink>}
            </li>
            <li className="nav-item">
            {
             isLoginned ?   (<NavLink
              
                to="/signin"
              
                className="nav-links"
                onClick={signOutHandler}
              >
                SignOut
              </NavLink>): (<NavLink
              
                to="/signin"
                
                className="nav-links"
              >
                Signin
              </NavLink>)
            }  
            </li>
            <li className="nav-item">
              <NavLink
                
                to="/about"
                className="nav-links"
              >
                About
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
        <Outlet/>
        </Fragment>
      
  
  );
}

export default Navigation;